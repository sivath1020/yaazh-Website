import { createNetlifyChatHandler } from '../../server/netlify-chat-handler.mjs';

export default createNetlifyChatHandler({
  apiKey: process.env.GEMINI_API_KEY,
  model: process.env.GEMINI_MODEL,
  allowedOrigin: process.env.CHAT_ALLOWED_ORIGIN,
});
