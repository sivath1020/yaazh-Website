import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  Play,
  Star,
  Sparkles,
  CheckCircle2,
  Calendar,
  Activity,
} from 'lucide-react';

import aboutHeroBg from '../../assets/AboutNew/about_hero_bg.optimized.webp';
import c3Woman from '../../assets/AboutNew/c3_woman.optimized.webp';
import './AboutHeroSection.css';

interface AboutHeroSectionProps {
  onOpenContact?: (serviceName?: string) => void;
  onNavigate?: (path: string) => void;
}

export const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({
  onOpenContact,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  // Start with the AI insights card centered.
  const progressRef = useRef(4);

  const handleGetStarted = () => {
    if (onNavigate) {
      onNavigate('/contact');
    } else if (onOpenContact) {
      onOpenContact('Get Started Inquiry');
    } else {
      window.location.href = '/contact';
    }
  };

  const handleViewDemo = () => {
    if (onNavigate) {
      onNavigate('/work');
    } else {
      window.location.href = '/work';
    }
  };

  // ── 8 DISTINCT REAL CONTENT CARDS MATCHING REFERENCE DESIGN (IMAGE 2) ──
  const CARDS = [
    // ── CARD 0: Project Overview (Far Left) ──
    {
      id: 'project-overview',
      content: (
        <div className="w-[144px] sm:w-[152px] md:w-[158px] h-[172px] sm:h-[180px] md:h-[186px] bg-white rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.12)] border border-white/95 flex flex-col justify-between shrink-0 select-none text-left">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[11px] text-neutral-800 tracking-tight">
                Project Overview
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Cyan/Blue Bar Chart */}
            <div className="mt-3 h-14 sm:h-15 flex items-end justify-between gap-1.5 px-1 pb-1 border-b border-neutral-100">
              <div className="w-3 rounded-t bg-sky-200 h-[35%]" />
              <div className="w-3 rounded-t bg-sky-300 h-[55%]" />
              <div className="w-3 rounded-t bg-sky-400 h-[40%]" />
              <div className="w-3 rounded-t bg-[#0070F3] h-[75%]" />
              <div className="w-3 rounded-t bg-[#0051B3] h-[95%]" />
            </div>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div>
              <span className="text-base sm:text-lg font-black text-neutral-900 tracking-tight leading-none">
                88%
              </span>
              <p className="text-[8.5px] text-neutral-500 font-medium">Progress</p>
            </div>
            <span className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5 stroke-[2.5]" />
              +14%
            </span>
          </div>
        </div>
      ),
    },

    // ── CARD 1: Team Members (Left) ──
    {
      id: 'team-members',
      content: (
        <div className="w-[144px] sm:w-[152px] md:w-[158px] h-[172px] sm:h-[180px] md:h-[186px] bg-white rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.12)] border border-white/95 flex flex-col justify-between shrink-0 select-none text-left">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[11px] text-neutral-800 tracking-tight">
                Team Members
              </span>
              <span className="text-[8.5px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                Online
              </span>
            </div>

            <div className="mt-2 space-y-1.5">
              <div className="flex items-center justify-between p-0.5 rounded hover:bg-neutral-50">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white font-bold text-[9px] flex items-center justify-center">
                    P
                  </div>
                  <div>
                    <p className="text-[9.5px] font-bold text-neutral-900 leading-none">Pheone</p>
                    <p className="text-[7.5px] text-neutral-400">Design</p>
                  </div>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>

              <div className="flex items-center justify-between p-0.5 rounded hover:bg-neutral-50">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-[9px] flex items-center justify-center">
                    S
                  </div>
                  <div>
                    <p className="text-[9.5px] font-bold text-neutral-900 leading-none">Shane</p>
                    <p className="text-[7.5px] text-neutral-400">Dev</p>
                  </div>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>

              <div className="flex items-center justify-between p-0.5 rounded hover:bg-neutral-50">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-600 text-white font-bold text-[9px] flex items-center justify-center">
                    R
                  </div>
                  <div>
                    <p className="text-[9.5px] font-bold text-neutral-900 leading-none">Reece</p>
                    <p className="text-[7.5px] text-neutral-400">AI</p>
                  </div>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>

          <div className="pt-1 border-t border-neutral-100 flex items-center justify-between text-[8.5px] text-neutral-500">
            <span>Active Team</span>
            <span className="font-bold text-neutral-700">+12 more</span>
          </div>
        </div>
      ),
    },

    // ── CARD 2: Woman Portrait with Badges (Mid-Left) ──
    {
      id: 'growth-revenue',
      content: (
        <div className="w-[144px] sm:w-[152px] md:w-[158px] h-[172px] sm:h-[180px] md:h-[186px] rounded-2xl overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.18)] border border-white/90 relative shrink-0 select-none group text-left bg-neutral-900">
          <img
            src={c3Woman}
            alt="Product Leadership"
            title="Product Leadership"
            width={400}
            height={500}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Bottom Floating Badges matching reference */}
          <div className="absolute bottom-2 inset-x-2 z-10 flex items-center justify-between gap-1">
            <div className="flex-1 px-1.5 py-0.5 rounded-lg bg-white/95 backdrop-blur-md text-neutral-900 shadow-md">
              <span className="block text-[7px] uppercase tracking-wider text-neutral-500 font-bold">
                Growth
              </span>
              <span className="text-[9px] font-black text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-2 h-2 stroke-[2.5]" />
                +42%
              </span>
            </div>
            <div className="flex-1 px-1.5 py-0.5 rounded-lg bg-[#111111]/90 backdrop-blur-md text-white shadow-md border border-white/10">
              <span className="block text-[7px] uppercase tracking-wider text-neutral-400 font-bold">
                Revenue
              </span>
              <span className="text-[9px] font-black text-white">$12.8K</span>
            </div>
          </div>
        </div>
      ),
    },

    // ── CARD 3: Performance Analytics Line Chart (Center-Left Apex) ──
    {
      id: 'performance-analytics',
      content: (
        <div className="w-[144px] sm:w-[152px] md:w-[158px] h-[172px] sm:h-[180px] md:h-[186px] bg-white rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.12)] border border-white/95 flex flex-col justify-between shrink-0 select-none text-left">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[11px] text-neutral-800 tracking-tight">
                Performance Analytics
              </span>
              <Activity className="w-3 h-3 text-sky-500" />
            </div>

            {/* Smooth Wave Chart */}
            <div className="mt-2.5 relative">
              <svg viewBox="0 0 200 80" className="w-full h-14 sm:h-15 overflow-visible">
                <defs>
                  <linearGradient id="curveGradSm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,55 Q 35,30 70,45 T 140,20 T 200,8 L 200,80 L 0,80 Z"
                  fill="url(#curveGradSm)"
                />
                <path
                  d="M 0,55 Q 35,30 70,45 T 140,20 T 200,8"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="200" cy="8" r="3.5" fill="#0284c7" />
              </svg>
            </div>
          </div>

          <div className="pt-1 border-t border-neutral-100 flex items-center justify-between text-[8.5px]">
            <span className="font-bold text-neutral-800">+28.4% Velocity</span>
            <span className="text-neutral-400">0.4s sync</span>
          </div>
        </div>
      ),
    },

    // ── CARD 4: AI-Powered Insights (Center-Right Apex Flagship Dark Card) ──
    {
      id: 'ai-insights',
      content: (
        <div className="w-[144px] sm:w-[152px] md:w-[158px] h-[172px] sm:h-[180px] md:h-[186px] bg-[#0A0E17] text-white rounded-2xl p-3 sm:p-3.5 shadow-[0_16px_34px_rgba(0,0,0,0.32)] border border-white/15 flex flex-col justify-between shrink-0 select-none text-left">
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-[8.5px] font-extrabold tracking-wider uppercase border border-amber-400/25">
              <Sparkles className="w-2 h-2 text-amber-300" />
              AI ENGINE
            </span>

            <p className="mt-2.5 font-black text-xs sm:text-[13px] text-white leading-snug tracking-tight">
              AI-Powered Data analytics for smarter insights ✨
            </p>
          </div>

          <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[8.5px]">
            <span className="font-bold text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              99.8% Accuracy
            </span>
            <span className="text-neutral-400">Real-time</span>
          </div>
        </div>
      ),
    },

    // ── CARD 5: Automation Workflows (Mid-Right Royal Blue Card) ──
    {
      id: 'automation-workflows',
      content: (
        <div className="w-[144px] sm:w-[152px] md:w-[158px] h-[172px] sm:h-[180px] md:h-[186px] bg-gradient-to-br from-[#0066FF] to-[#0048C8] text-white rounded-2xl p-3 sm:p-3.5 shadow-[0_14px_30px_rgba(0,102,255,0.35)] border border-white/25 flex flex-col justify-between shrink-0 select-none text-left">
          <div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white text-[#0066FF] flex items-center justify-center shadow-md">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>

            <p className="mt-2.5 font-black text-xs sm:text-[13px] text-white leading-tight tracking-tight">
              Automation Workflows
            </p>
            <p className="mt-1 text-[8.5px] text-white/80 font-medium">14 Active Pipelines</p>
          </div>

          <div className="pt-1 border-t border-white/20 flex items-center justify-between text-[8.5px]">
            <span className="font-bold text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Auto-Sync
            </span>
            <ArrowRight className="w-3 h-3 text-white/90" />
          </div>
        </div>
      ),
    },

    // ── CARD 6: Today Tasks (Right) ──
    {
      id: 'today-tasks',
      content: (
        <div className="w-[144px] sm:w-[152px] md:w-[158px] h-[172px] sm:h-[180px] md:h-[186px] bg-white rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.12)] border border-white/95 flex flex-col justify-between shrink-0 select-none text-left">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[11px] text-neutral-800 tracking-tight">
                Today
              </span>
              <div className="flex items-center gap-1 text-[7.5px] font-semibold text-neutral-400">
                <span className="text-blue-600 font-bold bg-blue-50 px-1 py-0.5 rounded">
                  Tasks
                </span>
                <span>Feed</span>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-bold text-neutral-800">Tasks</span>
                <span className="text-base sm:text-lg font-black text-neutral-900 tracking-tight">52%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-neutral-100 mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-[52%]" />
              </div>
            </div>

            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-1 text-[8.5px] text-neutral-700 font-medium">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                <span className="truncate">Cloud Deployed</span>
              </div>
              <div className="flex items-center gap-1 text-[8.5px] text-neutral-700 font-medium">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                <span className="truncate">Strategy Matrix</span>
              </div>
            </div>
          </div>

          <div className="pt-1 border-t border-neutral-100 flex items-center justify-between text-[8.5px] text-neutral-500">
            <span>Goal</span>
            <span className="font-bold text-neutral-800">8 / 15 Done</span>
          </div>
        </div>
      ),
    },

    // ── CARD 7: Release Roadmap & Calendar (Far Right) ──
    {
      id: 'release-calendar',
      content: (
        <div className="w-[144px] sm:w-[152px] md:w-[158px] h-[172px] sm:h-[180px] md:h-[186px] bg-[#111928] text-white rounded-2xl p-3 sm:p-3.5 shadow-[0_14px_30px_rgba(0,0,0,0.22)] border border-white/10 flex flex-col justify-between shrink-0 select-none text-left">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5 text-sky-400" />
                <span className="font-bold text-[9.5px] text-white">Apr 2026</span>
              </div>
              <span className="text-[7.5px] font-bold text-neutral-400 bg-white/10 px-1.5 py-0.5 rounded">
                Sprint
              </span>
            </div>

            {/* Mini Calendar Grid */}
            <div className="mt-2 grid grid-cols-7 gap-0.5 text-center text-[7.5px] font-medium text-neutral-400">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
              <span className="py-0.5">7</span>
              <span className="py-0.5">8</span>
              <span className="py-0.5">9</span>
              <span className="py-0.5">10</span>
              <span className="py-0.5">11</span>
              <span className="py-0.5">12</span>
              <span className="py-0.5">13</span>
              <span className="py-0.5 rounded-full bg-[#DCFF37] text-black font-black shadow-xs">
                14
              </span>
              <span className="py-0.5">15</span>
              <span className="py-0.5">16</span>
              <span className="py-0.5">17</span>
              <span className="py-0.5">18</span>
              <span className="py-0.5">19</span>
              <span className="py-0.5">20</span>
            </div>
          </div>

          <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[8.5px]">
            <span className="font-bold text-white flex items-center gap-1">🚀 Launch</span>
            <span className="font-bold text-[#DCFF37]">Apr 14</span>
          </div>
        </div>
      ),
    },
  ];

  // Repeat the 8 cards to form 16 cards for an infinite, smooth cylindrical loop
  const LOOP_CARDS = [...CARDS, ...CARDS];
  const totalCards = LOOP_CARDS.length;

  // ── CONTINUOUS 3D CYLINDRICAL ARCH ANIMATION LOOP (EXACT MATCH CURVATURE OF IMAGE 2) ──
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    // Smooth gentle continuous translation
    const speed = 0.00018;

    const animate = (time: number) => {
      const dt = Math.min(time - lastTime, 50); // clamp dt to avoid sudden jump on tab switch
      lastTime = time;

      if (!isPausedRef.current && !isDraggingRef.current) {
        progressRef.current = (progressRef.current + speed * dt) % totalCards;
        if (progressRef.current < 0) progressRef.current += totalCards;
      }

      const container = containerRef.current;
      const containerWidth = container ? container.clientWidth : 1100;
      const isMobile = containerWidth < 640;
      const isTablet = containerWidth < 1024;

      const effectiveWidth = Math.min(containerWidth, 1440);
      const halfWidth = effectiveWidth * (isMobile ? 0.45 : isTablet ? 0.47 : 0.48);
      // Gentle natural cylinder curve angle (~44 degrees at horizon)
      const maxTheta = Math.PI * (isMobile ? 0.22 : 0.245);
      // Gentle parabolic arch drop matching Image 2 (outer cards dip ~30-36px, center 4 cards stay level)
      const archDrop = isMobile ? 24 : isTablet ? 30 : 36;
      const depthZ = isMobile ? 45 : 70;

      // Slot spacing: 0.245 allows 8-10 cards across the horizon with clean 12-16px gaps
      const spacing = isMobile ? 0.32 : isTablet ? 0.26 : 0.245;

      const currentProgress = progressRef.current;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        let slot = (i - currentProgress) % totalCards;
        if (slot > totalCards / 2) slot -= totalCards;
        if (slot < -totalCards / 2) slot += totalCards;

        // Mobile cards form a readable horizontal rail, without 3D overlap.
        if (isMobile) {
          const x = slot * 224;
          el.style.visibility = Math.abs(x) <= containerWidth / 2 + 112 ? 'visible' : 'hidden';
          el.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
          el.style.opacity = '1';
          el.style.zIndex = '1';
          return;
        }

        const u = slot * spacing;

        // Cull cards outside the panoramic horizon
        if (Math.abs(u) > 1.25) {
          el.style.visibility = 'hidden';
          return;
        }

        el.style.visibility = 'visible';

        const clampedU = Math.max(-1.1, Math.min(1.1, u));
        const theta = clampedU * maxTheta;

        // 1. X projection along cylinder
        const x = (Math.sin(theta) / Math.sin(maxTheta)) * halfWidth;

        // 2. Parabolic dome curve: gentle in the center, smoothly curves down at edges (exact match Image 2)
        const y = Math.pow(Math.abs(u), 1.85) * archDrop;

        // 3. Depth Z (gentle receding)
        const z = (Math.cos(theta) - 1.0) * depthZ;

        // 4. Perspective rotation: subtle inward angle tangent to cylinder
        const rotY = -((theta * 180) / Math.PI) * 0.88;

        // 5. Tangent bank tilt following the gentle arch curve
        const rotZ = -u * (isMobile ? 2.0 : 3.2);

        // 6. Scale drops smoothly towards the edges
        const scale = 1.0 - (isMobile ? 0.14 : 0.16) * Math.pow(Math.abs(u), 1.2);

        // 7. Opacity fades smoothly at extreme horizons
        let opacity = 1.0;
        if (Math.abs(u) > 0.96) {
          opacity = Math.max(0, 1.0 - (Math.abs(u) - 0.96) / 0.24);
        }

        const zIndex = Math.round(100 - Math.abs(u) * 50);

        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(zIndex);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [totalCards]);

  // ── INTERACTIVE MOUSE / TOUCH SWIPE DRAG HANDLERS ──
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartProgressRef.current = progressRef.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const containerWidth = containerRef.current?.clientWidth || 1100;
    const effectiveWidth = Math.min(containerWidth, 1440);
    const dProgress = containerWidth < 640 ? -dx / 224 : -(dx / effectiveWidth) * 3.5;
    progressRef.current = (dragStartProgressRef.current + dProgress) % totalCards;
    if (progressRef.current < 0) progressRef.current += totalCards;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartProgressRef.current = progressRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.touches[0].clientX - dragStartXRef.current;
    const containerWidth = containerRef.current?.clientWidth || 1100;
    const effectiveWidth = Math.min(containerWidth, 1440);
    const dProgress = containerWidth < 640 ? -dx / 224 : -(dx / effectiveWidth) * 3.5;
    progressRef.current = (dragStartProgressRef.current + dProgress) % totalCards;
    if (progressRef.current < 0) progressRef.current += totalCards;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="about-ai-hero relative w-full overflow-hidden text-white pt-10 sm:pt-14 md:pt-18 pb-10 sm:pb-14 select-text bg-gradient-to-b from-[#066AD8] via-[#1079EC] to-[#3B9DF8]">
      {/* Full-Bleed User Sky & Clouds Background Image (Edge-to-Edge) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src={aboutHeroBg}
          alt="Blue Sky and Clouds Background"
          title="Blue Sky and Clouds Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-bottom"
        />
        {/* Gentle top azure gradient overlay for crisp headline contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#005bb5]/25 via-transparent to-transparent pointer-events-none" />
      </div>

        {/* ── Hero Top Content: Typography & Interactive Actions ── */}
        <div className="about-ai-hero__copy relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          {/* Main Headline: "Building the future with AI and strategy" */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[66px] font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-md font-['Josefin_Sans',sans-serif]"
          >
            Building the future with <br className="hidden sm:inline" />
            <span className="text-white">AI and strategy</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-white/95 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm font-['Josefin_Sans',sans-serif]"
          >
            We help brands grow with smart tools and clear marketing strategy.
          </motion.p>

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
            className="about-ai-hero__actions mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            {/* 1. Translucent Navy Pill Button: "View Demo" */}
            <button
              type="button"
              onClick={handleViewDemo}
              className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#0D4E96]/55 hover:bg-[#0D4E96]/80 backdrop-blur-md text-white font-semibold text-sm sm:text-base border border-white/25 transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer font-['Josefin_Sans',sans-serif]"
            >
              View Demo
            </button>

            {/* 2. Neon Lime Pill Button: "Get Started ->" */}
            <button
              type="button"
              onClick={handleGetStarted}
              className="pl-6 pr-2.5 sm:pl-7 sm:pr-3 py-2 sm:py-2.5 rounded-full bg-[#DCFF37] hover:bg-[#C9F322] text-[#111111] font-bold text-sm sm:text-base transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer group font-['Josefin_Sans',sans-serif]"
            >
              <span>Get Started</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#111111] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* ── 3D CYLINDRICAL ARCH OF CARDS (EXACT MATCH TO REFERENCE IMAGE 2) ── */}
        <div
          ref={containerRef}
          className="about-ai-hero__rail relative z-10 mt-7 sm:mt-9 w-full max-w-[1440px] mx-auto h-[235px] sm:h-[245px] md:h-[258px] overflow-hidden select-none cursor-grab active:cursor-grabbing"
          style={{
            perspective: '1600px',
            perspectiveOrigin: '50% 50%',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
            isDraggingRef.current = false;
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {/* Card Anchor Stage */}
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {LOOP_CARDS.map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="about-ai-hero__card absolute top-2 sm:top-2.5 left-1/2 -ml-[72px] sm:-ml-[76px] md:-ml-[79px] will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {card.content}
              </div>
            ))}
          </div>
        </div>

        {/* ── RATING BADGE DIRECTLY BELOW CENTER CARDS OVER CLOUDS ── */}
        <div className="relative z-20 mt-3 sm:mt-4 text-center flex flex-col items-center">
          <p className="text-white font-bold text-xs sm:text-sm tracking-wide drop-shadow-md font-['Josefin_Sans',sans-serif]">
            Trusted by growing businesses
          </p>
          <div className="flex items-center justify-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-[#FFCC00] text-[#FFCC00] drop-shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
  );
};

export default AboutHeroSection;
