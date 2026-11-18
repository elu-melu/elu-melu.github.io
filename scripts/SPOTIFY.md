# Spotify on the site

The now-playing card in the hero has two layers:

1. **Last played** — built into the HTML at build time from the most recent
   track in `src/data/spotify.json`, with no JavaScript at all. Refreshed by the
   deploy workflow; this is also what the live card falls back to.
2. **Now playing** — one small Cloudflare Worker that reads what is playing
   right now. The page polls it every 30 s while the card is on screen, swaps in
   the album art, title, equalizer and progress bar, and tints them from the cover.

Layer 1 is already live. Layer 2 needs the Worker deployed and its URL pasted
into `src/data/siteData.ts`.

> **Spotify Premium note.** Since late 2024 Spotify only serves the player
> endpoints (`/v1/me/player`) to Premium accounts. On a Free account the Worker
> gets HTTP 403 and the site quietly stays on the Last played snapshot. Nothing
> breaks; the live card just never appears.

## Part 1 — Last played (done)

Already set up, nothing to do unless a token expires:

- Repository secrets: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`,
  `SPOTIFY_REFRESH_TOKEN`.
- `.github/workflows/pages.yml` runs `scripts/fetch-spotify.mjs` before the
  build and writes `src/data/spotify.json`.
- `public/spotify.json` is published so the next run can tell whether anything
  changed and skip the deploy when it hasn't.

A local build with no secrets reuses the snapshot from production:

```sh
bun run spotify
bun run dev
```

### Keeping it current (external cron)

GitHub runs scheduled workflows late or not at all, so an outside cron service
calls the workflow every 5 minutes instead. With `spotify_only` set, a run only
deploys when the tracks changed.

1. Create a fine-grained GitHub token: Settings → Developer settings →
   Fine-grained tokens. Repository access: only `elu-melu.github.io`.
   Permissions: **Actions: Read and write** (nothing else). Pick an expiry and
   note it; the cron stops working when the token expires.
2. Make a free account at https://cron-job.org and create a job:
   - URL: `https://api.github.com/repos/elu-melu/elu-melu.github.io/actions/workflows/pages.yml/dispatches`
   - Schedule: every 5 minutes
   - Request method: `POST`
   - Headers:
     - `Authorization: Bearer <your token>`
     - `Accept: application/vnd.github+json`
     - `X-GitHub-Api-Version: 2022-11-28`
     - `Content-Type: application/json`
   - Body: `{"ref":"main","inputs":{"spotify_only":"true"}}`
3. Save, then use "Test run". GitHub answers `204 No Content` when it worked,
   and a new run appears under Actions.

## Part 2 — Now playing (the Worker)

The browser cannot call Spotify itself: `/v1/me/player` needs a *user* access
token, which needs the client secret. So one tiny Worker holds the credentials
and answers with JSON. It lives in `worker/` and costs nothing on the free plan
(100k requests a day; the 20 s cache keeps real usage far below that).

### 1. Re-mint the refresh token with the playback scope

The existing token only has `user-read-recently-played`. The Worker also needs
`user-read-currently-playing` and `user-read-playback-state`, so run the helper
once. It opens a link, you approve, the terminal prints a new token. Both layers
share this one token.

```sh
SPOTIFY_CLIENT_ID=your_id SPOTIFY_CLIENT_SECRET=your_secret node scripts/spotify-auth.mjs
```

Redirect URI in the Spotify dashboard must stay `http://127.0.0.1:8888/callback`.

Then update the repository secret, so Part 1 keeps working:

```sh
gh secret set SPOTIFY_REFRESH_TOKEN
```

### 2. Create the Cloudflare account and log in

Free account at https://dash.cloudflare.com/sign-up — no card needed. Then, from
the repo root:

```sh
npx --yes wrangler@4 login
```

### 3. Give the Worker its secrets

Same three values. `wrangler` prompts for each one; nothing is written to disk
and nothing goes into git.

```sh
npx --yes wrangler@4 secret put SPOTIFY_CLIENT_ID     --config worker/wrangler.toml
npx --yes wrangler@4 secret put SPOTIFY_CLIENT_SECRET --config worker/wrangler.toml
npx --yes wrangler@4 secret put SPOTIFY_REFRESH_TOKEN --config worker/wrangler.toml
```

### 4. Deploy

```sh
bun run worker:deploy
```

It prints a URL like
`https://elumelu-now-playing.<your-subdomain>.workers.dev`. Check it:

```sh
curl -s https://elumelu-now-playing.<your-subdomain>.workers.dev | jq
```

Play something on Spotify, then run it again. You want
`{"configured": true, "isPlaying": true, "track": {...}}`. If you get
`"error": "Spotify player request failed (HTTP 403)"`, see the Premium note at
the top.

### 5. Point the site at it

In `src/data/siteData.ts`:

```ts
nowPlaying: "https://elumelu-now-playing.<your-subdomain>.workers.dev",
```

Commit, push, done. Until that line is filled the site renders exactly what it
renders today.

### Local development

```sh
cp worker/.dev.vars.example worker/.dev.vars   # fill in the three values
bun run worker:dev                              # http://localhost:8787
```

Put `http://localhost:8787` in `nowPlaying` while you work, then set it back.
`ALLOWED_ORIGINS` in `worker/wrangler.toml` already allows
`http://localhost:4321`.

### Moving to a custom domain later

Add the new origin to `ALLOWED_ORIGINS` in `worker/wrangler.toml` and redeploy.
The Worker itself does not need a custom domain.

### What the endpoint returns

```json
{
  "configured": true,
  "isPlaying": true,
  "track": {
    "id": "0Buaf027pDX2qJkQFwHHDQ",
    "name": "Are You There?",
    "artists": ["Rema"],
    "album": "Rave & Roses",
    "image": "https://i.scdn.co/image/...",
    "url": "https://open.spotify.com/track/0Buaf027pDX2qJkQFwHHDQ",
    "durationMs": 200000,
    "progressMs": 42000
  }
}
```

Nothing playing, missing credentials, a rate limit or a Spotify error all answer
`200` with `track: null` (plus an `error` string when something failed), so the
page always falls back instead of showing a broken card.

Never commit the client secret, the refresh token, or `worker/.dev.vars`. If a
value leaks, reset the client secret in the Spotify dashboard and repeat step 1.
