import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Target, 
  Code2, 
  ArrowRight, 
  CheckCircle, 
  Smartphone,
  Gauge,
  Workflow
} from 'lucide-react';

interface ServicesDetailProps {
  onOpenContact: () => void;
}

export const ServicesDetailSection: React.FC<ServicesDetailProps> = ({ onOpenContact }) => {
  const serviceCards = [
    {
      icon: Search,
      category: 'Digital Marketing',
      title: 'Precision SEO & Organic Dominance',
      description: 'Capture highest-intent customers searching for your products or services. We handle deep technical audits, entity optimization, topical authority, and continuous link acquisition.',
      points: [
        'Core Web Vitals & Technical Crawl Budget Audits',
        'Topical Maps & Semantic Keyword Clustering',
        'Local SEO & Google Business Profile Hyper-Optimization',
        'International Multi-Language SEO Architecture',
      ],
      tag: 'High Organic ROI',
    },
    {
      icon: Target,
      category: 'Digital Marketing',
      title: 'High-Impact Paid Advertising (PPC)',
      description: 'Zero wasted ad spend. We engineer profitable conversion funnels across Google Search, Performance Max, Meta Ads, and LinkedIn B2B campaigns with end-to-end attribution.',
      points: [
        'Laser-Targeted Audience Segmentation & Lookalikes',
        'Dynamic Multi-Angle Creative Testing',
        'First-Party Data Attribution & Server-Side Tracking',
        'Landing Page Conversion Rate Optimization',
      ],
      tag: 'Aggressive Scale',
    },
    {
      icon: Code2,
      category: 'Software Solutions',
      title: 'Custom Web & Enterprise Software',
      description: 'Engineered like a 15-year veteran team: robust, modular, clean code written in modern TypeScript, React, Next.js, and resilient server backends with enterprise-level security.',
      points: [
        'Bespoke Web Applications & SaaS Platforms',
        'Secure API & Microservice Architectures',
        'Enterprise Resource Planning (ERP) & Custom CRM',
        'Comprehensive Automated Unit & E2E Testing',
      ],
      tag: 'Enterprise Ready',
    },
    {
      icon: Smartphone,
      category: 'Software Solutions',
      title: 'Mobile Applications (iOS & Android)',
      description: 'Native and cross-platform mobile apps built with fluid 60fps animations, intuitive gesture navigation, offline-first data synchronization, and frictionless checkout flows.',
      points: [
        'React Native & Flutter Cross-Platform Development',
        'Biometric Auth & Secure Payment Gateways (Razorpay/Stripe)',
        'Push Notification Retargeting Engines',
        'App Store Optimization (ASO) & Launch Strategy',
      ],
      tag: 'Native Performance',
    },
    {
      icon: Workflow,
      category: 'Software & Marketing',
      title: 'Marketing Automation & CRM Systems',
      description: 'Automate repetitive workflows, bridge the gap between sales and marketing, and ensure zero leads slip through the cracks with automated WhatsApp and email nurturing.',
      points: [
        'WhatsApp Business Cloud API Automated Bots',
        'HubSpot / Zoho / Salesforce Custom Integrations',
        'Dynamic Lead Scoring & Instant Sales Dispatch',
        'Automated Post-Purchase Re-Engagement Flows',
      ],
      tag: 'Zero Friction',
    },
    {
      icon: Gauge,
      category: 'Performance',
      title: 'Conversion Rate Optimization (CRO)',
      description: 'Turn your existing website traffic into paying clients. We diagnose UX friction points, optimize page speed to sub-second load times, and run continuous multivariate split tests.',
      points: [
        'Heatmap & Behavioral Recording Diagnostics',
        'Speed Optimization: Sub-1 Second Page Load Times',
        'Frictionless Multi-Step Lead Capture Forms',
        'Psychological Pricing & Value Presentation',
      ],
      tag: '+40% Avg Lift',
    },
  ];

  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-neutral-50/50 font-josefin">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-neutral-200 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0052CC] bg-[#0052CC]/10 border border-[#0052CC]/20 px-3 py-1 rounded-full">
              Enterprise Solutions
            </span>
            {/* Section Heading following specs: Weight 500/600, Size 40px-48px, Line-height 1.2, Letter-spacing -1px */}
            <h2 className="mt-4 font-josefin font-semibold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.2] tracking-[-1px] text-[#111111]">
              End-to-End Solutions Designed to Outperform.
            </h2>
            {/* Body Text: Weight 400, Size 18px-20px, Line-height 1.6, Color #555555 */}
            <p className="mt-4 font-josefin font-normal text-[18px] sm:text-[19px] lg:text-[20px] leading-[1.6] text-[#555555]">
              We eliminate the friction of managing separate marketing agencies and development firms. Yaazh 360 acts as your unified technical growth partner.
            </p>
          </div>

          {/* Navigation & Buttons in Logo Royal Blue: Weight 500/600, Size 15px-17px */}
          <button
            onClick={onOpenContact}
            className="self-start md:self-auto px-6 py-3 rounded-full bg-[#0052CC] text-white hover:bg-[#0A2558] text-[15px] sm:text-[16px] font-semibold transition-all duration-300 shadow-md shadow-[#0052CC]/20 flex items-center space-x-2"
          >
            <span>Request a Tailored Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6-Card Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceCards.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#0052CC]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#0052CC]/10 flex items-center justify-center text-[#0052CC]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-100 text-[#555555]">
                      {service.tag}
                    </span>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-josefin font-semibold text-[20px] sm:text-[22px] leading-[1.2] tracking-[-0.5px] text-[#111111]">
                      {service.title}
                    </h3>
                    <p className="mt-3 font-josefin font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#555555]">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-2.5 pt-4 border-t border-neutral-100">
                    {service.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start space-x-2 text-[14px] sm:text-[15px] font-medium text-[#111111]">
                        <CheckCircle className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100">
                  <button
                    onClick={onOpenContact}
                    className="w-full py-2.5 rounded-xl bg-neutral-50 hover:bg-[#0052CC] hover:text-white text-[#111111] text-[14px] sm:text-[15px] font-semibold transition-all duration-200 flex items-center justify-center space-x-1.5"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
