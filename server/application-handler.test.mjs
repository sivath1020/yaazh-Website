import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer, request } from 'node:http';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApplicationHandler } from './application-handler.mjs';

function httpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = request(url, options, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, json: async () => JSON.parse(body) }));
    });
    req.on('error', reject);
    req.end(options.body);
  });
}

const valid = { name: ' Test Applicant ', email: 'applicant@example.com', graduationYear: '2026', role: 'SEO Intern', resumeUrl: 'https://drive.google.com/file/d/example/view' };

async function withServer(options, run) {
  const server = createServer(createApplicationHandler(options));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const post = (body, headers = {}) => httpRequest(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
  try { await run(post, url); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test('valid and general applications persist with server metadata and no extra fields', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'yaazh-applications-'));
  const filePath = join(directory, 'private', 'applications.jsonl');
  try {
    await withServer({ filePath }, async post => {
      for (const role of ['SEO Intern', 'General Application']) {
        const response = await post({ ...valid, role, injected: 'discard this' });
        assert.equal(response.status, 201);
        assert.ok((await response.json()).id);
      }
    });
    const saved = (await readFile(filePath, 'utf8')).trim().split('\n').map(line => JSON.parse(line));
    assert.equal(saved.length, 2);
    assert.equal(saved[0].name, 'Test Applicant');
    assert.equal(saved[0].graduationYear, 2026);
    assert.ok(saved[0].submittedAt);
    assert.equal(saved[0].injected, undefined);
    assert.notEqual(saved[0].id, saved[1].id);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('invalid required fields, roles, and deceptive résumé links cannot be saved', async () => {
  let saves = 0;
  await withServer({ saveApplication: async () => { saves++; } }, async post => {
    for (const changes of [{ name: ' ' }, { email: 'invalid' }, { graduationYear: '' }, { graduationYear: '2026.5' }, { role: 'DevOps Intern' }, { resumeUrl: 'https://drive.google.com.evil.example/file/123' }, { resumeUrl: 'http://drive.google.com/file/123' }, { resumeUrl: 'https://drive.google.com/' }, { resumeUrl: 'https://user:pass@drive.google.com/file/123' }]) {
      assert.equal((await post({ ...valid, ...changes })).status, 400);
    }
    assert.equal(saves, 0);
  });
});

test('storage failure returns an error rather than a false success', async () => {
  await withServer({ saveApplication: async () => { throw new Error('Disk unavailable'); } }, async post => {
    const response = await post(valid);
    assert.equal(response.status, 503);
    assert.match((await response.json()).error, /could not save/);
  });
});

test('rejects cross-origin, non-JSON, oversized, and non-POST requests', async () => {
  await withServer({ saveApplication: async () => assert.fail('must not save') }, async (post, url) => {
    assert.equal((await post(valid, { Origin: 'https://other.example' })).status, 403);
    assert.equal((await post(valid, { 'Content-Type': 'text/plain' })).status, 415);
    assert.equal((await post({ ...valid, name: 'a'.repeat(17000) })).status, 413);
    assert.equal((await httpRequest(url)).status, 405);
  });
});
