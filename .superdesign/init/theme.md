# Theme
React 19, Vite 8, custom components, Tailwind 3 + CSS, Lucide icons, Framer Motion.
Colors: blue #0052CC, navy #0A2558, gold #D49B28, amber #E5A93C, dark #111111, orange #FF5500, white #fff.
Fonts: Plus Jakarta Sans/Manrope sans; existing work page Josefin Sans. Spacing: Tailwind default 4px scale; responsive sm 640/md 768/lg 1024/xl 1280/2xl 1536. Typography: 12px metadata, 14–16px body, 30–48px headings. Border radii 12–24px or pills, soft shadows.

## tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0052CC', // Primary Royal Blue from Logo
          600: '#0043a8',
          700: '#0A2558', // Deep Navy Blue
          800: '#071838',
          900: '#030c1d',
          DEFAULT: '#0052CC',
          blue: '#0052CC',
          navy: '#0A2558',
          electric: '#0073FE',
          cyan: '#00D3FF',
          gold: '#D49B28', // Rich Gold from Logo
          amber: '#E5A93C',
          lightGold: '#FDD460',
          accent: '#D49B28',
          dark: '#111111',
          secondary: '#555555',
          muted: '#777777',
          surface: '#fafbfd',
        }
      },
      textColor: {
        primary: '#111111',
        secondary: '#555555',
      },
      fontFamily: {
        ptsans: ['"PT Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Manrope', '-apple-system', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        josefin: ['"Josefin Sans"', 'sans-serif'],
      },
      letterSpacing: {
        hero: '-2px',
        section: '-1px',
      },
      lineHeight: {
        hero: '1.15',
        section: '1.2',
        body: '1.6',
      },
      boxShadow: {
        'soft-3d': '0 20px 50px -10px rgba(0, 0, 0, 0.08), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'floating-sphere': '0 25px 50px -12px rgba(0, 82, 204, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -4px 8px rgba(0, 0, 0, 0.08)',
        'glow-blue': '0 10px 30px -5px rgba(0, 82, 204, 0.3)',
        'glow-gold': '0 10px 30px -5px rgba(212, 155, 40, 0.3)',
        'clay': '0 15px 35px rgba(0,0,0,0.06), inset 0 3px 6px rgba(255,255,255,0.8), inset 0 -3px 6px rgba(0,0,0,0.05)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

```
## src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --brand-blue: #0052CC;
    --brand-navy: #0A2558;
    --brand-gold: #D49B28;
    --brand-amber: #E5A93C;
    --brand-dark: #111111;
    --brand-secondary: #555555;
    --brand-light: #ffffff;
  }

  html {
    scroll-behavior: smooth;
    font-family: 'Plus Jakarta Sans', 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #111111;
    background-color: #ffffff;
  }

  body {
    font-family: 'Plus Jakarta Sans', 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #ffffff;
    color: #111111;
    overflow-x: hidden;
  }

  /* Custom clean scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #0052CC;
  }
}

@layer utilities {
  .font-ptsans {
    font-family: 'PT Sans', sans-serif;
  }

  .font-josefin {
    font-family: 'Josefin Sans', sans-serif;
  }

  .font-display {
    font-family: 'Manrope', -apple-system, sans-serif;
  }

  .font-handwriting {
    font-family: 'Caveat', cursive, sans-serif;
  }

  .font-script {
    font-family: 'Dancing Script', 'Caveat', cursive, sans-serif;
  }

  .crayon-hatch-bg {
    background-color: #FFA800;
    background-image: repeating-linear-gradient(
      -45deg,
      rgba(255, 140, 0, 0.75),
      rgba(255, 140, 0, 0.75) 3.5px,
      rgba(255, 186, 36, 0.95) 3.5px,
      rgba(255, 186, 36, 0.95) 7px
    );
  }

  /* Services Page Button Style (Custom Neo-Brutalist Pill from User Specification) */
  .services-btn {
    background-color: white;
    color: black;
    border-radius: 10em;
    font-size: 17px;
    font-weight: 600;
    padding: 1em 2em;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: 1px solid black;
    box-shadow: 0 0 0 0 black;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    white-space: nowrap;
    text-decoration: none;
    line-height: 1.2;
  }

  .services-btn:hover {
    transform: translateY(-4px) translateX(-2px);
    box-shadow: 2px 5px 0 0 black;
  }

  .services-btn:active {
    transform: translateY(2px) translateX(1px);
    box-shadow: 0 0 0 0 black;
  }

  /* Services Card Action Buttons ("Chat With Us" & "Call Us" - Little Yellow) */
  .services-btn-yellow,
  .services-card-actions button {
    background-color: #FFD633;
    color: black;
    border-radius: 10em;
    font-size: 17px;
    font-weight: 600;
    padding: 1em 2em;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: 1px solid black;
    transform: translateY(-4px) translateX(-2px);
    box-shadow: 2px 5px 0 0 black;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    white-space: nowrap;
    text-decoration: none;
    line-height: 1.2;
  }

  .services-btn-yellow:hover,
  .services-card-actions button:hover {
    transform: translate(0, 0);
    box-shadow: 0 0 0 0 black;
    background-color: #FFE066;
  }

  .services-btn-yellow:active,
  .services-card-actions button:active {
    transform: translateY(2px) translateX(1px);
    box-shadow: 0 0 0 0 black;
    background-color: #FFCC00;
  }

  @media (max-width: 1280px) and (min-width: 1024px) {
    .services-card-actions button,
    .services-card-actions .services-btn,
    .services-card-actions .services-btn-yellow {
      font-size: 15px;
      padding: 0.85em 1.4em;
    }
  }

  @media (max-width: 640px) {
    .services-card-actions button,
    .services-card-actions .services-btn,
    .services-card-actions .services-btn-yellow {
      font-size: 14px;
      padding: 0.75em 1.25em;
    }
  }

  /* Strict Typography Guidelines */
  .hero-heading {
    font-family: 'Manrope', sans-serif;
    font-weight: 400;
    font-size: clamp(34px, 5.2vw, 64px);
    line-height: 1.15;
    letter-spacing: -2px;
    color: #111111;
  }

  .section-heading {
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    font-size: clamp(30px, 3.8vw, 48px);
    line-height: 1.2;
    letter-spacing: -1px;
    color: #111111;
  }

  .body-description {
    font-family: 'Manrope', sans-serif;
    font-weight: 400;
    font-size: clamp(17px, 1.25vw, 20px);
    line-height: 1.6;
    color: #555555;
  }

  /* Outlined typography matching reference image 5 in Royal Blue & Gold */
  .text-outline-blue {
    -webkit-text-stroke: 2px #0052CC;
    color: transparent;
    transition: all 0.3s ease;
  }

  .text-outline-blue:hover {
    color: #0052CC;
    text-shadow: 0 10px 30px rgba(0, 82, 204, 0.35);
  }

  .text-outline-gold {
    -webkit-text-stroke: 2px #D49B28;
    color: transparent;
    transition: all 0.3s ease;
  }

  .text-outline-gold:hover {
    color: #D49B28;
    text-shadow: 0 10px 30px rgba(212, 155, 40, 0.35);
  }

  .text-outline-dark {
    -webkit-text-stroke: 2px #111111;
    color: transparent;
  }

  .text-outline-orange {
    -webkit-text-stroke: 2.5px #FF5500;
    color: transparent;
  }

  /* Perspective for 3D Cards */
  .perspective-1000 {
    perspective: 1000px;
  }

  .perspective-2000 {
    perspective: 2000px;
  }

  .preserve-3d {
    transform-style: preserve-3d;
  }

  .backface-hidden {
    backface-visibility: hidden;
  }

  /* 3D clay / pearl sphere effects with Blue and Gold reflections */
  .sphere-3d {
    background: radial-gradient(circle at 35% 30%, #ffffff 0%, #f0f4ff 50%, #dbeafe 85%, #93c5fd 100%);
    box-shadow: 
      inset -4px -6px 12px rgba(10, 37, 88, 0.12),
      inset 4px 6px 12px rgba(255, 255, 255, 0.95),
      0 12px 28px rgba(0, 82, 204, 0.12),
      0 4px 8px rgba(0, 0, 0, 0.06);
  }

  .sphere-blue-3d {
    background: radial-gradient(circle at 35% 30%, #60a5fa 0%, #0052CC 50%, #0A2558 85%, #030c1d 100%);
    box-shadow: 
      inset -4px -6px 16px rgba(0, 0, 0, 0.35),
      inset 4px 6px 14px rgba(255, 255, 255, 0.6),
      0 16px 36px rgba(0, 82, 204, 0.35);
  }

  .sphere-gold-3d {
    background: radial-gradient(circle at 35% 30%, #fff1b0 0%, #fdd460 35%, #e29d36 70%, #9a6510 100%);
    box-shadow: 
      inset -4px -6px 16px rgba(0, 0, 0, 0.25),
      inset 4px 6px 14px rgba(255, 255, 255, 0.7),
      0 16px 36px rgba(212, 155, 40, 0.35);
  }

  /* =========================================================
     Skewed Brutalist CTA Button with Animated Chevrons
     ========================================================= */
  @keyframes color_anim {
    0% {
      fill: #ffffff;
    }
    50% {
      fill: #FBC638;
    }
    100% {
      fill: #ffffff;
    }
  }

  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 9px 24px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-style: italic;
    font-size: 13.5px;
    letter-spacing: 0.04em;
    color: #ffffff;
    background: #6225E6;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 5px 5px 0 #000000;
    transform: skewX(-15deg);
    border: none;
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    user-select: none;
  }

  @media (min-width: 640px) {
    .cta {
      padding: 11px 28px;
      font-size: 15px;
      box-shadow: 5.5px 5.5px 0 #000000;
    }
  }

  .cta:focus {
    outline: none;
  }

  .cta:hover {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 8px 8px 0 #FBC638;
    transform: skewX(-15deg) translate(-2px, -2px);
  }

  .cta.cta-dark {
    background: #111111;
  }

  .cta.cta-dark:hover {
    box-shadow: 8px 8px 0 #FBC638;
  }

  .cta.cta-yellow {
    background: #FBC638;
    color: #111111;
    box-shadow: 5px 5px 0 #000000;
  }

  .cta.cta-yellow:hover {
    box-shadow: 8px 8px 0 #000000;
    transform: skewX(-15deg) translate(-2px, -2px);
  }

  .cta.cta-orange {
    background: #FF5500;
  }

  .cta > span {
    display: inline-flex;
    align-items: center;
    transform: skewX(15deg);
  }

  .cta > span:nth-child(2) {
    width: 24px;
    margin-left: 12px;
    margin-right: 0px;
    position: relative;
    display: inline-flex;
    align-items: center;
    transition: margin-right 0.4s ease;
  }

  @media (min-width: 640px) {
    .cta > span:nth-child(2) {
      width: 28px;
      margin-left: 16px;
    }
  }

  .cta:hover > span:nth-child(2) {
    transition: margin-right 0.4s ease;
    margin-right: 18px;
  }

  @media (min-width: 640px) {
    .cta:hover > span:nth-child(2) {
      margin-right: 22px;
    }
  }

  .cta path.one {
    transition: transform 0.4s ease;
    transform: translateX(-60%);
  }

  .cta path.two {
    transition: transform 0.5s ease;
    transform: translateX(-30%);
  }

  .cta:hover path.three {
    animation: color_anim 1s infinite 0.2s;
  }

  .cta:hover path.one {
    transform: translateX(0%);
    animation: color_anim 1s infinite 0.6s;
  }

  .cta:hover path.two {
    transform: translateX(0%);
    animation: color_anim 1s infinite 0.4s;
  }

  /* Yellow button dark chevron animation */
  @keyframes color_anim_dark {
    0% {
      fill: #111111;
    }
    50% {
      fill: #6225E6;
    }
    100% {
      fill: #111111;
    }
  }

  .cta.cta-yellow:hover path.three {
    animation: color_anim_dark 1s infinite 0.2s;
  }

  .cta.cta-yellow:hover path.one {
    transform: translateX(0%);
    animation: color_anim_dark 1s infinite 0.6s;
  }

  .cta.cta-yellow:hover path.two {
    transform: translateX(0%);
    animation: color_anim_dark 1s infinite 0.4s;
  }
}

```
