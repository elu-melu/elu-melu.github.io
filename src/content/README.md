# Off the clock: books and films

Each book or film is one Markdown file. Copy `_example.md` in the matching folder,
drop the leading underscore from the copy's name, fill in the fields, and push.
Files whose names start with `_` never appear on the site.

- `books/` shows under **Reading**. `status: reading` puts a book at the top.
- `films/` has no limit. The home page shows the 5 most recent from this year,
  and `/watching/` lists every film by year. Anything written below the front
  matter becomes its own page at `/watching/<file-name>/`, linked as "My thoughts".

The hero's now-playing card shows the last Spotify track (`src/data/spotify.json`) and
upgrades to live data when `links.nowPlaying` is set in `src/data/siteData.ts`.
