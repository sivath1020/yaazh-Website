import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import brandLogo from '../../assets/Logo/yaazh-logo-footer-hd.optimized.webp';
import botIcon from '../../assets/bot.optimized.webp';
import './NavbarChatHint.css';

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
  const [hintDismissed, setHintDismissed] = useState(() => {
    try { return sessionStorage.getItem('yaazh-chat-hint-dismissed') === 'true'; }
    catch { return false; }
  });
  const dismissHint = () => {
    setHintDismissed(true);
    try { sessionStorage.setItem('yaazh-chat-hint-dismissed', 'true'); } catch { /* The hint still dismisses when storage is unavailable. */ }
  };
  const openChat = () => { dismissHint(); onToggleChat(); };
  const showChatHint = !hintDismissed && !isChatOpen && !isMenuOpen;

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
    navItems.find((item) => item.path === currentPath || currentPath.startsWith(`${item.path}/`))?.label ||
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
            title="Yaazh 360 Digitech"
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
          <div className="navbar-chat-anchor">
          <button
            id="navbar-chatbot-toggle"
            type="button"
            onClick={openChat}
            aria-label="Chat with Yaazh assistant"
            aria-expanded={isChatOpen}
            aria-controls={isChatOpen ? 'yaazh-chatbot' : undefined}
            aria-describedby={showChatHint ? 'navbar-chat-hint-text' : undefined}
            className="navbar-chat-launcher inline-flex items-center justify-center gap-2 h-9 w-9 sm:w-auto sm:h-10 px-2 sm:px-3 border bg-white text-[#0052CC] hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 cursor-pointer"
          >
            <img src={botIcon} alt="Yaazh AI Assistant" title="Yaazh AI Assistant" width={24} height={24} className="w-6 h-6 object-contain" />
            <span className="hidden xl:inline text-xs font-bold">AI ASSISTANT</span>
          </button>
          {showChatHint && <aside className="navbar-chat-hint" aria-label="Chat assistance">
            <button type="button" id="navbar-chat-hint-text" className="navbar-chat-hint__message" onClick={openChat}>Need help? Chat here.</button>
            <button type="button" className="navbar-chat-hint__close" aria-label="Dismiss chat suggestion" onClick={() => { dismissHint(); document.getElementById('navbar-chatbot-toggle')?.focus(); }}><X size={17} aria-hidden="true" /></button>
          </aside>}
          </div>
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
