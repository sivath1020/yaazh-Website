import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { CorporateStatementSection } from '../components/scroll/CorporateStatementSection';
import { ExpertServicesSection } from '../components/about/ExpertServicesSection';
import { ExpandingCircleSection } from '../components/transitions/ExpandingCircleSection';
// import { KineticWorkSection } from '../components/work/KineticWorkSection';
import { WhatWeDoSection } from '../components/services/WhatWeDoSection';
// import { TechStackSection } from '../components/tech/TechStackSection';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { FaqSection } from '../components/faq/FaqSection';
// import { ContactSection } from '../components/contact/ContactSection';

interface HomePageProps {
  onOpenContact: (serviceName?: string) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenContact, onNavigate }) => {
  return (
    <div className="select-text">
      {/* 1. Hero Showcase Carousel */}
      <HeroSection
        onExploreClick={() => onNavigate('/services')}
        onOpenContact={() => onOpenContact()}
      />

      {/* 2. Corporate Statement: Scroll-Driven Text Blur & Focus Reveal (Bleap reference) */}
      <CorporateStatementSection
        onOpenContact={() => onOpenContact()}
        onExploreServices={() => onNavigate('/services')}
      />

      {/* 3. Expert Services & Corporate Capabilities (Directly Below Who We Are) */}
      <ExpertServicesSection
        onOpenContact={onOpenContact}
        onNavigate={onNavigate}
      />

      {/* 4. Expanding 3D Blue & Gold Portal / Morphing Lens */}
      <ExpandingCircleSection
        onOpenContact={() => onOpenContact()}
        onExploreServices={() => onNavigate('/work')}
      />

      {/* 4. Kinetic Typographic Statement - Featured Client Deployments (Hidden) */}
      {/* <KineticWorkSection /> */}

      {/* 5. What We Do - Full Spectrum Visual Capabilities */}
      <WhatWeDoSection />

      {/* 6. Senior Engineering & Technology Stack - Engineering Rigor (Hidden) */}
      {/* <TechStackSection /> */}

      {/* 8. Client Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* 9. Frequently Asked Questions (Executive Corporate FAQ) */}
      <FaqSection onOpenContact={onOpenContact} />

      {/* 10. Direct Contact & Consultation Builder - Get In Touch (Hidden) */}
      {/* <ContactSection /> */}
    </div>
  );
};

export default HomePage;
