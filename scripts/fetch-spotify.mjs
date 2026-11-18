// Fetches your most recently played Spotify tracks and writes them to
// src/data/spotify.json, which the site reads at build time.
//
// Needs three environment variables (stored as GitHub Actions secrets):
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
//
// It never fails the build: if a variable is missing or Spotify can't be
// reached, it leaves the existing file alone and the site shows what it had.
// It never prints the tokens.

import { writeFile } from "node:fs/promises";

const OUT = new URL("../src/data/spotify.json", import.meta.url);
// Also published at /spotify.json so the next scheduled run can tell whether
// anything changed, and skip the deploy when it hasn't.
const PUBLIC = new URL("../public/spotify.json", import.meta.url);
const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;

async function main() {
  if (!id || !secret || !refresh) {
    console.log("Spotify: secrets not set, skipping.");
    return keepLive();
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
  });
  if (!tokenRes.ok) throw new Error(`token request failed: HTTP ${tokenRes.status}`);
  const { access_token } = await tokenRes.json();

  const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!res.ok) throw new Error(`recently-played request failed: HTTP ${res.status}`);
  const { items = [] } = await res.json();

  // Keep each track once, newest first, and only the fields the site uses.
  const seen = new Set();
  const tracks = [];
  for (const { track, played_at } of items) {
    if (!track || seen.has(track.id)) continue;
    seen.add(track.id);
    tracks.push({
      id: track.id,
      name: track.name,
      artists: track.artists.map((a) => a.name),
      album: track.album?.name ?? "",
      image: track.album?.images?.at(-2)?.url ?? track.album?.images?.[0]?.url ?? "",
      url: track.external_urls?.spotify ?? `https://open.spotify.com/track/${track.id}`,
      playedAt: played_at,
    });
    if (tracks.length === 5) break;
  }

  const json = JSON.stringify({ updatedAt: new Date().toISOString(), tracks }, null, 2) + "\n";
  await writeFile(OUT, json);
  await writeFile(PUBLIC, json);
  console.log(`Spotify: saved ${tracks.length} recent tracks.`);
}

// If Spotify can't be reached, reuse what the live site already shows, so a
// failed fetch never wipes "Last played". Also covers a local build with no
// secrets, which then mirrors production instead of showing an empty column.
async function keepLive() {
  const site = process.env.SITE_URL ?? "https://elu-melu.github.io";
  if (!site) return;
  try {
    const res = await fetch(`${site.replace(/\/$/, "")}/spotify.json`, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return;
    const json = await res.text();
    JSON.parse(json);
    await writeFile(OUT, json);
    await writeFile(PUBLIC, json);
    console.log("Spotify: reused the tracks from the live site.");
  } catch {}
}

main().catch(async (err) => {
  console.log(`Spotify: ${err.message}; keeping the existing data.`);
  await keepLive();
});
