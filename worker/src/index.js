// Live "now playing" endpoint for elu-melu.github.io.
//
// GitHub Pages cannot call Spotify from the browser (the /me/player endpoints
// need a user token, which needs the client secret), so this Worker holds the
// credentials and answers with a small JSON payload the static page polls.
//
// GET /            -> the payload
// GET /now-playing -> same
//
// Secrets (set with `wrangler secret put`, never committed):
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
//
// Vars (wrangler.toml):
//   ALLOWED_ORIGINS  comma-separated CORS allowlist
//   CACHE_SECONDS    how long one Spotify lookup is reused (default 20)
//
// Nothing here throws at the client: on any failure it answers 200 with an
// empty track, and the site keeps showing its build-time "Last played" list.

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const PLAYER_URL = "https://api.spotify.com/v1/me/player?additional_types=track,episode";
const CACHE_URL = "https://now-playing.internal/payload";

// Worker isolates are short-lived, so the access token lives here and is
// reused until it is about to expire.
let cachedToken = { value: "", expiresAt: 0 };

const DEFAULT_ORIGINS = ["https://elu-melu.github.io", "http://localhost:4321"];

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });

const hasCredentials = (env) =>
  Boolean(
    env.SPOTIFY_CLIENT_ID && env.SPOTIFY_CLIENT_SECRET && env.SPOTIFY_REFRESH_TOKEN
  );

function allowedOrigins(env) {
  const list = String(env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return list.length > 0 ? list : DEFAULT_ORIGINS;
}

function corsHeaders(origin, allowed) {
  if (!origin || !allowed.includes(origin)) return {};
  return { "Access-Control-Allow-Origin": origin, Vary: "Origin" };
}

function preflightHeaders(origin, allowed) {
  if (!origin || !allowed.includes(origin)) return {};
  return {
    ...corsHeaders(origin, allowed),
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

async function getAccessToken(env) {
  if (cachedToken.value && Date.now() < cachedToken.expiresAt - 60_000)
    return cachedToken.value;

  const credentials = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });
  if (!res.ok) throw new Error(`Spotify token request failed (HTTP ${res.status})`);

  const body = await res.json();
  const lifetime = Number(body.expires_in ?? 3600) * 1000;
  cachedToken = { value: body.access_token, expiresAt: Date.now() + lifetime };
  return cachedToken.value;
}

const imageOf = (images) => images?.at(-2)?.url ?? images?.[0]?.url ?? "";

function shapeTrack(item, progressMs) {
  if (!item) return null;
  const episode = item.type === "episode";
  return {
    id: item.id,
    name: item.name,
    artists: episode
      ? [item.show?.name ?? "Podcast"]
      : (item.artists ?? []).map((a) => a.name),
    album: episode ? (item.show?.name ?? "") : (item.album?.name ?? ""),
    image: imageOf(episode ? item.images : item.album?.images),
    url: item.external_urls?.spotify ?? "",
    durationMs: item.duration_ms ?? 0,
    progressMs: progressMs ?? 0,
  };
}

async function fetchNowPlaying(env) {
  const token = await getAccessToken(env);
  const res = await fetch(PLAYER_URL, { headers: { Authorization: `Bearer ${token}` } });

  // 204 means no device is playing anything right now.
  if (res.status === 204) return { configured: true, isPlaying: false, track: null };
  if (!res.ok) throw new Error(`Spotify player request failed (HTTP ${res.status})`);

  const body = await res.json();
  return {
    configured: true,
    isPlaying: Boolean(body.is_playing),
    track: shapeTrack(body.item, body.progress_ms),
  };
}

const idlePayload = { configured: true, isPlaying: false, track: null };

async function readCache() {
  const hit = await caches.default.match(CACHE_URL);
  return hit ? hit.json() : null;
}

function cacheFor(ctx, payload, seconds) {
  const cached = json(payload, 200, { "Cache-Control": `public, max-age=${seconds}` });
  ctx.waitUntil(caches.default.put(CACHE_URL, cached));
}

async function load(env, ctx) {
  const seconds = Number(env.CACHE_SECONDS ?? 20);
  const cached = await readCache();
  if (cached) return { payload: cached, seconds };

  try {
    const payload = await fetchNowPlaying(env);
    cacheFor(ctx, payload, seconds);
    return { payload, seconds };
  } catch (error) {
    // Do not cache failures: the next poll should try Spotify again.
    return {
      payload: { ...idlePayload, error: error.message ?? String(error) },
      seconds: 0,
    };
  }
}

export default {
  async fetch(request, env, ctx) {
    const allowed = allowedOrigins(env);
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: preflightHeaders(origin, allowed),
      });
    }
    if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
    if (origin && !allowed.includes(origin))
      return json({ error: "Origin not allowed" }, 403);

    const headers = corsHeaders(origin, allowed);
    const { pathname } = new URL(request.url);
    if (pathname !== "/" && pathname !== "/now-playing") {
      return json({ error: "Not found" }, 404, headers);
    }

    if (!hasCredentials(env))
      return json({ ...idlePayload, configured: false }, 200, headers);

    const { payload, seconds } = await load(env, ctx);
    const cacheControl = seconds > 0 ? `public, max-age=${seconds}` : "no-store";
    return json(payload, 200, { ...headers, "Cache-Control": cacheControl });
  },
};
