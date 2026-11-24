import { readFile, writeFile, access, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_PAGES, SITE_URL, renderSeoHead } from '../src/lib/seo.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const { renderPage } = await import('../node_modules/.cache/seo-render/entry-seo.js');
const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(await readFile(resolve(dist, '.vite/manifest.json'), 'utf8'));
const entries = { '/services': 'src/pages/ServicesPage.tsx', '/about': 'src/pages/AboutPage.tsx', '/work': 'src/pages/WorkPage.tsx', '/contact': 'src/pages/ContactPage.tsx', '/careers': 'src/pages/CareersPage.tsx' };

function routeStyles(path) {
  const styles = new Set();
  const visited = new Set();
  function collect(key) {
    if (visited.has(key)) return;
    visited.add(key);
    const chunk = manifest[key];
    if (!chunk) return;
    for (const css of chunk.css || []) styles.add(css);
    for (const dependency of chunk.imports || []) collect(dependency);
  }
  collect('index.html');
  if (entries[path]) collect(entries[path]);
  return [...styles].filter(css => !template.includes(`href="/${css}"`)).map(css => `<link rel="stylesheet" href="/${css}" />`).join('\n');
}

for (const path of [...Object.keys(SEO_PAGES), '/404']) {
  const content = renderPage(path);
  // A failed renderer must fail the build rather than silently ship an empty page.
  if (!content.includes('<main>') || !/<h1[\s>]/.test(content)) throw new Error(`Missing rendered main content or heading: ${path}`);
  for (const [, asset] of content.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) await access(resolve(dist, decodeURIComponent(asset.slice(1))));
  const html = template.replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, `<!-- SEO:START -->\n${renderSeoHead(path)}\n<!-- SEO:END -->`)
    .replace('</head>', `${routeStyles(path)}\n<noscript><style>#root [style*="opacity:0"]{opacity:1!important}#root [style*="filter:blur"]{filter:none!important}</style></noscript>\n</head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${content}</div>`);
  if (!html.includes('id="yaazh-structured-data"')) throw new Error('SEO head markers missing from index.html');
  const output = resolve(dist, path === '/' ? 'index.html' : `${path.slice(1)}.html`);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
  console.log(`Pre-rendered ${path}`);
}

await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
const today = new Date().toISOString().split('T')[0];
await writeFile(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.entries(SEO_PAGES)
    .map(
      ([path, page]) =>
        `  <url>\n    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.changefreq || 'weekly'}</changefreq>\n    <priority>${page.priority || '0.8'}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>\n`
);
