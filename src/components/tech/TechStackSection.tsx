import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, BarChart4 } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const stackCategories = [
    {
      title: 'Frontend & 3D Engineering',
      desc: 'Blazing fast user experiences with 60fps animations and sub-second paint times.',
      items: ['React 19', 'TypeScript', 'Next.js 15', 'Tailwind CSS', 'Three.js / WebGL', 'Framer Motion', 'Vite'],
    },
    {
      title: 'Backend, APIs & Cloud Systems',
      desc: 'Robust microservices, fault-tolerant databases, and zero-trust security.',
      items: ['Node.js', 'Python / FastAPI', 'PostgreSQL', 'Redis Caching', 'Docker', 'AWS & Cloudflare', 'GraphQL'],
    },
    {
      title: 'Performance & Growth Platforms',
      desc: 'Precision data attribution and high-leverage growth machinery.',
      items: ['Google Ads API', 'Meta Conversions API (CAPI)', 'GA4 Analytics', 'Ahrefs & Semrush', 'HubSpot CRM', 'Segment CDP', 'Hotjar'],
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-100 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0052CC] bg-[#0052CC]/10 border border-[#0052CC]/20 px-3 py-1 rounded-full">
            Engineering Rigor
          </span>
          {/* Section Heading following specs: Weight 500/600, Size 40px-48px, Line-height 1.2, Letter-spacing -1px */}
          <h2 className="mt-4 font-sans font-semibold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.2] tracking-[-1px] text-[#111111]">
            Built with Modern, Battle-Tested Technology.
          </h2>
          {/* Body Text: Weight 400, Size 18px-20px, Line-height 1.6, Color #555555 */}
          <p className="mt-4 font-sans font-normal text-[18px] sm:text-[19px] lg:text-[20px] leading-[1.6] text-[#555555]">
            No bloatware, no slow legacy templates. Every platform and campaign is engineered with modern standards for peak security, velocity, and maintainability.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stackCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl bg-neutral-50/80 border border-neutral-200/80 p-7 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-[#0052CC] mb-4">
                  {idx === 0 ? <Cpu className="w-5 h-5 text-[#0052CC]" /> : idx === 1 ? <Terminal className="w-5 h-5 text-[#D49B28]" /> : <BarChart4 className="w-5 h-5 text-[#0052CC]" />}
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#111111] font-sans tracking-tight">
                  {cat.title}
                </h3>
                <p className="mt-2 text-[14px] sm:text-[15px] text-[#555555] leading-[1.6]">
                  {cat.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {cat.items.map((item, i) => (
                    <span
                      key={i}
                      className="text-[13px] font-medium bg-white border border-neutral-200/90 text-[#111111] px-3 py-1 rounded-lg shadow-2xs hover:border-[#0052CC] transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs text-[#555555] font-mono">
                <span>Standardized</span>
                <span className="text-[#0052CC] font-semibold">&bull; 100% Tested</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
