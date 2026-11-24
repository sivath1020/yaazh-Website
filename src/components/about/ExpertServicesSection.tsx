import React from 'react';
import { motion } from 'framer-motion';

// Marketing illustration peeking from top right of the section
import marketingSvg from '../../assets/Work/Marketing.optimized.webp';

// 1. Bento showcase cards provided by user
import cardEngineering from '../../assets/servies image/Software & Web Engineering.optimized.webp';
import cardWebPlatform from '../../assets/servies image/Search Engine.optimized.webp';
import cardSocialMarketing from '../../assets/servies image/Social & Performance Marketing.optimized.webp';
import cardUiuxWireframe from '../../assets/servies image/UIUX & Product Wireframing.optimized.webp';
import cardCreativeMedia from '../../assets/servies image/Creative Media & Production.optimized.webp';

// 2. Light 3D service graphics from yaazh360_seven_service_images_light
import customSoftwareGraphic from '../../assets/yaazh360_seven_service_images_light/01-custom-software.optimized.webp';
import programmaticAdsGraphic from '../../assets/yaazh360_seven_service_images_light/02-programmatic-ads.optimized.webp';
import webDevGraphic from '../../assets/yaazh360_seven_service_images_light/03-web-development.optimized.webp';
import seoGraphic from '../../assets/yaazh360_seven_service_images_light/04-search-engine-optimization.optimized.webp';
import adsGraphic from '../../assets/yaazh360_seven_service_images_light/05-ads-performance-marketing.optimized.webp';
import appDevGraphic from '../../assets/yaazh360_seven_service_images_light/06-app-development.optimized.webp';
import digitalMarketingGraphic from '../../assets/yaazh360_seven_service_images_light/07-digital-marketing.optimized.webp';

// 3. Custom 3D Solution Icons from 'Icons of sol'
import customSolIcon from '../../assets/Icons of sol/custom.optimized.webp';
import mobileAppSolIcon from '../../assets/Icons of sol/mobile-app.optimized.webp';
import webSolIcon from '../../assets/Icons of sol/web.optimized.webp';
import seoSolIcon from '../../assets/Icons of sol/SEO.optimized.webp';
import adsSolIcon from '../../assets/Icons of sol/Ads.optimized.webp';
import programmaticAdsSolIcon from '../../assets/Icons of sol/Programatic Ads.optimized.webp';
import digitalMarketingSolIcon from '../../assets/Icons of sol/Digital Marketing.optimized.webp';

interface BentoShowcaseCard {
  id: string;
  shortName: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  deliverables: string[];
  gridClasses: string;
}

const BENTO_SHOWCASE_CARDS: BentoShowcaseCard[] = [
  {
    id: 'engineering',
    shortName: 'Software & Web Engineering',
    category: 'FULL-STACK TECH',
    imageSrc: cardEngineering,
    imageAlt: 'Software and Web Engineering Workspace',
    description:
      'Fast web portals, cloud apps, and custom software built for your team.',
    deliverables: ['Next.js & React', 'Cloud APIs', 'Microservices'],
    gridClasses:
      'md:col-start-1 md:col-span-3 md:row-start-1 md:row-span-2 min-h-[220px] md:min-h-full',
  },
  {
    id: 'web-platform',
    shortName: 'Web Platforms & Digital UI',
    category: 'DIGITAL PLATFORMS',
    imageSrc: cardWebPlatform,
    imageAlt: 'Modern Web Platform and UI Design Mockup',
    description:
      'Clean business websites and online stores designed to welcome buyers.',
    deliverables: ['Corporate Portals', 'Ecommerce Engines', 'Next.js Platforms'],
    gridClasses:
      'sm:col-span-2 md:col-start-4 md:col-span-6 md:row-start-1 md:row-span-1 min-h-[160px] md:min-h-full',
  },
  {
    id: 'creative-media',
    shortName: 'Creative Media & Production',
    category: 'CREATIVE MEDIA',
    imageSrc: cardCreativeMedia,
    imageAlt: 'Creative Media Production and Strategy Desk',
    description:
      'Sharp brand photos, product videos, and creative graphics that stand out.',
    deliverables: ['Commercial Films', 'Brand Visuals', 'Media Direction'],
    gridClasses:
      'sm:col-span-2 md:col-start-10 md:col-span-3 md:row-start-1 md:row-span-2 min-h-[200px] md:min-h-full',
  },
  {
    id: 'social-marketing',
    shortName: 'Social & Performance Marketing',
    category: 'GROWTH MARKETING',
    imageSrc: cardSocialMarketing,
    imageAlt: 'Social Media and Performance Marketing on Mobile',
    description:
      'Targeted ads on Google and Meta that turn clicks into real sales.',
    deliverables: ['Paid Social & Search', 'Lead Generation', 'Funnel CRO'],
    gridClasses:
      'md:col-start-4 md:col-span-3 md:row-start-2 md:row-span-1 min-h-[160px] md:min-h-full',
  },
  {
    id: 'uiux-wireframe',
    shortName: 'UI/UX & Product Wireframing',
    category: 'PRODUCT DESIGN',
    imageSrc: cardUiuxWireframe,
    imageAlt: 'UI/UX Product Wireframing on Tablet',
    description:
      'Clean user flows and mobile mockups that make your app easy to use.',
    deliverables: ['Design Systems', 'Figma Prototyping', 'UX Architecture'],
    gridClasses:
      'md:col-start-7 md:col-span-3 md:row-start-2 md:row-span-1 min-h-[160px] md:min-h-full',
  },
];

interface ExpertServicesSectionProps {
  onOpenContact?: (serviceName?: string) => void;
  onNavigate?: (path: string) => void;
}

export const ExpertServicesSection: React.FC<ExpertServicesSectionProps> = ({
  onOpenContact,
  onNavigate,
}) => {

  const handleCardClick = (serviceTitle?: string) => {
    if (onNavigate) {
      onNavigate('/contact');
    } else if (onOpenContact) {
      onOpenContact(serviceTitle);
    }
  };

  return (
    <section
      id="expert-services"
      aria-label="Our Expert Services & Digital Engineering"
      className="relative w-full bg-[#FFFFFF] py-14 sm:py-20 md:py-24 font-josefin select-text overflow-hidden border-t border-gray-100"
    >
      {/* ── Background Ambient Light Accents ── */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-gray-50/80 via-transparent to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ══════════════════════════════════════════════════════════════
            1. SECTION HEADER: "Our Expert Services" with Marketing.svg
            ══════════════════════════════════════════════════════════════ */}
        <div className="relative w-full flex flex-col items-center justify-center text-center mb-10 sm:mb-12">
          
          {/* Mobile display for Marketing.svg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex md:hidden mb-4 items-center justify-center pointer-events-none"
          >
            <motion.img
              src={marketingSvg}
              alt="Marketing Strategy & Creative Media Animation"
              title="Marketing Strategy & Creative Media Animation"
              width={144}
              height={144}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-32 h-32 sm:w-36 sm:h-36 object-contain filter drop-shadow-md"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl flex flex-col items-center justify-center text-center mx-auto relative z-10"
          >
            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black tracking-[-0.03em] text-[#111111] leading-tight text-center">
              <span>Our </span>
              <span className="text-[#FF6600]">Expert Services</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-2.5 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed text-[#4B5563] max-w-lg text-center mx-auto tracking-[-0.01em]">
              High-impact digital marketing and bespoke software built for enterprise growth.
            </p>
          </motion.div>

          {/* Desktop display for Marketing.svg: Floating top-right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex absolute right-0 -top-12 md:-top-16 lg:-top-20 xl:-top-24 items-center justify-end pointer-events-none z-10"
          >
            <motion.img
              src={marketingSvg}
              alt="Marketing Strategy & Creative Media Animation"
              title="Marketing Strategy & Creative Media Animation"
              width={288}
              height={288}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-44 h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-contain filter drop-shadow-xl scale-110 lg:scale-120 origin-top-right"
            />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            2. INTERACTIVE BENTO CAPABILITIES SHOWCASE (Bento Cards)
            ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 md:grid-rows-2 gap-3 sm:gap-3.5 lg:gap-4 md:h-[400px] lg:h-[440px] xl:h-[470px]">
            {BENTO_SHOWCASE_CARDS.map((card) => {
              return (
                <div
                  key={card.id}
                  className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-200/80 bg-neutral-900 ${card.gridClasses}`}
                >
                  {/* Background Showcase Photo */}
                  <img decoding="async"
                    src={card.imageSrc}
                    alt={card.imageAlt} title={card.imageAlt} width={600} height={400} className="w-full h-full object-cover" loading="lazy" />

                  {/* Clean static resting title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3.5 sm:p-4 lg:p-5">
                    <h3 className="text-white font-extrabold text-xs sm:text-sm lg:text-[16px] tracking-tight leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] truncate">
                      {card.shortName}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            3. DOWNSIDE: SOLUTIONS & DIGITAL ENGINEERING (Matching Given Image)
            ══════════════════════════════════════════════════════════════ */}
        <div className="mt-16 sm:mt-24 pt-6 sm:pt-8">
          
          {/* Header: Digital Solutions */}
          <div
            onClick={() => handleCardClick('Digital Solutions')}
            className="w-full flex flex-col items-center justify-center text-center mb-10 sm:mb-14 cursor-pointer group"
          >
            {/* Main Headline */}
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight text-[#111111] leading-tight text-center group-hover:text-[#E5A800] transition-colors"
            >
              Digital <span className="text-[#E5A800]">Solutions</span>
            </motion.h3>
          </div>

          {/* Solutions Containers Layout (Matching Image 100%) */}
          <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
            
            {/* ── ROW 1: CUSTOM SOFTWARE (Full-Width Hero Container) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.55,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -12,
                scale: 1.012,
                transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
              }}
              onClick={() => handleCardClick('Custom Software')}
              className="relative z-10 hover:z-30 w-full rounded-2xl sm:rounded-3xl border border-neutral-200/70 hover:border-[#E5A800]/50 bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.24),-16px_0_30px_-4px_rgba(0,0,0,0.12),16px_0_30px_-4px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
            >
              {/* Left Content Column */}
              <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  {/* Badge & Title */}
                  <div className="flex items-center gap-3.5 mb-3 sm:mb-4">
                    <img decoding="async" loading="lazy"
                      src={customSolIcon}
                      alt="Custom Software Icon" title="Custom Software Icon" width={48} height={48}
                      className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                    />
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight">
                      Custom Software
                    </h4>
                  </div>

                  {/* Body Text */}
                  <p className="text-xs sm:text-sm md:text-[14.5px] leading-relaxed text-[#555555] font-normal mb-6">
                    Developing enterprise-grade backends, microservices, and specialized legacy software refactoring. Engineered for 99.99% uptime, distributed databases, high availability systems, and modular growth.
                  </p>

                  {/* Enterprise Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                    {[
                      'ERP',
                      'HRMS Tools',
                      'CRM Tools',
                      'SCM',
                      'PLM',
                      'BI',
                      'CMS',
                      'DMS',
                      'Version Control',
                      'Marketplace',
                      'Hospital Management',
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-neutral-100/90 text-[#333333] text-[11px] sm:text-xs font-medium border border-neutral-200/60 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5A800]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric Bar */}
                <div className="pt-4 border-t border-neutral-100 flex items-center gap-6 text-xs sm:text-sm">
                  <div>
                    <span className="font-extrabold text-neutral-900 text-base sm:text-lg">99.99%</span>
                    <span className="block text-[10px] sm:text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                      UPTIME
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-neutral-200" />
                  <div>
                    <span className="font-extrabold text-neutral-900 text-base sm:text-lg">Enterprise</span>
                    <span className="block text-[10px] sm:text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                      READY
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Mockup Graphic Column */}
              <div className="lg:col-span-6 flex items-center justify-center relative overflow-hidden bg-white min-h-[300px] sm:min-h-[360px] lg:min-h-full w-full">
                <img decoding="async"
                  src={customSoftwareGraphic}
                  alt="Custom Enterprise Workspace Mockup" title="Custom Enterprise Workspace Mockup" width={800} height={600}
                  className="w-full h-full min-h-[280px] sm:min-h-[340px] md:min-h-[380px] object-cover object-center transform transition-transform duration-500 group-hover:scale-106"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* ── ROW 2: E-COMMERCE SYSTEMS & WEB DEVELOPMENT (2 Columns) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8">
              
              {/* Card 2: App Development */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -12,
                  scale: 1.015,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }}
                onClick={() => handleCardClick('App Development')}
                className="relative z-10 hover:z-30 rounded-2xl sm:rounded-3xl border border-neutral-200/70 hover:border-[#E5A800]/50 bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.24),-16px_0_30px_-4px_rgba(0,0,0,0.12),16px_0_30px_-4px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3.5 mb-3">
                    <img decoding="async" loading="lazy"
                      src={mobileAppSolIcon}
                      alt="App Development Icon" title="App Development Icon" width={48} height={48}
                      className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                    />
                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                      App Development
                    </h4>
                  </div>
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#555555] font-normal">
                    Crafting beautiful, native iOS &amp; Android apps designed for frictionless experiences. Powered by robust cross-platform architectures with instant fluid touch feedback and offline-first data capabilities.
                  </p>
                </div>

                <div className="w-full mt-auto overflow-hidden bg-white flex items-end justify-center">
                  <img decoding="async"
                    src={appDevGraphic}
                    alt="iOS and Android Mobile App Mockups" title="iOS and Android Mobile App Mockups" width={800} height={600}
                    className="w-full h-auto object-cover object-bottom transform transition-transform duration-500 group-hover:scale-106"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Card 3: Web Development */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -12,
                  scale: 1.015,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }}
                onClick={() => handleCardClick('Web Development')}
                className="relative z-10 hover:z-30 rounded-2xl sm:rounded-3xl border border-neutral-200/70 hover:border-[#E5A800]/50 bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.24),-16px_0_30px_-4px_rgba(0,0,0,0.12),16px_0_30px_-4px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3.5 mb-3">
                    <img decoding="async" loading="lazy"
                      src={webSolIcon}
                      alt="Web Development Icon" title="Web Development Icon" width={48} height={48}
                      className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                    />
                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                      Web Development
                    </h4>
                  </div>
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#555555] font-normal">
                    Engineering lightning-fast, high-traffic web applications with decoupled headless architectures. We combine server-side rendering, ultra-low latency assets, and SEO-engineered semantic layouts to maximize core web vitals and user conversion.
                  </p>
                </div>

                <div className="w-full mt-auto overflow-hidden bg-white flex items-end justify-center">
                  <img decoding="async"
                    src={webDevGraphic}
                    alt="Web Development Architecture Mockup" title="Web Development Architecture Mockup" width={800} height={600}
                    className="w-full h-auto object-cover object-bottom transform transition-transform duration-500 group-hover:scale-106"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>

            {/* ── ROW 3: SEO, ADS, APP DEV (3 Columns) ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
              
              {/* Card 4: Search Engine Optimization (SEO) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -12,
                  scale: 1.018,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }}
                onClick={() => handleCardClick('Search Engine Optimization (SEO)')}
                className="relative z-10 hover:z-30 rounded-2xl sm:rounded-3xl border border-neutral-200/70 hover:border-[#E5A800]/50 bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.24),-16px_0_30px_-4px_rgba(0,0,0,0.12),16px_0_30px_-4px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-2.5">
                    <img decoding="async" loading="lazy"
                      src={seoSolIcon}
                      alt="SEO Icon" title="SEO Icon" width={48} height={48}
                      className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                    />
                    <h4 className="text-base sm:text-lg font-extrabold text-[#111111] tracking-tight">
                      Search Engine Optimization (SEO)
                    </h4>
                  </div>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-[#555555] font-normal">
                    Improve your online visibility and rank higher on search engines with proven SEO strategies, technical optimization, and high-quality content that drives organic traffic and long-term growth.
                  </p>
                </div>

                <div className="w-full mt-auto overflow-hidden bg-white flex items-end justify-center">
                  <img decoding="async"
                    src={seoGraphic}
                    alt="SEO Growth Graph Mockup" title="SEO Growth Graph Mockup" width={800} height={600}
                    className="w-full h-auto object-cover object-bottom transform transition-transform duration-500 group-hover:scale-106"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Card 5: Ads & Performance Marketing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -12,
                  scale: 1.018,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }}
                onClick={() => handleCardClick('Ads & Performance Marketing')}
                className="relative z-10 hover:z-30 rounded-2xl sm:rounded-3xl border border-neutral-200/70 hover:border-[#E5A800]/50 bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.24),-16px_0_30px_-4px_rgba(0,0,0,0.12),16px_0_30px_-4px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="p-5 sm:p-6 pb-2 sm:pb-3">
                  <div className="flex items-center gap-3 mb-2.5">
                    <img decoding="async" loading="lazy"
                      src={adsSolIcon}
                      alt="Ads & Performance Marketing Icon" title="Ads & Performance Marketing Icon" width={48} height={48}
                      className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                    />
                    <h4 className="text-base sm:text-lg font-extrabold text-[#111111] tracking-tight">
                      Ads &amp; Performance Marketing
                    </h4>
                  </div>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-[#555555] font-normal">
                    Run high-converting ad campaigns across Google, Meta, and more. From strategy and creatives to optimization and ROI tracking, we help you get measurable business results.
                  </p>
                </div>

                <div className="w-full mt-auto overflow-hidden bg-white flex items-end justify-center">
                  <img decoding="async"
                    src={adsGraphic}
                    alt="Performance Ads Analytics Mockup" title="Performance Ads Analytics Mockup" width={800} height={600}
                    className="w-full h-auto object-cover object-bottom transform transition-transform duration-500 group-hover:scale-106"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Card 6: Programatic Ads */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -12,
                  scale: 1.018,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }}
                onClick={() => handleCardClick('Programatic Ads')}
                className="relative z-10 hover:z-30 rounded-2xl sm:rounded-3xl border border-neutral-200/70 hover:border-[#E5A800]/50 bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.24),-16px_0_30px_-4px_rgba(0,0,0,0.12),16px_0_30px_-4px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="p-5 sm:p-6 pb-2 sm:pb-3">
                  <div className="flex items-center gap-3 mb-2.5">
                    <img decoding="async" loading="lazy"
                      src={programmaticAdsSolIcon}
                      alt="Programatic Ads Icon" title="Programatic Ads Icon" width={48} height={48}
                      className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                    />
                    <h4 className="text-base sm:text-lg font-extrabold text-[#111111] tracking-tight">
                      Programatic Ads
                    </h4>
                  </div>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-[#555555] font-normal">
                    Automate your media buying with algorithmic real-time bidding (RTB) across premium publishers, connected TV, and high-converting display networks to scale conversions.
                  </p>
                </div>

                <div className="w-full mt-auto overflow-hidden bg-white flex items-end justify-center">
                  <img decoding="async"
                    src={programmaticAdsGraphic}
                    alt="Programatic Ads Multi-Channel Systems" title="Programatic Ads Multi-Channel Systems" width={800} height={600}
                    className="w-full h-auto object-cover object-bottom transform transition-transform duration-500 group-hover:scale-106"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>

            {/* ── ROW 4: DIGITAL MARKETING (Full-Width Bottom Container) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.55,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -12,
                scale: 1.012,
                transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
              }}
              onClick={() => handleCardClick('Digital Marketing')}
              className="relative z-10 hover:z-30 w-full rounded-2xl sm:rounded-3xl border border-neutral-200/70 hover:border-[#E5A800]/50 bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.24),-16px_0_30px_-4px_rgba(0,0,0,0.12),16px_0_30px_-4px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
            >
              {/* Left Column */}
              <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  {/* Badge & Title */}
                  <div className="flex items-center gap-3.5 mb-3 sm:mb-4">
                    <img decoding="async" loading="lazy"
                      src={digitalMarketingSolIcon}
                      alt="Digital Marketing Icon" title="Digital Marketing Icon" width={48} height={48}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                    />
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight">
                      Digital Marketing
                    </h4>
                  </div>

                  {/* Body Text */}
                  <p className="text-xs sm:text-sm md:text-[14.5px] leading-relaxed text-[#555555] font-normal mb-6">
                    Grow your brand, generate quality leads, and increase conversions with end-to-end digital marketing solutions, including social media, content marketing, email marketing, and performance analytics.
                  </p>

                  {/* Service Pills */}
                  <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                    {[
                      'Social Media Marketing',
                      'Content Marketing',
                      'Email Marketing',
                      'Lead Generation',
                      'Analytics & Reporting',
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-neutral-100/90 text-[#333333] text-[11px] sm:text-xs font-medium border border-neutral-200/60 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5A800]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric Bar */}
                <div className="pt-4 border-t border-neutral-100 flex items-center gap-6 text-xs sm:text-sm">
                  <div>
                    <span className="font-extrabold text-neutral-900 text-base sm:text-lg">3x</span>
                    <span className="block text-[10px] sm:text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                      Brand Visibility
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-neutral-200" />
                  <div>
                    <span className="font-extrabold text-neutral-900 text-base sm:text-lg">Higher</span>
                    <span className="block text-[10px] sm:text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                      Conversions
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Mockup Graphic Column */}
              <div className="lg:col-span-6 flex items-center justify-center relative overflow-hidden bg-white min-h-[300px] sm:min-h-[360px] lg:min-h-full w-full">
                <img decoding="async"
                  src={digitalMarketingGraphic}
                  alt="Digital Marketing Campaign Analytics & Channels Mockup" title="Digital Marketing Campaign Analytics & Channels Mockup" width={800} height={600}
                  className="w-full h-full min-h-[280px] sm:min-h-[340px] md:min-h-[380px] object-cover object-center transform transition-transform duration-500 group-hover:scale-106"
                  loading="lazy"
                />
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ExpertServicesSection;
