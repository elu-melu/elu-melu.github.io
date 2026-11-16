// One-time helper: run it on your own computer to get a Spotify refresh token.
//
//   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
//
// It opens a sign-in link, catches Spotify's redirect on
// http://127.0.0.1:8888/callback, and prints the refresh token once.
// Save that token as the SPOTIFY_REFRESH_TOKEN repository secret. Don't commit it.

import { createServer } from "node:http";
import { randomBytes } from "node:crypto";

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.");
  process.exit(1);
}

const redirect = "http://127.0.0.1:8888/callback";
const state = randomBytes(16).toString("hex");
const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: id,
    scope: "user-read-recently-played",
    redirect_uri: redirect,
    state,
  });

const server = createServer(async (req, res) => {
  const url = new URL(req.url, redirect);
  if (url.pathname !== "/callback") return res.writeHead(404).end();
  if (url.searchParams.get("state") !== state) return res.writeHead(400).end("State mismatch.");
  const code = url.searchParams.get("code");
  if (!code) return res.writeHead(400).end("No code: " + (url.searchParams.get("error") ?? "unknown"));

  const form = { grant_type: "authorization_code", code, redirect_uri: redirect };
  let body;
  for (let attempt = 1; attempt <= 3 && !body; attempt++) {
    try {
      const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(form),
        signal: AbortSignal.timeout(30000),
      });
      body = await tokenRes.json();
      if (!tokenRes.ok || !body.refresh_token) {
        console.error("Spotify refused the code:", body.error_description ?? body.error ?? tokenRes.status);
        console.error("Codes only work once and expire after a few minutes. Run the script again.");
        res.writeHead(500).end("Spotify refused the code. See the terminal.");
        return server.close();
      }
    } catch (err) {
      console.error(`Attempt ${attempt} could not reach Spotify (${err.cause?.code ?? err.name}).`);
    }
  }

  if (!body) {
    res.writeHead(200, { "Content-Type": "text/plain" }).end("Node could not reach Spotify. Go back to the terminal.");
    console.error("\nNode could not reach accounts.spotify.com, though your browser could.");
    console.error("Run this in the same terminal within the next few minutes instead (the code expires):\n");
    console.error(
      `curl -s -u "$SPOTIFY_CLIENT_ID:$SPOTIFY_CLIENT_SECRET" ` +
        `-d grant_type=authorization_code -d code=${code} ` +
        `--data-urlencode redirect_uri=${redirect} https://accounts.spotify.com/api/token\n`
    );
    console.error('The "refresh_token" value in its output is the token to save.\n');
    return server.close();
  }

  res.writeHead(200, { "Content-Type": "text/plain" }).end("Done. You can close this tab and go back to the terminal.");
  console.log("\nYour refresh token (save it as the SPOTIFY_REFRESH_TOKEN secret):\n");
  console.log(body.refresh_token + "\n");
  server.close();
});

server.listen(8888, "127.0.0.1", () => {
  console.log("Open this link in your browser and approve access:\n");
  console.log(authUrl + "\n");
});
