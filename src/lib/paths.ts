const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site path with the deploy base ("/biotech-daily" on GitHub Pages, "" locally). */
export function href(path: string): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
