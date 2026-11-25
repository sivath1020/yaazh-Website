import { SERVICE_PAGES, isServicePath } from './servicePages.ts';

export const SITE_URL = 'https://yaazh360digitech.in';
export const BUSINESS_NAME = 'Yaazh 360 Digitech';
export const SOCIAL_IMAGE = `${SITE_URL}/seo/yaazh360-social.png`;

export const SEO_PAGES = {
  '/': {
    title: 'Yaazh 360 Digitech | Digital & Software Coimbatore',
    description: 'Yaazh 360 Digitech is a digital marketing and software company in Coimbatore providing SEO, Google Ads, custom websites and mobile apps.',
    keywords: 'Yaazh 360, Yaazh 360 Digitech, Yaazh360, digital marketing company in Coimbatore, software company in Coimbatore, SEO agency Coimbatore, Google Ads agency Coimbatore, web development Coimbatore, mobile app development Coimbatore, ERP software Coimbatore',
    label: 'Home',
    priority: '1.0',
    changefreq: 'weekly',
  },
  '/services': {
    title: 'Digital Marketing & Software Services | Yaazh 360 Digitech',
    description: 'Explore digital marketing, SEO, Google Ads, social media, websites, mobile apps and custom software services from Yaazh 360 Digitech in Coimbatore.',
    keywords: 'digital marketing services Coimbatore, custom software development, SEO services Coimbatore, social media management, Google business profile optimization, web app development, React development, enterprise ERP',
    label: 'Services',
    priority: '0.9',
    changefreq: 'weekly',
  },
  '/digital-marketing-company-coimbatore': {
    title: 'Digital Marketing Company in Coimbatore | Yaazh 360 Digitech',
    description: 'Compare digital marketing services in Coimbatore. Explore local SEO, Google Ads and social media, and see examples of Yaazh 360 Digitech’s client work.',
    keywords: 'digital marketing company in Coimbatore, SEO services, Google Ads, social media marketing',
    label: SERVICE_PAGES['/digital-marketing-company-coimbatore'].name,
    priority: '0.9',
    changefreq: 'monthly',
  },
  '/website-development-coimbatore': {
    title: 'Website Development in Coimbatore | Yaazh 360 Digitech',
    description: 'Explore business website, ecommerce and web app development from Yaazh 360 in Coimbatore, with responsive layouts and SEO-friendly structure.',
    keywords: 'website development Coimbatore, web design, ecommerce development',
    label: SERVICE_PAGES['/website-development-coimbatore'].name,
    priority: '0.9',
    changefreq: 'monthly',
  },
  '/software-development-coimbatore': {
    title: 'Software Development in Coimbatore | Yaazh 360 Digitech',
    description: 'Discuss custom software, ERP systems, web portals and mobile applications with Yaazh 360 Digitech, a software development team in Coimbatore.',
    keywords: 'software development company Coimbatore, custom software, ERP development',
    label: SERVICE_PAGES['/software-development-coimbatore'].name,
    priority: '0.9',
    changefreq: 'monthly',
  },
  '/about': {
    title: 'About Yaazh 360 Digitech | Digital & Software Team',
    description: 'Meet Yaazh 360 Digitech, a Coimbatore team bringing digital marketing, design and software development together to help businesses build and grow online.',
    keywords: 'about Yaazh 360 Digitech, digital agency team Coimbatore, software engineers Coimbatore, tech marketing consultancy',
    label: 'About Us',
    priority: '0.8',
    changefreq: 'monthly',
  },
  '/work': {
    title: 'Our Work | Digital Marketing & Web Projects | Yaazh 360',
    description: 'Explore Yaazh 360 Digitech projects across digital marketing, websites, social media, branding and photography for businesses in Coimbatore and beyond.',
    keywords: 'Yaazh 360 portfolio, digital marketing case studies, web development projects, client showcase Coimbatore, marketing campaign results',
    label: 'Our Work',
    priority: '0.8',
    changefreq: 'monthly',
  },
  '/work/aspire-holidays': {
    title: 'Aspire Holidays CRM & HRMS Case Study | Yaazh 360',
    description: 'See how Yaazh 360 Digitech built CRM, HRMS, document management and tour software for Aspire Holidays.',
    keywords: 'Aspire Holidays, custom CRM, custom HRMS, travel agency CRM, document management, tour software, custom software case study',
    label: 'Aspire Holidays',
    priority: '0.7',
    changefreq: 'monthly',
  },
  '/work/vibhu-travel': {
    title: 'Vibhu Travel Hub Software Case Study | Yaazh 360',
    description: 'Explore the bus and lorry accounting software built for Vibhu Travel Hub by Yaazh 360 Digitech.',
    keywords: 'Vibhu Travel Hub, fleet accounting software, bus accounts, lorry accounts',
    label: 'Vibhu Travel Hub',
    priority: '0.7',
    changefreq: 'monthly',
  },
  '/contact': {
    title: 'Contact Us | Yaazh 360 Digitech Coimbatore',
    description: 'Get in touch with Yaazh 360 Digitech in Peelamedu, Coimbatore for digital marketing, website and custom software projects. Call +91 90470 44440.',
    keywords: 'contact Yaazh 360, digital marketing enquiry Coimbatore, hire software developers Peelamedu, free marketing audit Coimbatore',
    label: 'Contact Us',
    priority: '0.8',
    changefreq: 'monthly',
  },
  '/careers': {
    title: 'Careers in Marketing & Software | Yaazh 360 Digitech',
    description: 'Explore digital marketing and software development opportunities at Yaazh 360 Digitech in Peelamedu, Coimbatore. View current roles and apply online.',
    keywords: 'digital marketing jobs Coimbatore, software developer careers Peelamedu, internships Coimbatore, tech jobs Coimbatore',
    label: 'Careers',
    priority: '0.7',
    changefreq: 'weekly',
  },
} as const;

export type SeoPath = keyof typeof SEO_PAGES;
export const ROUTE_ALIASES: Record<string, SeoPath> = { '/brochure': '/services', '/brochures': '/services', '/index.html': '/' };

export function normalizePath(path: string): string {
  const normalized = path.replace(/\/+$/, '') || '/';
  return ROUTE_ALIASES[normalized] || normalized;
}

export function isSeoPath(path: string): path is SeoPath {
  return Object.hasOwn(SEO_PAGES, path);
}

export function getSeo(pathname: string) {
  const path = normalizePath(pathname);
  const known = isSeoPath(path);
  return {
    ...(known
      ? SEO_PAGES[path]
      : {
          title: 'Page Not Found | Yaazh 360 Digitech',
          description: 'This page could not be found. Explore Yaazh 360 Digitech services or contact our team in Coimbatore.',
          keywords: '404 not found, Yaazh 360 Digitech',
          label: 'Page Not Found',
          priority: '0.1',
          changefreq: 'never',
        }),
    path,
    canonical: known ? `${SITE_URL}${path === '/' ? '/' : path}` : undefined,
    robots: known ? 'index, follow, max-image-preview:large' : 'noindex, follow',
  };
}

export function getStructuredData(pathname: string) {
  const page = getSeo(pathname);
  if (!page.canonical) return { '@context': 'https://schema.org', '@graph': [] };
  const businessId = `${SITE_URL}/#business`;
  const websiteId = `${SITE_URL}/#website`;
  const services = [
    'Digital Marketing',
    'Search Engine Optimization',
    'Google Ads',
    'Social Media Management',
    'Website Development',
    'Ecommerce Development',
    'Mobile App Development',
    'Custom Software Development',
    'ERP Solutions',
    'Graphic Design',
  ];

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'ProfessionalService',
      '@id': businessId,
      name: BUSINESS_NAME,
      alternateName: ['Yaazh360', 'Yaazh 360', 'Yaazh360 Digitech'],
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/favicon-512x512.png`,
      image: SOCIAL_IMAGE,
      description: SEO_PAGES['/'].description,
      telephone: '+919047044440',
      email: 'yaazh360digitech@gmail.com',
      sameAs: [
        'https://www.instagram.com/yaazh360digitech?utm_source=ig_web_button_share_sheet&evlk=ZDNlZDc0MzIxNw==',
        'https://www.facebook.com/share/1FtMZopZtX/?mibextid=wwXIfr',
        'https://www.linkedin.com/company/yaazh-360-digitech/',
      ],
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer, UPI',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Peelamedu, Avinashi Road',
        addressLocality: 'Coimbatore',
        addressRegion: 'Tamil Nadu',
        postalCode: '641014',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 11.0287,
        longitude: 77.0035,
      },
      hasMap: 'https://maps.google.com/?q=Peelamedu,+Avinashi+Road,+Coimbatore,+Tamil+Nadu+641014',
      areaServed: [
        { '@type': 'City', name: 'Coimbatore' },
        { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+919047044440',
        contactType: 'customer service',
        email: 'yaazh360digitech@gmail.com',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil'],
      },
      knowsAbout: [
        'Digital Marketing',
        'Search Engine Optimization (SEO)',
        'Google Ads & Performance Marketing',
        'Social Media Management',
        'Custom Software Engineering',
        'ERP Development',
        'Website Design & Development',
        'Mobile App Development',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Marketing & Software Services',
        itemListElement: services.map((name) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name,
            url: `${SITE_URL}/services`,
            provider: { '@id': businessId },
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_URL}/`,
      name: BUSINESS_NAME,
      alternateName: 'Yaazh360',
      inLanguage: 'en-IN',
      publisher: { '@id': businessId },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/services?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      hasPart: [
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/services#webpage`,
          name: 'Services',
          url: `${SITE_URL}/services`,
          description: SEO_PAGES['/services'].description,
        },
        {
          '@type': 'AboutPage',
          '@id': `${SITE_URL}/about#webpage`,
          name: 'About Us',
          url: `${SITE_URL}/about`,
          description: SEO_PAGES['/about'].description,
        },
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/work#webpage`,
          name: 'Our Work',
          url: `${SITE_URL}/work`,
          description: SEO_PAGES['/work'].description,
        },
        {
          '@type': 'ContactPage',
          '@id': `${SITE_URL}/contact#webpage`,
          name: 'Contact Us',
          url: `${SITE_URL}/contact`,
          description: 'Get in touch with Yaazh 360 Digitech in Peelamedu, Coimbatore for digital marketing, website and custom software projects. Call +91 90470 44440.',
        },
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/careers#webpage`,
          name: 'Careers',
          url: `${SITE_URL}/careers`,
          description: SEO_PAGES['/careers'].description,
        },
      ],
    },
    {
      '@type': page.path === '/about' ? 'AboutPage' : page.path === '/contact' ? 'ContactPage' : 'WebPage',
      '@id': `${page.canonical}#webpage`,
      url: page.canonical,
      name: page.title,
      description: page.description,
      inLanguage: 'en-IN',
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
      ...(page.path === '/' ? {} : { breadcrumb: { '@id': `${page.canonical}#breadcrumb` } }),
    },
  ];

  if (isServicePath(page.path)) {
    const service = SERVICE_PAGES[page.path];
    graph.push({
      '@type': 'Service',
      '@id': `${page.canonical}#service`,
      name: service.heading,
      serviceType: service.name,
      description: service.description,
      url: page.canonical,
      provider: { '@id': businessId },
      areaServed: { '@type': 'City', name: 'Coimbatore' },
      mainEntityOfPage: { '@id': `${page.canonical}#webpage` },
    });
  }

  if (page.path === '/') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What digital marketing and web services does Yaazh360 provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We provide full-spectrum digital marketing, custom website and e-commerce development, mobile apps, technical SEO, and high-performance lead generation campaigns.',
          },
        },
        {
          '@type': 'Question',
          name: 'How quickly can we see measurable results from marketing campaigns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Paid campaigns can start reaching people after approval and launch. Leads depend on your budget, audience and offer. SEO improvements can take weeks or months to show an effect; rankings and results are not guaranteed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Yaazh360 build custom software, web platforms, and mobile apps?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our senior engineering team builds custom web portals, cross-platform iOS & Android mobile applications, and enterprise ERP systems tailored to your workflows.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is your 5-step development and campaign deployment process?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We follow our proven 360° methodology: 1. Meet (discovery) → 2. Plan (blueprints) → 3. Design & Dev (coding) → 4. Testing (QA checks) → 5. Launch (scaling).',
          },
        },
        {
          '@type': 'Question',
          name: 'How do we get started with Yaazh360 and receive custom pricing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply reach out through our contact form. Our strategists will audit your digital footprint and provide a tailored growth roadmap and transparent quote within 48 hours.',
          },
        },
      ],
    });

    graph.push({
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#sitelinks`,
      name: 'Key Pages',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          position: 1,
          name: 'Services',
          description: SEO_PAGES['/services'].description,
          url: `${SITE_URL}/services`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 2,
          name: 'About Us',
          description: SEO_PAGES['/about'].description,
          url: `${SITE_URL}/about`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: 'Our Work',
          description: SEO_PAGES['/work'].description,
          url: `${SITE_URL}/work`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 4,
          name: 'Contact Us',
          description: SEO_PAGES['/contact'].description,
          url: `${SITE_URL}/contact`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 5,
          name: 'Careers',
          description: SEO_PAGES['/careers'].description,
          url: `${SITE_URL}/careers`,
        },
      ],
    });
  }

  if (page.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${page.canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: page.label, item: page.canonical },
      ],
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export function renderSeoHead(pathname: string) {
  const page = getSeo(pathname);
  return `<title>${escapeHtml(page.title)}</title>
<meta name="description" content="${escapeHtml(page.description)}" />
<meta name="keywords" content="${escapeHtml(page.keywords)}" />
<meta name="author" content="Yaazh 360 Digitech" />
<meta name="google-site-verification" content="g0BkgqvrdD40dLqguJ4-1330Li8xKPWM_8tMmUFr7bU" />
<meta name="robots" content="${page.robots}" />
<meta name="geo.region" content="IN-TN" />
<meta name="geo.placename" content="Coimbatore" />
<meta name="geo.position" content="11.0287;77.0035" />
<meta name="ICBM" content="11.0287, 77.0035" />
${page.canonical ? `<link rel="canonical" href="${page.canonical}" />` : ''}
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${BUSINESS_NAME}" />
<meta property="og:locale" content="en_IN" />
<meta property="og:title" content="${escapeHtml(page.title)}" />
<meta property="og:description" content="${escapeHtml(page.description)}" />
${page.canonical ? `<meta property="og:url" content="${page.canonical}" />` : ''}
<meta property="og:image" content="${SOCIAL_IMAGE}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Yaazh 360 Digitech — Digital Marketing &amp; Software Solutions, Coimbatore" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(page.title)}" />
<meta name="twitter:description" content="${escapeHtml(page.description)}" />
<meta name="twitter:image" content="${SOCIAL_IMAGE}" />
<script id="yaazh-structured-data" type="application/ld+json">${serializeJsonLd(getStructuredData(pathname))}</script>`;
}
