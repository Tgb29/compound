import type { APIRoute } from 'astro';
import { SITE } from '../site';
import { publishedBriefs } from '../lib/briefs';
import { CATEGORY_META, CATEGORY_ORDER } from '../lib/categories';
import { href } from '../lib/paths';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Full brief as HTML so an RSS-to-email service can send it as a newsletter.
export const GET: APIRoute = async ({ site }) => {
  const briefs = (await publishedBriefs()).slice(0, 30);
  const abs = (path: string) => new URL(href(path), site).toString();

  const items = briefs.map((brief) => {
    const link = abs(`/daily/${brief.id}/`);
    const take = brief.rendered?.html ?? '';
    const sections = CATEGORY_ORDER.map((c) => {
      const items = brief.data.items.filter((i) => i.category === c);
      if (!items.length) return '';
      return `<h2>${esc(CATEGORY_META[c].label)}</h2>${items
        .map(
          (i) =>
            `<h3>${esc(i.headline)}</h3><p>${esc(i.summary)}</p><p><strong>Why it matters:</strong> ${esc(i.why)}</p><p><a href="${esc(i.source.url)}">${esc(i.source.name)}</a></p>`,
        )
        .join('')}`;
    }).join('');
    const term = brief.data.term
      ? `<h2>Term of the day: ${esc(brief.data.term.name)}</h2><p>${esc(brief.data.term.definition)}</p>`
      : '';
    const html = `${take ? `<h2>My take</h2>${take}` : ''}${sections}${term}`;
    return `<item>
  <title>${esc(brief.data.title)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <pubDate>${new Date(`${brief.id}T12:00:00Z`).toUTCString()}</pubDate>
  <description>${esc(brief.data.summary)}</description>
  <content:encoded><![CDATA[${html.replace(/]]>/g, ']]]]><![CDATA[>')}]]></content:encoded>
</item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(SITE.name)}</title>
  <link>${abs('/')}</link>
  <atom:link href="${abs('/rss.xml')}" rel="self" type="application/rss+xml" />
  <description>${esc(SITE.description)}</description>
  <language>en-us</language>
${items.join('\n')}
</channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
