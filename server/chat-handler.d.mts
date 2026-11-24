import type { IncomingMessage, ServerResponse } from 'node:http';
interface ChatOptions {
  apiKey?: string;
  model?: string;
  allowedOrigin?: string;
  fetchImpl?: typeof globalThis.fetch;
  maxPerMinute?: number;
  now?: () => number;
}
export function createChatHandler(options?: ChatOptions): (request: IncomingMessage, response: ServerResponse) => Promise<void>;
