import React from 'react';
import { SOCIAL_LINKS } from '../../lib/socialLinks';
import './SocialLinksRow.css';

interface SocialLinksRowProps {
  iconSize?: number;
  className?: string;
}

/** Renders social media icon links with dark hover/focus tooltips matching the navbar hint style. */
export const SocialLinksRow: React.FC<SocialLinksRowProps> = ({ iconSize = 44, className = '' }) => {
  return (
    <div className={`social-links-row ${className}`.trim()} aria-label="Social media">
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="social-links-row__item"
        >
          <img
            src={item.icon}
            alt={item.name}
            width={iconSize}
            height={iconSize}
            style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            loading="lazy"
          />
          <span className="social-links-row__tooltip" role="tooltip">
            {item.name}
          </span>
        </a>
      ))}
    </div>
  );
};
