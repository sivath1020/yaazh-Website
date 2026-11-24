import test from 'node:test';
import assert from 'node:assert/strict';
import { sendContactEnquiry } from '../src/lib/web3forms.ts';

const enquiry = { name: ' Test Person ', email: ' person@example.com ', phone: '+91 9000000000', company: 'Example Company', message: ' Please discuss our website project. ', source: 'Contact page' as const };

test('sends structured branded mail with the visitor as reply-to', async () => {
  let submitted: Record<string, unknown> = {};
  const fetchImpl = (async (url, options) => {
    assert.equal(url, 'https://api.web3forms.com/submit');
    assert.equal(options?.method, 'POST');
    submitted = JSON.parse(String(options?.body));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }) as typeof fetch;
  await sendContactEnquiry(enquiry, { accessKey: 'test-access-key', fetchImpl });
  assert.equal(submitted.access_key, 'test-access-key');
  assert.equal(submitted.subject, 'New business enquiry | Yaazh 360');
  assert.equal(submitted.from_name, 'Yaazh 360 Website');
  assert.equal(submitted.name, 'Test Person');
  assert.equal(submitted.email, 'person@example.com');
  assert.equal(submitted.replyto, 'person@example.com');
  assert.equal(submitted.company, 'Example Company');
  assert.equal(submitted.message, 'Please discuss our website project.');
});

test('consultation requests include the selected services and a separate subject', async () => {
  await sendContactEnquiry({ ...enquiry, source: 'Appointment enquiry', services: ['Google Ads', 'Web App Development'] }, {
    accessKey: 'test-key', fetchImpl: (async (_url, options) => {
      const payload = JSON.parse(String(options?.body));
      assert.equal(payload.subject, 'New consultation enquiry | Yaazh 360');
      assert.equal(payload.services, 'Google Ads, Web App Development');
      return new Response(JSON.stringify({ success: true }));
    }) as typeof fetch,
  });
});

test('provider errors never become a success or leak provider output', async () => {
  for (const [status, result] of [[200, { success: false, message: 'private-provider-output' }], [403, { success: true }], [429, {}], [500, {}]] as const) {
    await assert.rejects(sendContactEnquiry(enquiry, { accessKey: 'test-key', fetchImpl: (async () => new Response(JSON.stringify(result), { status })) as typeof fetch }), error => {
      assert.ok(error instanceof Error);
      assert.ok(!error.message.includes('private-provider-output'));
      return true;
    });
  }
  await assert.rejects(sendContactEnquiry(enquiry, { accessKey: 'test-key', fetchImpl: (async () => new Response('not JSON')) as typeof fetch }));
});

test('invalid entries and honeypot submissions never contact the provider', async () => {
  for (const changes of [{ name: ' ' }, { email: 'invalid' }, { message: '' }, { message: 'x'.repeat(5001) }, { website: 'spam.example' }]) {
    await assert.rejects(sendContactEnquiry({ ...enquiry, ...changes }, { accessKey: 'test-key', fetchImpl: (async () => assert.fail('must not send')) as typeof fetch }));
  }
});

test('connection failures provide a retry message', async () => {
  await assert.rejects(sendContactEnquiry(enquiry, { accessKey: 'test-key', fetchImpl: (async () => { throw new Error('network error'); }) as typeof fetch }), /check your connection/);
});
