import { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import crmDashboard from '../assets/Work/clients/aspire-holidays-crm.webp';
import crmLeads from '../assets/Work/clients/aspire-holidays-crm-leads.webp';
import hrmsDashboard from '../assets/Work/clients/aspire-holidays-hrms.webp';
import hrmsMobileApp from '../assets/Work/clients/aspire-holidays-hrms-app.webp';
import documentManagement from '../assets/Work/clients/aspire-holidays-document-management.webp';
import tourSoftware from '../assets/Work/clients/aspire-holidays-tour-software.webp';
import heroArtwork from '../assets/Work/clients/aspire-holidays-hero-background.webp';
import './AspireHolidaysPage.css';

const crmViews = [
  { label: 'Dashboard overview', src: crmDashboard, alt: 'Purple CRM dashboard with lead metrics, charts and recent leads', width: 3250, height: 2298 },
  { label: 'Leads workspace', src: crmLeads, alt: 'Blue CRM dashboard with lead tracking, conversion charts and recent leads', width: 1600, height: 1131 },
];

const additionalSoftware = [
  {
    id: 'aspire-document-management-title',
    title: 'Document Management System',
    image: documentManagement,
    trimFrame: true,
    alt: 'Document management dashboard with upload activity, open jobs and recent activity',
    description: 'Collect employee documents through a shared upload link, track onboarding progress and review document submissions in one place.',
  },
  {
    id: 'aspire-tour-software-title',
    title: 'General Tour Software',
    image: tourSoftware,
    alt: 'Tour software dashboard with branch and tour-type filters, report status and financial charts',
    description: 'Track booked tours from first report to final report and review trip reminders and financial performance by period, branch or tour type.',
  },
];

export function AspireHolidaysPage({ onOpenContact }: { onOpenContact: (serviceName: string) => void }) {
  const [activeCrmView, setActiveCrmView] = useState(0);

  return (
    <div className="aspire-case-study">
      <section className="aspire-case-study__hero" aria-labelledby="aspire-holidays-title">
        <div className="aspire-case-study__hero-copy">
          <a href="/work" className="mb-3 flex w-fit items-center gap-2 text-sm font-semibold underline underline-offset-4">
            <ArrowLeft size={16} aria-hidden="true" /> Back to Work
          </a>
          <h1 id="aspire-holidays-title">
            Custom CRM &amp; HRMS for <span>Aspire Holidays</span>
          </h1>
          <p className="aspire-case-study__intro">
            We built custom CRM and HRMS software around Aspire Holidays’ requirements for managing customer relationships and day-to-day HR operations.
          </p>
        </div>
        <img
          className="aspire-case-study__hero-artwork"
          src={heroArtwork}
          alt=""
          width={2172}
          height={724}
          fetchPriority="high"
        />
      </section>

      <div className="aspire-case-study__content">
        <section className="aspire-case-study__dashboards" aria-labelledby="aspire-dashboards-title">
          <header className="aspire-case-study__section-intro">
            <h2 className="aspire-case-study__section-title" id="aspire-dashboards-title">CRM &amp; HRMS Dashboards</h2>
            <p>Two dashboards for managing customer enquiries and everyday HR operations.</p>
          </header>
          <section className="aspire-case-study__card aspire-case-study__card--hrms" aria-labelledby="aspire-hrms-title">
            <img
              className="aspire-case-study__dashboard-image aspire-case-study__dashboard-image--hrms aspire-case-study__preview"
              src={hrmsDashboard}
              alt="Aspire Holidays HRMS dashboard showing attendance, leave requests, payroll and recent employee activity"
              width={3250}
              height={2298}
              decoding="async"
            />
            <div className="aspire-case-study__card-copy">
              <h3 id="aspire-hrms-title">Human Resource Management System (HRMS)</h3>
              <p>A customised HRMS to manage employee information and streamline everyday HR workflows.</p>
            </div>
          </section>
          <section className="aspire-case-study__card aspire-case-study__card--crm" aria-labelledby="aspire-crm-title">
            <div id="aspire-crm-views" className="aspire-case-study__preview">
              {crmViews.map((view, index) => (
                <div key={view.label} hidden={activeCrmView !== index}>
                  <img
                    className={`aspire-case-study__dashboard-image${index === 0 ? ' aspire-case-study__dashboard-image--crm' : ''}`}
                    src={view.src}
                    alt={view.alt}
                    width={view.width}
                    height={view.height}
                    loading={index === 0 ? undefined : 'lazy'}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            <div className="aspire-case-study__card-copy">
              <h3 id="aspire-crm-title">Customer Relationship Management (CRM)</h3>
              <p>A customised CRM to organise customer enquiries, track conversations and manage follow-ups.</p>
              <div className="aspire-case-study__view-switch" role="group" aria-label="CRM dashboard views">
                {crmViews.map((view, index) => (
                  <button
                    key={view.label}
                    type="button"
                    aria-pressed={activeCrmView === index}
                    aria-controls="aspire-crm-views"
                    onClick={() => setActiveCrmView(index)}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </section>

        <section className="aspire-case-study__card aspire-case-study__card--hrms aspire-case-study__app" aria-labelledby="aspire-app-title">
          <img
            className="aspire-case-study__dashboard-image aspire-case-study__preview"
            src={hrmsMobileApp}
            alt="Three Aspire Holidays HRMS app screens showing employee sign-in, the home dashboard and attendance"
            width={1536}
            height={1024}
            loading="lazy"
            decoding="async"
          />
          <div className="aspire-case-study__card-copy">
            <h2 id="aspire-app-title">HRMS Mobile App</h2>
            <p>The Aspire Holidays HRMS app gives the team access to everyday HR tools from their phones.</p>
            <ul className="aspire-case-study__app-features">
              <li>Check in and out and review monthly attendance.</li>
              <li>Open leave, payroll and team tools from the home screen.</li>
              <li>Read announcements and see a daily attendance summary.</li>
            </ul>
          </div>
        </section>

        <section className="aspire-case-study__dashboards" aria-labelledby="aspire-software-title">
          <header className="aspire-case-study__section-intro">
            <h2 className="aspire-case-study__section-title" id="aspire-software-title">More Software for Aspire Holidays</h2>
            <p>
              Manage employee documents and onboarding.
              <br />
              Track tour bookings, reports and finances.
            </p>
          </header>
          {additionalSoftware.map((software, index) => (
            <section
              key={software.id}
              className={`aspire-case-study__card aspire-case-study__software ${index === 0 ? 'aspire-case-study__card--hrms' : 'aspire-case-study__card--crm'}`}
              aria-labelledby={software.id}
            >
              <img
                className={`aspire-case-study__dashboard-image aspire-case-study__preview${software.trimFrame ? ' aspire-case-study__dashboard-image--document' : ''}`}
                src={software.image}
                alt={software.alt}
                width={1672}
                height={941}
                loading="lazy"
                decoding="async"
              />
              <div className="aspire-case-study__card-copy">
                <h3 id={software.id}>{software.title}</h3>
                <p>{software.description}</p>
              </div>
            </section>
          ))}
        </section>

        <div className="aspire-case-study__actions">
          <button
            type="button"
            onClick={() => onOpenContact('Custom CRM & HRMS Development')}
            className="aspire-case-study__enquiry inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
          >
            Discuss a similar project <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <a
            href="https://aspireholidays.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Aspire Holidays website (opens in a new tab)"
            className="aspire-case-study__visit inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4"
          >
            Visit Aspire Holidays <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
