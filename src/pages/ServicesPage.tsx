import React from 'react';
import { SaiServicesSection } from '../components/services/SaiServicesSection';
import { SERVICE_PAGES } from '../lib/servicePages';

interface ServicesPageProps {
  onOpenContact: (serviceName?: string) => void;
  onNavigate?: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenContact, onNavigate }) => {
  return (
    <div className="pt-[72px] bg-white min-h-screen select-text font-josefin services-page">
      {/* ── Services Section Matching Reference Brochure Showcase ── */}
      <SaiServicesSection onOpenContact={onOpenContact} onNavigate={onNavigate} />
      <section className="max-w-7xl mx-auto px-6 py-12" aria-labelledby="service-guides-title">
        <h3 id="service-guides-title" className="text-3xl font-bold mb-6">Explore our services in Coimbatore</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(SERVICE_PAGES).map(([path, service]) => (
            <div key={path}>
              <h3 className="text-xl font-semibold mb-3"><a href={path} className="text-[#0052CC] underline">{service.heading}</a></h3>
              <p className="text-neutral-700 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
