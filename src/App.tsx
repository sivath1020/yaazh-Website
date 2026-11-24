import { Suspense, useState, useEffect, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Navbar } from './components/navigation/Navbar';
import { MenuModal } from './components/navigation/MenuModal';
import { ContactModal } from './components/contact/ContactModal';
import { Footer } from './components/footer/Footer';
import { Chatbot } from './components/chat/Chatbot';
import { PageErrorBoundary, PageLoading } from './components/routing/PageRecovery';
import { SeoMetadata } from './components/routing/SeoMetadata';
import { NotFoundPage } from './pages/NotFoundPage';
import { normalizePath } from './lib/seo';
import { isServicePath } from './lib/servicePages';
import { ServiceLandingPage } from './pages/ServiceLandingPage';

// Pages - loaded eagerly for instant, buttery-smooth transitions with no loading text
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { AspireHolidaysPage } from './pages/AspireHolidaysPage';
import { VibhuSoftwarePage } from './pages/VibhuSoftwarePage';
import { VIBHU_SOFTWARE_PATH } from './lib/vibhuSoftware';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CareersPage } from './pages/CareersPage';

const pagePath = normalizePath;

export function App() {
  // Initialize buttery smooth scrolling (Lenis)
  useSmoothScroll();

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return pagePath(window.location.pathname);
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

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
    startTransition(() => {
      setCurrentPath(nextPath);
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handlePopState = () => {
      startTransition(() => {
        setCurrentPath(pagePath(window.location.pathname));
      });
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
    setSelectedService(serviceName || undefined);
    setIsContactOpen(true);
  };

  const handleOpenMenu = () => {
    setIsChatOpen(false);
    setIsMenuOpen((prev) => !prev);
  };



  const renderCurrentPage = () => {
    if (isServicePath(currentPath)) return <ServiceLandingPage path={currentPath} />;
    switch (currentPath) {
      case '/brochure':
      case '/brochures':
      case '/services':
        return <ServicesPage onOpenContact={handleOpenContact} onNavigate={navigate} />;
      case '/work':
        return <WorkPage onOpenContact={handleOpenContact} />;
      case '/work/aspire-holidays':
        return <AspireHolidaysPage onOpenContact={handleOpenContact} />;
      case VIBHU_SOFTWARE_PATH:
        return <VibhuSoftwarePage />;
      case '/about':
        return <AboutPage onOpenContact={handleOpenContact} onNavigate={navigate} />;
      case '/careers':
        return <CareersPage />;
      case '/contact':
        return <ContactPage defaultService={selectedService} onNavigate={navigate} />;
      case '/':
        return <HomePage onOpenContact={handleOpenContact} onNavigate={navigate} />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] font-sans selection:bg-[#0052CC] selection:text-white">
      <SeoMetadata path={currentPath} />
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
        onClose={() => {
          setIsContactOpen(false);
          setSelectedService(undefined);
        }}
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
            <PageErrorBoundary key={currentPath} onHome={() => navigate('/')}>
            <Suspense fallback={<PageLoading />}>
              {renderCurrentPage()}
            </Suspense>
            </PageErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} onOpenContact={handleOpenContact} />
    </div>
  );
}

export default App;
