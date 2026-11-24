import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, ZoomIn } from 'lucide-react';
import chatBubbleIcon from '../../assets/icons/chat-bubble-icon.optimized.webp';
import cardBgTexture from '../../assets/crumpled-paper-card-bg.optimized.webp';
import websiteImg from '../../assets/Services Content/website-development.gif';
import mobileAppImg from '../../assets/Services Content/mobile-app.gif';
import softwareImg from '../../assets/Services Content/Customized Softwares.gif';
import graphicImg from '../../assets/Services Content/graphic-design.gif';
import digitalMarketingImg from '../../assets/Services Content/Digital Marketing.gif';
import seoImg from '../../assets/Services Content/seo-google-search.gif';
import gmbImg from '../../assets/Services Content/google-business-profile.gif';
import socialImg from '../../assets/Services Content/social-media-management.gif';

// Brochure showcase assets matching reference 6-tile gallery
import brochure1 from '../../assets/brochure/B1.optimized.webp';
import brochure2 from '../../assets/brochure/B2.optimized.webp';
import brochure3 from '../../assets/brochure/B3.optimized.webp';
import brochure4 from '../../assets/brochure/B4.optimized.webp';
import brochure5 from '../../assets/brochure/B5.optimized.webp';
import brochure6 from '../../assets/brochure/B6.optimized.webp';
import mockupBrochure from '../../assets/mockup_brochure.optimized.webp';
import workCabinetDesigns from '../../assets/Work/work_cabinet_designs.optimized.webp';
import aboutHeroBg from '../../assets/About/About Background.optimized.webp';

interface SaiServicesSectionProps {
  onOpenContact?: (serviceName?: string) => void;
  onNavigate?: (path: string) => void;
}

interface ServiceCardData {
  id: string;
  title: string;
  image: string;
  largeArtwork?: boolean;
  description: string;
}

const TOP_ROW_SERVICES: ServiceCardData[] = [
  {
    id: 'website-interactive',
    title: 'Website / Interactive',
    image: websiteImg,
    largeArtwork: true,
    description:
      "A fast website is your 24/7 storefront. We build clean pages that welcome visitors. Every layout builds trust and turns visitors into clients.",
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    image: mobileAppImg,
    largeArtwork: true,
    description:
      'Turn your app ideas into fast mobile apps for Android and iOS. We craft screens that people love. Your app runs smoothly on all phones.',
  },
  {
    id: 'customized-softwares',
    title: 'Customized Softwares',
    image: softwareImg,
    largeArtwork: true,
    description:
      'Make daily work easier with custom tools for your team. From CRM portals to cloud apps, we build software that fits your exact workflow.',
  },
];

const MIDDLE_ROW_SERVICES: ServiceCardData[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    image: digitalMarketingImg,
    largeArtwork: true,
    description:
      'Grow your sales with online ads on Google and Meta. We create clear campaigns that bring real leads. Every rupee spent works for your growth.',
  },
  {
    id: 'seo-optimization',
    title: 'SEO (search engine optimization)',
    image: seoImg,
    largeArtwork: true,
    description:
      'Help more local clients find you on Google search. We fix page speed, target top search terms, and build quality links so you stay on page one.',
  },
];

const DOWNSIDE_SERVICES: ServiceCardData[] = [
  {
    id: 'google-business-profile',
    title: 'Google My Business Optimization',
    image: gmbImg,
    description:
      'Win nearby customers with an active Google Business Profile. We manage reviews, fix map listings, and help your business rank at the top.',
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    image: socialImg,
    description:
      'Build a loyal audience with creative reels and posts. We tell your brand story and turn everyday followers into paying clients.',
  },
  {
    id: 'graphic-designing',
    title: 'Graphic Desiging',
    image: graphicImg,
    description:
      'Stand out with crisp logos, marketing brochures, and creative cards. We make your business look sharp and memorable across all media.',
  },
];

interface BrochureShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  description: string;
  img: string;
}

const SHOWCASE_GALLERY: BrochureShowcaseItem[] = [
  {
    id: 'b1',
    title: 'Corporate brochures',
    subtitle: 'Executive presentation decks and company profiles.',
    category: 'Corporate Event Collateral',
    client: 'Enterprise Summit Global',
    description:
      'Clean event brochure with clear schedules, speaker lists, and event summaries.',
    img: brochure1,
  },
  {
    id: 'b2',
    title: 'Architecture lookbooks',
    subtitle: 'Tactile editorial layouts and interior portfolios.',
    category: 'Luxury Editorial Publication',
    client: 'Maison Architecture & Living',
    description:
      'Modern lookbook with high quality photos, floor plans, and project case studies.',
    img: brochure2,
  },
  {
    id: 'b3',
    title: 'Hospitality & menus',
    subtitle: 'Tri-fold restaurant menus and culinary showcases.',
    category: 'Hospitality Trifold Collateral',
    client: 'Gourmet Table & Bistro',
    description:
      'Clean restaurant menu with food photos, dish pairings, and pricing for guests.',
    img: brochure3,
  },
  {
    id: 'b4',
    title: 'Editorial magazines',
    subtitle: 'Minimalist brand lookbooks and magazines.',
    category: 'Minimalist Publication Design',
    client: 'Cereal Editorial Press',
    description:
      'Editorial magazine layout with generous white space, sharp fonts, and photo stories.',
    img: brochure4,
  },
  {
    id: 'b5',
    title: 'Agency service trifolds',
    subtitle: 'Structured service breakdowns and sales charts.',
    category: 'Corporate Trifold Brochure',
    client: 'Studio Kinetic Design',
    description:
      'Modern navy trifold brochure with service details, past projects, and sales charts.',
    img: brochure5,
  },
  {
    id: 'b6',
    title: 'Executive bifold profiles',
    subtitle: 'Company roadmaps and leadership milestones.',
    category: 'Executive Bifold Brochure',
    client: 'Apex Corporate Innovations',
    description:
      'Corporate bi-fold profile outlining company goals, team strengths, and future plans.',
    img: brochure6,
  },
  {
    id: 'b7',
    title: 'Brand identity decks',
    subtitle: 'Complete stationery, guides, and print collateral.',
    category: 'Brand Identity Collateral',
    client: 'Vortex Brand Studio',
    description:
      'Brand guideline deck showing logo rules, brand colors, fonts, and print layouts.',
    img: mockupBrochure,
  },
  {
    id: 'b8',
    title: 'View all brochures',
    subtitle: 'Explore our complete lineup of custom print solutions.',
    category: 'Full Portfolio Catalog',
    client: 'Yaazh360 Print & Digital Suite',
    description:
      'Full catalog of marketing folders, product packaging, catalogs, and print designs.',
    img: workCabinetDesigns,
  },
];

export const SaiServicesSection: React.FC<SaiServicesSectionProps> = ({
  onOpenContact,
  onNavigate,
}) => {
  const [selectedBrochure, setSelectedBrochure] = useState<BrochureShowcaseItem | null>(null);

  const handleBrochureClick = (item: BrochureShowcaseItem) => {
    setSelectedBrochure(item);
  };

  const handleReadMoreClick = (serviceTitle: string) => {
    if (onOpenContact) {
      onOpenContact(serviceTitle);
    }
  };

  const handleChatClick = () => {
    setSelectedBrochure(null);
    if (onNavigate) onNavigate('/contact');
    else window.location.assign('/contact');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919047044440';
  };

  const renderServiceCard = (card: ServiceCardData, idx: number, baseDelay: number = 0) => (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, scale: 0.88, y: 35 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.55,
        delay: baseDelay + idx * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -14,
        scale: 1.015,
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
      className="relative z-10 hover:z-30 bg-white rounded-none p-6 sm:p-8 flex flex-col justify-between border border-neutral-200/60 hover:border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.28),-18px_0_35px_-4px_rgba(0,0,0,0.16),18px_0_35px_-4px_rgba(0,0,0,0.16),0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer"
    >
      <div className="flex flex-col flex-1">
        {/* Hand-Drawn Doodle Illustration with Scroll Popup Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.78, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.55,
            delay: baseDelay + idx * 0.12 + 0.12,
            ease: [0.34, 1.45, 0.64, 1],
          }}
          className={`${card.largeArtwork ? 'h-56 sm:h-60 md:h-64' : 'h-44 sm:h-48 md:h-52'} flex items-center justify-center mb-4 sm:mb-5`}
        >
          <img src={card.image} alt={card.title} title={card.title} width={320} height={256} className={`${card.largeArtwork ? 'w-full max-w-[280px] sm:max-w-[320px]' : 'max-w-[220px] sm:max-w-[240px] w-auto'} max-h-full object-contain select-none pointer-events-none filter drop-shadow-sm transition-transform duration-300 hover:scale-105`}
            loading="lazy"
          />
        </motion.div>

        {/* Title with Scroll Popup Effect & Uniform Height */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.45,
            delay: baseDelay + idx * 0.12 + 0.2,
            ease: 'easeOut',
          }}
          className="text-xl sm:text-2xl font-black text-[#111827] text-center tracking-tight min-h-[56px] sm:min-h-[64px] flex items-center justify-center leading-snug"
        >
          {card.title}
        </motion.h3>

        {/* Paragraph with Scroll Popup Effect & Uniform 4-Line Height */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.45,
            delay: baseDelay + idx * 0.12 + 0.26,
            ease: 'easeOut',
          }}
          className="mt-3 text-[13.5px] sm:text-[14.5px] text-[#4B5563] leading-[1.65] text-justify line-clamp-4 min-h-[88px] sm:min-h-[96px] flex items-center"
        >
          {card.description}
        </motion.p>
      </div>

      {/* Action Buttons ("Chat With Us" & "Call Us" matching user custom CSS specification) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.45,
          delay: baseDelay + idx * 0.12 + 0.32,
          ease: [0.34, 1.4, 0.64, 1],
        }}
        className="mt-6 pt-2 flex flex-wrap items-center justify-center gap-3 services-card-actions"
      >
        <button
          type="button"
          onClick={handleChatClick}
          className="services-btn-yellow"
        >
          <img src={chatBubbleIcon} alt="Chat" title="Chat with Yaazh 360" width={18} height={18} className="w-[18px] h-[18px] object-contain shrink-0" />
          <span>Chat With Us</span>
        </button>
        <button
          type="button"
          onClick={handleCallClick}
          className="services-btn-yellow"
        >
          <Phone className="w-3.5 h-3.5 fill-black text-black shrink-0" />
          <span>Call Us</span>
        </button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="w-full bg-[#FFFFFF] font-josefin">
      {/* ══════════════════════════════════════════════════════════════
          WRAPPER: CRUMPLED PAPER BACKGROUND EXTENDING UNDER ORANGE HERO
          ══════════════════════════════════════════════════════════════ */}
      <div
        className="relative w-full bg-cover bg-center bg-repeat"
        style={{
          backgroundImage: `url(${cardBgTexture})`,
        }}
      >
        {/* 1. ORANGE FACETED HEADER BANNER (Directly ON TOP of crumpled paper) */}
        <section className="relative z-20 w-full bg-transparent select-text">
          {/* Background Graphic with Jagged Torn Paper Bottom Edge */}
          {/* Deep, prominent dark drop-shadow for authentic 3D torn paper visibility directly on crumpled paper */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            <img src={aboutHeroBg} alt="Yaazh 360 Services Background" title="Yaazh 360 Services Background" width={1920} height={1080} className="w-full h-full object-cover object-bottom"
              style={{
                filter: 'drop-shadow(0 14px 22px rgba(0, 0, 0, 0.38)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
              }}
            />
          </div>

          {/* 3. Hero Content matching reference design */}
          <div className="relative z-10 max-w-5xl mx-auto pt-10 sm:pt-14 md:pt-16 pb-14 sm:pb-18 md:pb-22 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#111111] leading-[1.2] tracking-tight text-center"
            >
              We Build 360&deg; <span className="text-white font-extrabold">Technology</span>
              <br />
              That Elevates Your
              <br />
              <span className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-[54px] font-black tracking-wide inline-block mt-1">
                EMPIRE
              </span>
            </motion.h1>

            {/* Sub-heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-4 sm:mt-5 text-base sm:text-xl md:text-2xl lg:text-[23px] font-bold text-[#111111] tracking-tight text-center"
            >
              Premier Technology &amp; Performance Marketing Consultancy in Coimbatore
            </motion.h2>

            {/* Narrative Paragraph matching reference image */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-3 sm:mt-3.5 text-[13px] sm:text-[14px] md:text-[15px] text-[#1a1a1a] font-normal max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed text-center"
            >
              Empowering ambitious enterprises with over five years of proven digital excellence. From bespoke software architectures, high-converting e-commerce platforms, and scalable mobile apps to market-dominating SEO, performance advertising, and distinctive brand identities &mdash; we engineer end-to-end digital solutions that turn vision into measurable revenue.
            </motion.p>

            {/* Mouse Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onClick={() => window.scrollBy({ top: 520, behavior: 'smooth' })}
              className="mt-8 sm:mt-11 md:mt-14 mb-4 sm:mb-6 flex flex-col items-center cursor-pointer group"
              title="Scroll down"
            >
              <div className="w-[20px] h-[34px] sm:w-[22px] sm:h-[36px] rounded-full border-[2px] border-black flex items-start justify-center pt-1.5 group-hover:scale-105 transition-transform">
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-1.5 rounded-full bg-black"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            2. THE SERVICE CARDS (White Containers Sitting on Crumpled Paper)
            ══════════════════════════════════════════════════════════════ */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24">
          {/* ── ROW 1: 3 Engineering & Development Service Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TOP_ROW_SERVICES.map((card, idx) => renderServiceCard(card, idx, 0))}
          </div>

          {/* ── ROW 2: 2 Growth & Search Service Cards Centered Side-by-Side ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto w-full my-6 lg:my-8">
            {MIDDLE_ROW_SERVICES.map((card, idx) => renderServiceCard(card, idx, 0.15))}
          </div>

          {/* ── ROW 3: 3 Downside Service Cards (Google My Business, Social Media Management, Graphic Desiging) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8">
            {DOWNSIDE_SERVICES.map((card, idx) => renderServiceCard(card, idx, 0.25))}
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          3. BROCHURE & PRINT COLLATERAL SHOWCASE (Matches Given HP-Style Grid)
          ══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-14 sm:py-18 md:py-24 border-t border-neutral-200 select-none font-sans">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7">
            {SHOWCASE_GALLERY.map((item, index) => {
              // 4x2 checkerboard coloring:
              // Row 0: Blue, Light, Blue, Light
              // Row 1: Light, Blue, Light, Blue
              const isBlue = (Math.floor(index / 4) + (index % 4)) % 2 === 0;

              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: 'easeOut',
                  }}
                  onClick={() => handleBrochureClick(item)}
                  className="group flex flex-col h-full bg-white cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Top Text Header Block */}
                  <div
                    className={`p-6 sm:p-7 flex flex-col justify-between min-h-[165px] sm:min-h-[175px] transition-colors duration-300 ${isBlue ? 'bg-[#0056D2] text-white' : 'bg-[#F4F4F6] text-[#111111]'
                      }`}
                  >
                    <div>
                      <h3
                        className={`text-xl sm:text-[22px] font-bold tracking-tight leading-tight ${isBlue ? 'text-white' : 'text-[#111111]'
                          }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-2.5 text-[13px] sm:text-sm font-normal leading-relaxed line-clamp-2 ${isBlue ? 'text-white/90' : 'text-[#4B5563]'
                          }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>


                  </div>

                  {/* Bottom Image Block with Left-side Colored L-accent */}
                  <div className="relative flex w-full h-[180px] sm:h-[195px] md:h-[210px] overflow-hidden">
                    {/* Left vertical color band continuation */}
                    <div
                      className={`w-[18%] sm:w-[16%] flex-shrink-0 h-full ${isBlue ? 'bg-[#0056D2]' : 'bg-[#F4F4F6]'
                        }`}
                    />

                    {/* Image display */}
                    <div className="flex-1 h-full overflow-hidden bg-neutral-100 relative">
                      <img
                        src={item.img}
                        alt={item.title}
                        title={item.title}
                        width={300}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Subtle hover overlay with zoom icon indicator */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="w-9 h-9 rounded-full bg-white/95 text-black flex items-center justify-center shadow-md">
                          <ZoomIn className="w-4 h-4 text-neutral-800" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. RED CTA BANNER (Exact Match: "Growing is good. Evolving is better.")
          ══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#E32B00] text-white py-14 sm:py-18 px-4 text-center select-none">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Growing is good. Evolving is better.
          </h3>
          <p className="mt-2 text-sm sm:text-base text-white/90 font-medium">
            Start your growth journey today.
          </p>
          <button
            type="button"
            onClick={() => handleReadMoreClick('General Inquiry')}
            className="services-btn mt-6 uppercase tracking-wider"
          >
            CONTACT US
          </button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          BROCHURE LIGHTBOX MODAL (Directly on Services Page)
          ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedBrochure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBrochure(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 select-none"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-none shadow-2xl overflow-hidden font-josefin"
            >
              <button
                onClick={() => setSelectedBrochure(null)}
                aria-label="Close Brochure Preview"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-[3/2] max-h-[60vh] bg-neutral-950 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedBrochure.img}
                  alt={selectedBrochure.title}
                  title={selectedBrochure.title}
                  width={600}
                  height={800}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-200">
                <div className="text-left">
                  <span className="text-xs uppercase tracking-wider text-[#FF5500] font-bold">
                    {selectedBrochure.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-black mt-0.5">
                    {selectedBrochure.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-lg leading-relaxed font-normal">
                    {selectedBrochure.description}
                  </p>
                  <span className="block mt-2 text-xs font-semibold text-neutral-500">
                    Client: {selectedBrochure.client}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleChatClick}
                    className="services-btn-yellow"
                  >
                    <img src={chatBubbleIcon} alt="Chat" title="Chat with Yaazh 360" width={14} height={14} className="w-3.5 h-3.5 object-contain" />
                    <span>Inquire</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCallClick}
                    className="services-btn-yellow"
                  >
                    <Phone className="w-3.5 h-3.5 fill-black text-black shrink-0" />
                    <span>Call Us</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SaiServicesSection;
