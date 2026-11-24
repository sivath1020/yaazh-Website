import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Background crumpled paper texture matching reference image
import bgImage from '../../assets/bg image.optimized.webp';

// Transparent separate illustrated icons from yaazh360_separate_transparent_icons
import websiteIcon from '../../assets/yaazh360_separate_transparent_icons/website_development.optimized.webp';
import ecommerceIcon from '../../assets/yaazh360_separate_transparent_icons/ecommerce_development.optimized.webp';
import mobileIcon from '../../assets/yaazh360_separate_transparent_icons/mobile_app_development.optimized.webp';
import softwareIcon from '../../assets/yaazh360_separate_transparent_icons/software_development.optimized.webp';
import seoIcon from '../../assets/yaazh360_separate_transparent_icons/seo_search.optimized.webp';
import leadgenIcon from '../../assets/yaazh360_separate_transparent_icons/lead_generation.optimized.webp';
import gmbIcon from '../../assets/yaazh360_separate_transparent_icons/google_business_profile.optimized.webp';
import socialIcon from '../../assets/yaazh360_separate_transparent_icons/social_media_management.optimized.webp';
import graphicIcon from '../../assets/yaazh360_separate_transparent_icons/graphic_design.optimized.webp';
import programmaticIcon from '../../assets/yaazh360_separate_transparent_icons/programmatic_ads.optimized.webp';
import erpIcon from '../../assets/yaazh360_separate_transparent_icons/erp_marketing.optimized.webp';
import gadsIcon from '../../assets/yaazh360_separate_transparent_icons/google_ads.optimized.webp';

export interface WhatWeDoItem {
  id: string;
  title: string;
  displayLines: string[];
  isSingleLine: boolean;
  icon: string;
}

const WHAT_WE_DO_SERVICES: WhatWeDoItem[] = [
  // Column 1 - Row 1: Website Development
  {
    id: 'website-development',
    title: 'Website Development',
    displayLines: ['Website Development'],
    isSingleLine: true,
    icon: websiteIcon,
  },
  // Column 2 - Row 1: Ecommerce Development
  {
    id: 'ecommerce-development',
    title: 'Ecommerce Development',
    displayLines: ['Ecommerce Development'],
    isSingleLine: true,
    icon: ecommerceIcon,
  },
  // Column 3 - Row 1: Mobile App Development
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    displayLines: ['Mobile App Development'],
    isSingleLine: true,
    icon: mobileIcon,
  },

  // Column 1 - Row 2: Software Development
  {
    id: 'software-development',
    title: 'Software Development',
    displayLines: ['Software Development'],
    isSingleLine: true,
    icon: softwareIcon,
  },
  // Column 2 - Row 2: Search Engine Optimization (2 lines)
  {
    id: 'search-engine-optimization',
    title: 'Search Engine Optimization',
    displayLines: ['Search Engine', 'Optimization'],
    isSingleLine: false,
    icon: seoIcon,
  },
  // Column 3 - Row 2: Lead Generation(Paid Ads) (2 lines)
  {
    id: 'lead-generation',
    title: 'Lead Generation(Paid Ads)',
    displayLines: ['Lead Generation(Paid', 'Ads)'],
    isSingleLine: false,
    icon: leadgenIcon,
  },

  // Column 1 - Row 3: Google My Business Optimization (2 lines)
  {
    id: 'google-business-profile',
    title: 'Google My Business Optimization',
    displayLines: ['Google My Business', 'Optimization'],
    isSingleLine: false,
    icon: gmbIcon,
  },
  // Column 2 - Row 3: Social Media Management
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    displayLines: ['Social Media Management'],
    isSingleLine: true,
    icon: socialIcon,
  },
  // Column 3 - Row 3: Graphic Desiging
  {
    id: 'graphic-designing',
    title: 'Graphic Desiging',
    displayLines: ['Graphic Desiging'],
    isSingleLine: true,
    icon: graphicIcon,
  },

  // Column 1 - Row 4: Programatic Ads
  {
    id: 'programmatic-ads',
    title: 'Programatic Ads',
    displayLines: ['Programatic Ads'],
    isSingleLine: true,
    icon: programmaticIcon,
  },
  // Column 2 - Row 4: ERP
  {
    id: 'erp',
    title: 'ERP',
    displayLines: ['ERP'],
    isSingleLine: true,
    icon: erpIcon,
  },
  // Column 3 - Row 4: Google Ads
  {
    id: 'google-ads',
    title: 'Google Ads',
    displayLines: ['Google Ads'],
    isSingleLine: true,
    icon: gadsIcon,
  },
];

interface WhatWeDoSectionProps {
  className?: string;
}

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll Progress linked loading animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 35%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });

  // Vertical fill for desktop (top to bottom)
  const fillHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  // Horizontal fill for mobile (left to right)
  const fillWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className={`relative w-full overflow-hidden font-josefin scroll-mt-20 ${className}`}
    >
      {/* 
        FULL-WIDTH EDGE-TO-EDGE SECTION:
        Exact match to saitechnosolutions.com reference image:
        - Left: Solid red bar with rotated bold BLACK "What we do" text with scroll loading fill
        - Right: Full-width paper background using `bg image.png`
        - 3 Columns x 4 Rows clean grid
        - Proportional icons with black text matching the live reference
      */}
      <div className="w-full relative shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-y border-neutral-200">
        <div className="flex flex-col md:flex-row min-h-[460px] lg:min-h-[500px] xl:min-h-[540px] w-full">
          
          {/* 1. LEFT RED BANNER: Scroll Loading Fill Effect matching Image 2 */}
          <div className="relative bg-[#FFF0ED] flex md:flex-col items-center justify-center shrink-0 w-full md:w-[130px] lg:w-[155px] xl:w-[175px] py-4 md:py-0 select-none overflow-hidden border-r border-[#E32B00]/20">
            {/* Desktop Vertical Loading Fill: Top to Bottom */}
            <motion.div
              className="hidden md:block absolute top-0 inset-x-0 bg-[#E32B00] shadow-[0_4px_14px_rgba(227,43,0,0.35)]"
              style={{ height: fillHeight }}
            />

            {/* Mobile Horizontal Loading Fill: Left to Right */}
            <motion.div
              className="md:hidden absolute left-0 inset-y-0 bg-[#E32B00] shadow-[4px_0_14px_rgba(227,43,0,0.35)]"
              style={{ width: fillWidth }}
            />

            {/* "What we do" Text Header */}
            <div className="relative z-10 flex items-center justify-center h-full pointer-events-none">
              <span
                className="font-black tracking-tight text-[#111111] whitespace-nowrap text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] md:[writing-mode:vertical-rl] md:rotate-180"
                style={{ letterSpacing: '-0.02em' }}
              >
                What we do
              </span>
            </div>
          </div>

          {/* 2. MAIN CRUMPLED PAPER CONTENT AREA using `bg image.png` */}
          <div className="relative flex-1 py-8 sm:py-10 lg:py-12 px-6 sm:px-10 lg:px-14 xl:px-18 flex flex-col justify-center overflow-hidden">
            {/* Softly blurred background texture */}
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-[1.5px] scale-105 pointer-events-none opacity-90"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundColor: '#f7f7f7',
              }}
            />
            {/* Soft highlight overlay */}
            <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 max-w-[1440px] xl:max-w-[1540px] w-full mx-auto">
              
              {/* 3 Columns x 4 Rows Grid matching saitechnosolutions.com layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-12 lg:gap-x-16 xl:gap-x-20 gap-y-4 sm:gap-y-5 lg:gap-y-6 xl:gap-y-7">
                {WHAT_WE_DO_SERVICES.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="group flex items-center space-x-3 sm:space-x-3.5 lg:space-x-4 py-1.5 px-2 transition-all duration-200"
                  >
                    {/* Clear, Crisp Illustrated Icon matching reference */}
                    <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] lg:w-[80px] lg:h-[80px] xl:w-[88px] xl:h-[88px] shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                      <img decoding="async"
                        src={item.icon}
                        alt={item.title}
                        title={item.title}
                        width={88}
                        height={88}
                        className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] group-hover:drop-shadow-[0_4px_8px_rgba(227,43,0,0.18)]"
                        loading="lazy"
                      />
                    </div>

                    {/* Text Label: Crisp Black Font (#111111) matching reference screenshot */}
                    <div className="flex-1 min-w-0">
                      {item.isSingleLine ? (
                        <span className="font-josefin font-medium sm:font-semibold text-[15px] sm:text-[16px] lg:text-[17px] xl:text-[17.5px] text-[#111111] leading-tight block whitespace-nowrap group-hover:text-[#E32B00] transition-colors duration-200">
                          {item.title}
                        </span>
                      ) : (
                        <div className="font-josefin font-medium sm:font-semibold text-[15px] sm:text-[16px] lg:text-[17px] xl:text-[17.5px] text-[#111111] leading-[1.25] group-hover:text-[#E32B00] transition-colors duration-200">
                          {item.displayLines.map((line, lIdx) => (
                            <span key={lIdx} className="block whitespace-nowrap">
                              {line}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
