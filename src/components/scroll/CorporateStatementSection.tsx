import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import centerImage from '../../assets/Center Image.optimized.webp';
import digitalMarketingGif from '../../assets/GIF/digital-marketing-Jru0zuyaaj.gif';
import softwareDevelopmentGif from '../../assets/GIF/software-development-RoU5fByMr1.gif';

interface CorporateStatementProps {
  onOpenContact?: () => void;
  onExploreServices?: () => void;
}

/* ──────────────────────────────────────────────────────────────────────────
   "WHO WE ARE" NARRATIVE CONTENT LOADING ANIMATION VARIANTS
   ────────────────────────────────────────────────────────────────────────── */

const narrativeContainerVariants: Variants = {
  hidden: { opacity: 0.6 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.022,
      delayChildren: 0.12,
    },
  },
};

const narrativeWordVariants: Variants = {
  hidden: {
    opacity: 0.12,
    y: 8,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   "WHAT WE DO" MARQUEE SERVICES LIST
   ────────────────────────────────────────────────────────────────────────── */

interface MarqueeServiceItem {
  title: string;
  isOrange: boolean;
}

const WHAT_WE_DO_MARQUEE_SERVICES: MarqueeServiceItem[] = [
  { title: 'Website Development', isOrange: true },
  { title: 'Software Development', isOrange: false },
  { title: 'Search Engine Optimization', isOrange: true },
  { title: 'Lead Generation', isOrange: false },
  { title: 'Google My Business Optimization', isOrange: true },
  { title: 'Social Media Management', isOrange: false },
  { title: 'Ecommerce Development', isOrange: true },
  { title: 'Mobile App Development', isOrange: false },
  { title: 'Graphic Desiging', isOrange: true },
  { title: 'Programatic Ads', isOrange: false },
  { title: 'ERP', isOrange: true },
  { title: 'Google Ads', isOrange: false },
];

/* ──────────────────────────────────────────────────────────────────────────
   MAIN CORPORATE STATEMENT SECTION
   ────────────────────────────────────────────────────────────────────────── */

export const CorporateStatementSection: React.FC<CorporateStatementProps> = ({
  onOpenContact: _onOpenContact,
  onExploreServices: _onExploreServices,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);

  // Trigger loading animation whenever the narrative is in view
  const isInView = useInView(narrativeRef, {
    once: false,
    amount: 0.2,
  });

  // Corporate narrative statement matching reference layout & tone
  const statementParagraph =
    "Yaazh 360 Digitech is a digital marketing and web team in Coimbatore. We help businesses find new buyers on Google, Meta, and local search. Our crew builds clean websites, phone apps, and custom business tools. From your first spark to daily operations, we make your digital growth simple and fast.";

  const words = statementParagraph.split(' ');

  return (
    <section
      ref={containerRef}
      id="corporate-statement"
      aria-label="Who we are - Corporate Statement"
      className="relative w-full bg-white font-sans select-text pt-0 sm:pt-1 pb-0 overflow-hidden"
    >
      {/* Subtle Ambient Radial Backlight */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center -z-0">
        <div className="w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-[#FF6600]/6 via-amber-500/4 to-transparent rounded-full blur-3xl opacity-80" />
      </div>

      {/* Content Container - Centered readable narrative container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex flex-col items-center justify-center">

        {/* ── Downward Dotted Arrow & "Who we are" (Enlarged Orange Tip & Attached to Hero) ── */}
        <div className="flex flex-col items-center justify-center mt-0 sm:mt-1 mb-4 sm:mb-6">
          {/* Animated Gentle Floating Arrow Container */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 2.2,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            className="flex flex-col items-center justify-center cursor-default select-none"
          >
            {/* SVG Dotted Line with Prominent Large Orange Arrowhead */}
            <svg
              width="36"
              height="88"
              viewBox="0 0 36 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#111111] drop-shadow-sm"
            >
              {/* Top dotted line */}
              <line
                x1="18"
                y1="0"
                x2="18"
                y2="30"
                stroke="#111111"
                strokeWidth="2.8"
                strokeDasharray="3.5 4"
                strokeLinecap="round"
              />
              {/* Large Bold Orange Downward Triangle Arrowhead */}
              <polygon
                points="6,30 30,30 18,50"
                fill="#FF6600"
                stroke="#FF6600"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {/* Bottom dotted line */}
              <line
                x1="18"
                y1="50"
                x2="18"
                y2="88"
                stroke="#111111"
                strokeWidth="2.8"
                strokeDasharray="3.5 4"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* "Who we are" Title */}
          <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-[-0.025em] text-[#111111] text-center mt-2.5 sm:mt-3">
            Digital Marketing &amp; Software Development Company in Coimbatore
          </h1>
          <p className="mt-3 text-sm font-semibold text-neutral-600">Yaazh 360 Digitech · Who we are</p>
        </div>

        {/* ── Corporate Paragraph (Word-by-word streaming loading animation with luminous shimmer) ── */}
        <div ref={narrativeRef} className="relative my-4 sm:my-6 w-full">
          <div className="mb-5 grid grid-cols-2 items-center gap-6 md:contents">
          {/* 1. Digital Marketing Animated GIF (Right side nearby "best digital marketing" - moved further right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, x: 0, y: [0, -7, 0] }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{
              opacity: { duration: 0.6, delay: 0.2 },
              scale: { duration: 0.6, delay: 0.2 },
              x: { duration: 0.6, delay: 0.2 },
              y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative mx-auto w-full max-w-[140px] md:max-w-none md:mx-0 md:absolute md:-top-36 lg:-top-44 xl:-top-48 md:-right-32 lg:-right-52 xl:-right-68 2xl:-right-76 md:w-44 lg:w-52 xl:w-60 z-20 pointer-events-none select-none"
          >
            <img decoding="async"
              src={digitalMarketingGif}
              alt="Digital Marketing"
              title="Digital Marketing"
              width={400}
              height={400}
              className="w-full h-auto object-contain filter drop-shadow-xl"
              loading="lazy"
            />
          </motion.div>

          {/* 2. Software Development Animated GIF (Left side nearby "mix of digital marketing strategies" - moved left, moved top, & enlarged) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, x: 0, y: [0, 7, 0] }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{
              opacity: { duration: 0.6, delay: 0.4 },
              scale: { duration: 0.6, delay: 0.4 },
              x: { duration: 0.6, delay: 0.4 },
              y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative mx-auto w-full max-w-[140px] md:max-w-none md:mx-0 md:absolute md:top-[30%] md:-translate-y-1/2 md:-left-36 lg:-left-56 xl:-left-72 2xl:-left-80 md:w-44 lg:w-52 xl:w-60 z-20 pointer-events-none select-none"
          >
            <img decoding="async"
              src={softwareDevelopmentGif}
              alt="Software Development"
              title="Software Development"
              width={400}
              height={400}
              className="w-full h-auto object-contain filter drop-shadow-xl"
              loading="lazy"
            />
          </motion.div>

          </div>

          {/* Luminous Loading Shimmer Sweep across the narrative */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <motion.div
              className="h-full w-2/5 bg-gradient-to-r from-transparent via-[#FF6600]/14 via-amber-400/18 to-transparent -skew-x-12 blur-sm"
              initial={{ x: '-150%' }}
              animate={isInView ? { x: '350%' } : { x: '-150%' }}
              transition={{
                duration: 2.4,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
            />
          </div>

          <motion.p
            variants={narrativeContainerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-justify text-[16px] sm:text-[20px] md:text-[24px] lg:text-[27px] xl:text-[30px] font-normal tracking-[-0.012em] leading-[1.68] sm:leading-[1.66] md:leading-[1.72] text-[#111111] font-baskervville"
            style={{ fontFamily: '"Baskervville", serif' }}
          >
            {words.map((word, index) => {
              const isHighlight =
                word.toLowerCase().includes('yaazh360') ||
                word.toLowerCase().includes('bespoke');
              return (
                <React.Fragment key={`p-${index}-${word}`}>
                  <motion.span
                    variants={narrativeWordVariants}
                    className={`inline-block will-change-[opacity,transform,filter] ${
                      isHighlight
                        ? 'text-[#FF6600] font-bold drop-shadow-[0_1px_6px_rgba(255,102,0,0.2)]'
                        : 'text-[#111111] font-medium'
                    }`}
                  >
                    {word}
                  </motion.span>
                  {index < words.length - 1 ? ' ' : ''}
                </React.Fragment>
              );
            })}
          </motion.p>
        </div>
      </div>

      {/* ── Full-Bleed Capabilities Ecosystem Banner (Zero Left & Right Gaps, Edge-to-Edge) ── */}
      <div className="relative w-full mt-6 sm:mt-16 md:mt-20 h-[160px] sm:h-[240px] md:h-[280px] lg:h-[320px] bg-white overflow-hidden leading-none select-none flex items-center border-0 border-none">
        
        {/* ── 1. Background Layer (High Visibility Doodle Texture, Infinite Marquee Motion) ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center">
          <motion.div
            className="flex w-max h-full will-change-transform"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 35,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            {/* Seamless 2-tile loop */}
            <div className="flex shrink-0 h-full items-center">
              <img decoding="async" loading="lazy"
                src={centerImage}
                alt="Creative marketing and technology illustration background"
                title="Creative marketing and technology illustration background"
                width={1200}
                height={600}
                className="h-full w-auto object-cover object-center scale-170 sm:scale-190 md:scale-210 lg:scale-230 opacity-75 sm:opacity-85"
              />
            </div>
            <div className="flex shrink-0 h-full items-center">
              <img decoding="async" loading="lazy"
                src={centerImage}
                alt="Creative marketing and technology illustration background"
                title="Creative marketing and technology illustration background"
                width={1200}
                height={600}
                className="h-full w-auto object-cover object-center scale-170 sm:scale-190 md:scale-210 lg:scale-230 opacity-75 sm:opacity-85"
              />
            </div>
          </motion.div>
        </div>

        {/* ── 2. Foreground "What We Do" Content Running in Infinite Loop (Marquee - No Dots, High Visibility) ── */}
        <div className="relative z-10 w-full overflow-hidden py-4">
          <motion.div
            className="flex w-max items-center whitespace-nowrap will-change-transform"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 38,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            {[...WHAT_WE_DO_MARQUEE_SERVICES, ...WHAT_WE_DO_MARQUEE_SERVICES].map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="flex items-center shrink-0 pr-14 sm:pr-18 md:pr-24 lg:pr-28 group cursor-default"
              >
                <span
                  className={`font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] tracking-[-0.03em] font-black transition-transform duration-200 group-hover:scale-105 select-none ${
                    item.isOrange ? 'text-[#FF6600]' : 'text-[#111111]'
                  }`}
                  style={{
                    textShadow:
                      '-2px -2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff, 2px 2px 0 #ffffff, 0 1px 0 #ffffff, 0 -1px 0 #ffffff, 0 0 18px rgba(255,255,255,0.95), 0 2px 10px rgba(255,255,255,0.9)',
                  }}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default CorporateStatementSection;
