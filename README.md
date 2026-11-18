# elu-melu.github.io

The personal site of Webster Elumelu, built with Astro. The front page is the self-portrait: **Selected** (work), **Now** (what's current), and the **log** (a diary of builds, reading, films, places, thoughts). The CV lives at `/cv/`.

## Run it

```sh
bun install
bun dev      # localhost:4321
bun build    # dist/
```

## Editing

### From a phone: Pages CMS

1. Go to the Pages CMS project for this repo.
2. **Log → Add entry.** Fill in title, type, date, and one or two sentences. Save.
3. The edit commits to `main`, GitHub Actions rebuilds, and the site updates.

The three most recent entries also show up on the front page.

Fields:

- `type`: `build`, `research`, `edit`, `read`, `watch`, `place`, `thought`
- `note`: the sentence that appears on the page. Required — an entry without a note stays in the log but never reaches the front page.
- `link` / `linkLabel`: optional, internal (`/work/dangote-ipo/`) or external.
- `image`: optional, uploaded to `public/uploads/`.

### From GitHub

Same thing in the web editor: copy `src/content/notes/_example.md`, rename it, drop the leading underscore.

### Films and books

`src/content/films/` and `src/content/books/` are the diary shelves; `/log/` merges them with the notes by year. Films without an exact `watched` date are ordered by `order`. Set `filmListOrder` in `src/data/siteData.ts` to match how you add new ones.

## Deploy

Push to `main`. `.github/workflows/pages.yml` builds and publishes to GitHub Pages.
