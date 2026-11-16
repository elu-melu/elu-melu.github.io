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
    year: z.number().int().optional(),
    director: z.string().optional(),
    watched: z.coerce.date(),
    note: z.string().optional(),
  }),
});

export const collections = { books, films };
