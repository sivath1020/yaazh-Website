import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import brandLogo from '../../assets/Logo/yaazh-logo-footer-hd.optimized.webp';
import './MenuModal.css';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const reduceMotion = useReducedMotion();
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'Work', path: '/work' },
    { title: 'About Us', path: '/about' },
    { title: 'Careers', path: '/careers' },
  ];



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end font-sans"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: reduceMotion ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: reduceMotion ? 0 : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 260, duration: reduceMotion ? 0 : undefined }}
            className="w-full max-w-xl bg-white h-full shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header in Drawer */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <a href="#" className="flex items-center select-none" onClick={onClose}>
                  <img
                    src={brandLogo}
                    alt="Yaazh 360 Logo"
                    title="Yaazh 360 Logo"
                    width={2170}
                    height={725}
                    className="h-12 sm:h-14 w-auto max-w-[180px] sm:max-w-[220px] object-contain"
                  />
                </a>
                <motion.button
                  initial={{ rotate: reduceMotion ? 0 : -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: reduceMotion ? 0 : 0.2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.9, rotate: 90 }}
                  onClick={onClose}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-[#0052CC] hover:text-white flex items-center justify-center transition-colors text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Navigation Links - Navigation: Weight 500/600 */}
              <div className="mt-8 space-y-4">
                <nav className="mobile-menu-links space-y-2" aria-label="Mobile navigation">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={idx}
                      initial={{ opacity: 0, x: reduceMotion ? 0 : 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.16 + idx * 0.075, ease: [0.22, 1, 0.36, 1] }}
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        if (onNavigate) onNavigate(link.path);
                      }}
                      className="mobile-menu-link group flex items-center justify-between text-2xl sm:text-3xl font-semibold text-[#111111] hover:text-[#0052CC] transition-colors py-1 tracking-tight cursor-pointer"
                    >
                      <span className="mobile-menu-link__label">{link.title}</span>
                      <ArrowRight className="mobile-menu-link__arrow w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-3 group-hover:translate-x-0 transition-all text-[#D49B28]" aria-hidden="true" />
                    </motion.a>
                  ))}
                </nav>
              </div>


            </div>

            <motion.div className="mt-8 pb-2"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.55, duration: reduceMotion ? 0 : 0.4 }}
            >
              <a
                href="/contact"
                onClick={event => {
                  onClose();
                  if (onNavigate) { event.preventDefault(); onNavigate('/contact'); }
                }}
                className="mobile-menu-contact group flex w-full items-center justify-center gap-3 rounded-[4px] bg-[#1D4ED8] px-6 py-3.5 font-semibold text-white shadow-[2px_5px_0px_#0F172A] -skew-x-[12deg] transition-all hover:bg-[#1E40AF] active:translate-y-0.5 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                <span className="skew-x-[12deg] inline-flex items-center gap-3">Contact Us <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
