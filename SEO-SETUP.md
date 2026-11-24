# Yaazh 360 Digitech search setup

Production origin: **https://yaazh360digitech.in**

The project is configured to present Yaazh 360 Digitech as a digital marketing
and software development company in Coimbatore. Google chooses the final search
title, snippet, site name and sitelinks; these files provide clear signals.

## What is implemented

- Unique titles/descriptions, canonical URLs and sharing metadata for all nine pages.
- Build-time rendering of the actual React page components into HTML. Visitors and
  crawlers receive the same content; this does not use bot detection or separate SEO copy.
- ProfessionalService, WebSite, WebPage/AboutPage/ContactPage and breadcrumb JSON-LD.
  Business name, address, phone and opening hours match the existing website.
- A real sitemap.xml and robots.txt generated with every build.
- A stable, descriptive homepage H1 and clearer company introduction.
- Canonical redirects for brochure aliases, .html URLs and trailing-slash duplicates.
- A noindex missing-page screen with HTTP 404 on the supplied server configurations.
- A 1200×630 branded sharing image and an Apple touch icon.
- Smaller footer/client logo downloads using existing optimized files.
- Unsupported partner/certification statements replaced with capability descriptions.
  Add official credentials only when documentary/public verification is available.

## Build and validate

Use Node.js 22.20 or newer (or a current Node.js LTS with TypeScript stripping).

```sh
npm ci
npm run build
npm run test:seo
```

The normal build creates the client bundle, renders all actual page components
with Vite's server build, then writes HTML, robots.txt and sitemap.xml into dist/.
The intermediate renderer stays under node_modules/.cache and is not deployed.
Metadata is maintained centrally in src/lib/seo.ts. Update company facts there
and in visible contact/footer content together when they change.

SEO tests validate rendered content, metadata, structured data, assets, sitemap,
robots, HTTP content types, redirects, alias query strings and real 404 responses.
The HTTP test starts and stops its own local Node server; it makes no third-party
API requests and sends no forms.

## Publish to the existing host

The public site returned an Nginx server header when checked on 16 November 2026.
Its robots.txt and sitemap.xml URLs returned homepage HTML, so routing matters
as much as uploading the new files.

1. Upload the **contents** of the new dist/ into the website's existing public
   document root, preserving any separate API/backend configuration. Copy all
   generated root HTML pages, assets/, seo/, robots.txt, sitemap.xml and icons.
2. For Nginx serving static files, merge deploy/nginx-seo.conf into the existing
   HTTPS virtual host. Replace the old SPA fallback that sent every request to
   index.html. Keep the existing TLS settings, document root and /api/ proxy.
   Do not append a second location / block. Run nginx -t and reload only if valid.
3. If Nginx proxies the Node app instead, deploy the updated server/ code along
   with dist/ and restart the existing Node service. The Node server handles page
   HTML, content types, redirects and 404s itself.
4. Apache hosts can use the included dist/.htaccess when mod_rewrite and override
   permissions are enabled. Netlify uses public/_redirects and netlify.toml;
   deploy the source there so its existing chat function is built too.
5. Clear any HTML/CDN cache. Keep fingerprinted assets cached and ensure HTML is
   revalidated. Redirect HTTP and www consistently to https://yaazh360digitech.in
   using the host's existing TLS/domain settings; do not change DNS blindly.

Do not upload only index.html. Each route needs its own generated HTML file.
The existing contact, careers and chat integrations still require their existing
hosted APIs or configured third-party form service; static upload alone does not
create backend services.

## Verify after deployment

Check the public URLs, rather than just the JavaScript-rendered DOM:

- /: HTTP 200; title identifies Yaazh 360 Digitech, digital marketing/software and Coimbatore.
- /about and /services: HTTP 200; each has its own title and body in View Source.
- /robots.txt: HTTP 200, plain text, with the canonical sitemap URL.
- /sitemap.xml: HTTP 200, XML containing the nine canonical URLs.
- /brochure: HTTP 301 to /services; /about.html and /about/ redirect to /about.
- /a-page-that-does-not-exist: HTTP 404, a noindex tag and no homepage canonical.
- /seo/yaazh360-social.png: HTTP 200, the branded 1200×630 preview.

## Google account steps

These require access to the company's Google account; they are not performed
by adding tags to the source code alone.

1. Verify the domain property yaazh360digitech.in in Google Search Console using
   its supplied DNS TXT record, or verify the exact HTTPS URL-prefix property.
   Do not invent a verification tag. Add a real tag only if Google supplies it.
2. Submit https://yaazh360digitech.in/sitemap.xml in Search Console.
3. Inspect the homepage, services, about and contact URLs. Confirm the live test
   sees the new content and request indexing after deployment.
4. Test public URLs with Google's Rich Results Test. Not every schema type creates
   a rich result, and valid markup does not guarantee a knowledge panel or sitelinks.
5. Maintain the Google Business Profile with the same company name, phone, address,
   working hours and website. Choose the accurate primary business category and
   relevant secondary categories for the services actually offered. Link verified
   social profiles in structured data only after their official URLs are supplied.
6. Review Search Console indexing and branded-query impressions after Google
   recrawls. Do not repeatedly change metadata in response to an immediate search.

## Official references

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

## Regenerate social assets

The generated PNGs are included in public/, so production builds need no Python.
If the brand artwork changes, install Pillow and run
`python scripts/create-seo-assets.py`, then rebuild the site. This reuses the
existing company logo and favicon without changing their source files.

## Service search pages added — 17 November 2026

- /digital-marketing-company-coimbatore
- /website-development-coimbatore
- /software-development-coimbatore

Each page has distinct service content, one descriptive H1, FAQs, a project
quote link, related service links, unique metadata, canonical URL and Service
structured data. The actual page content is rendered into HTML during the build.
The services overview and footer link to these pages. The sitemap and Node,
Nginx, Apache and Netlify route configurations include all three routes.
The homepage FAQ and matching structured data no longer promise fixed lead or
SEO result timelines. Existing client portfolio links are used; no new client
results, reviews or certifications have been invented.

Validation: production build completed; all seven SEO tests passed, including
HTTP page responses and redirects. Lint reported three existing warnings and
no errors. The new pages add no image downloads or animation dependencies.

Deployment package: output/seo/yaazh360-seo-dist.zip (all dist contents, including
.htaccess). Upload the complete package contents and use the updated hosting
configuration above. For Nginx, merge the current deploy/nginx-seo.conf; the new
routes must serve their own HTML. This workspace update has not been published
to the live host. After publishing, inspect the three URLs in Search Console and
request indexing. The existing submitted sitemap URL stays the same.

Google Business Profile changes, customer review requests and external links
require the corresponding account or real business activity and have not been
performed by this source-code update. First-place rankings are not guaranteed.
