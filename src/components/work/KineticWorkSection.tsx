import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface Project {
  id: string;
  category: 'all' | 'marketing' | 'software';
  title: string;
  client: string;
  industry: string;
  tagline: string;
  description: string;
  metrics: {
    highlight: string;
    label: string;
  };
  technologies: string[];
  scope: string[];
  gradient: string;
}

export const KineticWorkSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'marketing' | 'software'>('all');

  const projects: Project[] = [
    {
      id: 'omnistore',
      category: 'marketing',
      title: 'OmniStore Global: Direct-to-Consumer Scale',
      client: 'OmniStore Lifestyle',
      industry: 'E-Commerce & Retail',
      tagline: '480% Organic Traffic Growth & 5.4x Blended ROAS',
      description: 'Engineered an aggressive semantic SEO content engine paired with algorithmic Meta & Google Performance Max campaigns, scaling monthly revenues from ₹18L to ₹1.1Cr within 9 months.',
      metrics: {
        highlight: '+480%',
        label: 'Organic Revenue Surge',
      },
      technologies: ['Technical SEO', 'Google Ads', 'Meta CAPI', 'Shopify Plus', 'Klaviyo'],
      scope: ['Full SEO Architecture', 'Multichannel PPC', 'Conversion Funnel Redesign'],
      gradient: 'from-blue-500/10 via-amber-500/5 to-transparent',
    },
    {
      id: 'healthsync',
      category: 'software',
      title: 'HealthSync: HIPAA-Compliant Telehealth SaaS',
      client: 'HealthSync Technologies',
      industry: 'HealthTech & MedTech',
      tagline: 'Sub-80ms Latency & 99.99% Cloud Availability',
      description: 'Architected and built a mission-critical web application connecting 120+ specialized doctors with 40,000+ active patients. Engineered end-to-end encrypted video consults and automated electronic health records.',
      metrics: {
        highlight: '99.99%',
        label: 'Zero Downtime SLA',
      },
      technologies: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS'],
      scope: ['Custom Software Architecture', 'HIPAA Compliance', 'Realtime WebRTC Video'],
      gradient: 'from-indigo-500/10 via-blue-500/5 to-transparent',
    },
    {
      id: 'apexfin',
      category: 'software',
      title: 'Apex Wealth: Institutional Portfolio Portal',
      client: 'Apex Asset Management',
      industry: 'FinTech & Capital Markets',
      tagline: 'Interactive Financial Visualizations & Live Feeds',
      description: 'Designed and deployed a high-security financial reporting portal for high-net-worth investors, featuring real-time market feeds, automated tax loss harvesting calculations, and multi-currency balances.',
      metrics: {
        highlight: '₹240Cr+',
        label: 'Assets Under Management',
      },
      technologies: ['Next.js', 'Tailwind CSS', 'FastAPI', 'Redis', 'Docker'],
      scope: ['Enterprise Web Portal', 'Bank-Grade 2FA/SSO', 'Custom Data Visualizations'],
      gradient: 'from-blue-600/10 via-cyan-500/5 to-transparent',
    },
    {
      id: 'estatemax',
      category: 'marketing',
      title: 'EstateMax Coimbatore: Premium Realty Lead Engine',
      client: 'EstateMax Group',
      industry: 'Luxury Real Estate',
      tagline: '3,200+ Verified Ultra-HNI Inquiries Generated',
      description: 'Built a geo-targeted lead generation engine combining hyper-local SEO ranking for Coimbatore high-value corridors with WhatsApp automated qualification bots and Google Local Service Ads.',
      metrics: {
        highlight: '₹34Cr',
        label: 'Property Value Sold',
      },
      technologies: ['Hyper-Local SEO', 'Google Search Ads', 'Lead Scoring CRM', 'WhatsApp API'],
      scope: ['Paid Lead Gen Strategy', 'Automated CRM Routing', 'High-Converting Landing Pages'],
      gradient: 'from-amber-500/10 via-blue-500/5 to-transparent',
    },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section id="work" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-100 font-josefin">
      <div className="max-w-7xl mx-auto">
        
        {/* Case Studies Intro following the kinetic scroll animation */}
        <div className="text-center max-w-5xl mx-auto pt-2">
          <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/20 px-3.5 py-1.5 rounded-full mb-3">
            Featured Client Deployments
          </span>
          <h3 className="font-josefin font-bold text-2xl sm:text-3xl md:text-4xl text-[#111111] tracking-tight">
            Proven Results Engineered to Scale.
          </h3>
          <p className="mt-2.5 font-josefin font-normal text-base sm:text-lg text-[#555555] max-w-2xl mx-auto">
            From dominating competitive search terms to writing mission-critical software, discover how our 360° approach drives tangible bottom-line growth.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex items-center justify-center space-x-2 sm:space-x-3">
            {[
              { id: 'all', label: 'All Featured Work' },
              { id: 'marketing', label: 'Digital Marketing & Growth' },
              { id: 'software', label: 'Custom Software & Platforms' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#111111] text-white shadow-md scale-105'
                    : 'bg-neutral-100 text-[#555555] hover:bg-neutral-200/80 hover:text-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Project Showcase Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative rounded-3xl bg-neutral-50/70 border border-neutral-200/80 p-7 sm:p-9 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#0052CC]/30 flex flex-col justify-between"
            >
              {/* Background Ambient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200/60">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0052CC]">
                      0{idx + 1} &bull; {project.industry}
                    </span>
                  </div>
                  <span className="text-[13px] font-medium text-[#555555]">
                    {project.client}
                  </span>
                </div>

                {/* Project Title & Tagline */}
                <div className="mt-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#111111] font-josefin tracking-tight group-hover:text-[#0052CC] transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-[#0052CC] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <div className="mt-2 text-[14px] sm:text-[15px] font-medium text-[#111111]">
                    {project.tagline}
                  </div>
                  <p className="mt-3 text-[15px] sm:text-[16px] text-[#555555] leading-[1.6]">
                    {project.description}
                  </p>
                </div>

                {/* Key Metric Highlight Pill with Logo Gold / Blue */}
                <div className="mt-6 inline-flex items-center space-x-3 bg-white border border-neutral-200/90 rounded-2xl p-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#0052CC]/10 text-[#0052CC] flex items-center justify-center font-bold">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#111111] font-josefin leading-none">
                      {project.metrics.highlight}
                    </div>
                    <div className="text-xs font-medium text-[#555555] mt-0.5">
                      {project.metrics.label}
                    </div>
                  </div>
                </div>

                {/* Scope of Work */}
                <div className="mt-6 space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#555555]">
                    Delivered Capabilities:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.scope.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-white border border-neutral-200 px-3 py-1 rounded-full text-[#111111]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies Pill Footer */}
              <div className="mt-8 pt-5 border-t border-neutral-200/60 flex items-center justify-between text-xs text-[#555555]">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="font-mono text-[11px] text-[#555555] bg-neutral-200/50 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="font-semibold text-[#0052CC] group-hover:text-[#D49B28] group-hover:underline underline-offset-2 flex items-center space-x-1">
                  <span>View Case</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
