import type { CATEGORIES } from '../content.config';

export type Category = (typeof CATEGORIES)[number];

// Display order inside a brief.
export const CATEGORY_ORDER: Category[] = ['medicines', 'deals', 'markets', 'ai', 'longevity', 'papers'];

export const CATEGORY_META: Record<Category, { label: string; blurb: string }> = {
  medicines: { label: 'Medicines', blurb: 'Approvals, trial results and new treatments.' },
  deals: { label: 'Deals & money', blurb: 'Funding rounds, acquisitions, licensing deals and IPOs.' },
  markets: { label: 'Public markets', blurb: 'How biotech stocks moved and why.' },
  ai: { label: 'AI × medicine', blurb: 'AI used to find drugs, read scans or run trials.' },
  longevity: { label: 'Longevity', blurb: 'The science and companies working on aging itself.' },
  papers: { label: 'Papers', blurb: 'Research worth knowing about, explained simply.' },
};
