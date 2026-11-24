import assert from 'node:assert/strict';
import test from 'node:test';
import { createNetlifyChatHandler } from './netlify-chat-handler.mjs';

const origin = 'https://luxury-daffodil-9356d5.netlify.app';
function request({ method = 'POST', site = origin, body, headers = {} } = {}) {
  return new Request(`${origin}/api/chat`, {
    method,
    headers: { origin: site, 'Content-Type': 'application/json', ...headers },
    ...(method === 'POST' ? { body: body ?? JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] }) } : {}),
  });
}

test('deployed HTTPS chat returns JSON and keeps the key in the upstream header', async () => {
  let call;
  const handler = createNetlifyChatHandler({
    apiKey: 'server-secret',
    fetchImpl: async (url, options) => {
      call = { url, options };
      return Response.json({ candidates: [{ content: { parts: [{ text: 'Hello from Yaazh!' }] } }] });
    },
  });
  const response = await handler(request(), { ip: '192.0.2.1' });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/json/);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { reply: 'Hello from Yaazh!' });
  assert.equal(call.options.headers['x-goog-api-key'], 'server-secret');
  assert.ok(!call.options.body.includes('server-secret'));
});

test('Netlify adapter preserves missing-key, validation and origin errors', async () => {
  const handler = createNetlifyChatHandler();
  const unavailable = await handler(request());
  assert.equal(unavailable.status, 503);
  assert.match((await unavailable.json()).error, /not connected/);
  assert.equal((await handler(request({ body: '{' }))).status, 400);
  assert.equal((await handler(request({ site: 'https://untrusted.example' }))).status, 403);
  const method = await handler(request({ method: 'GET' }));
  assert.equal(method.status, 405);
  assert.equal(method.headers.get('allow'), 'POST');
});

test('Netlify client IP isolates visitors and preserves retry headers', async () => {
  const handler = createNetlifyChatHandler({ maxPerMinute: 1 });
  assert.equal((await handler(request(), { ip: '192.0.2.1' })).status, 503);
  const limited = await handler(request(), { ip: '192.0.2.1' });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '60');
  assert.equal((await handler(request(), { ip: '192.0.2.2' })).status, 503);
});
