import React from 'react';
import { motion } from 'framer-motion';
import { MessagesSquare, ListChecks, CodeXml, ShieldCheck, Send, type LucideIcon } from 'lucide-react';
import processBackground from '../../assets/Our Process/Process BG.optimized.webp';
import './ProcessSection.css';

const DeveloperBehindWorkIllustration: React.FC<{ className?: string }> = ({
  className = 'w-38 sm:w-44',
}) => (
  <motion.div
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    whileHover={{ scale: 1.06 }}
    className="cursor-pointer"
  >
    <svg
      viewBox="0 0 190 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="#1E1E1E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Horizontal desk line */}
      <line x1="10" y1="100" x2="180" y2="100" stroke="#1E1E1E" strokeWidth="2.4" />

      {/* Person's hair & eyes peeking over laptop */}
      <path
        d="M80 40 C76 31, 84 24, 93 23 C99 22, 105 24, 109 29 C114 23, 122 25, 126 33 C128 37, 126 41, 124 43"
        stroke="#1E1E1E"
        strokeWidth="2.2"
        fill="#FFFFFF"
      />
      <path d="M80 42 C80 34, 126 34, 126 42" fill="#FFFFFF" />
      <path d="M90 38 Q94 34 98 38" stroke="#1E1E1E" strokeWidth="2.2" fill="none" />
      <path d="M107 38 Q111 34 115 38" stroke="#1E1E1E" strokeWidth="2.2" fill="none" />

      {/* Laptop Back Display */}
      <rect
        x="58"
        y="42"
        width="90"
        height="58"
        rx="7"
        fill="#F4FBF7"
        stroke="#1E1E1E"
        strokeWidth="2.4"
      />
      {/* Texture on laptop */}
      <path
        d="M62 50 L92 80 M72 46 L110 84 M88 46 L126 84 M108 46 L142 80 M128 48 L146 66"
        stroke="#C5EAD4"
        strokeWidth="1.5"
      />

      {/* Laptop Logo */}
      <circle cx="103" cy="71" r="5" fill="#1E1E1E" />
      <path d="M105 65 C106 63, 108 63, 108 62" stroke="#1E1E1E" strokeWidth="1.6" />

      {/* Laptop base bar in orange */}
      <path d="M58 97 L148 97 L148 100 L58 100 Z" fill="#F9A301" stroke="#1E1E1E" strokeWidth="1.8" />

      {/* Hands/shoulders on either side */}
      <path d="M52 100 C50 88, 58 88, 58 100" stroke="#1E1E1E" strokeWidth="2" fill="#FFFFFF" />
      <path d="M148 100 C148 88, 156 88, 154 100" stroke="#1E1E1E" strokeWidth="2" fill="#FFFFFF" />

      {/* Steaming Coffee Cup on Desk */}
      <motion.path
        d="M33 80 C32 76, 35 74, 33 69"
        stroke="#1E1E1E"
        strokeWidth="1.4"
        fill="none"
        animate={{ y: [0, -3.5, 0], opacity: [0.35, 0.95, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M37 80 C36 76, 39 74, 37 70"
        stroke="#1E1E1E"
        strokeWidth="1.4"
        fill="none"
        animate={{ y: [0, -3.5, 0], opacity: [0.35, 0.95, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      <path d="M25 82 L28 100 L42 100 L45 82 Z" fill="#FFFFFF" stroke="#1E1E1E" strokeWidth="1.8" />
      <ellipse cx="35" cy="82" rx="10" ry="2.2" fill="#FAFAFA" stroke="#1E1E1E" strokeWidth="1.5" />
      <path d="M25 85 C20 85, 20 93, 26 94" stroke="#1E1E1E" strokeWidth="1.5" fill="none" />
      <text x="35" y="89" textAnchor="middle" fontSize="3.1" fontWeight="600" fill="#444" fontFamily="sans-serif">
        Let's have a
      </text>
      <text x="35" y="93" textAnchor="middle" fontSize="3.6" fontWeight="900" fill="#222" fontFamily="sans-serif">
        COFFEE
      </text>
      <circle cx="33.5" cy="96.5" r="1.1" fill="#4ADE80" />
      <circle cx="36.5" cy="96.5" r="1.1" fill="#FBBF24" />
      <circle cx="35" cy="98" r="1.1" fill="#60A5FA" />
    </svg>
  </motion.div>
);

type StepKind = 'meet' | 'plan' | 'develop' | 'testing' | 'launch';

const STEP_ICONS: Record<StepKind, LucideIcon> = {
  meet: MessagesSquare,
  plan: ListChecks,
  develop: CodeXml,
  testing: ShieldCheck,
  launch: Send,
};

function ProcessIcon({ kind }: { kind: StepKind }) {
  const Icon = STEP_ICONS[kind];
  return <div className="process-reference__icon" aria-hidden="true"><Icon strokeWidth={1.6} /></div>;
}

const STEPS: { kind: StepKind; title: string; description: string }[] = [
  { kind: 'meet', title: 'Meet', description: "We sit down to learn about your business goals. We discuss your brand and plan your project timeline." },
  { kind: 'plan', title: 'Plan', description: 'We map out your needs. Whether you need a website, an online shop, or ads, we write a simple blueprint.' },
  { kind: 'develop', title: 'Web Design & Dev', description: 'We create clean design mockups. Our coders build fast pages and test features until they look sharp.' },
  { kind: 'testing', title: 'Testing', description: 'We check every link, form, and button on mobile and desktop. Clean testing keeps your launch smooth.' },
  { kind: 'launch', title: 'Launch', description: 'We launch your live site. We test speed, index your pages, and help you welcome your first visitors.' },
];

export const ProcessSection: React.FC = () => (
  <section id="our-process" className="process-reference" aria-labelledby="process-reference-title">
    <div className="process-reference__canvas">
      <img decoding="async" className="process-reference__background" src={processBackground} alt="Yaazh 360 development process background" title="Yaazh 360 development process background" width={1920} height={1080} loading="lazy" />
      <h2 id="process-reference-title">Our <span>process</span></h2>
      <ol className="process-reference__steps">
        {STEPS.map(step => <li key={step.kind} className={`process-reference__step process-reference__step--${step.kind}`}>
          <ProcessIcon kind={step.kind} /><div><h3>{step.title}</h3><p>{step.description}</p></div>
        </li>)}
      </ol>
      <div className="process-reference__team"><DeveloperBehindWorkIllustration className="process-reference__developer" /><p>Who is behind the work?</p><a href="#our-team">Explore Here</a></div>
      <svg className="process-reference__arrow process-reference__arrow--meet" viewBox="0 0 110 65" aria-hidden="true"><path d="M8 4 C8 43 8 52 54 52 H98" /><path d="M94 47 L105 52 L94 57 Z" fill="currentColor" stroke="none" /></svg>
      <svg className="process-reference__arrow process-reference__arrow--plan" viewBox="0 0 110 110" aria-hidden="true"><path d="M5 5 H60 C96 5 96 33 96 92" /><path d="M89 87 L96 105 L103 87 Z" fill="currentColor" stroke="none" /></svg>
      <svg className="process-reference__arrow process-reference__arrow--testing" viewBox="0 0 130 65" aria-hidden="true"><path d="M122 5 C118 51 116 51 60 51 H12" /><path d="M17 44 L3 51 L17 58 Z" fill="currentColor" stroke="none" /></svg>
    </div>
  </section>
);
export default ProcessSection;
