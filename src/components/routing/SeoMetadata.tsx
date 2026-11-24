import { useEffect } from 'react';
import { BUSINESS_NAME, getSeo, getStructuredData, serializeJsonLd, SOCIAL_IMAGE } from '../../lib/seo';

export function SeoMetadata({ path }: { path: string }) {
  useEffect(() => {
    const page = getSeo(path);
    document.title = page.title;
    const meta = (key: string, value: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attr, key); document.head.append(element); }
      element.content = value;
    };
    meta('description', page.description);
    meta('robots', page.robots);
    for (const [key, value] of Object.entries({ 'og:title': page.title, 'og:description': page.description, 'og:type': 'website', 'og:site_name': BUSINESS_NAME, 'og:locale': 'en_IN', 'og:image': SOCIAL_IMAGE })) meta(key, value, true);
    for (const [key, value] of Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': page.title, 'twitter:description': page.description, 'twitter:image': SOCIAL_IMAGE })) meta(key, value);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (page.canonical) {
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
      canonical.href = page.canonical;
      meta('og:url', page.canonical, true);
    } else {
      canonical?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    }
    let schema = document.getElementById('yaazh-structured-data');
    if (!schema) { schema = document.createElement('script'); schema.id = 'yaazh-structured-data'; schema.setAttribute('type', 'application/ld+json'); document.head.append(schema); }
    schema.textContent = serializeJsonLd(getStructuredData(path));
  }, [path]);
  return null;
}
