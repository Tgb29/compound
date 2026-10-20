import { getCollection } from 'astro:content';

/** Published briefs, newest first. */
export async function publishedBriefs() {
  const all = await getCollection('daily', (e) => !e.data.draft);
  return all.sort((a, b) => b.id.localeCompare(a.id));
}
