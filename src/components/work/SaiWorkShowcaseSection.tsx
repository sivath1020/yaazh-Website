import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Asterisk, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './SaiWorkShowcaseSection.css';

// Client Logos
import aspireHolidaysLogo from '../../assets/Work/clients/aspire-holidays-logo.webp';
import vibhuTravelLogo from '../../assets/Work/clients/vibhu-travel-logo.webp';
import aspireChitfundLogo from '../../assets/Work/clients/aspire-chitfund-logo.webp';
import { VIBHU_SOFTWARE_PATH, VIBHU_WEBSITE_URL, vibhuSoftware } from '../../lib/vibhuSoftware';

// Real client creative assets from 'Works Product'
import imgVibhuFleet from '../../assets/Works Product/optimized/IMG_4118.webp';
import imgOsaka from '../../assets/Works Product/optimized/IMG_4186.webp';
import imgUniversalStudios from '../../assets/Works Product/optimized/IMG_4188.webp';
import imgMaxtersPistachio from '../../assets/Works Product/optimized/IMG_4309.webp';
import imgMaxtersBelgian from '../../assets/Works Product/optimized/IMG_4310.webp';
import imgMaxtersStrawberry from '../../assets/Works Product/optimized/IMG_4311.webp';
import imgMaxtersTiramisu from '../../assets/Works Product/optimized/IMG_4312.webp';
import imgMaxtersBerry from '../../assets/Works Product/optimized/IMG_4313.webp';
import imgMaxtersCaramel from '../../assets/Works Product/optimized/IMG_4314.webp';
import imgMaxtersNutella from '../../assets/Works Product/optimized/IMG_4315.webp';
import imgMaxtersBiscoff from '../../assets/Works Product/optimized/IMG_4316.webp';
import imgEurope from '../../assets/Works Product/optimized/IMG_4394.webp';
import imgBali from '../../assets/Works Product/optimized/IMG_4400.webp';
import imgSingapore from '../../assets/Works Product/optimized/IMG_4401.webp';
import imgLadakh from '../../assets/Works Product/optimized/IMG_4407.webp';
import imgAnniversary from '../../assets/Works Product/optimized/IMG_4480.webp';
import imgJapan from '../../assets/Works Product/optimized/IMG_4494.webp';
import imgMalaysia from '../../assets/Works Product/optimized/IMG_4500.webp';
import imgVibhuOnam from '../../assets/Works Product/optimized/IMG_5395.webp';
import imgMaxtersLogo from '../../assets/Works Product/optimized/IMG_5518.webp';

export interface RollingImageItem {
  src: string;
  alt: string;
  title: string;
  description?: string;
}

export interface MainProjectItem {
  id: string;
  client: string;
  services: string;
  description: string;
  websiteUrl?: string;
  caseStudyPath?: string;
  softwarePath?: string;
  logo?: string;
  artworkTone: 'holiday' | 'travel' | 'finance' | 'cafe';
  images: RollingImageItem[];
}

export const mainProjects: MainProjectItem[] = [
  {
    id: 'aspire-holidays',
    client: 'Aspire Holidays',
    services: 'Digital Marketing · Custom CRM · HRMS · Performance Ads · Itinerary Design · Meta Campaigns',
    description: 'We built custom CRM, HRMS, document management and tour software for Aspire Holidays. We also design tour flyers and run travel campaigns for destinations including Japan, Singapore, Bali, and Europe.',
    websiteUrl: 'https://aspireholidays.in',
    caseStudyPath: '/work/aspire-holidays',
    logo: aspireHolidaysLogo,
    artworkTone: 'holiday',
    images: [
      { src: imgJapan, alt: 'Aspire Holidays Japan Luxury Tour', title: 'Japan Luxury Tour' },
      { src: imgUniversalStudios, alt: 'Aspire Holidays Universal Studios Japan', title: 'Universal Studios Japan' },
      { src: imgOsaka, alt: 'Aspire Holidays bullet train to Osaka tour poster', title: 'Osaka Tour Campaign' },
      { src: imgSingapore, alt: 'Aspire Holidays Singapore Cultural Discovery', title: 'Singapore Package' },
      { src: imgLadakh, alt: 'Aspire Holidays Leh Ladakh Adventure', title: 'Leh Ladakh Bike Tour' },
      { src: imgBali, alt: 'Aspire Holidays Bali Tropical Getaway', title: 'Bali Tropical Escape' },
      { src: imgEurope, alt: 'Aspire Holidays Europe 10-Day Discovery', title: 'Europe 10-Day Tour' },
      { src: imgMalaysia, alt: 'Aspire Holidays Malaysia Group Departure', title: 'Malaysia Group Tour' },
      { src: imgAnniversary, alt: 'Aspire Holidays 4th Year Milestone', title: '4th Year Anniversary' },
    ],
  },
  {
    id: 'vibhu-travel',
    client: 'Vibhu Travel',
    services: 'Website · Custom Software · Fleet Branding · Social Media · Video Shoots · SEO',
    description: 'We built Vibhu Travel Hub’s website and accounting software for its bus and lorry fleets. We also created fleet branding, reels and social posts.',
    websiteUrl: VIBHU_WEBSITE_URL,
    softwarePath: VIBHU_SOFTWARE_PATH,
    logo: vibhuTravelLogo,
    artworkTone: 'travel',
    images: [
      ...vibhuSoftware,
      { src: imgVibhuFleet, alt: 'Vibhu Travel Hub Sabarimala Fleet', title: 'Sabarimala Fleet Campaign' },
      { src: imgVibhuOnam, alt: 'Vibhu Travel Hub Onam Festive Fleet', title: 'Onam Festive Fleet' },
    ],
  },
  {
    id: 'aspire-chitfund',
    client: 'Aspire Chitfund',
    services: 'Corporate Finance · Brand Identity · Lead Generation · Digital Marketing',
    description: 'We created the brand look and lead ads for Aspire Chitfund. Our campaigns help regional investors save money with confidence.',
    websiteUrl: 'https://aspirechitfunds.com/',
    logo: aspireChitfundLogo,
    artworkTone: 'finance',
    images: [
      { src: aspireChitfundLogo, alt: 'Aspire Chit Funds green and gold brand logo', title: 'Aspire Chit Funds Brand Identity' },
    ],
  },
  {
    id: 'the-maxters',
    client: 'The Maxters',
    services: 'Commercial Food Photography · 3D Typography · Packaging Art · Menu Styling',
    description: 'We designed menus, food photos, and social campaigns for Maxters Cafe. Our posts showcase delicious desserts and bring new diners through the door.',
    logo: imgMaxtersLogo,
    artworkTone: 'cafe',
    images: [
      { src: imgMaxtersPistachio, alt: 'The Maxters Dubai Pistachio Kunafa Waffle', title: 'Dubai Pistachio Kunafa Waffle' },
      { src: imgMaxtersTiramisu, alt: 'The Maxters Cocoa Dusted Tiramisu Waffle', title: 'Italian Tiramisu Waffle' },
      { src: imgMaxtersLogo, alt: 'The Maxters Where Waffles Go Wild 3D Emblem', title: '3D Brand Emblem' },
      { src: imgMaxtersStrawberry, alt: 'The Maxters Gourmet Strawberry Waffle', title: 'Strawberry Delight Waffle' },
      { src: imgMaxtersBelgian, alt: 'The Maxters Belgian Chocolate Waffle', title: 'Belgian Chocolate Waffle' },
      { src: imgMaxtersBerry, alt: 'The Maxters Berry Blitz Waffle', title: 'Berry Blitz Special' },
      { src: imgMaxtersCaramel, alt: 'The Maxters Crunchy Caramel Waffle', title: 'Crunchy Caramel Waffle' },
      { src: imgMaxtersNutella, alt: 'The Maxters Nutella Almond Waffle', title: 'Nutella Almond Waffle' },
      { src: imgMaxtersBiscoff, alt: 'The Maxters Lotus Biscoff Waffle', title: 'Lotus Biscoff Waffle' },
    ],
  },
];

function ProjectArtwork({ project }: { project: MainProjectItem }) {
  return (
    <div
      className="work-client-artwork"
      data-tone={project.artworkTone}
      data-has-logo={Boolean(project.logo)}
      aria-hidden="true"
    >
      {project.logo ? (
        <img
          className="work-client-artwork__logo"
          src={project.logo}
          alt={`${project.client} logo`}
          loading="lazy"
          decoding="async" title={`${project.client} logo`} width={200} height={80}
        />
      ) : (
        <>
          <Asterisk className="work-client-artwork__mark" strokeWidth={1} />
          <strong>{project.client}</strong>
        </>
      )}
      <span className="work-client-artwork__service">{project.services.split(' · ')[0]}</span>
    </div>
  );
}

/**
 * RollingImageCard:
 * Handles the image container where ONLY the images roll smoothly inside the container.
 * Image fits 100% uncropped with ambient backdrop, and auto-rolls with pause on hover.
 */
function RollingImageCard({
  project,
  index,
  onOpenLightbox,
}: {
  project: MainProjectItem;
  index: number;
  onOpenLightbox: (project: MainProjectItem, activeImgIndex: number) => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const count = project.images.length;

  useEffect(() => {
    if (isHovered || count <= 1) return;
    // Stagger roll intervals slightly across cards so they roll naturally
    const intervalTime = 3200 + (index % 4) * 400;
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % count);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isHovered, count, index]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx(prev => (prev - 1 + count) % count);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx(prev => (prev + 1) % count);
  };

  return (
    <article className="work-project-card" key={project.id}>
      <div className="work-project-card__reveal">
        {/* Rolling Image Box */}
        <div
          className="work-project-card__image-container"
          data-tone={project.artworkTone}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onOpenLightbox(project, currentIdx)}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenLightbox(project, currentIdx);
            }
          }}
          aria-label={`View ${project.client} showcase`}
        >
          {/* Seamless Crossfade Rolling Slides */}
          <div className="work-rolling-track">
            {project.images.map((img, i) => (
              <div
                key={img.src}
                className={`work-rolling-slide ${i === currentIdx ? 'is-active' : ''}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  title={img.alt}
                  className="work-rolling-fg"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  width={1536}
                  height={1024}
                />
              </div>
            ))}
          </div>

          {/* Manual Hover Roll Controls */}
          {count > 1 && (
            <>
              <button
                type="button"
                className="work-rolling-nav work-rolling-nav--prev"
                onClick={handlePrev}
                aria-label="Previous artwork"
              >
                ‹
              </button>
              <button
                type="button"
                className="work-rolling-nav work-rolling-nav--next"
                onClick={handleNext}
                aria-label="Next artwork"
              >
                ›
              </button>
            </>
          )}

          {/* Bottom Dot Indicators */}
          {count > 1 && (
            <div className="work-rolling-dots" onClick={e => e.stopPropagation()}>
              {project.images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`work-rolling-dot ${dotIdx === currentIdx ? 'is-active' : ''}`}
                  onClick={() => setCurrentIdx(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}

          {/* View showcase button */}
          <span className="work-project-card__open" aria-hidden="true">
            <ArrowUpRight size={22} />
          </span>
          <span className="work-project-card__visit">VIEW SHOWCASE</span>
        </div>

        {/* Stable Client Caption & Scope Tags below container */}
        <div className="work-project-card__caption">
          <h3>{project.client}</h3>
          <span>{project.services.split(' · ')[0]}</span>
        </div>

        <ul className="work-project-card__services" aria-label={`${project.client} services`}>
          {project.services.split(' · ').map(service => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function SaiWorkShowcaseSection({
  onOpenContact,
}: {
  onOpenContact?: (service?: string) => void;
}) {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(mainProjects[0].id);
  const [lightboxData, setLightboxData] = useState<{
    project: MainProjectItem;
    activeImgIndex: number;
  } | null>(null);

  const selected = mainProjects.find(project => project.id === activeProject)!;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxData(null);
    };
    if (lightboxData) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxData]);

  useEffect(() => {
    const root = portfolioRef.current;
    if (!root) return;
    const elements = root.querySelectorAll<HTMLElement>('[data-work-reveal]');
    elements.forEach(element => element.classList.add('is-revealed'));
  }, []);

  const handleOpenLightbox = (project: MainProjectItem, activeImgIndex: number) => {
    setLightboxData({ project, activeImgIndex });
  };

  const handleLightboxNext = () => {
    if (!lightboxData) return;
    const count = lightboxData.project.images.length;
    setLightboxData({
      ...lightboxData,
      activeImgIndex: (lightboxData.activeImgIndex + 1) % count,
    });
  };

  const handleLightboxPrev = () => {
    if (!lightboxData) return;
    const count = lightboxData.project.images.length;
    setLightboxData({
      ...lightboxData,
      activeImgIndex: (lightboxData.activeImgIndex - 1 + count) % count,
    });
  };

  return (
    <div className="work-portfolio" ref={portfolioRef}>
      {/* ══════════════════════════════════════════════════════════════
          HERO STATEMENT & WORDMARK
          ══════════════════════════════════════════════════════════════ */}
      <section className="work-intro" aria-labelledby="work-title">
        <div className="work-intro__statement" data-work-reveal>
          <p>
            Good ideas.
            <br />
            Great execution.
          </p>
          <div>
            <p>
              We turn ambitious ideas into digital experiences that feel right, work beautifully,
              and move businesses forward.
            </p>
            <a href="#selected-work">
              Explore our projects <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="work-intro__wordmark">
          <h1 id="work-title">
            <span className="work-title-mask">
              <span className="work-title-text">
                work<span className="work-title-dot" aria-hidden="true">.</span>
              </span>
            </span>
          </h1>
          <Asterisk className="work-intro__asterisk" strokeWidth={1.2} aria-hidden="true" />
        </div>
        <div className="work-intro__caption">
          <span>STRATEGY. DESIGN. DEVELOPMENT.</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1: DIFFERENT BUSINESSES. SAME AMBITION.
          ══════════════════════════════════════════════════════════════ */}
      <section className="work-featured" aria-labelledby="featured-title">
        <div className="work-section-heading" data-work-reveal>
          <h2 id="featured-title">
            Different businesses.
            <br />
            Same ambition.
          </h2>
          <span className="work-featured__hint">Open a project or use + for details</span>
        </div>
        <div className="work-project-panels">
          {mainProjects.map((project, index) => {
            const active = activeProject === project.id;
            const destination = project.softwarePath ? undefined : project.caseStudyPath ?? project.websiteUrl;
            const opensNewTab = !project.caseStudyPath && Boolean(project.websiteUrl);
            const siteUrl = project.caseStudyPath ? undefined : project.websiteUrl;
            const softwareUrl = project.softwarePath ?? project.caseStudyPath;
            const hasPanelActions = Boolean(siteUrl || softwareUrl);
            const panelLabel = (
              <>
                <span className="work-project-panel__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="work-project-panel__label">
                  <strong>{project.client}</strong>
                  <span>{project.services}</span>
                </span>
              </>
            );
            return (
              <article
                key={project.id}
                className={`work-project-panel ${project.logo ? 'work-project-panel--logo' : ''} ${hasPanelActions ? 'work-project-panel--actions' : ''} ${
                  active ? 'is-active' : ''
                }`}
                onPointerMove={event => {
                  if (!active && event.pointerType === 'mouse') setActiveProject(project.id);
                }}
              >
                <ProjectArtwork project={project} />
                {destination ? (
                  <>
                    <a
                      href={destination}
                      className="work-project-panel__select"
                      target={opensNewTab ? '_blank' : undefined}
                      rel={opensNewTab ? 'noopener noreferrer' : undefined}
                      aria-label={opensNewTab
                        ? `Visit ${project.client} website (opens in a new tab)`
                        : `View ${project.client} case study`}
                    >
                      {panelLabel}
                      <ArrowUpRight className="work-project-panel__link-icon" size={20} aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      className="work-project-panel__details"
                      aria-pressed={active}
                      aria-label={`Show ${project.client} project details`}
                      aria-controls="featured-project-detail"
                      onClick={() => setActiveProject(project.id)}
                    >
                      <Plus size={20} aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="work-project-panel__select"
                    aria-pressed={active}
                    aria-label={project.softwarePath ? `Show ${project.client} project details` : `Feature ${project.client}`}
                    onClick={() => setActiveProject(project.id)}
                    aria-controls="featured-project-detail"
                  >
                    {panelLabel}
                    <span className="work-project-panel__plus" aria-hidden="true">
                      <Plus size={20} />
                    </span>
                  </button>
                )}
                {active && hasPanelActions && (
                  <div className="work-project-panel__actions">
                    {siteUrl && (
                      <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                        Visit Site <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    )}
                    {softwareUrl && (
                      <a href={softwareUrl}>
                        Visit Software <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <div
          className="work-featured-detail"
          id="featured-project-detail"
          aria-live="polite"
          aria-atomic="true"
        >
          <div key={`${selected.id}-title`} className="work-detail-enter">
            <span className="work-eyebrow">THE PROJECT</span>
            <h3>{selected.client}</h3>
          </div>
          <p key={`${selected.id}-description`} className="work-detail-enter">
            {selected.description}
          </p>
          {!selected.caseStudyPath && !selected.softwarePath && !selected.websiteUrl && (
            <button
              type="button"
              onClick={() => onOpenContact?.(`${selected.client} — similar project`)}
            >
              Discuss similar work <ArrowUpRight size={19} aria-hidden="true" />
            </button>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2: A LITTLE BOLD. A LOT OF PURPOSE.
          (ONLY THE FOUR MAIN CLIENTS - ONLY THE IMAGE ROLLS INSIDE THE CONTAINER)
          ══════════════════════════════════════════════════════════════ */}
      <section className="work-collection" id="selected-work" aria-labelledby="collection-title">
        <div className="work-collection__header" data-work-reveal>
          <div>
            <h3 id="collection-title">
              A little bold.
              <br />
              A lot of purpose<span>.</span>
            </h3>
          </div>
          <p>
            Different challenges. Distinct identities.
            <br />
            Explore the things we’ve made happen.
          </p>
        </div>

        {/* 4 Main Editorial Cards with Rolling Image Containers */}
        <div className="work-project-grid">
          {mainProjects.map((project, idx) => (
            <RollingImageCard
              key={project.id}
              project={project}
              index={idx}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>

        <div className="work-collection__end">
          <span>GOOD WORK STARTS WITH A CONVERSATION.</span>
          <Asterisk size={29} aria-hidden="true" />
          <span>YOUR PROJECT COULD BE NEXT.</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          INTERACTIVE LIGHTBOX SHOWCASE MODAL
          ══════════════════════════════════════════════════════════════ */}
      {lightboxData && (
        <div
          className="work-lightbox-overlay"
          onClick={() => setLightboxData(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxData.project.client} showcase details`}
        >
          <div className="work-lightbox-modal" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="work-lightbox-close"
              onClick={() => setLightboxData(null)}
              aria-label="Close project showcase"
            >
              <X size={20} />
            </button>

            <div className="work-lightbox-media">
              <img
                src={lightboxData.project.images[lightboxData.activeImgIndex]?.src}
                alt={lightboxData.project.images[lightboxData.activeImgIndex]?.alt}
                title={lightboxData.project.images[lightboxData.activeImgIndex]?.title || lightboxData.project.client}
                width={1200}
                height={800}
              />

              {lightboxData.project.images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="work-rolling-nav work-rolling-nav--prev !opacity-100 !left-4"
                    onClick={handleLightboxPrev}
                    aria-label="Previous artwork"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="work-rolling-nav work-rolling-nav--next !opacity-100 !right-4"
                    onClick={handleLightboxNext}
                    aria-label="Next artwork"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <div className="work-lightbox-content">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#f07354]/20 text-[#f07354] border border-[#f07354]/30">
                    {lightboxData.project.images[lightboxData.activeImgIndex]?.title}
                  </span>
                  {lightboxData.project.logo && (
                    <img
                      src={lightboxData.project.logo}
                      alt={`${lightboxData.project.client} logo`}
                      className="h-6 w-auto object-contain opacity-80" title={`${lightboxData.project.client} logo`} width={120} height={40}
                    />
                  )}
                  <span className="text-[11px] font-medium text-[#a3bab5] ml-auto">
                    {lightboxData.activeImgIndex + 1} of {lightboxData.project.images.length}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                  {lightboxData.project.client}
                </h3>
                <p className="text-xs sm:text-sm text-[#a3bab5] leading-relaxed mb-6">
                  {lightboxData.project.images[lightboxData.activeImgIndex]?.description ?? lightboxData.project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-[11px] font-semibold text-[#8ca8a2] uppercase tracking-wider mb-2">
                    Scope of Work
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {lightboxData.project.services.split(' · ').map(svc => (
                      <span
                        key={svc}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-[#cad8d2]"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3 items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const client = lightboxData.project.client;
                    setLightboxData(null);
                    onOpenContact?.(`${client} — similar project`);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#f07354] hover:bg-[#d95d3e] text-white font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <span>Start a similar project</span>
                  <ArrowUpRight size={15} />
                </button>

                {lightboxData.project.softwarePath && (
                  <a
                    href={lightboxData.project.softwarePath}
                    className="text-xs font-semibold text-[#a3bab5] hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    Visit Software <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
                {lightboxData.project.caseStudyPath && (
                  <a
                    href={lightboxData.project.caseStudyPath}
                    className="text-xs font-semibold text-[#a3bab5] hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    View case study <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
                {lightboxData.project.websiteUrl && (
                  <a
                    href={lightboxData.project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#a3bab5] hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Visit website</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          CALL TO ACTION FOOTER
          ══════════════════════════════════════════════════════════════ */}
      <section className="work-next" aria-labelledby="next-project-title">
        <p className="work-eyebrow" data-work-reveal>
          HAVE SOMETHING IN MIND?
        </p>
        <div data-work-reveal>
          <h3 id="next-project-title">
            Let’s make
            <br />
            your next <em>big thing.</em>
          </h3>
          <button type="button" onClick={() => onOpenContact?.('New Project Inquiry')}>
            <ArrowUpRight size={40} strokeWidth={1.5} aria-hidden="true" />
            <span>Start a project</span>
          </button>
        </div>
        <p data-work-reveal>Bring the idea. We’ll bring the 360° perspective.</p>
      </section>
    </div>
  );
}

export default SaiWorkShowcaseSection;
