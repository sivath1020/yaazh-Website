import React from 'react';
import { ArrowRight } from 'lucide-react';
import brandLogo from '../../assets/Logo/yaazh-logo-footer-hd.optimized.webp';
import { SocialLinksRow } from '../common/SocialLinksRow';
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
  { label: 'Contact Us', path: '/contact' },
];
const SERVICES = [
  { label: 'Custom Software & ERP', path: '/software-development-coimbatore' },
  { label: 'Website Development', path: '/website-development-coimbatore' },
  { label: 'Digital Marketing & SEO', path: '/digital-marketing-company-coimbatore' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact: _onOpenContact }) => {
  const handleLink = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!onNavigate || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };
  const handleEnquiry = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (onNavigate) {
      onNavigate('/contact');
    } else {
      window.location.assign('/contact');
    }
  };

  return (
    <footer className="editorial-footer" aria-label="Website footer">
      <div className="editorial-footer__inner">
        <div className="editorial-footer__grid">
          <div className="editorial-footer__intro">
            <p className="editorial-footer__title">Let’s Talk<br />Digital.</p>
            <span className="editorial-footer__rule" aria-hidden="true" />
            <p>Ideas that connect. Solutions that grow.<br />We’re here to build your next chapter.</p>
            <a href="/contact" className="editorial-footer__enquiry" onClick={handleEnquiry}>
              Send an enquiry <ArrowRight size={25} aria-hidden="true" />
            </a>
          </div>

          <nav className="editorial-footer__column" aria-label="Footer quick links">
            <h3>Quick links</h3>
            <ul>{QUICK_LINKS.map(link => <li key={link.path}><a href={link.path} onClick={event => handleLink(event, link.path)}>{link.label}</a></li>)}</ul>
          </nav>

          <nav className="editorial-footer__column" aria-label="Footer services">
            <h3>Services</h3>
            <ul>{SERVICES.map(service => <li key={service.path}><a href={service.path} onClick={event => handleLink(event, service.path)}>{service.label}</a></li>)}</ul>
          </nav>

          <div className="editorial-footer__column editorial-footer__contact">
            <h3>Contact</h3>
            <a className="editorial-footer__phone" href="tel:+919047044440">+91 90470 44440</a>
            <a href="mailto:yaazh360digitech@gmail.com">yaazh360digitech@gmail.com</a>
            <address>Peelamedu, Avinashi Rd<br />Coimbatore, Tamil Nadu 641014</address>
            <p>Monday–Saturday<br />9:00 AM–7:00 PM IST</p>
          </div>

          <nav className="editorial-footer__column editorial-footer__expertise" aria-label="Our expertise">
            <h3>Our expertise</h3>
            <a href="/services" onClick={event => handleLink(event, '/services')}><span aria-hidden="true">01</span><span>Software &amp;<br />Digital Products</span></a>
            <a href="/services" onClick={event => handleLink(event, '/services')}><span aria-hidden="true">02</span><span>Marketing &amp;<br />Creative</span></a>
            <SocialLinksRow iconSize={42} className="editorial-footer__social" />
          </nav>
        </div>

        <a className="editorial-footer__brand" href="/" onClick={event => handleLink(event, '/')} aria-label="Yaazh 360 Digitech homepage"><img src={brandLogo} alt="Yaazh 360 Digitech" title="Yaazh 360 Digitech" width={1000} height={334} loading="lazy" /></a>
        <div className="editorial-footer__bottom">
          <p>© {new Date().getFullYear()} Yaazh 360 Digitech. All rights reserved.</p>
          <span>Your vision. Our 360° solution.</span>
          {/* Button design from Uiverse.io by vinodjangid07. */}
          <button className="footer-back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}>
            <svg className="footer-back-to-top__icon" viewBox="0 0 384 512" aria-hidden="true"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" /></svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
