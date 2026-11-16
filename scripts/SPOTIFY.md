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

Never commit the secret or the token. If you ever leak them, reset the client
secret in the Spotify dashboard and repeat step 3.
