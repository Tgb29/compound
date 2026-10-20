# Daily brief routine

Instructions for the agent that drafts each morning's brief. The output is a
**pull request**, never a direct push to `main`: the owner reviews it, writes a
take, and merging is what publishes it.

The site is for people getting into biotech, longevity and AI in medicine.
Write for a smart newcomer: plain English, no unexplained jargon, every claim
sourced.

## 1. Set the date

```bash
TZ=America/Mexico_City date +%F
```

Call that `DATE`. If `src/content/daily/DATE.md` already exists on `main`, or
an open pull request titled `Daily brief — DATE…` already exists, stop — today
is done.

The site needs Node 22.12 or newer. If `node --version` is older, install it
first (for example `nvm install 22`).

## 2. Scan

Cover the time since the last brief (usually ~24 hours; on Mondays, since
Friday). Open sources, don't rely on memory. Places to check:

- **News:** STAT, Endpoints News, Fierce Biotech, BioPharma Dive, BioSpace,
  Reuters health, Timmerman Report, CNBC/Bloomberg health.
- **Regulators:** FDA press announcements, EMA news.
- **Papers:** Nature, Science, Cell, NEJM, The Lancet, Nature Medicine,
  Nature Aging, bioRxiv/medRxiv.
- **Watchlist:** news and press releases for everything in
  `src/data/medicines.yaml` and `src/data/companies.yaml`.
- **People:** recent posts and news from the accounts in `src/data/people.yaml`
  (X is mostly behind a login, so search the web for what they've posted or
  been quoted on).

## 3. Choose 8–12 items

Categories: `medicines`, `deals`, `markets`, `ai`, `longevity`, `papers`.
Aim for at least one item in each where real news exists. Prefer what a
newcomer most needs to know over what's most technical.

Rules for every item:

- Open the source and confirm the key facts and date. Drop anything you can't
  confirm. Prefer primary sources (FDA, company release, journal) or a major
  trade outlet.
- Paraphrase. Never copy sentences.
- Explain any unavoidable term in the same sentence.
- No investment advice: never "buy", "sell", "undervalued", price targets.
- `headline` ≤ 90 characters; `summary` 1–2 sentences; `why` 1 sentence on
  why it matters for someone learning the space.
- Add `tickers` for public companies.

## 4. Write the brief

Create `src/content/daily/DATE.md`. Copy the shape of the most recent brief in
that folder exactly (frontmatter fields: `title`, `summary`, `term`, `read`,
`items`). Keep the body as the `<!-- My take … -->` comment only — the owner
writes the take.

- `title`: ≤ 70 characters, the day's biggest story.
- `term`: one concept today's items make relevant. If it isn't already in
  `src/data/glossary.yaml`, add an entry (with `learn:` pointing to a primer if
  one fits) and set `term.glossary` to its id.
- `read`: the single best article or paper for a newcomer to read in full.
- Links inside Markdown bodies must be relative (`../../watchlist/`), never
  `/watchlist/`.

## 5. Update the watchlist

If an item changes a medicine's stage or gives a medicine or company notable
new `latest` news, update that entry in the YAML, including `asof` and
`source`. Don't add or remove entries — suggest them in the PR instead.

## 6. Check

```bash
npm ci && npm run build
```

The build validates every brief against the schema. It must pass.

## 7. Open the pull request

Create a branch named `daily/DATE` (or, if your environment only lets you
push to branches with a required prefix, that prefix plus `daily-DATE`). Make
one commit `Daily brief DATE`, push, and open a PR into `main` titled
`Daily brief — DATE: <title>` with this body:

```markdown
## Today's tasks (about 20 minutes)

- [ ] Skim the brief and delete anything wrong or dull
- [ ] Read in full: [<read title>](<read url>)
- [ ] Learn today's term: **<term>**
- [ ] Write 2–4 sentences under "My take" in `src/content/daily/DATE.md`
- [ ] Merge to publish

## Notes from the scan

- Items I could only partly verify: …
- Watchlist changes: …
- People or newsletters worth adding to the Follow page: …
```

Leave "Notes from the scan" lines out if they're empty. If the build fails and
you can't fix it, still open the PR and say so in its first line. Never push
to `main` and never merge the PR.
