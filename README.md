# Compound

A daily notebook on biotech, longevity and AI in medicine — one short brief a
day, written in plain English for people getting into the space.

Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## The daily loop

1. **Morning:** a scheduled agent follows [`ROUTINE.md`](ROUTINE.md), scans the
   news and opens a pull request with a draft brief and today's tasks.
2. **You:** check the draft, read one piece in full, write your take under
   "My take", merge.
3. **Merge = publish.** The site rebuilds, the RSS feed updates, and the streak
   on the home page counts the day.

## Where things live

| What | File |
| --- | --- |
| Daily briefs | `src/content/daily/YYYY-MM-DD.md` |
| Primers | `src/content/learn/*.md` |
| Glossary | `src/data/glossary.yaml` |
| Watchlist | `src/data/medicines.yaml`, `src/data/companies.yaml` |
| People & reading | `src/data/people.yaml`, `src/data/reading.yaml` |
| Jobs | `src/data/jobs.yaml` |
| Site name, timezone, weekly target | `src/site.ts` |

Every file is validated by `src/content.config.ts`: a brief with a missing
source link or unknown category fails the build, and the PR check catches it.

## Run it locally

Needs Node 22.22 or newer (`.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

Then open http://localhost:4321.
