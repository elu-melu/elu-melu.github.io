import { getCollection, type CollectionEntry } from "astro:content";
import { filmListOrder } from "../data/siteData";

export type Film = CollectionEntry<"films">;

/** Newest first: by exact date when there is one, otherwise by list position. */
export async function getFilms(): Promise<Film[]> {
  const films = await getCollection("films");
  const rank = (f: Film) => {
    if (f.data.watched) return f.data.watched.getTime();
    const o = f.data.order ?? 0;
    return filmListOrder === "oldest-first" ? o : -o;
  };
  return films.sort((a, b) => {
    if (a.data.seen !== b.data.seen) return b.data.seen - a.data.seen;
    if (!!a.data.watched !== !!b.data.watched) return a.data.watched ? -1 : 1;
    return rank(b) - rank(a);
  });
}

export const hasThoughts = (f: Film) => !!f.body && f.body.trim().length > 0;
