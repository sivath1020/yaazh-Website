import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { loadEnvFile } from 'node:process';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChatHandler } from './chat-handler.mjs';
import { createApplicationHandler } from './application-handler.mjs';
import { resolvePageRequest } from './site-routes.mjs';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
try { loadEnvFile(resolve(root, '.env.local')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const dist = resolve(root, 'dist');
const applications = createApplicationHandler({ filePath: process.env.APPLICATIONS_FILE, allowedOrigin: process.env.APPLICATION_ALLOWED_ORIGIN || process.env.CHAT_ALLOWED_ORIGIN });
const chat = createChatHandler({ apiKey: process.env.GEMINI_API_KEY, model: process.env.GEMINI_MODEL, allowedOrigin: process.env.CHAT_ALLOWED_ORIGIN });
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };

createServer(async (request, response) => {
  let url;
  try { url = new URL(request.url || '/', 'http://localhost'); }
  catch { response.writeHead(400); return response.end('Invalid request URL.'); }
  if (url.pathname === '/api/chat') return chat(request, response);
  if (url.pathname === '/api/applications') return applications(request, response);
  if (!['GET', 'HEAD'].includes(request.method || '')) { response.writeHead(405); return response.end(); }
  if (url.pathname.startsWith('/api/')) { response.writeHead(404); return response.end(); }
  let file;
  try {
    const decodedPath = decodeURIComponent(url.pathname);
    const route = resolvePageRequest(decodedPath);
    if (route?.redirect) { response.writeHead(301, { Location: route.redirect + url.search }); return response.end(); }
    let status = route?.status || 200;
    file = route?.file ? resolve(dist, route.file) : resolve(dist, `.${decodedPath}`);
    if (!file.startsWith(dist + sep) && file !== dist) { response.writeHead(403); return response.end(); }
    const info = await stat(file).catch(() => null);
    if (!info?.isFile()) {
      if (extname(url.pathname)) { response.writeHead(404); return response.end(); }
      file = resolve(dist, '404.html');
      status = 404;
      await stat(file);
    }
    response.writeHead(status, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': extname(file) === '.html' ? 'no-cache' : 'public, max-age=3600' });
    if (request.method === 'HEAD') return response.end();
    const stream = createReadStream(file);
    stream.on('error', () => response.destroy());
    stream.pipe(response);
  } catch { response.writeHead(404); response.end('Not found. Build the website before starting the server.'); }
}).listen(Number(process.env.PORT || 3000), process.env.HOST || '127.0.0.1', () => console.log(`Yaazh 360 is available on port ${process.env.PORT || 3000}`));
