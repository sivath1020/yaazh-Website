export const SERVICE_PAGES = {
  '/digital-marketing-company-coimbatore': {
    name: 'Digital Marketing',
    heading: 'Digital Marketing Company in Coimbatore',
    description: 'Grow your business with Yaazh 360 Digitech in Coimbatore. We run Google Ads, local SEO, and social media campaigns that drive real sales.',
    intro: 'Yaazh 360 Digitech offers digital marketing services in Coimbatore, including search ads, social media marketing, and local SEO. We plan campaigns around your customers and sales goals.',
    offerings: [
      ['SEO Services in Coimbatore', 'Our search engine optimization and local SEO work covers site speed, page titles, internal links, and the searches customers use to find your business.'],
      ['Google Ads and Meta Ads Agency in Coimbatore', 'If you need an ads agency in Coimbatore, we can plan and manage Google Search, Facebook, and Instagram campaigns. We build landing pages that make it easy to call or enquire, and you set the budget before we launch.'],
      ['Programmatic Advertising in Coimbatore', 'We plan programmatic campaigns around the audience you want to reach, the placements you want to use, and your media budget.'],
      ['Lead Generation Services in Coimbatore', 'We combine paid campaigns and landing pages to generate enquiries. We agree on what counts as a qualified lead before tracking results.'],
      ['Social Media Marketing Agency in Coimbatore', 'We plan Instagram and Facebook content, design branded graphics, and write captions. We choose channels based on where your customers spend their time.'],
      ['Google Business Profile Optimization in Coimbatore', 'We help you keep your Google Business Profile, formerly called Google My Business, up to date so customers can find your hours, phone number, and services on Maps.'],
      ['Graphic Design and Branding Services in Coimbatore', 'We design logos, social graphics, marketing materials, and campaign creatives that carry your brand identity across websites, social channels, and print.'],
      ['Brochure Design Services in Coimbatore', 'We design company profiles, product brochures, lookbooks, and menus for print and digital use.'],
      ['Commercial Photography and Video Production in Coimbatore', 'We photograph products, food, and business spaces. We also produce product videos, brand films, and short social videos for websites and campaigns.'],
    ],
    process: ['We discuss your buyers, services, and ad budget.', 'We pick the best ad tools and write your campaign copy.', 'We review results each week and help you get more leads.'],
    faqs: [
      ['Can you guarantee the first position on Google?', 'No team can promise spot one on Google. Google picks top spots on its own. Good SEO helps your site rank higher and stay visible over time.'],
      ['How much does digital marketing cost?', 'Cost depends on your ad spend, content needs, and chosen apps. Send a quick note through our contact page to get a clear quote.'],
    ],
  },
  '/website-development-coimbatore': {
    name: 'Website Development',
    heading: 'Website Development Company in Coimbatore',
    description: 'Build fast websites, online shops, and web apps with Yaazh 360 Digitech in Coimbatore. Clean design, mobile ready, and easy to use.',
    intro: 'Your website is your best salesperson. Yaazh 360 Digitech builds clean business sites, online shops, and web tools for teams in Coimbatore and beyond.',
    offerings: [
      ['Website and Ecommerce Development in Coimbatore', 'We build static and dynamic business websites. For online stores, we set up product listings, shopping carts, payments, and order tracking.'],
      ['UI/UX Design Services in Coimbatore', 'We map user journeys and build wireframes and prototypes so you can review how a website or app will work before development.'],
      ['Responsive design and performance', 'Make your site look sharp on phones, tablets, and laptops. We compress images and speed up code so pages load in a snap.'],
      ['Search-friendly foundations', 'We add clean page titles, fast sitemaps, and good tags. These steps help Google read your site and show it to nearby buyers.'],
    ],
    process: ['We map your pages, customer steps, and required tools.', 'We design each page and review mockups with your team.', 'We test forms on phones and laptops before site launch.'],
    faqs: [
      ['Can you redesign an existing website?', 'Yes. Share your current web link and what you want to improve. We can refresh the design, fix mobile issues, and add new pages.'],
      ['Will my new website automatically rank first?', 'No site ranks top overnight. A clean site gives you a strong start. Good blog posts and ongoing SEO keep your site rising.'],
      ['What do you need to quote for a website?', 'Tell us about your pages, ideal design style, and needed features. For online shops, share your rough product count and payment choice.'],
    ],
  },
  '/software-development-coimbatore': {
    name: 'Software Development',
    heading: 'Software Development Company in Coimbatore',
    description: 'Custom software, CRM portals, and mobile apps by Yaazh 360 Digitech in Coimbatore. Built for your team and workflow.',
    intro: 'Yaazh 360 Digitech is a software company in Coimbatore. We plan, build, and test custom software, web portals, and mobile apps around the way your team works.',
    offerings: [
      ['Custom Software and ERP Development in Coimbatore', 'We build software for staff access, data entry, and report exports. Our ERP work connects sales, inventory, billing, and approval workflows. We can migrate existing spreadsheet data into the new application.'],
      ['Web App Development in Coimbatore', 'We build web apps, CRM portals, and private dashboards for staff, customers, and vendors, with access suited to each role.'],
      ['Mobile App Development in Coimbatore', 'We develop Android, iOS, and hybrid apps. We can help you decide whether your project calls for native apps or a shared codebase.'],
    ],
    process: ['We note down your team flow, user logins, and key tasks.', 'We build each feature in small steps and demo them live.', 'We test user roles, train your team, and deploy your code.'],
    faqs: [
      ['Should I choose custom software or an existing product?', 'Ready apps work well for basic needs. Custom software is best when ready apps lack the exact tools, reports, or flow your team needs.'],
      ['Can software connect to our existing systems?', 'Yes, if your current tools have an open API or export files. Share what you use now so we can check links and plan the bridge.'],
      ['How are cost and delivery time decided?', 'Cost and dates depend on feature counts, user roles, and data moves. We outline the full scope first so you get a clear flat quote.'],
    ],
  },
} as const;

export type ServicePath = keyof typeof SERVICE_PAGES;
export function isServicePath(path: string): path is ServicePath {
  return Object.hasOwn(SERVICE_PAGES, path);
}
