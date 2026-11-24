# Shared layouts
## src/App.tsx
```tsx
import { lazy, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Navbar } from './components/navigation/Navbar';
import { MenuModal } from './components/navigation/MenuModal';
import { ContactModal } from './components/contact/ContactModal';
import { Footer } from './components/footer/Footer';
import { Chatbot } from './components/chat/Chatbot';

// Pages
import { HomePage } from './pages/HomePage';
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then(module => ({ default: module.WorkPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PartnersPage = lazy(() => import('./pages/PartnersPage').then(module => ({ default: module.PartnersPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(module => ({ default: module.CareersPage })));

const pagePath = (path: string) => path.replace(/\/+$/, '') || '/';

export function App() {
  // Initialize buttery smooth scrolling (Lenis)
  useSmoothScroll();

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return pagePath(window.location.pathname);
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Digital Marketing & SEO');

  const navigate = (path: string) => {
    const nextPath = pagePath(path);
    setIsContactOpen(false);
    setIsMenuOpen(false);
    setIsChatOpen(false);
    if (nextPath === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', nextPath);
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(pagePath(window.location.pathname));
      setIsMenuOpen(false);
      setIsContactOpen(false);
      setIsChatOpen(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Auto-open appointment modal 5 seconds after visiting the site
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!['/careers', '/contact'].includes(pagePath(window.location.pathname)) && !document.getElementById('yaazh-chatbot')) setIsContactOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenContact = (serviceName?: string) => {
    setIsChatOpen(false);
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsContactOpen(true);
  };

  const handleOpenMenu = () => {
    setIsChatOpen(false);
    setIsMenuOpen((prev) => !prev);
  };



  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/brochure':
      case '/brochures':
      case '/services':
        return <ServicesPage onOpenContact={handleOpenContact} onNavigate={navigate} />;
      case '/work':
        return <WorkPage onOpenContact={handleOpenContact} />;
      case '/about':
        return <AboutPage onOpenContact={handleOpenContact} />;
      case '/careers':
        return <CareersPage />;
      case '/partners':
        return <PartnersPage onOpenContact={handleOpenContact} />;
      case '/contact':
        return <ContactPage defaultService={selectedService} onNavigate={navigate} />;
      case '/':
      default:
        return <HomePage onOpenContact={handleOpenContact} onNavigate={navigate} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] font-sans selection:bg-[#0052CC] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenMenu={handleOpenMenu}
        isMenuOpen={isMenuOpen}
        isChatOpen={isChatOpen}
        onToggleChat={() => { setIsChatOpen(open => !open); setIsMenuOpen(false); setIsContactOpen(false); }}
      />

      <Chatbot open={isChatOpen} onClose={() => setIsChatOpen(false)} onContact={() => handleOpenContact('Chatbot Enquiry')} />

      {/* Navigation Drawer Menu */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={navigate}
      />

      {/* Contact Modal Dialog */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultService={selectedService}
      />

      {/* Page Routing Outlet with Smooth Page Transitions */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center" role="status">Loading page…</div>}>
              {renderCurrentPage()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} onOpenContact={handleOpenContact} />
    </div>
  );
}

export default App;

```
## src/components/navigation/Navbar.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import brandLogo from '../../assets/Logo/yaazh-logo-footer-hd.optimized.webp';
import botIcon from '../../assets/bot.optimized.webp';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenMenu: () => void;
  isMenuOpen: boolean;
  onToggleChat: () => void;
  isChatOpen: boolean;
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Work', path: '/work' },
  { label: 'Careers', path: '/careers' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenMenu,
  isMenuOpen,
  onToggleChat,
  isChatOpen,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const activeTab =
    navItems.find((item) => item.path === currentPath)?.label ||
    (currentPath === '/' ? 'Home' : '');

  const currentHighlight = hoveredTab || activeTab;
  const isSolidBg = scrolled || currentPath !== '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[76px] flex items-center transition-all duration-300 font-sans border-0 border-none shadow-none ${
        isSolidBg ? 'bg-white/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full h-full px-3 min-[360px]:px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="group flex items-center select-none transform transition-transform hover:scale-105 duration-200 cursor-pointer"
          aria-label="Yaazh 360 Digitech Homepage"
        >
          <img
            src={brandLogo}
            alt="Yaazh 360 Digitech"
            width={2170}
            height={725}
            fetchPriority="high"
            className="h-9 min-[360px]:h-10 min-[390px]:h-12 sm:h-[52px] w-auto object-contain transition-all duration-200"
          />
        </a>

        {/* Center: Navigation Links (Home, Services, About Us, Work) with bottom indicator */}
        <nav
          className="hidden lg:flex items-center h-full gap-3 xl:gap-7"
          aria-label="Main Navigation"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {navItems.map((item) => {
            const isHighlighted = currentHighlight === item.label;
            return (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                onMouseEnter={() => setHoveredTab(item.label)}
                className={`relative h-full flex items-center px-2.5 xl:px-3 text-[15px] xl:text-[16px] tracking-normal transition-colors duration-200 cursor-pointer select-none ${
                  isHighlighted
                    ? 'text-black font-semibold'
                    : 'text-[#1a1a1a] hover:text-black font-medium'
                }`}
              >
                <span>{item.label}</span>

                {/* Solid Red-Orange Bottom Indicator Block */}
                {isHighlighted && (
                  <motion.div
                    layoutId="navbar-active-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[10px] bg-[#E63200]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Contact Us CTA (Exact Slanted Blue Parallelogram matching reference image) */}
        <div className="flex items-center gap-1 min-[360px]:gap-2 sm:gap-3">
          <button
            id="navbar-chatbot-toggle"
            type="button"
            onClick={onToggleChat}
            aria-label="Chat with Yaazh assistant"
            aria-expanded={isChatOpen}
            aria-controls={isChatOpen ? 'yaazh-chatbot' : undefined}
            className="inline-flex items-center justify-center gap-2 h-9 w-9 sm:w-auto sm:h-10 px-2 sm:px-3 border border-blue-200 rounded-lg bg-white text-[#0052CC] hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 cursor-pointer"
          >
            <img src={botIcon} alt="" aria-hidden="true" className="w-6 h-6 object-contain" />
            <span className="hidden xl:inline text-xs font-bold">Let’s chat</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="relative hidden lg:inline-flex items-center justify-center bg-[#1D4ED8] hover:bg-[#1E40AF] active:bg-[#1E3A8A] text-white px-3 min-[390px]:px-5 sm:px-6 py-2 sm:py-2.5 rounded-[4px] shadow-[2px_5px_0px_#0F172A] -skew-x-[12deg] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_6px_0px_#0F172A] active:translate-y-0.5 active:shadow-[1px_2px_0px_#0F172A] cursor-pointer group select-none"
            aria-label="Contact Us"
          >
            <span className="skew-x-[12deg] inline-flex items-center gap-1.5 sm:gap-2 font-bold text-white text-xs min-[390px]:text-sm sm:text-[15px] tracking-wide whitespace-nowrap">
              <span>Contact Us</span>
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[3.5] transition-transform duration-200 group-hover:translate-x-0.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </button>

          {/* Mobile Menu Drawer Toggle (Visible only below md) */}
          <button
            onClick={onOpenMenu}
            aria-label="Toggle Navigation Drawer"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md bg-neutral-100 hover:bg-neutral-200 text-[#111111] transition-colors cursor-pointer"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

```
## src/components/navigation/MenuModal.tsx
```tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import brandLogo from '../../assets/Logo/yaazh-logo-footer-hd.optimized.webp';

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
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
                    width={2170}
                    height={725}
                    className="h-12 sm:h-14 w-auto max-w-[180px] sm:max-w-[220px] object-contain"
                  />
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-[#0052CC] hover:text-white flex items-center justify-center transition-colors text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links - Navigation: Weight 500/600 */}
              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  {navLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        if (onNavigate) onNavigate(link.path);
                      }}
                      className="group flex items-center justify-between text-2xl sm:text-3xl font-semibold text-[#111111] hover:text-[#0052CC] transition-colors py-1 tracking-tight cursor-pointer"
                    >
                      <span>{link.title}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-3 group-hover:translate-x-0 transition-all text-[#D49B28]" />
                    </a>
                  ))}
                </div>
              </div>


            </div>

            <div className="mt-8 pb-2">
              <a
                href="/contact"
                onClick={event => {
                  onClose();
                  if (onNavigate) { event.preventDefault(); onNavigate('/contact'); }
                }}
                className="group flex w-full items-center justify-center gap-3 rounded-[4px] bg-[#1D4ED8] px-6 py-3.5 font-semibold text-white shadow-[2px_5px_0px_#0F172A] -skew-x-[12deg] transition-all hover:bg-[#1E40AF] active:translate-y-0.5 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                <span className="skew-x-[12deg] inline-flex items-center gap-3">Contact Us <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

```
## src/components/footer/Footer.tsx
```tsx
import React from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';
import brandLogo from '../../assets/Logo/yaazh-logo-footer-hd.optimized.webp';
import './Footer.css';

interface FooterProps {
  onNavigate?: (path: string) => void;
  onOpenContact?: (serviceName?: string) => void;
}

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];
const SERVICES = ['Custom Software & ERP', 'Web & Mobile Applications', 'Digital Marketing & SEO'];

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const handleLink = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!onNavigate || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };
  const handleEnquiry = () => {
    if (onOpenContact) onOpenContact('General Enquiry');
    else if (onNavigate) onNavigate('/contact');
    else window.location.assign('/contact');
  };

  return (
    <footer className="editorial-footer" aria-label="Website footer">
      <div className="editorial-footer__inner">
        <div className="editorial-footer__grid">
          <div className="editorial-footer__intro">
            <h2>Let’s Talk<br />Digital.</h2>
            <span className="editorial-footer__rule" aria-hidden="true" />
            <p>Ideas that connect. Solutions that grow.<br />We’re here to build your next chapter.</p>
            <button type="button" className="editorial-footer__enquiry" onClick={handleEnquiry}>Send an enquiry <ArrowRight size={25} aria-hidden="true" /></button>
          </div>

          <nav className="editorial-footer__column" aria-label="Footer quick links">
            <h3>Quick links</h3>
            <ul>{QUICK_LINKS.map(link => <li key={link.path}><a href={link.path} onClick={event => handleLink(event, link.path)}>{link.label}</a></li>)}</ul>
          </nav>

          <nav className="editorial-footer__column" aria-label="Footer services">
            <h3>Services</h3>
            <ul>{SERVICES.map(service => <li key={service}><a href="/services" onClick={event => handleLink(event, '/services')}>{service}</a></li>)}</ul>
          </nav>

          <div className="editorial-footer__column editorial-footer__contact">
            <h3>Contact</h3>
            <a className="editorial-footer__phone" href="tel:+919047044440">+91 90470 44440</a>
            <a href="mailto:business@yaazh360.com">business@yaazh360.com</a>
            <address>Peelamedu, Avinashi Rd<br />Coimbatore, Tamil Nadu 641014</address>
            <p>Monday–Saturday<br />9:00 AM–7:00 PM IST</p>
          </div>

          <nav className="editorial-footer__column editorial-footer__expertise" aria-label="Our expertise">
            <h3>Our expertise</h3>
            <a href="/services" onClick={event => handleLink(event, '/services')}><span aria-hidden="true">01</span><span>Software &amp;<br />Digital Products</span></a>
            <a href="/services" onClick={event => handleLink(event, '/services')}><span aria-hidden="true">02</span><span>Marketing &amp;<br />Creative</span></a>
          </nav>
        </div>

        <a className="editorial-footer__brand" href="/" onClick={event => handleLink(event, '/')} aria-label="Yaazh 360 Digitech homepage"><img src={brandLogo} alt="Yaazh 360 Digitech" loading="lazy" /></a>
        <div className="editorial-footer__bottom">
          <p>© {new Date().getFullYear()} Yaazh 360 Digitech. All rights reserved.</p>
          <span>Your vision. Our 360° solution.</span>
          <button type="button" onClick={() => window.scrollTo({top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>Back to top <ArrowUp size={16} aria-hidden="true" /></button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

```
