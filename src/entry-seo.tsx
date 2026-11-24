// Build-time rendering of the same components visitors see, without a browser or API calls.
import { renderToString } from 'react-dom/server';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/footer/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { AspireHolidaysPage } from './pages/AspireHolidaysPage';
import { VibhuSoftwarePage } from './pages/VibhuSoftwarePage';
import { VIBHU_SOFTWARE_PATH } from './lib/vibhuSoftware';
import { ContactPage } from './pages/ContactPage';
import { CareersPage } from './pages/CareersPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { ServiceLandingPage } from './pages/ServiceLandingPage';
import { isServicePath } from './lib/servicePages';

const noop = () => {};
export function renderPage(path: string) {
  const pages: Record<string, React.ReactNode> = {
    '/': <HomePage onNavigate={noop} onOpenContact={noop} />,
    '/services': <ServicesPage onNavigate={noop} onOpenContact={noop} />,
    '/about': <AboutPage onNavigate={noop} onOpenContact={noop} />,
    '/work': <WorkPage onOpenContact={noop} />,
    '/work/aspire-holidays': <AspireHolidaysPage onOpenContact={noop} />,
    [VIBHU_SOFTWARE_PATH]: <VibhuSoftwarePage />,
    '/contact': <ContactPage onNavigate={noop} />,
    '/careers': <CareersPage />,
  };
  return renderToString(<MotionConfig reducedMotion="always">
    <Navbar currentPath={path} onNavigate={noop} onOpenMenu={noop} isMenuOpen={false} onToggleChat={noop} isChatOpen={false} />
    <main>{isServicePath(path) ? <ServiceLandingPage path={path} /> : pages[path] || <NotFoundPage />}</main>
    <Footer onNavigate={noop} onOpenContact={noop} />
  </MotionConfig>);
}
