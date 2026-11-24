# Yaazh 360 chatbot

## Contact email forms

The contact page and consultation popup submit directly to Web3Forms using
`VITE_WEB3FORMS_ACCESS_KEY` in `.env.local`. This is a public form identifier,
not an SMTP password; Web3Forms requires browser-side submissions on its normal
plans. Enquiries are delivered to the mailbox linked to that access key in
Web3Forms. Recipient changes must be configured with Web3Forms.

Both forms send a branded subject and sender display name, and use the visitor's
email as Reply-To. They show success only when Web3Forms confirms acceptance.
They preserve the entered details when a submission fails. The contact form
includes phone and project requirements; consultation requests also
include the selected services. No service-selection popup opens from the navbar
Contact Us button. Careers applications continue to save on the server without
email.

Restart the development server or rebuild the production site after changing
the Web3Forms key. Run `npm run test:contact` for mocked delivery and error tests;
these tests do not send real emails. Test actual inbox receipt from the deployed
website, and check the mailbox's spam folder if needed.

The navbar chat button opens the Yaazh assistant. Messages are sent to the same-origin `POST /api/chat` endpoint, which calls Google Gemini from the server. The Gemini key is never sent to the browser.

## Local development

1. Configure `GEMINI_API_KEY` in `.env.local` (this file is ignored by Git).
2. Set `GEMINI_MODEL` to a model enabled for your Google project. The configured model is `gemini-3.1-flash-lite`.
3. Run `npm run dev`. Vite serves both the website and the chat API during development.

Restart the dev server after changing server environment variables.

## Production

### Netlify (the live website)

Deploy the **whole project source**, not just `dist`. The root `netlify.toml`
runs `npm run build`, publishes `dist`, and bundles `netlify/functions/chat.mjs`.
The `/api/chat` rewrite runs the shared Gemini handler as a Netlify Function;
the React page fallback comes after that API route.

In the Netlify project's Environment variables, add `GEMINI_API_KEY` with the
Functions runtime scope, and optionally `GEMINI_MODEL`. The default model is
`gemini-3.1-flash-lite`. Keep the key secret: never prefix it with `VITE_`.
Your local `.env.local` is not deployed and does not configure Netlify Functions.
Leave `CHAT_ALLOWED_ORIGIN` unset to allow the request's own HTTPS origin,
including deployment previews, or set it to the exact desired public origin.

Redeploy after adding or changing environment variables. For a CLI deployment,
authenticate with Netlify, link this folder to the **existing** Netlify project,
then run `netlify deploy --build --prod` from this project root. Dropping only
the `dist` folder into Netlify does not deploy this function.

Verify that `GET /api/chat` returns status 405 and JSON (not HTML). Then open
Let's chat and send a message. A 503 with "not connected yet" means the function
is deployed but its Gemini key is missing. Other AI connection errors require
checking the project's Gemini key, model access, and quota.

This change deploys chat only. The careers application endpoint still requires
the Node server and persistent storage described below.

### Node server

Run `npm run build`, then `npm start` with Node.js 22 or later. This serves `dist` and `/api/chat` together on port 3000. Set `PORT` and `HOST` for your hosting environment (the default bind address is `127.0.0.1`). Configure the Gemini key using your host's secret environment variables.

When a reverse proxy terminates HTTPS, set `CHAT_ALLOWED_ORIGIN` to the exact public origin, for example `https://your-domain.example`. Do not set a `VITE_` variable containing the key. Static-only hosting of `dist` requires deploying the server endpoint separately and routing `/api/chat` to it; uploading `dist` alone does not run the AI backend.

## Verification

- `npm run test:chat`: checks message validation, origin restrictions, credential handling, rate limiting, and provider failures with mocked Google responses.
- `npm run build`: checks TypeScript and creates the production website.
- `node server/check-connection.mjs`: verifies access to Google's model list without printing the key.

The assistant has a small set of company facts in `server/chat-handler.mjs`; update them when services, office hours, or contact details change. Chat history stays in memory in the browser and is not persisted by this server. Each request sends the recent conversation to Google to generate a reply. The endpoint limits requests per IP address and caps in-flight generations. Apply host-level quotas and distributed rate limits if scaling across multiple instances.
# Job applications

Both careers application buttons open the dedicated application form. POST
`/api/applications` validates and saves the selected role, name, email, graduation
year, and Google Drive résumé link. No email is sent. The success message is shown
only after the server confirms the application was saved.

Applications default to `server/data/applications.jsonl`, outside the public site
and excluded from Git. Each line is one JSON record with a reference ID and UTC
submission timestamp. There is no public endpoint to read applicant data.

Development (`npm run dev`), preview, and the Node production server (`npm start`)
serve this endpoint. Static-only hosting does not support submissions. In
production, set `APPLICATIONS_FILE` to an absolute path on persistent storage and
back it up. Configure `APPLICATION_ALLOWED_ORIGIN` to the public HTTPS origin
when using a reverse proxy. This form stores the résumé link; it does not download
the résumé or check its sharing permissions.

Run `npm run test:applications` to check validation and persistence.

