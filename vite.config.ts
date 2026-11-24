import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { createChatHandler } from './server/chat-handler.mjs'
import { createApplicationHandler } from './server/application-handler.mjs'
import { resolvePageRequest } from './server/site-routes.mjs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  const handler = createChatHandler({ apiKey: env.GEMINI_API_KEY, model: env.GEMINI_MODEL, allowedOrigin: env.CHAT_ALLOWED_ORIGIN })
  const applications = createApplicationHandler({ filePath: env.APPLICATIONS_FILE || undefined, allowedOrigin: env.APPLICATION_ALLOWED_ORIGIN || env.CHAT_ALLOWED_ORIGIN })
  return {
    build: { manifest: true },
    server: { fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/server/data/**', env.APPLICATIONS_FILE || '**/applications.jsonl'] } },
    plugins: [react(), {
      name: 'yaazh-chat-api',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          if (request.url?.split('?')[0] === '/api/chat') void handler(request, response)
          else if (request.url?.split('?')[0] === '/api/applications') void applications(request, response)
          else next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((request, response, next) => {
          if (request.url?.split('?')[0] === '/api/chat') void handler(request, response)
          else if (request.url?.split('?')[0] === '/api/applications') void applications(request, response)
          else {
            const url = new URL(request.url || '/', 'http://localhost')
            const route = resolvePageRequest(url.pathname)
            if (route?.redirect) { response.writeHead(301, { Location: route.redirect + url.search }); response.end(); return }
            if (route?.file) request.url = `/${route.file}`
            else if (!url.pathname.includes('.')) { request.url = '/404.html'; response.statusCode = 404 }
            next()
          }
        })
      },
    }],
  }
})
