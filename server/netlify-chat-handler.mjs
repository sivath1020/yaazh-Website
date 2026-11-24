import { EventEmitter } from 'node:events';
import { Readable } from 'node:stream';
import { createChatHandler } from './chat-handler.mjs';

// Adapt Netlify's Web Request/Response API to the shared Node chat handler.
// Keep validation, Gemini calls, timeouts and error handling in one place.
export function createNetlifyChatHandler(options = {}) {
  const chat = createChatHandler(options);
  return async (request, context = {}) => {
    const url = new URL(request.url);
    const incoming = Readable.from(request.body || []);
    incoming.method = request.method;
    incoming.headers = Object.fromEntries(request.headers);
    incoming.headers.host = url.host;
    incoming.socket = {
      encrypted: url.protocol === 'https:',
      // Use Netlify's client IP rather than the shared function/proxy address.
      remoteAddress: context.ip || 'unknown',
    };
    const outgoing = new EventEmitter();
    const headers = new Headers();
    let status = 200;
    let body = '';
    outgoing.setHeader = (name, value) => headers.set(name, String(value));
    outgoing.writeHead = (code, values) => {
      status = code;
      for (const [name, value] of Object.entries(values)) headers.set(name, value);
    };
    outgoing.end = value => { body = value; outgoing.writableEnded = true; };
    const abort = () => outgoing.emit('close');
    request.signal.addEventListener('abort', abort, { once: true });
    try {
      await chat(incoming, outgoing);
      return new Response(body, { status, headers });
    } finally {
      request.signal.removeEventListener('abort', abort);
    }
  };
}
