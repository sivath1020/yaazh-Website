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
        'sour-gummy': ['"Sour Gummy"', 'cursive', 'sans-serif'],
        'bodoni-moda': ['"Bodoni Moda"', 'serif'],
        'baskervville': ['"Baskervville"', 'serif'],
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
