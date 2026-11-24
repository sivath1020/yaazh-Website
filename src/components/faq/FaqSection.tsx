import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import faqGif from '../../assets/GIF/faq-6YhrTF9mm1.gif';

interface FaqSectionProps {
  onOpenContact?: (serviceName?: string) => void;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What digital marketing and web services does Yaazh360 provide?',
    answer:
      'We provide full-spectrum digital marketing, custom website and e-commerce development, mobile apps, technical SEO, and high-performance lead generation campaigns.',
  },
  {
    id: 'faq-2',
    question: 'How quickly can we see measurable results from marketing campaigns?',
    answer:
      'Paid campaigns can start reaching people after approval and launch. Leads depend on your budget, audience and offer. SEO improvements can take weeks or months to show an effect; rankings and results are not guaranteed.',
  },
  {
    id: 'faq-3',
    question: 'Can Yaazh360 build custom software, web platforms, and mobile apps?',
    answer:
      'Yes. Our senior engineering team builds custom web portals, cross-platform iOS & Android mobile applications, and enterprise ERP systems tailored to your workflows.',
  },
  {
    id: 'faq-4',
    question: 'What is your 5-step development and campaign deployment process?',
    answer:
      'We follow our proven 360° methodology: 1. Meet (discovery) → 2. Plan (blueprints) → 3. Design & Dev (coding) → 4. Testing (QA checks) → 5. Launch (scaling).',
  },
  {
    id: 'faq-5',
    question: 'How do we get started with Yaazh360 and receive custom pricing?',
    answer:
      'Simply reach out through our contact form. Our strategists will audit your digital footprint and provide a tailored growth roadmap and transparent quote within 48 hours.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  // Allow toggling accordions; first one open by default
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative w-full bg-white text-[#111827] font-josefin pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-16 sm:pb-20 md:pb-24 overflow-hidden border-t border-neutral-100/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          
          {/* ── Left Column: Clean Animated FAQ GIF Illustration ── */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-full max-w-[460px] lg:max-w-none flex items-center justify-center"
            >
              <img decoding="async"
                src={faqGif}
                alt="Frequently Asked Questions illustration"
                title="Frequently Asked Questions illustration"
                width={460}
                height={460}
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-sm"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* ── Right Column: Frequently Asked Questions Accordion ── */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* Header Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <h3 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#111827] tracking-[-0.025em] leading-[1.2]">
                Frequently asked questions
              </h3>
            </motion.div>

            {/* Accordion Questions List */}
            <div className="divide-y divide-neutral-200/90 border-t border-b border-neutral-200/90">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    className="group"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={isOpen}
                      className="w-full py-5 sm:py-6 flex items-center justify-between text-left gap-4 focus:outline-none transition-colors duration-200 cursor-pointer"
                    >
                      {/* Question Text (Strictly 1 Line Only) */}
                      <span
                        className={`text-base sm:text-[17px] font-semibold tracking-tight transition-colors duration-200 pr-2 line-clamp-1 truncate ${
                          isOpen
                            ? 'text-[#0066FF]'
                            : 'text-[#1F2937] group-hover:text-[#0066FF]'
                        }`}
                      >
                        {item.question}
                      </span>

                      {/* Clean Blue Plus / Close Icon */}
                      <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300">
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="inline-flex items-center justify-center text-[#0066FF]"
                        >
                          <Plus className="w-5 h-5 stroke-[2.4]" />
                        </motion.span>
                      </span>
                    </button>

                    {/* Smooth Collapsible Answer (Strictly 2 Lines Only) */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 sm:pb-6 text-sm sm:text-[15px] leading-[1.62] text-[#4B5563] font-normal pr-4 sm:pr-8 line-clamp-2">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Optional Assistance Callout */}
            {onOpenContact && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex items-center gap-2 text-sm text-[#6B7280]"
              >
                <span>Have a question not listed here?</span>
                <button
                  type="button"
                  onClick={() => onOpenContact('General Inquiry')}
                  className="font-semibold text-[#0066FF] hover:text-[#0052CC] hover:underline transition-colors cursor-pointer"
                >
                  Contact our strategy team &rarr;
                </button>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqSection;
