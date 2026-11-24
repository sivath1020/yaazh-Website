import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ExpandingCircleProps {
  onOpenContact?: () => void;
  onExploreServices?: () => void;
}

const getPhraseOffsets = () => {
  if (typeof window === 'undefined') return { left: 135, right: 90 };
  const w = window.innerWidth;
  if (w >= 1440) return { left: 135, right: 90 };
  if (w >= 1280) return { left: 125, right: 84 };
  if (w >= 1024) return { left: 110, right: 74 };
  if (w >= 768) return { left: 95, right: 64 };
  if (w >= 640) return { left: 80, right: 54 };
  return { left: 34, right: 22 };
};

export const ExpandingCircleSection: React.FC<ExpandingCircleProps> = ({
  onOpenContact: _onOpenContact,
  onExploreServices: _onExploreServices,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);

  const [offsets, setOffsets] = useState(getPhraseOffsets);

  useEffect(() => {
    const handleResize = () => setOffsets(getPhraseOffsets());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll runway for Scene 1 and Scene 2 transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // =========================================================================
  // SCENE 1: "Our Digital Marketing Services in Coimbatore" (0.00 to 0.20)
  // =========================================================================
  const stage1CircleScale = useTransform(scrollYProgress, [0.03, 0.12], [1.0, 220.0]);
  const digitalMarketingColor = useTransform(
    scrollYProgress,
    [0.01, 0.04],
    ['#FF5500', '#FFFFFF']
  );
  const servicesColor = useTransform(
    scrollYProgress,
    [0.01, 0.04],
    ['#111111', '#FFFFFF']
  );

  const stage1TextOpacity = useTransform(scrollYProgress, [0.00, 0.16, 0.22], [1, 1, 0]);
  const orangeScreenOpacity = useTransform(scrollYProgress, [0.08, 0.12, 0.18, 0.22], [0, 1, 1, 0]);

  // =========================================================================
  // SCENE 2: The Exact 5-State Workflow (Original Animation)
  // =========================================================================
  const scene2Opacity = useTransform(scrollYProgress, [0.17, 0.21, 0.88, 0.96], [0, 1, 1, 0]);

  // Central Orange Circle contracts into 'O' of WORK
  const centerCircleScale = useTransform(scrollYProgress, [0.17, 0.22, 0.24], [180.0, 18.0, 1.0]);
  const circleDotOpacity = useTransform(scrollYProgress, [0.17, 0.28, 0.30], [1, 1, 0]);

  // Phrases glide together to form "Work That Builds. That Delivers." with tight, balanced gaps
  const leftPhraseX = useTransform(
    scrollYProgress,
    [0.17, 0.25, 0.32, 1.00],
    [-offsets.left, -offsets.left, 0, 0]
  );
  const rightPhraseX = useTransform(
    scrollYProgress,
    [0.17, 0.25, 0.32, 1.00],
    [offsets.right, offsets.right, 0, 0]
  );

  // Top Row: "Work That Builds. That Delivers."
  // - State 1 (0.17 - 0.25): 0px (inline with WORK baseline)
  // - State 2 (0.25 - 0.96): -75px (rests comfortably above channel and line)
  const topRowY = useTransform(
    scrollYProgress,
    [0.17, 0.25, 0.32, 0.96],
    ['0px', '0px', '-75px', '-75px']
  );

  // Top Row Opacity
  const topRowOpacity = useTransform(
    scrollYProgress,
    [0.17, 0.22, 0.88, 0.96],
    [0, 1, 1, 0]
  );

  // Mobile sequence transforms (Exact match to reference Images 1, 2, 3)
  const mobileBuildsY = useTransform(
    scrollYProgress,
    [0.17, 0.25, 0.34, 0.96],
    ['-82px', '-82px', '-82px', '-82px']
  );
  const mobileDeliversY = useTransform(
    scrollYProgress,
    [0.17, 0.25, 0.34, 0.96],
    ['82px', '82px', '-50px', '-50px']
  );
  const mobileWorkY = useTransform(
    scrollYProgress,
    [0.17, 0.25, 0.34, 0.96],
    ['0px', '0px', '45px', '45px']
  );

  const workY = useTransform(
    scrollYProgress,
    [0.17, 0.25, 0.32, 1.00],
    ['0px', '0px', '65px', '65px']
  );
  const workScale = useTransform(
    scrollYProgress,
    [0.17, 0.25, 0.32, 1.00],
    [0.36, 0.36, 1.0, 1.0]
  );

  // Crossfade from outline to solid orange
  const outlineOpacity = useTransform(scrollYProgress, [0.17, 0.25, 0.29], [1, 1, 0]);
  const solidOpacity = useTransform(
    scrollYProgress,
    [0.26, 0.32, 0.88, 0.96],
    [0, 1, 1, 0]
  );

  // Letter dispersion tumble (locks in by 0.32)
  const wX = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, -22, 0]);
  const wY = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, -8, 0]);
  const wRotate = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, -18, 0]);

  const oX = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, -8, 0]);
  const oY = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, 14, 0]);
  const oRotate = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, -10, 0]);

  const rX = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, 14, 0]);
  const rY = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, 15, 0]);
  const rRotate = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, 24, 0]);

  const kX = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, 16, 0]);
  const kY = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, -10, 0]);
  const kRotate = useTransform(scrollYProgress, [0.25, 0.28, 0.32], [0, -16, 0]);

  // 1. FIRST WAVE: Dynamic Curved S-Wave Ribbon Flow across WORK (0.32 to 0.44)
  const waveOpacity = useTransform(scrollYProgress, [0.32, 0.35, 0.41, 0.44], [0, 1, 1, 0]);
  const tickerWaveOffset = useTransform(scrollYProgress, [0.32, 0.44], ['42%', '-42%']);

  // 2. AND THE LINE WORDS: Straight Horizontal Channel Ticker Stream (0.44 to 0.54)
  const tickerX = useTransform(scrollYProgress, [0.44, 0.49, 0.54], ['75vw', '10vw', '-45vw']);
  const tickerOpacity = useTransform(scrollYProgress, [0.44, 0.46, 0.52, 0.54], [0, 1, 1, 0]);

  // 3. AND LINE: Full-width Orange Horizontal Divider Line (0.54 to 0.96)
  const orangeLineOpacity = useTransform(scrollYProgress, [0.54, 0.57, 0.88, 0.96], [0, 1, 1, 0]);
  const orangeLineScaleX = useTransform(scrollYProgress, [0.54, 0.62], [0, 1]);

  return (
    <div
      ref={containerRef}
      id="digital-marketing-core"
      className="relative min-h-[220vh] sm:min-h-[300vh] md:min-h-[360vh] bg-white overflow-visible font-sans select-text"
    >
      {/* Sticky Fullscreen Canvas: Pinned throughout the entire sequence with safe navbar padding */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white pt-16 sm:pt-20">

        {/* Solid Orange Backdrop for Scene 1 */}
        <motion.div
          style={{ opacity: orangeScreenOpacity }}
          className="absolute inset-0 bg-[#FF5500] pointer-events-none z-10"
        />

        {/* ================================================================= */}
        {/* SCENE 1: "Our Digital Marketing Services in Coimbatore"           */}
        {/* ================================================================= */}
        <motion.div
          style={{ opacity: stage1TextOpacity }}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 z-30 pointer-events-none pt-16 sm:pt-20"
        >
          <div className="relative w-full max-w-6xl flex flex-wrap items-center justify-center text-center mx-auto gap-2 sm:gap-3.5 md:gap-4.5">
            {/* Left Word: "Our" with expanding orange circle dot in 'O' */}
            <span className="relative z-30 font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[54px] leading-tight tracking-tight text-[#111111] inline-flex items-center">
              <span className="relative inline-flex items-center justify-center">
                O
                <motion.span
                  style={{
                    scale: stage1CircleScale,
                    transformOrigin: 'center center',
                  }}
                  className="absolute w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] rounded-full bg-[#FF5500] pointer-events-none -z-10 shadow-sm"
                />
              </span>
              ur
            </span>

            {/* Center Words: "Digital Marketing" */}
            <motion.span
              style={{
                color: digitalMarketingColor,
              }}
              className="relative z-30 font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[54px] leading-tight tracking-tight inline-block whitespace-nowrap"
            >
              Digital Marketing
            </motion.span>

            {/* Right Words: "Services in Coimbatore" */}
            <span className="relative z-30 font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[54px] leading-tight tracking-tight text-[#111111] inline-flex items-center flex-wrap justify-center">
              <motion.span
                style={{
                  color: servicesColor,
                }}
                className="font-black inline-block"
              >
                Services
              </motion.span>
              <span className="ml-2 sm:ml-3">in Coimbatore</span>
            </span>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* UNIFIED SCENE 2: The Exact 5-State Workflow (Original Animation)  */}
        {/* ================================================================= */}
        <motion.div
          style={{ opacity: scene2Opacity }}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none pt-16 sm:pt-20 z-20"
        >
          {/* ══════════════════════════════════════════════════════════════
              DESKTOP LAYOUT (md and up): 100% Unchanged original animation
              ══════════════════════════════════════════════════════════════ */}
          <div className="hidden md:flex relative w-full max-w-7xl mx-auto items-center justify-center">

            {/* TOP ROW: "Work That Builds." and "That Delivers." */}
            <motion.div
              ref={topRowRef}
              style={{ y: topRowY, opacity: topRowOpacity }}
              className="absolute flex items-center justify-center gap-1.5 sm:gap-3.5 md:gap-4 z-35 pointer-events-none"
            >
              <motion.span
                style={{ x: leftPhraseX }}
                className="font-sans font-bold text-sm sm:text-xl md:text-3xl lg:text-4xl xl:text-[44px] text-[#111111] whitespace-nowrap tracking-tight inline-block"
              >
                Work That Builds.
              </motion.span>

              <motion.span
                style={{ x: rightPhraseX }}
                className="font-sans font-bold text-sm sm:text-xl md:text-3xl lg:text-4xl xl:text-[44px] text-[#111111] whitespace-nowrap tracking-tight inline-block"
              >
                That Delivers.
              </motion.span>
            </motion.div>

            {/* 1. FIRST: DYNAMIC CURVED S-WAVE RIBBON FLOW ACROSS WORK */}
            <motion.div
              style={{
                opacity: waveOpacity,
                y: 65,
              }}
              className="absolute w-full max-w-7xl h-[360px] pointer-events-none z-30 flex items-center justify-center overflow-visible"
            >
              <svg
                viewBox="0 0 1600 400"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  id="tickerWavePath"
                  d="M -150 240 C 120 220, 320 90, 520 90 C 720 90, 740 310, 920 310 C 1080 310, 1180 120, 1320 120 C 1460 120, 1600 240, 1750 280"
                  fill="none"
                  stroke="none"
                />
                <text className="font-sans font-bold text-[22px] tracking-tight fill-[#111111]">
                  <motion.textPath
                    href="#tickerWavePath"
                    xlinkHref="#tickerWavePath"
                    startOffset={tickerWaveOffset}
                  >
                    Because when the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11. &nbsp;&nbsp;&bull;&nbsp;&nbsp; Because when the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11. &nbsp;&nbsp;&bull;&nbsp;&nbsp; Because when the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11. &nbsp;&nbsp;&bull;&nbsp;&nbsp; Because when the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11.
                  </motion.textPath>
                </text>
              </svg>
            </motion.div>

            {/* 2. AND THE LINE WORDS: STRAIGHT HORIZONTAL CHANNEL TICKER */}
            <motion.div
              style={{
                x: tickerX,
                opacity: tickerOpacity,
                y: -10,
              }}
              className="absolute whitespace-nowrap pointer-events-none z-30 font-sans text-xs sm:text-sm md:text-[15px] font-semibold tracking-tight text-[#111111]"
            >
              <span>
                Because when the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11. &nbsp;&nbsp;&bull;&nbsp;&nbsp; Because when the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11. &nbsp;&nbsp;&bull;&nbsp;&nbsp; Because when the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11.
              </span>
            </motion.div>

            {/* 3. AND LINE: FULL-WIDTH ORANGE HORIZONTAL DIVIDER LINE (Z-10 in background) */}
            <motion.div
              style={{
                opacity: orangeLineOpacity,
                scaleX: orangeLineScaleX,
                transformOrigin: 'left center',
                y: -10,
              }}
              className="absolute w-full h-[2px] bg-[#FF5500] pointer-events-none z-10"
            />

            {/* BOTTOM ROW: The Word WORK (W, O, R, K) */}
            <motion.div
              ref={workRef}
              style={{
                y: workY,
                scale: workScale,
              }}
              className="absolute flex items-center justify-center origin-center z-20"
            >
              {/* Letter W */}
              <motion.span
                style={{ x: wX, y: wY, rotate: wRotate }}
                className="relative inline-block font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[155px] leading-none tracking-tight"
              >
                <motion.span style={{ opacity: outlineOpacity }} className="text-outline-orange inline-block">
                  W
                </motion.span>
                <motion.span style={{ opacity: solidOpacity }} className="absolute inset-0 text-[#FF5500] inline-block pointer-events-none">
                  W
                </motion.span>
              </motion.span>

              {/* Letter O with Contracting Orange Circle */}
              <motion.span
                style={{ x: oX, y: oY, rotate: oRotate }}
                className="relative inline-flex items-center justify-center font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[155px] leading-none tracking-tight mx-0.5 sm:mx-1 md:mx-1.5"
              >
                <motion.span style={{ opacity: outlineOpacity }} className="text-outline-orange inline-block">
                  O
                </motion.span>
                <motion.span style={{ opacity: solidOpacity }} className="absolute inset-0 text-[#FF5500] inline-block pointer-events-none">
                  O
                </motion.span>

                <motion.span
                  style={{
                    scale: centerCircleScale,
                    opacity: circleDotOpacity,
                    transformOrigin: 'center center',
                  }}
                  className="absolute w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 lg:w-14 lg:h-14 rounded-full bg-[#FF5500] pointer-events-none -z-10"
                />
              </motion.span>

              {/* Letter R */}
              <motion.span
                style={{ x: rX, y: rY, rotate: rRotate }}
                className="relative inline-block font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[155px] leading-none tracking-tight mx-0.5 sm:mx-1"
              >
                <motion.span style={{ opacity: outlineOpacity }} className="text-outline-orange inline-block">
                  R
                </motion.span>
                <motion.span style={{ opacity: solidOpacity }} className="absolute inset-0 text-[#FF5500] inline-block pointer-events-none">
                  R
                </motion.span>
              </motion.span>

              {/* Letter K */}
              <motion.span
                style={{ x: kX, y: kY, rotate: kRotate }}
                className="relative inline-block font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[155px] leading-none tracking-tight"
              >
                <motion.span style={{ opacity: outlineOpacity }} className="text-outline-orange inline-block">
                  K
                </motion.span>
                <motion.span style={{ opacity: solidOpacity }} className="absolute inset-0 text-[#FF5500] inline-block pointer-events-none">
                  K
                </motion.span>
              </motion.span>
            </motion.div>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              MOBILE VIEW ONLY (< md): Exact match to user reference screenshots
              - State 1 (Image 1): "Work That Builds." (top), WORK outline (mid), "That Delivers." (bottom)
              - State 2 (Image 2): "Work That Builds." / "That Delivers." stacked top, WORK solid orange (mid)
              - State 3 (Image 3): S-wave ribbon flowing across solid orange WORK
              ══════════════════════════════════════════════════════════════ */}
          <div className="flex md:hidden relative w-full max-w-xs mx-auto items-center justify-center h-[320px]">
            {/* Top Phrase: "Work That Builds." */}
            <motion.div
              style={{ y: mobileBuildsY }}
              className="absolute z-35 font-sans font-bold text-xl text-[#111111] text-center tracking-tight whitespace-nowrap"
            >
              Work That Builds.
            </motion.div>

            {/* Phrase 2: "That Delivers." */}
            {/* In State 1 (Image 1): sits below WORK (+82px) */}
            {/* In State 2 (Image 2): glides up right beneath "Work That Builds." (-50px) */}
            <motion.div
              style={{ y: mobileDeliversY }}
              className="absolute z-35 font-sans font-bold text-xl text-[#111111] text-center tracking-tight whitespace-nowrap"
            >
              That Delivers.
            </motion.div>

            {/* S-WAVE TICKER RIBBON (Image 3) */}
            <motion.div
              style={{
                opacity: waveOpacity,
                y: mobileWorkY,
              }}
              className="absolute w-[calc(100vw+32px)] max-w-[800px] h-[210px] pointer-events-none z-30 flex items-center justify-center overflow-visible"
            >
              <svg
                viewBox="0 0 400 160"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  id="mobileTickerWavePath"
                  d="M -40 120 C 50 110, 110 35, 190 35 C 250 35, 270 135, 330 135 C 370 135, 410 90, 460 100"
                  fill="none"
                  stroke="none"
                />
                <text className="font-sans font-bold text-[17px] tracking-tight fill-[#111111]">
                  <motion.textPath
                    href="#mobileTickerWavePath"
                    xlinkHref="#mobileTickerWavePath"
                    startOffset={tickerWaveOffset}
                  >
                    the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11. &nbsp;&bull;&nbsp; the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11.
                  </motion.textPath>
                </text>
              </svg>
            </motion.div>

            {/* Straight text ribbon follows the wave on mobile as on desktop. */}
            <motion.div
              style={{ x: tickerX, opacity: tickerOpacity, y: -6 }}
              className="absolute whitespace-nowrap pointer-events-none z-30 font-sans text-sm font-semibold tracking-tight text-[#111111]"
            >
              Because when the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11. &nbsp;&bull;&nbsp; Because when the right minds come together, 1 + 1 doesn&#39;t make 2. It becomes 11.
            </motion.div>

            <motion.div
              style={{ opacity: orangeLineOpacity, scaleX: orangeLineScaleX, transformOrigin: 'left center', y: -6 }}
              className="absolute w-screen h-[3px] bg-[#FF5500] pointer-events-none z-10"
              aria-hidden="true"
            />

            {/* WORD "WORK" (Images 1, 2, 3) */}
            <motion.div
              style={{ y: mobileWorkY }}
              className="absolute flex items-center justify-center z-20"
            >
              {/* W */}
              <span className="relative inline-block font-sans font-black text-5xl leading-none tracking-tight">
                <motion.span style={{ opacity: outlineOpacity }} className="text-outline-orange inline-block">
                  W
                </motion.span>
                <motion.span style={{ opacity: solidOpacity }} className="absolute inset-0 text-[#FF5500] inline-block pointer-events-none">
                  W
                </motion.span>
              </span>

              {/* O with contracting orange circle */}
              <span className="relative inline-flex items-center justify-center font-sans font-black text-5xl leading-none tracking-tight mx-1">
                <motion.span style={{ opacity: outlineOpacity }} className="text-outline-orange inline-block">
                  O
                </motion.span>
                <motion.span style={{ opacity: solidOpacity }} className="absolute inset-0 text-[#FF5500] inline-block pointer-events-none">
                  O
                </motion.span>
                <motion.span
                  style={{
                    scale: centerCircleScale,
                    opacity: circleDotOpacity,
                    transformOrigin: 'center center',
                  }}
                  className="absolute w-5 h-5 rounded-full bg-[#FF5500] pointer-events-none -z-10"
                />
              </span>

              {/* R */}
              <span className="relative inline-block font-sans font-black text-5xl leading-none tracking-tight mx-0.5">
                <motion.span style={{ opacity: outlineOpacity }} className="text-outline-orange inline-block">
                  R
                </motion.span>
                <motion.span style={{ opacity: solidOpacity }} className="absolute inset-0 text-[#FF5500] inline-block pointer-events-none">
                  R
                </motion.span>
              </span>

              {/* K */}
              <span className="relative inline-block font-sans font-black text-5xl leading-none tracking-tight">
                <motion.span style={{ opacity: outlineOpacity }} className="text-outline-orange inline-block">
                  K
                </motion.span>
                <motion.span style={{ opacity: solidOpacity }} className="absolute inset-0 text-[#FF5500] inline-block pointer-events-none">
                  K
                </motion.span>
              </span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ExpandingCircleSection;
