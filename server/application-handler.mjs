import { appendFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const roles = new Set(['General Application', 'SEO Intern', 'Social Media Operator Intern', 'Performance Marketing Intern', 'Video Editor Intern', 'Business Executive Intern', 'Digital Marketing Specialist Intern', 'Content Creator Intern', 'Full Stack Developer Intern']);

function respond(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  response.end(JSON.stringify(payload));
}

export function createApplicationHandler({
  filePath = fileURLToPath(new URL('./data/applications.jsonl', import.meta.url)),
  allowedOrigin,
  saveApplication = async application => {
    await mkdir(dirname(filePath), { recursive: true });
    await appendFile(filePath, JSON.stringify(application) + '\n', { encoding: 'utf8', mode: 0o600 });
  },
} = {}) {
  const visitors = new Map();
  return async (request, response) => {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      return respond(response, 405, { error: 'Use POST to submit an application.' });
    }
    const expectedOrigin = allowedOrigin || `${request.socket.encrypted ? 'https' : 'http'}://${request.headers.host}`;
    if (request.headers.origin && request.headers.origin !== expectedOrigin) return respond(response, 403, { error: 'This request is not allowed.' });
    if (request.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') return respond(response, 415, { error: 'Send application details as JSON.' });
    const now = Date.now();
    for (const [ip, visitor] of visitors) if (now - visitor.start > 60000) visitors.delete(ip);
    const ip = request.socket.remoteAddress || 'unknown';
    const visitor = visitors.get(ip) || { start: now, count: 0 };
    if (visitor.count >= 10 || visitors.size > 10000) {
      response.setHeader('Retry-After', '60');
      return respond(response, 429, { error: 'Too many attempts. Please try again in a minute.' });
    }
    visitor.count++;
    visitors.set(ip, visitor);
    let data;
    try {
      const chunks = [];
      let size = 0;
      for await (const chunk of request) {
        size += Buffer.byteLength(chunk);
        if (size > 16000) return respond(response, 413, { error: 'Application details are too long.' });
        chunks.push(Buffer.from(chunk));
      }
      data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return respond(response, 400, { error: 'Invalid application. Please check your details.' }); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return respond(response, 400, { error: 'Please complete all required fields.' });
    const name = typeof data.name === 'string' ? data.name.trim() : '';
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    const yearText = String(data.graduationYear ?? '');
    const graduationYear = Number(yearText);
    if (!name || name.length > 120 || [...name].some(character => character.charCodeAt(0) < 32) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{4}$/.test(yearText) || graduationYear < 1950 || graduationYear > new Date().getFullYear() + 6 || !roles.has(data.role)) {
      return respond(response, 400, { error: 'Please enter a valid name, email, graduation year, and role.' });
    }
    let resumeUrl;
    try {
      if (typeof data.resumeUrl !== 'string' || data.resumeUrl.length > 2048) throw new Error();
      resumeUrl = new URL(data.resumeUrl);
      if (resumeUrl.protocol !== 'https:' || !['drive.google.com', 'docs.google.com'].includes(resumeUrl.hostname) || resumeUrl.pathname === '/' || resumeUrl.username || resumeUrl.password || resumeUrl.port) throw new Error();
    } catch { return respond(response, 400, { error: 'Please provide a valid Google Drive résumé link.' }); }
    const application = { id: randomUUID(), submittedAt: new Date().toISOString(), role: data.role, name, email, graduationYear, resumeUrl: resumeUrl.href };
    try {
      await saveApplication(application);
      return respond(response, 201, { id: application.id });
    } catch { return respond(response, 503, { error: 'We could not save your application. Your details have been kept in the form. Please try again later.' }); }
  };
}
