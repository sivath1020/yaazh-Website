import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_PAGES, SITE_URL, getSeo, getStructuredData, normalizePath, serializeJsonLd } from '../src/lib/seo.ts';
import { PAGE_PATHS, resolvePageRequest } from '../server/site-routes.mjs';
import { SERVICE_PAGES } from '../src/lib/servicePages.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const read = (name: string) => readFile(resolve(dist, name), 'utf8');

test('server routes and canonical pages agree; aliases have one destination', () => {
  assert.deepEqual([...PAGE_PATHS].sort(), Object.keys(SEO_PAGES).sort());
  for (const path of ['/brochure', '/brochures', '/brochure/']) {
    assert.equal(normalizePath(path), '/services');
    assert.equal(resolvePageRequest(path).redirect, '/services');
  }
  assert.equal(resolvePageRequest('/about/').redirect, '/about');
  assert.equal(resolvePageRequest('/about.html').redirect, '/about');
  assert.equal(resolvePageRequest('/index.html').redirect, '/');
  assert.equal(resolvePageRequest('/missing-page'), null);
  assert.equal(getSeo('/missing-page').canonical, undefined);
  assert.equal(getSeo('/missing-page').robots, 'noindex, follow');
});

test('built pages have unique metadata and actual HTML content without JavaScript', async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [path, page] of Object.entries(SEO_PAGES)) {
    const html = await read(path === '/' ? 'index.html' : `${path.slice(1)}.html`);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="(.*?)"/)?.[1];
    assert.ok(title && description, path);
    assert.ok(!titles.has(title), `duplicate title on ${path}`);
    assert.ok(!descriptions.has(description), `duplicate description on ${path}`);
    titles.add(title); descriptions.add(description);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, path);
    assert.ok(html.includes(`href="${SITE_URL}${path === '/' ? '/' : path}"`), path);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path} must have one stable H1`);
    assert.ok(html.includes('<main>') && html.includes('Yaazh 360 Digitech'), path);
    assert.ok(html.includes('tel:+919047044440'), path);
    assert.ok(!html.includes('<div id="root"></div>'), path);
    assert.ok(html.includes('property="og:image"') && html.includes('name="twitter:card"'), path);
    const schema = JSON.parse(html.match(/<script id="yaazh-structured-data" type="application\/ld\+json">(.*?)<\/script>/s)![1]);
    assert.equal(schema['@graph'].find((node: { '@type': string }) => node['@type'] === 'WebSite').name, 'Yaazh 360 Digitech');
    assert.ok(schema['@graph'].some((node: { name: string }) => node.name === page.title), path);
    for (const [, asset] of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) await access(resolve(dist, decodeURIComponent(asset.slice(1))));
  }
});

test('sitemap and robots are real indexing files with canonical URLs only', async () => {
  const robots = await read('robots.txt');
  assert.ok(robots.startsWith('User-agent: *'));
  assert.ok(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
  assert.ok(!robots.includes('Disallow: /\n'));
  const xml = await read('sitemap.xml');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(urls, Object.keys(SEO_PAGES).map(path => `${SITE_URL}${path === '/' ? '/' : path}`));
  assert.ok(!xml.includes('/404') && !xml.includes('/brochure'));
});

test('featured Work cards expose direct links and the Vibhu project details control', async () => {
  const html = await read('work.html');
  assert.match(html, /<a href="\/work\/aspire-holidays" class="work-project-panel__select" aria-label="View Aspire Holidays case study"/);
  assert.match(html, /<div class="work-project-panel__actions"><a href="\/work\/aspire-holidays">Visit Software/);
  assert.match(html, /<button[^>]*class="work-project-panel__select"[^>]*aria-label="Show Vibhu Travel project details"/);
  assert.match(html, /<a href="https:\/\/aspirechitfunds\.com\/" class="work-project-panel__select" target="_blank" rel="noopener noreferrer"/);
});

test('software is shown under the correct client and Vibhu links to its website', async () => {
  const [vibhu, aspire] = await Promise.all([read('work/vibhu-travel.html'), read('work/aspire-holidays.html')]);
  for (const title of ['Bus Accounts Software', 'Lorry Accounts Software']) {
    assert.ok(vibhu.includes(`>${title}</h2>`), title);
    assert.ok(!aspire.includes(title), title);
  }
  for (const title of ['Document Management System', 'General Tour Software']) {
    assert.ok(aspire.includes(`>${title}</h3>`), title);
    assert.ok(!vibhu.includes(title), title);
  }
  assert.match(vibhu, /href="https:\/\/vibhutravelhub\.com\/" target="_blank" rel="noopener noreferrer"/);
});

test('unknown pages cannot be indexed and JSON-LD cannot escape its script', async () => {
  const html = await read('404.html');
  assert.ok(html.includes('content="noindex, follow"'));
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(html.includes('Page not found'));
  assert.ok(!serializeJsonLd({ text: '</script><script>alert(1)</script>' }).includes('<'));
  const business = getStructuredData('/')['@graph'][0];
  assert.equal(business.telephone, '+919047044440');
  assert.ok(!('aggregateRating' in business) && !('award' in business));
});

test('sharing image and device icon are present in the production output', async () => {
  const png = await readFile(resolve(dist, 'seo/yaazh360-social.png'));
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  await access(resolve(dist, 'apple-touch-icon.png'));
});

test('service pages expose useful content, links and matching service schema before JavaScript', async () => {
  const servicesHtml = await read('services.html');
  for (const [path, service] of Object.entries(SERVICE_PAGES)) {
    const html = await read(`${path.slice(1)}.html`);
    assert.ok(html.includes(service.heading), path);
    assert.ok(html.includes('href="/contact"') && html.includes('href="/work"'), path);
    assert.ok(servicesHtml.includes(`href="${path}"`), path);
    assert.equal((html.match(/<details[\s>]/g) || []).length, service.faqs.length, path);
    const schema = getStructuredData(path)['@graph'].find(node => node['@type'] === 'Service');
    assert.equal(schema?.name, service.heading, path);
    assert.equal(schema?.url, `${SITE_URL}${path}`, path);
    assert.equal(resolvePageRequest(`${path}.html`).redirect, path);
    assert.equal(resolvePageRequest(`${path}/`).redirect, path);
  }
});
