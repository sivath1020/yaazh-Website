import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import vibhuLogo from '../assets/Work/clients/vibhu-travel-logo.webp';
import { VIBHU_WEBSITE_URL, vibhuSoftware } from '../lib/vibhuSoftware';

export function VibhuSoftwarePage() {
  return (
    <div className="min-h-screen bg-[#e8e7e2] pt-[76px] text-[#131615]">
      <div className="mx-4 max-w-[1320px] pb-10 pt-3 sm:mx-auto sm:w-[90%] sm:pb-16 sm:pt-10">
        <a href="/work" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4 sm:min-h-0">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Work
        </a>

        <div className="mt-3 flex flex-col items-start gap-4 rounded-2xl bg-[#141517] p-5 text-white sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:p-10">
          <img src={vibhuLogo} alt="Vibhu Travel Hub logo" width={1254} height={1254} className="h-16 w-16 shrink-0 object-contain sm:h-28 sm:w-28" />
          <div className="min-w-0 sm:flex-1 sm:basis-64">
            <h1 className="text-[clamp(1.5rem,7vw,1.875rem)] font-bold leading-tight tracking-tight sm:text-5xl">Software for Vibhu Travel Hub</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#e8e7e2] sm:text-base">
              Custom accounting tools for tracking trips, income, expenses and fuel across Vibhu’s bus and lorry fleets.
            </p>
          </div>
          <a
            href={VIBHU_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#131615] hover:bg-[#f9e2da] sm:min-h-0 sm:w-auto"
          >
            Visit Site <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-5 grid grid-cols-1 items-start gap-4 sm:mt-6 sm:gap-5 md:grid-cols-2">
          {vibhuSoftware.map(software => (
            <article key={software.id} className="overflow-hidden rounded-2xl bg-white">
              <a href={software.src} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4">
                <img src={software.src} alt={`${software.alt}. Open full-size screenshot in a new tab.`} width={1536} height={1024} className="block h-auto w-full" loading="lazy" decoding="async" />
              </a>
              <div className="p-5 sm:p-6">
                <h2 className="text-xl font-bold tracking-tight">{software.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#434843]">{software.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
