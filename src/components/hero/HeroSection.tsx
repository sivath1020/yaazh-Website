import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import heroBgImg from '../../assets/Hero Section/Hero Bg Section.optimized.webp';
import hero01Img from '../../assets/Hero Section/Hero01.optimized.webp';
import hero02Img from '../../assets/Hero Section/Hero02.optimized.webp';
import hero03Img from '../../assets/Hero Section/Hero03.optimized.webp';
import './HeroSection.css';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onOpenContact?: () => void;
}

const slides = [
  {
    id: 1,
    image: hero03Img,
    alt: 'Yaazh360 Business Solutions Showcase',
    color: '#3B82F6',
    imgClassName: 'h-[70%] sm:h-[74%] md:h-[78%] lg:h-[82%] w-auto max-w-full md:max-w-[76%] lg:max-w-[72%] xl:max-w-[68%] scale-88 sm:scale-92 md:scale-96 lg:scale-100 object-right',
    translateXClass: 'translate-x-0 sm:translate-x-0 md:-translate-x-2 lg:-translate-x-4',
    paddingClass: 'pr-4 sm:pr-8 md:pr-12 lg:pr-16',
  },
  {
    id: 2,
    image: hero01Img,
    alt: 'Yaazh360 Digital Marketing Showcase',
    color: '#EF4444',
    imgClassName: 'h-[63%] sm:h-[67%] md:h-[71%] lg:h-[74%] w-auto max-w-full md:max-w-[68%] lg:max-w-[64%] xl:max-w-[60%] scale-80 sm:scale-84 md:scale-88 lg:scale-90 object-right',
    translateXClass: 'translate-x-0 sm:translate-x-0 md:-translate-x-2 lg:-translate-x-4',
    paddingClass: 'pr-4 sm:pr-8 md:pr-12 lg:pr-16',
  },
  {
    id: 3,
    image: hero02Img,
    alt: 'Yaazh360 Bring Your Ideas To Life Showcase',
    color: '#F59E0B',
    imgClassName: 'h-[72%] sm:h-[76%] md:h-[80%] lg:h-[84%] w-auto max-w-full md:max-w-[76%] lg:max-w-[72%] xl:max-w-[68%] scale-90 sm:scale-95 md:scale-98 lg:scale-102 object-right',
    translateXClass: 'translate-x-0 sm:translate-x-0 md:-translate-x-2 lg:-translate-x-4',
    paddingClass: 'pr-4 sm:pr-8 md:pr-12 lg:pr-16',
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '70%' : '-70%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 },
      opacity: { duration: 0.45, ease: 'easeOut' },
      scale: { duration: 0.45, ease: 'easeOut' },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-70%' : '70%',
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 },
      opacity: { duration: 0.35, ease: 'easeIn' },
      scale: { duration: 0.35, ease: 'easeIn' },
    },
  }),
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onOpenContact }) => {
  const [[pageIndex, direction], setPage] = useState<[number, number]>([0, 0]);

  const currentSlide = ((pageIndex % slides.length) + slides.length) % slides.length;

  const goToSlide = (targetIndex: number) => {
    if (targetIndex === currentSlide) return;
    const diff = targetIndex - currentSlide;
    const dir = diff > 0 ? 1 : -1;
    setPage(([prevPage]) => [prevPage + diff, dir]);
  };

  // Restart the five-second display time after automatic or dot navigation.
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(([previousPage]) => [previousPage + 1, 1]);
    }, 5000);
    return () => clearTimeout(timer);
  }, [pageIndex]);

  const activeSlide = slides[currentSlide];

  return (
    <section
      id="hero"
      aria-label="Hero Showcase"
      className="hero-showcase relative w-full h-[60vh] min-h-[440px] max-h-[580px] sm:h-screen sm:min-h-[600px] sm:max-h-[980px] pt-[64px] sm:pt-[72px] overflow-hidden bg-white font-ptsans flex items-center justify-end"
    >
      {/* 1. Underlying Seamless Crumpled Paper Texture */}
      <img
        src={heroBgImg}
        alt="Hero Background Texture"
        title="Hero Background Texture"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        loading="eager"
      />

      {/* 2. Left-Side Hero Text & Visual Accents (Dynamic Per-Slide Content) */}
      <div className="hero-showcase__copy absolute left-0 top-0 bottom-0 z-20 w-full lg:w-[48%] xl:w-[44%] flex items-center px-6 sm:px-10 md:px-12 lg:pl-16 xl:pl-20 lg:pr-2 pointer-events-none">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            /* ══════════════════════════════════════════════════════════════
               SLIDE 1: MATCHING GIVEN IMAGE 2 ("Wake up!!! Let's start your Business with Online")
               ══════════════════════════════════════════════════════════════ */
            <motion.div
              key="slide-1-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="hero-showcase__text pointer-events-auto max-w-lg w-full flex flex-col justify-center select-none"
            >
              <p className="text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-extrabold text-[#111111] tracking-tight leading-[1.12]">
                Wake up!!!
              </p>
              <p className="text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-extrabold text-[#111111] tracking-tight leading-[1.12]">
                Let&apos;s start your
              </p>

              <p className="my-0.5 sm:my-1 text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-extrabold text-[#F59E0B] tracking-tight leading-[1.12]">
                Business
              </p>

              <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                <span className="text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-extrabold text-[#111111] tracking-tight leading-[1.12]">
                  with Online
                </span>


              </div>

              {/* CTA Button */}
              <div className="flex items-center pt-4 sm:pt-6">
                <button
                  type="button"
                  onClick={() => onExploreClick?.()}
                  className="relative inline-flex items-center justify-center bg-[#FBC638] hover:bg-[#F59E0B] active:bg-[#D97706] text-[#111111] px-6 sm:px-7 py-2.5 sm:py-3 rounded-[4px] shadow-[2px_5px_0px_#0F172A] -skew-x-[12deg] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_6px_0px_#0F172A] active:translate-y-0.5 active:shadow-[1px_2px_0px_#0F172A] cursor-pointer group select-none"
                  aria-label="Explore Services"
                >
                  <span className="skew-x-[12deg] inline-flex items-center gap-1.5 sm:gap-2 font-bold text-[#111111] text-sm sm:text-base tracking-wide">
                    <span>Explore Services</span>
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#111111] stroke-[3.5] transition-transform duration-200 group-hover:translate-x-0.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {currentSlide === 1 && (
            /* ══════════════════════════════════════════════════════════════
               SLIDE 2: MATCHING GIVEN IMAGE 1 ("Digital Marketing That Gets Results")
               ══════════════════════════════════════════════════════════════ */
            <motion.div
              key="slide-2-content"
              data-slide="digital-marketing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="hero-showcase__text pointer-events-auto max-w-lg w-full flex flex-col justify-center select-none"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-extrabold text-[#111111] tracking-tight leading-[1.12]">
                Digital Marketing
              </h2>

              <p className="my-0.5 sm:my-1 text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-extrabold text-[#F59E0B] tracking-tight leading-[1.12]">
                <span className="block">That</span>
                <span className="block">Gets Results</span>
              </p>

              {/* Match the navbar Contact Us button treatment. */}
              <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onOpenContact?.()}
                    className="relative inline-flex items-center justify-center bg-[#1D4ED8] hover:bg-[#1E40AF] active:bg-[#1E3A8A] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-[4px] shadow-[2px_5px_0px_#0F172A] -skew-x-[12deg] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_6px_0px_#0F172A] active:translate-y-0.5 active:shadow-[1px_2px_0px_#0F172A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 cursor-pointer group select-none font-sans"
                  >
                    <span className="skew-x-[12deg] inline-flex items-center gap-1.5 sm:gap-2 font-bold text-white text-sm sm:text-[15px] tracking-wide whitespace-nowrap">
                      <span>Get a Quote</span>
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3.5] transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  </button>
              </div>
            </motion.div>
          )}

          {currentSlide === 2 && (
            /* ══════════════════════════════════════════════════════════════
               SLIDE 3: "Bring Your Ideas To Life with Yaazh360"
               ══════════════════════════════════════════════════════════════ */
            <motion.div
              key="slide-3-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="hero-showcase__text pointer-events-auto max-w-lg w-full flex flex-col justify-center select-none"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-extrabold text-[#111111] tracking-tight leading-[1.12]">
                Bring Your Ideas
              </h2>

              <p className="my-1 sm:my-2 text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-extrabold text-[#F59E0B] tracking-tight leading-[1.12]">
                To Life
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-extrabold text-[#111111] tracking-tight leading-[1.12]">
                with Yaazh360
              </h2>

              <div className="flex items-center pt-3.5 sm:pt-7">
                <button
                  type="button"
                  onClick={() => onExploreClick?.()}
                  className="relative inline-flex items-center justify-center bg-[#FBC638] hover:bg-[#F59E0B] active:bg-[#D97706] text-[#111111] px-6 sm:px-7 py-2.5 sm:py-3 rounded-[4px] shadow-[2px_5px_0px_#0F172A] -skew-x-[12deg] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_6px_0px_#0F172A] active:translate-y-0.5 active:shadow-[1px_2px_0px_#0F172A] cursor-pointer group select-none"
                  aria-label="Explore Services"
                >
                  <span className="skew-x-[12deg] inline-flex items-center gap-1.5 sm:gap-2 font-bold text-[#111111] text-sm sm:text-base tracking-wide">
                    <span>Explore Services</span>
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#111111] stroke-[3.5] transition-transform duration-200 group-hover:translate-x-0.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Horizontal Sliding Page Showcase */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={pageIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`hero-showcase__artwork relative z-10 w-full h-full select-none flex items-center justify-end transition-transform duration-300 ${
            activeSlide.paddingClass || 'pr-8 sm:pr-14 md:pr-24 lg:pr-32'
          } ${
            activeSlide.translateXClass || '-translate-x-6 sm:-translate-x-12 md:-translate-x-20 lg:-translate-x-28'
          }`}
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.alt}
            title={activeSlide.alt}
            width={1200}
            height={800}
            fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
            decoding="async"
            className={`hero-showcase__image object-contain pointer-events-none select-none transform origin-center transition-all duration-300 ${
              activeSlide.imgClassName || 'h-[96%] sm:h-[98%] md:h-full w-auto max-w-full md:max-w-[90%] lg:max-w-[84%] xl:max-w-[80%] scale-115 sm:scale-120 md:scale-125 lg:scale-130 object-right'
            }`}
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* 4. Slide Indicator Dots */}
      <div className="hero-showcase__pagination absolute bottom-2.5 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                isActive ? 'w-2.5 h-2.5 scale-125 ring-2 ring-white/80' : 'w-2 h-2 opacity-85 hover:opacity-100'
              }`}
              style={{ backgroundColor: slide.color }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
