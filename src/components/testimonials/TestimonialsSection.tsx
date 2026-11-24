import { useEffect, useRef, useState } from 'react';
import aspireHolidaysLogo from '../../assets/Work/clients/aspire-holidays-logo.webp';
import vibhuTravelLogo from '../../assets/Work/clients/vibhu-travel-logo.webp';
import aspireChitfundLogo from '../../assets/Work/clients/aspire-chitfund-logo.webp';
import './TestimonialsSection.css';

interface TestimonialItem {
  id: string;
  service: string;
  text: string;
  name: string;
  logo?: string;
  tone?: string;
}

// Project descriptions from Work; these are not attributed client quotations.
const TESTIMONIALS: TestimonialItem[] = [
  { id: 'aspire-holidays', name: 'Aspire Holidays', service: 'Digital marketing', text: 'Digital marketing support for Aspire Holidays, focused on presenting the travel brand online and introducing its holiday offerings to people planning their next journey.', logo: aspireHolidaysLogo },
  { id: 'vibhu-travel', name: 'Vibhu Travel', service: 'Website & digital marketing', text: 'Website, digital marketing, video editing, shooting, social media marketing (SMM), and search engine optimization (SEO) for Vibhu Travel.', logo: vibhuTravelLogo, tone: 'travel' },
  { id: 'aspire-chitfund', name: 'Aspire Chitfund', service: 'Digital marketing', text: 'Digital marketing support for Aspire Chitfund, focused on clear brand communication and presenting its services online so prospective customers can learn more about the business.', logo: aspireChitfundLogo, tone: 'finance' },
  { id: 'maxters', name: 'Maxters', service: 'Café & product photography', text: 'Café and product photoshoots for Maxters, capturing the setting and product details to create visual content that introduces the brand and showcases what it offers.' },
];

export function TestimonialsSection() {
  const track = useRef<HTMLDivElement>(null);
  const cycleWidth = useRef(0);
  const interaction = useRef({ hovered: false, focused: false, dragging: false, resumeAt: 0, startX: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const measure = () => {
      const first = element.children[0] as HTMLElement;
      const next = element.children[TESTIMONIALS.length] as HTMLElement;
      const oldWidth = cycleWidth.current;
      const progress = oldWidth ? (element.scrollLeft % oldWidth) / oldWidth : 0;
      cycleWidth.current = next.offsetLeft - first.offsetLeft;
      element.scrollLeft = cycleWidth.current * (1 + progress);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    let previous = 0;
    let fraction = 0;
    const move = (time: number) => {
      const state = interaction.current;
      if (previous && track.current && !document.hidden && !state.hovered && !state.focused && !state.dragging && time > state.resumeAt) {
        fraction += Math.min(time - previous, 50) * .028;
        const pixels = Math.floor(fraction);
        if (pixels) { track.current.scrollLeft += pixels; fraction -= pixels; }
      }
      previous = time;
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  const pauseForInteraction = () => { interaction.current.resumeAt = performance.now() + 2500; };

  return <section id="testimonials" aria-label="What Our Clients Say" className="relative w-full py-16 sm:py-20 font-josefin overflow-hidden bg-white">
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ══════════════════════════════════════════════════════════════
            1. SECTION HEADER: Heading with Accents & Subtitle
            ══════════════════════════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">

          {/* Main Headline with Blue Sparks */}
          <div className="relative inline-flex items-center justify-center">
            {/* Left Angled Blue Spark Accent */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="inline-block text-[#0A65DB] -mt-5 sm:-mt-6 mr-1.5 sm:mr-2.5 shrink-0"
              aria-hidden="true"
            >
              <path
                d="M13 3L8 11"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M19 10L14 17"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111111] leading-tight">
              <span>What Our </span>
              <span className="text-[#0A65DB]">Clients Say</span>
            </h3>

            {/* Right Angled Blue Spark Accent */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="inline-block text-[#0A65DB] -mt-5 sm:-mt-6 ml-1.5 sm:ml-2.5 shrink-0"
              aria-hidden="true"
            >
              <path
                d="M11 3L16 11"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M5 10L10 17"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Subtitle */}
          <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-600 font-normal max-w-xl mx-auto leading-relaxed">
            Explore our work for these four brands.
          </p>
        </div>


      <div
        ref={track}
        className="testimonial-loop"
        role="region"
        aria-label="Client projects. Swipe, drag, or use the left and right arrow keys to browse."
        aria-roledescription="carousel"
        tabIndex={0}
        data-lenis-prevent=""
        onScroll={() => {
          const element = track.current;
          const width = cycleWidth.current;
          if (!element || !width) return;
          if (element.scrollLeft < width * .5) element.scrollLeft += width;
          else if (element.scrollLeft >= width * 1.5) element.scrollLeft -= width;
        }}
        onMouseEnter={() => { interaction.current.hovered = true; }}
        onMouseLeave={() => { interaction.current.hovered = false; }}
        onFocus={() => { interaction.current.focused = true; }}
        onBlur={() => { interaction.current.focused = false; }}
        onWheel={pauseForInteraction}
        onTouchStart={pauseForInteraction}
        onTouchEnd={pauseForInteraction}
        onPointerDown={event => {
          if (event.pointerType !== 'mouse' || event.button !== 0) return;
          const element = event.currentTarget;
          Object.assign(interaction.current, { dragging: true, startX: event.clientX });
          element.setPointerCapture(event.pointerId);
          event.preventDefault();
        }}
        onPointerMove={event => {
          if (!interaction.current.dragging) return;
          const delta = interaction.current.startX - event.clientX;
          event.currentTarget.scrollLeft += delta;
          interaction.current.startX = event.clientX;
        }}
        onPointerUp={() => { interaction.current.dragging = false; pauseForInteraction(); }}
        onPointerCancel={() => { interaction.current.dragging = false; pauseForInteraction(); }}
        onLostPointerCapture={() => { interaction.current.dragging = false; }}
        onKeyDown={event => {
          if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
          event.preventDefault();
          pauseForInteraction();
          const card = event.currentTarget.children[0] as HTMLElement;
          event.currentTarget.scrollLeft += (card.offsetWidth + 24) * (event.key === 'ArrowRight' ? 1 : -1);
        }}
      >
        {[0, 1, 2].flatMap(copy => TESTIMONIALS.map(item => <article className="testimonial-loop__card" key={`${copy}-${item.id}`} aria-hidden={copy !== 1 ? true : undefined}>
          <div className="testimonial-loop__person">
            <div className="testimonial-loop__brand" data-client={item.id}>
              {item.logo ? <img decoding="async" src={item.logo} alt={`${item.name} logo`} title={`${item.name} logo`} width={180} height={60} loading="lazy" draggable={false} /> : <span className="testimonial-loop__wordmark">MAXTERS</span>}
            </div>
            <div><h3>{item.name}</h3><p>{item.service}</p></div>
          </div>
          <div className="testimonial-loop__content">
            <span className="testimonial-loop__quote" aria-hidden="true">“</span>
            <p className="testimonial-loop__description">{item.text}</p>
          </div>
        </article>))}
      </div>
    </div>
  </section>;
}

export default TestimonialsSection;
