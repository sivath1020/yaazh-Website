import type { IncomingMessage, ServerResponse } from 'node:http';
export function createApplicationHandler(options?: { filePath?: string; allowedOrigin?: string }): (request: IncomingMessage, response: ServerResponse) => Promise<void>;
