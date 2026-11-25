import instagramIcon from '../assets/social media icons/instagram.png';
import facebookIcon from '../assets/social media icons/facebook.png';
import linkedinIcon from '../assets/social media icons/linkedin.png';
import whatsappIcon from '../assets/social media icons/whatsapp.png';

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  label: string;
}

/** Official social media and messaging links for Yaazh 360 Digitech. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/yaazh360digitech?utm_source=ig_web_button_share_sheet&evlk=ZDNlZDc0MzIxNw==',
    icon: instagramIcon,
    label: 'Follow Yaazh 360 Digitech on Instagram',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1FtMZopZtX/?mibextid=wwXIfr',
    icon: facebookIcon,
    label: 'Follow Yaazh 360 Digitech on Facebook',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/yaazh360digitech',
    icon: linkedinIcon,
    label: 'Follow Yaazh 360 Digitech on LinkedIn',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919047044440',
    icon: whatsappIcon,
    label: 'Chat with Yaazh 360 Digitech on WhatsApp',
  },
];
