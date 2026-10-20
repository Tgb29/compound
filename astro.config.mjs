// @ts-check
import { defineConfig } from 'astro/config';

// SITE and BASE are set by the GitHub Pages workflow, so the same build works
// on tgb29.github.io/<repo>/ today and on a custom domain later.
// Because of that, links inside Markdown must be relative (../../watchlist/), not /watchlist/.
export default defineConfig({
  site: process.env.SITE || 'http://localhost:4321',
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
});
