# "Last played" from Spotify

The site shows your five most recent Spotify tracks and a player for the latest
one. A GitHub Actions run checks Spotify every 5 minutes (and on every deploy),
and rebuilds the site only when the tracks have changed. Until the three secrets below exist, the column just links to
your profile.

## One-time setup

1. Go to https://developer.spotify.com/dashboard, sign in, and create an app.
   - Redirect URI: `http://127.0.0.1:8888/callback`
   - API: Web API
2. Copy the app's **Client ID** and **Client secret**.
3. On your computer, in this repo, run:

   ```sh
   SPOTIFY_CLIENT_ID=your_id SPOTIFY_CLIENT_SECRET=your_secret node scripts/spotify-auth.mjs
   ```

   Open the link it prints, approve access ("recently played" only), and the
   terminal prints a refresh token.
4. In GitHub: Settings → Secrets and variables → Actions → New repository
   secret. Add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and
   `SPOTIFY_REFRESH_TOKEN`.
5. Actions → Deploy to GitHub Pages → Run workflow.

## Keeping it current (external cron)

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

Never commit the secret or the token. If you ever leak them, reset the client
secret in the Spotify dashboard and repeat step 3.
