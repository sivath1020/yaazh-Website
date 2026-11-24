# Routes
- /: src/pages/HomePage.tsx; shared Navbar, Footer and dialogs.
- /services: src/pages/ServicesPage.tsx; shared Navbar, Footer and dialogs.
- /work: src/pages/WorkPage.tsx; shared Navbar, Footer and dialogs.
- /about: src/pages/AboutPage.tsx; shared Navbar, Footer and dialogs.
- /partners: src/pages/PartnersPage.tsx; shared Navbar, Footer and dialogs.
- /contact: src/pages/ContactPage.tsx; shared Navbar, Footer and dialogs.
- /careers: src/pages/CareersPage.tsx; shared Navbar, Footer and dialogs.
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
