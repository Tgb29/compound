import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIES = ['deals', 'markets', 'medicines', 'papers', 'ai', 'longevity'] as const;

const item = z.object({
  category: z.enum(CATEGORIES),
  headline: z.string().max(120),
  summary: z.string(),
  why: z.string(),
  source: z.object({ name: z.string(), url: z.url() }),
  date: z.coerce.date().optional(),
  tickers: z.array(z.string()).default([]),
});

// One Markdown file per day: src/content/daily/YYYY-MM-DD.md.
// Frontmatter holds the scan; the body is your own take.
const daily = defineCollection({
  loader: glob({ pattern: '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9].md', base: './src/content/daily' }),
  schema: z.object({
    title: z.string().max(90),
    summary: z.string(),
    draft: z.boolean().default(false),
    term: z.object({ name: z.string(), definition: z.string(), glossary: z.string().optional() }).optional(),
    read: z.object({ title: z.string(), url: z.url(), why: z.string() }).optional(),
    items: z.array(item).min(1),
  }),
});

const learn = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    minutes: z.number(),
    updated: z.coerce.date(),
  }),
});

const glossary = defineCollection({
  loader: file('src/data/glossary.yaml'),
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    learn: z.string().optional(),
  }),
});

const medicines = defineCollection({
  loader: file('src/data/medicines.yaml'),
  schema: z.object({
    name: z.string(),
    company: z.string(),
    ticker: z.string().optional(),
    area: z.enum(['obesity', 'longevity', 'ai-discovered', 'other']),
    what: z.string(),
    stage: z.string(),
    latest: z.string(),
    next: z.string(),
    asof: z.coerce.date(),
    source: z.url(),
  }),
});

const companies = defineCollection({
  loader: file('src/data/companies.yaml'),
  schema: z.object({
    name: z.string(),
    ticker: z.string().optional(),
    kind: z.enum(['public', 'private', 'nonprofit']),
    focus: z.enum(['obesity', 'longevity', 'ai-discovery', 'platform', 'big-pharma']),
    what: z.string(),
    latest: z.string(),
    url: z.url(),
    source: z.url(),
  }),
});

const people = defineCollection({
  loader: file('src/data/people.yaml'),
  schema: z.object({
    name: z.string(),
    handle: z.string().optional(),
    url: z.url(),
    category: z.enum(['news', 'investing', 'longevity', 'ai-bio', 'clinicians']),
    why: z.string(),
  }),
});

const reading = defineCollection({
  loader: file('src/data/reading.yaml'),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['newsletter', 'blog', 'podcast']),
    url: z.url(),
    by: z.string().optional(),
    why: z.string(),
  }),
});

const jobs = defineCollection({
  loader: file('src/data/jobs.yaml'),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['board', 'vc-board', 'company']),
    url: z.url(),
    why: z.string(),
  }),
});

export const collections = { daily, learn, glossary, medicines, companies, people, reading, jobs };
