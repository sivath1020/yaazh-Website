import React from 'react';
import { motion } from 'framer-motion';

import creativeIcon from '../../assets/benefits/benefit-creative.optimized.webp';
import futuristicIcon from '../../assets/benefits/benefit-futuristic.optimized.webp';
import resultDrivenIcon from '../../assets/benefits/benefit-result-driven.optimized.webp';
import scalableIcon from '../../assets/benefits/benefit-scalable.optimized.webp';
import affordableIcon from '../../assets/benefits/benefit-affordable.optimized.webp';
import benefitsBg from '../../assets/benefits/benefits-bg.optimized.webp';

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  alt: string;
}

const benefitsData: BenefitItem[] = [
  {
    id: 'creative',
    title: 'Creative',
    description:
      'Regardless of the job we get, our creativity makes the outcome more productive and result-driven.',
    icon: creativeIcon,
    alt: 'Creative Solutions Icon',
  },
  {
    id: 'futuristic',
    title: 'Futuristic',
    description:
      'We think about tomorrow. Thus, our futuristic solution follows current trends and technologies.',
    icon: futuristicIcon,
    alt: 'Futuristic Innovation Icon',
  },
  {
    id: 'result-driven',
    title: 'Result-Driven',
    description:
      'Our solutions are designed to succeed. We ensure that our solution brings you the preferred result.',
    icon: resultDrivenIcon,
    alt: 'Result-Driven Analytics Icon',
  },
  {
    id: 'scalable',
    title: 'Scalable',
    description:
      'We know your business will grow. Our solutions are scalable enough to match your growing requirements.',
    icon: scalableIcon,
    alt: 'Scalable Growth Icon',
  },
  {
    id: 'affordable',
    title: 'Affordable',
    description:
      'Charging a skyrocketing amount and fooling clients have never been our forte. Our solutions are pocket-friendly.',
    icon: affordableIcon,
    alt: 'Affordable Pricing Icon',
  },
];

export const DigitalSolutionsBenefitsSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white select-text font-sans">
      {/* ══════════════════════════════════════════════════════════════
          TOP CRIMSON/RED BANNER (EXACT MATCH TO REFERENCE IMAGE 1)
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full bg-[#E41C26] pt-12 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 px-4 sm:px-6 overflow-hidden text-center text-white">
        {/* Authentic Reference Background Image with Natural Wave Accents */}
        <img decoding="async"
          src={benefitsBg}
          alt="Benefits Banner Background"
          title="Benefits Banner Background"
          width={1920}
          height={600}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          loading="eager"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Eyebrow: BENEFITS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="text-[12px] sm:text-[13px] font-bold tracking-[0.25em] uppercase text-white mb-2 sm:mb-2.5 font-sans"
          >
            BENEFITS
          </motion.div>

          {/* Main Heading: 5 Qualities of Our Digital Solutions */}
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-bold text-white tracking-tight leading-tight font-sans"
          >
            5 Qualities of Our Digital Solutions
          </motion.h3>

          {/* Yellow Divider Pill Accent */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="w-12 sm:w-14 h-1 sm:h-1.5 bg-[#FFD020] rounded-full mx-auto my-3 sm:my-3.5"
          />

          {/* Subtitle Description (Single Line on Desktop to Match Image 1) */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="text-white/95 text-xs sm:text-[13px] md:text-[14px] lg:text-[15px] font-normal max-w-4xl lg:max-w-5xl mx-auto leading-relaxed font-sans sm:whitespace-nowrap"
          >
            Whatever we do, quality remains constant. That&apos;s how we have been able to offer the best web design in Coimbatore.
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          OVERLAPPING 5 FLOATING CARDS SHELF
          Note: This wrapper is transparent so the red banner is visible
          in the top overlap region between and around the cards!
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full pb-16 sm:pb-24">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="-mt-14 sm:-mt-16 md:-mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-4 xl:gap-5 items-stretch">
            {benefitsData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.88, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -14,
                  scale: 1.025,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }}
                className="relative z-10 hover:z-30 bg-white rounded-[12px] pt-7 pb-8 px-4 sm:px-5 flex flex-col items-center text-center border border-neutral-200/60 hover:border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.24),-14px_0_30px_-4px_rgba(0,0,0,0.12),14px_0_30px_-4px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group select-none"
              >
                {/* Hand-Drawn Illustrated Icon with Scroll Popup Effect & Hover Scale */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.78, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1 + 0.12,
                    ease: [0.34, 1.45, 0.64, 1],
                  }}
                  className="w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center mb-3 sm:mb-4"
                >
                  <img decoding="async"
                    src={item.icon}
                    alt={item.alt}
                    title={item.alt}
                    width={72}
                    height={72}
                    className="w-full h-full object-contain pointer-events-none select-none filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </motion.div>

                {/* Card Title with Scroll Popup Effect */}
                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.1 + 0.18,
                    ease: 'easeOut',
                  }}
                  className="text-base sm:text-lg md:text-[19px] font-bold text-[#111111] tracking-tight mb-2 font-sans group-hover:text-[#E41C26] transition-colors duration-200"
                >
                  {item.title}
                </motion.h3>

                {/* Card Description with Scroll Popup Effect */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.1 + 0.24,
                    ease: 'easeOut',
                  }}
                  className="text-[12px] sm:text-[12.5px] md:text-[13px] text-[#555555] leading-relaxed font-normal font-sans"
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalSolutionsBenefitsSection;
