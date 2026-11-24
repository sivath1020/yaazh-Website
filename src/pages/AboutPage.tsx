import React from 'react';
import { AboutHeroSection } from '../components/about/AboutHeroSection';
import { DigitalSolutionsBenefitsSection } from '../components/about/DigitalSolutionsBenefitsSection';
import { TeamSection } from '../components/about/TeamSection';
import { ArrowRight } from 'lucide-react';
import aboutMarketing from '../assets/about_mission_marketing.webp';
import aboutOffice from '../assets/about_mission_office.webp';
import './AboutPage.css';

interface AboutPageProps {
  onOpenContact: (serviceName?: string) => void;
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenContact, onNavigate }) => {
  return (
    <div className="pt-[72px] bg-white min-h-screen font-josefin select-text">
      {/* ══════════════════════════════════════════════════════════════
          1. HERO SECTION: AI & STRATEGY WITH SKY BLUE CLOUD CAROUSEL
          ══════════════════════════════════════════════════════════════ */}
      <AboutHeroSection onOpenContact={onOpenContact} onNavigate={onNavigate} />

      {/* ══════════════════════════════════════════════════════════════
          2. ABOUT US & OUR MISSION
          ══════════════════════════════════════════════════════════════ */}
      <section id="about-mission" className="about-mission" aria-labelledby="about-mission-title">
        <div className="about-mission__inner">
          <div className="about-mission__copy">
            <p className="about-mission__eyebrow"><span aria-hidden="true" /> About us</p>
            <h2 id="about-mission-title">Yaazh 360 is on a mission to <span>transform digital experiences</span></h2>
          </div>
          <figure className="about-mission__image">
            <img src={aboutMarketing} alt="Yaazh 360 marketing strategy session" title="Yaazh 360 marketing strategy session" loading="lazy" width={500} height={667} />
            <img src={aboutOffice} alt="Yaazh 360 team collaborating on digital solutions" title="Yaazh 360 team collaborating on digital solutions" loading="lazy" width={500} height={750} />
          </figure>
          <p className="about-mission__description">
            We build smart software and run performance marketing that helps businesses grow. From custom web portals and mobile apps to targeted ad campaigns, we partner with ambitious brands. Our team eliminates daily roadblocks so your business scales with confidence.
          </p>
        </div>
      </section>

      <TeamSection />

      {/* ══════════════════════════════════════════════════════════════
          4. 5 QUALITIES OF OUR DIGITAL SOLUTIONS (BENEFITS)
          ══════════════════════════════════════════════════════════════ */}
      <DigitalSolutionsBenefitsSection />

      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white text-[#111111] text-center select-none border-t border-neutral-100">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
            Ready to Build Your Digital Future With Us?
          </h3>
          <p className="mt-4 text-neutral-600 text-base sm:text-lg font-normal leading-relaxed">
            Let&apos;s collaborate on your next breakthrough software platform, marketing campaign,
            or mobile application.
          </p>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate('/contact') : window.location.assign('/contact')}
            className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0052CC] hover:bg-[#0043a8] text-white font-bold transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Talk With Our Team</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
