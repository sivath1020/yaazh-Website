import { SERVICE_PAGES, type ServicePath } from '../lib/servicePages';

// Reuse the site's typography, colors and shared navigation without heavy media.
export function ServiceLandingPage({ path }: { path: ServicePath }) {
  const service = SERVICE_PAGES[path];
  return (
    <article className="pt-28 pb-16 px-5 sm:px-8 bg-white text-[#111111] font-josefin">
      <div className="max-w-5xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-600 mb-8 flex flex-wrap gap-2">
          <a href="/" className="underline">Home</a><span aria-hidden="true">/</span><a href="/services" className="underline">Services</a><span aria-hidden="true">/</span><span>{service.name}</span>
        </nav>
        <header className="max-w-3xl mb-12">
          <p className="text-[#0052CC] font-semibold mb-3">Yaazh 360 Digitech · Coimbatore</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">{service.heading}</h1>
          <p className="text-lg leading-relaxed text-neutral-700">{service.intro}</p>
          <a href="/contact" className="inline-block mt-7 rounded-full bg-[#0052CC] text-white px-7 py-3 font-semibold">Discuss your project</a>
        </header>
        <section aria-labelledby="service-scope" className="border-t border-neutral-200 py-10">
          <h2 id="service-scope" className="text-3xl font-bold mb-8">{service.name} solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {service.offerings.map(([title, text]) => <div key={title}><h3 className="text-xl font-semibold mb-2">{title}</h3><p className="leading-relaxed text-neutral-700">{text}</p></div>)}
          </div>
        </section>
        <section aria-labelledby="service-process" className="border-t border-neutral-200 py-10">
          <h3 id="service-process" className="text-3xl font-bold mb-6">Our {service.name.toLowerCase()} delivery roadmap</h3>
          <ol className="list-decimal pl-6 space-y-4 text-lg text-neutral-700">{service.process.map(step => <li key={step}>{step}</li>)}</ol>
          <p className="mt-6 leading-relaxed">Explore our <a href="/work" className="text-[#0052CC] underline">client project portfolio</a> and <a href="/about" className="text-[#0052CC] underline">meet our team</a> before discussing your requirements.</p>
        </section>
        {path === '/digital-marketing-company-coimbatore' && (
          <section aria-labelledby="compare-marketing-companies" className="border-t border-neutral-200 py-10">
            <h2 id="compare-marketing-companies" className="text-3xl font-bold mb-6">How to Choose the Best Digital Marketing Agency in Coimbatore</h2>
            <ul className="list-disc pl-6 space-y-3 leading-relaxed text-neutral-700">
              <li>Ask for an example of work with a similar customer journey. For local enquiries, look at how the agency connects search, landing pages, and calls or form submissions.</li>
              <li>Ask what the proposal covers each month, how much goes to ad spend, and who will have access to your ad accounts and analytics.</li>
              <li>Agree on what counts as a qualified enquiry and how the agency will report leads and cost per lead.</li>
            </ul>
            <p className="mt-6 leading-relaxed text-neutral-700">
              See examples from our portfolio, including Meta campaigns and tour creatives for Aspire Holidays and lead-generation ads for Aspire Chitfund.
            </p>
            <a href="/work#selected-work" className="inline-block mt-4 text-[#0052CC] font-semibold underline">Explore our digital marketing work</a>
          </section>
        )}
        <section aria-labelledby="service-faq" className="border-t border-neutral-200 py-10">
          <h3 id="service-faq" className="text-3xl font-bold mb-6">{service.name} FAQs</h3>
          {service.faqs.map(([question, answer]) => <details key={question} className="border-b border-neutral-200 py-5"><summary className="cursor-pointer text-lg font-semibold">{question}</summary><p className="mt-3 leading-relaxed text-neutral-700">{answer}</p></details>)}
        </section>
        <aside className="rounded-2xl bg-blue-50 p-6 sm:p-8">
          <h3 className="text-2xl font-bold mb-3">Consult our Coimbatore {service.name.toLowerCase()} team</h3>
          <p className="leading-relaxed">Share your goals, requirements and budget. Contact Yaazh 360 Digitech in Peelamedu, Avinashi Road, Coimbatore.</p>
          <a href="/contact" className="inline-block mt-4 text-[#0052CC] font-semibold underline">Request a project quote</a>
        </aside>
        <nav aria-label="Related services" className="mt-10 flex flex-wrap gap-x-6 gap-y-3">{Object.entries(SERVICE_PAGES).filter(([url]) => url !== path).map(([url, item]) => <a key={url} href={url} className="text-[#0052CC] underline">{item.name} in Coimbatore</a>)}</nav>
      </div>
    </article>
  );
}
