import { loadEnvFile } from 'node:process';
loadEnvFile('.env.local');
try {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models', { headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY }, signal: AbortSignal.timeout(20000) });
  const data = await response.json();
  console.log(JSON.stringify({ status: response.status, models: data.models?.filter(model => model.supportedGenerationMethods?.includes('generateContent')).map(model => model.name).slice(0, 18), error: data.error?.message?.replaceAll(process.env.GEMINI_API_KEY, '[redacted]') }));
} catch(error) { console.log(JSON.stringify({ error: 'Unable to reach Google', code: error.cause?.code || error.name })); process.exitCode = 1; }
