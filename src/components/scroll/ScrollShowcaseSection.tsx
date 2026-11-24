import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Target, 
  Code, 
  Server, 
  BarChart3, 
  CheckCircle2, 
  ArrowUpRight,
  Cpu
} from 'lucide-react';

interface ScrollShowcaseProps {
  onOpenContact: () => void;
}

export const ScrollShowcaseSection: React.FC<ScrollShowcaseProps> = ({
  onOpenContact,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Background big text transforms: scales up and gently blurs/fades
  const bgTextScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.45]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.35, 0.6], [0.95, 0.4, 0.08]);
  const bgTextY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  // Central 3D Card transforms: starts compact between the text and smoothly expands into full container (Images 2 & 3)
  const cardScale = useTransform(scrollYProgress, [0.08, 0.6], [0.42, 1]);
  const cardRotateX = useTransform(scrollYProgress, [0.08, 0.55], [12, 0]);
  const cardY = useTransform(scrollYProgress, [0.05, 0.6], [80, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.02, 0.15], [0.3, 1]);
  const cardShadow = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    [
      '0 20px 40px -15px rgba(0,82,204,0.12)',
      '0 35px 70px -15px rgba(10,37,88,0.14), 0 0 0 1px rgba(0,82,204,0.06)',
    ]
  );

  // Active Tab state for interactive exploration
  const [activeTab, setActiveTab] = useState<'seo' | 'ppc' | 'software' | 'cloud' | 'cro'>('seo');

  const servicesData = {
    seo: {
      category: 'Search Engine Optimization',
      title: 'Dominating First-Page Rankings & Organic Intent',
      description: 'Deep technical SEO, authoritative link generation, and semantic schema architectures that capture high-intent buyers in Coimbatore and international markets.',
      metrics: [
        { label: 'Organic Traffic Lift', val: '+340%' },
        { label: 'Top 3 Keyword Ranks', val: '85%+' },
        { label: 'Avg ROI Multiplier', val: '6.4x' },
      ],
      features: [
        'Enterprise Technical Audits & Core Web Vitals Optimization',
        'High-Conversion Semantic Content Clusters',
        'Local SEO & Hyper-Targeted Geo-Fencing for Coimbatore & Global Hubs',
        'Automated Rank Tracking & Real-Time Competitor Intelligence',
      ],
      badge: 'Digital Marketing Core',
      tagline: 'Predictable, sustainable inbound growth.',
      demoType: 'seo',
    },
    ppc: {
      category: 'Performance Marketing & Paid Ads',
      title: 'Precision Paid Ads Built for Maximum ROAS',
      description: 'Laser-targeted Google Search, Performance Max, Meta Ads, and LinkedIn B2B funnels designed to deliver cost-effective client acquisition at scale.',
      metrics: [
        { label: 'Average ROAS', val: '5.2x' },
        { label: 'Lower Cost Per Lead', val: '-42%' },
        { label: 'Ad Spend Managed', val: '₹12Cr+' },
      ],
      features: [
        'AI-Assisted Multi-Variant Ad Creative A/B Testing',
        'Dynamic Retargeting & High-Intent Audience Modeling',
        'Omnichannel Server-Side Attribution Tracking (CAPI)',
        'Weekly Transparent Spend vs Return Dashboards',
      ],
      badge: 'High-Velocity Growth',
      tagline: 'Turn ad spend into an aggressive revenue multiplier.',
      demoType: 'ppc',
    },
    software: {
      category: 'Custom Software & Web Engineering',
      title: 'Bespoke Software Solutions Engineered for Scale',
      description: 'Production-ready web applications, SaaS platforms, and enterprise software designed with clean architecture, TypeScript, modern React, and resilient cloud backends.',
      metrics: [
        { label: 'Lighthouse Score', val: '99/100' },
        { label: 'System Uptime SLA', val: '99.99%' },
        { label: 'Delivery Velocity', val: '2.5x Faster' },
      ],
      features: [
        'Scalable React, Next.js & Node.js Microservices Architecture',
        'Enterprise Relational & Vector Databases (PostgreSQL, Redis)',
        'Secure Role-Based Access Control (RBAC) & OAuth2 / SSO',
        'Automated CI/CD Pipelines with 100% Type Safety',
      ],
      badge: 'Software Engineering Core',
      tagline: 'Robust code crafted like a 15-year senior team.',
      demoType: 'software',
    },
    cloud: {
      category: 'Cloud Infrastructure & API Platforms',
      title: 'Resilient Cloud Systems & High-Throughput APIs',
      description: 'Cloud architecture on AWS, GCP, and Azure with Kubernetes, serverless event queues, and sub-100ms API response times across the globe.',
      metrics: [
        { label: 'Global API Latency', val: '< 65ms' },
        { label: 'Cloud Cost Saved', val: '38%' },
        { label: 'Peak Concurrency', val: '100K+ req/s' },
      ],
      features: [
        'Infrastructure as Code (Terraform / Docker / Kubernetes)',
        'High-Security Zero-Trust Cloud Architecture',
        'RESTful & GraphQL API Endpoints with OpenAPI Documentation',
        'Automated Disaster Recovery & Geodistributed Multi-Region Sync',
      ],
      badge: 'Cloud & DevOps',
      tagline: 'Always up, hyper-secure, and blazing fast.',
      demoType: 'cloud',
    },
    cro: {
      category: 'Conversion Rate Optimization (CRO)',
      title: 'Frictionless Funnels that Convert Visitors into Clients',
      description: 'Data-driven UI/UX, behavioral heatmap analytics, and multivariate landing page iterations that squeeze the maximum value out of every website visitor.',
      metrics: [
        { label: 'Landing Conversion Lift', val: '+68%' },
        { label: 'Drop-off Reduction', val: '-55%' },
        { label: 'Checkout Completion', val: '91%' },
      ],
      features: [
        'Hotjar & Clarity Session Recording Insights',
        'Rapid Prototyping & Psychological Friction Audits',
        'A/B Split-Testing Landing Pages & Sales Funnels',
        'Mobile-First Responsive Perfection',
      ],
      badge: 'Revenue Optimization',
      tagline: 'Every click engineered to drive revenue.',
      demoType: 'cro',
    },
  };

  const currentService = servicesData[activeTab];

  return (
    <div
      ref={containerRef}
      id="services-showcase"
      className="relative min-h-[250vh] bg-white text-[#111111] font-sans"
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        
        {/* Background Big Typography that zooms and spreads apart (Image 2 reference) */}
        <motion.div
          style={{
            scale: bgTextScale,
            opacity: bgTextOpacity,
            y: bgTextY,
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <div className="text-center font-sans font-extrabold tracking-[-3px] text-[#111111] leading-none">
            <span className="text-[22vw] sm:text-[20vw] lg:text-[240px] block opacity-90">
              yaazh
            </span>
            <div className="text-lg sm:text-2xl font-medium tracking-wide text-[#555555] mt-2">
              Digital Marketing &bull; Software Solutions
            </div>
          </div>
        </motion.div>

        {/* The 3D Expanding Card (Centerpiece from Images 2 & 3) */}
        <motion.div
          style={{
            scale: cardScale,
            rotateX: cardRotateX,
            y: cardY,
            opacity: cardOpacity,
            boxShadow: cardShadow,
          }}
          className="relative z-10 w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-neutral-200/90 p-5 sm:p-8 md:p-10 transition-all duration-200 preserve-3d"
        >
          {/* Interactive Service Navigation Pills matching Image 2 top bar - Buttons: Weight 500/600, Size 15px-17px */}
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 scrollbar-none border-b border-neutral-100">
            {[
              { id: 'seo', label: 'SEO & Organic', icon: Search },
              { id: 'ppc', label: 'Pay Per Click (PPC)', icon: Target },
              { id: 'software', label: 'Custom Software & Web', icon: Code },
              { id: 'cloud', label: 'Cloud & API Systems', icon: Server },
              { id: 'cro', label: 'Conversion Funnels', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-[15px] font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0052CC] text-white shadow-md shadow-[#0052CC]/25 scale-[1.02]'
                      : 'bg-neutral-100 text-[#555555] hover:bg-neutral-200/80 hover:text-[#111111]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Card Content Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Left Column: Details & Deliverables */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0052CC]">
                  {currentService.tagline}
                </div>
                <h4 className="font-sans font-semibold text-[20px] sm:text-[24px] md:text-[26px] leading-[1.2] tracking-[-0.5px] text-[#111111]">
                  {currentService.title}
                </h4>
                {/* Body Text: Weight 400, Size 18px-20px, Line-height 1.6, Color #555555 */}
                <p className="font-sans font-normal text-[17px] sm:text-[18px] leading-[1.6] text-[#555555]">
                  {currentService.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {currentService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[14px] sm:text-[15px] text-[#111111]">
                      <CheckCircle2 className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics Badges */}
                <div className="pt-4 grid grid-cols-3 gap-3">
                  {currentService.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-50 border border-neutral-100 rounded-2xl p-3 text-center"
                    >
                      <div className="text-base sm:text-xl font-bold text-[#0052CC] font-sans">
                        {m.val}
                      </div>
                      <div className="text-[12px] font-medium text-[#555555] mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive 3D Mockup / Dashboard Preview */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl bg-neutral-900 text-white p-5 shadow-xl border border-neutral-800 overflow-hidden group">
                  {/* Subtle Blue accent glow */}
                  <div className="absolute -right-10 -top-10 w-36 h-36 bg-[#0052CC]/25 rounded-full blur-2xl" />

                  {/* Window Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">
                      yaazh360://engine/{activeTab}
                    </span>
                  </div>

                  {/* Dynamic simulated system preview */}
                  <div className="py-4 space-y-3 font-mono text-xs">
                    {activeTab === 'seo' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-neutral-300">
                          <span className="text-neutral-500">Google Rank Tracking:</span>
                          <span className="text-emerald-400 font-bold">#1 Position Secured</span>
                        </div>
                        <div className="bg-neutral-800/80 rounded-lg p-2.5 space-y-1">
                          <div className="text-[11px] text-neutral-400">Top Keyword: "Best Software &amp; Digital Solutions"</div>
                          <div className="w-full bg-neutral-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-[#0052CC] to-[#00D3FF] h-full w-[94%]" />
                          </div>
                        </div>
                        <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                          <span>Organic CTR: 18.4%</span>
                          <span className="text-[#D49B28]">High Intent &uarr;</span>
                        </div>
                      </div>
                    )}

                    {activeTab === 'ppc' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-neutral-300">
                          <span className="text-neutral-500">Active Ad Campaign:</span>
                          <span className="text-emerald-400 font-bold">ROAS 5.2x</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="bg-neutral-800/80 p-2 rounded">
                            <span className="text-neutral-500 block">Spend</span>
                            <span className="text-white font-bold">₹50,000</span>
                          </div>
                          <div className="bg-neutral-800/80 p-2 rounded">
                            <span className="text-neutral-500 block">Attributed Revenue</span>
                            <span className="text-emerald-400 font-bold">₹2,60,000</span>
                          </div>
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          CPA reduced by 42% via intent-targeting
                        </div>
                      </div>
                    )}

                    {activeTab === 'software' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-neutral-300">
                          <span className="text-neutral-500">React + TS Architecture:</span>
                          <span className="text-emerald-400 font-bold">Zero Errors</span>
                        </div>
                        <div className="bg-neutral-800/90 rounded p-2 text-[10px] text-neutral-300 overflow-x-auto leading-relaxed">
                          <code>
                            <span className="text-[#00D3FF]">interface</span> ScalableEnterprise &#123;<br />
                            &nbsp;&nbsp;uptime: <span className="text-emerald-400">99.99</span>;<br />
                            &nbsp;&nbsp;security: <span className="text-[#FDD460]">'SOC-2 Compliant'</span>;<br />
                            &nbsp;&nbsp;speed: <span className="text-blue-300">'&lt; 150ms'</span>;<br />
                            &#125;
                          </code>
                        </div>
                      </div>
                    )}

                    {activeTab === 'cloud' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-neutral-300">
                          <span className="text-neutral-500">Cloud Status:</span>
                          <span className="text-emerald-400 font-bold">Active in 3 Regions</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] bg-neutral-800/80 p-2 rounded">
                          <Cpu className="w-4 h-4 text-[#00D3FF]" />
                          <span>Auto-scaling cluster (AWS ECS / K8s)</span>
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Average Latency: 42ms worldwide
                        </div>
                      </div>
                    )}

                    {activeTab === 'cro' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-neutral-300">
                          <span className="text-neutral-500">Funnel Conversion:</span>
                          <span className="text-emerald-400 font-bold">14.8% (Benchmark: 2.8%)</span>
                        </div>
                        <div className="w-full bg-neutral-800 h-3 rounded-full overflow-hidden flex">
                          <div className="bg-[#0052CC] h-full w-[65%]" title="Converted" />
                          <div className="bg-neutral-700 h-full w-[35%]" />
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          +68% Qualified Leads via friction removal
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action inside card */}
                  <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-xs">
                    <span className="text-neutral-400">Yaazh 360 Core Stack</span>
                    <button
                      onClick={onOpenContact}
                      className="text-[#00D3FF] hover:text-white font-semibold flex items-center space-x-1"
                    >
                      <span>Get Free Audit</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Scroll Progress Indicator Bar at bottom of screen in Logo Blue to Gold gradient */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-1 bg-neutral-200 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            className="h-full bg-gradient-to-r from-[#0052CC] via-[#0073FE] to-[#D49B28]"
          />
        </div>

      </div>
    </div>
  );
};
