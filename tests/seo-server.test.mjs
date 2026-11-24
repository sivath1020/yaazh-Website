import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

test('production HTTP responses serve route HTML, indexing files, redirects and real 404s', { timeout: 25000 }, async t => {
  const cwd = fileURLToPath(new URL('../', import.meta.url));
  const port = String(42000 + Math.floor(Math.random() * 10000));
  const server = spawn(process.execPath, ['server/index.mjs'], { cwd, env: { ...process.env, PORT: port, HOST: '127.0.0.1' }, stdio: ['ignore', 'pipe', 'pipe'] });
  t.after(() => { server.kill(); });
  await new Promise((resolve, reject) => {
    server.stdout.once('data', resolve);
    server.once('error', reject);
    server.once('exit', code => reject(new Error(`Server exited before startup: ${code}`)));
  });
  const base = `http://127.0.0.1:${port}`;
  for (const [path, status, type] of [
    ['/', 200, 'text/html'], ['/about', 200, 'text/html'], ['/services', 200, 'text/html'],
    ['/work', 200, 'text/html'], ['/work/aspire-holidays', 200, 'text/html'], ['/work/vibhu-travel', 200, 'text/html'],
    ['/digital-marketing-company-coimbatore', 200, 'text/html'],
    ['/website-development-coimbatore', 200, 'text/html'],
    ['/software-development-coimbatore', 200, 'text/html'],
    ['/robots.txt', 200, 'text/plain'], ['/sitemap.xml', 200, 'application/xml'],
    ['/missing-page', 404, 'text/html'], ['/not-found.png', 404, null],
    ['/brochure?source=test', 301, null], ['/about.html', 301, null], ['/about/', 301, null],
    ['/digital-marketing-company-coimbatore.html', 301, null],
    ['/website-development-coimbatore/', 301, null],
  ]) {
    const response = await fetch(base + path, { redirect: 'manual', signal: AbortSignal.timeout(5000) });
    assert.equal(response.status, status, path);
    if (type) assert.ok(response.headers.get('content-type')?.includes(type), path);
    const html = await response.text();
    if (path === '/about') assert.ok(html.includes('<title>About Yaazh'));
    if (path === '/work/aspire-holidays') assert.match(html, /<h1[^>]*>Custom CRM &amp; HRMS for\s*(?:<!-- -->)?<span>Aspire Holidays<\/span><\/h1>/);
    if (path === '/work/vibhu-travel') assert.ok(html.includes('Software for Vibhu Travel Hub</h1>'));
    if (path === '/digital-marketing-company-coimbatore') assert.ok(html.includes('Digital Marketing Company in Coimbatore</h1>'));
    if (path === '/website-development-coimbatore') assert.ok(html.includes('Website Development Company in Coimbatore</h1>'));
    if (path === '/software-development-coimbatore') assert.ok(html.includes('Software Development Company in Coimbatore</h1>'));
    if (path === '/missing-page') assert.ok(html.includes('noindex, follow'));
    if (path === '/brochure?source=test') assert.equal(response.headers.get('location'), '/services?source=test');
  }
});
