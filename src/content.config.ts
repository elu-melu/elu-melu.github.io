import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Add one Markdown file per entry. Files starting with "_" are ignored,
// so src/content/*/_example.md shows the format without appearing on the site.

const books = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(["reading", "read"]).default("read"),
    finished: z.coerce.date().optional(),
    note: z.string().optional(),
  }),
});

const films = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/films" }),
  schema: z.object({
    title: z.string(),
    year: z.number().int().optional(), // release year, shown after the title
    director: z.string().optional(),
    seen: z.number().int(), // the year you watched it; groups the /watching/ page
    watched: z.coerce.date().optional(), // exact date, if you know it
    order: z.number().int().optional(), // position in your list, used when there's no date
    featured: z.number().int().min(1).max(5).optional(), // 1-5 pins it to the home page in that order
    note: z.string().optional(),
  }),
});

export const collections = { books, films };
