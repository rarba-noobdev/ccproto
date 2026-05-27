/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // ─── Colors ───
      colors: {
        // Primary brand — heat (orange)
        heat: {
          4: 'rgba(255, 255, 255, 0.04)',
          8: 'rgba(255, 255, 255, 0.08)',
          12: 'rgba(255, 255, 255, 0.12)',
          20: 'rgba(255, 255, 255, 0.20)',
          30: 'rgba(255, 255, 255, 0.30)',
          50: 'rgba(255, 255, 255, 0.50)',
          70: 'rgba(255, 255, 255, 0.70)',
          100: '#ffffff',
        },
        // Accent palette
        accent: {
          black: '#262626',
          white: '#ffffff',
          amethyst: '#8b5cf6',
          bluetron: '#0099ff',
          crimson: '#eb3424',
          forest: '#12b76a',
          honey: '#f7b955',
        },
        // Alpha overlays
        'black-alpha': {
          4: 'rgba(0,0,0,0.04)',
          8: 'rgba(0,0,0,0.08)',
          12: 'rgba(0,0,0,0.12)',
          20: 'rgba(0,0,0,0.20)',
          40: 'rgba(0,0,0,0.40)',
          60: 'rgba(0,0,0,0.60)',
          88: 'rgba(0,0,0,0.88)',
        },
        'white-alpha': {
          4: 'rgba(255,255,255,0.04)',
          8: 'rgba(255,255,255,0.08)',
          12: 'rgba(255,255,255,0.12)',
          20: 'rgba(255,255,255,0.20)',
          40: 'rgba(255,255,255,0.40)',
          56: 'rgba(255,255,255,0.56)',
          72: 'rgba(255,255,255,0.72)',
        },
        // UI semantic
        'border-faint': 'rgba(255,255,255,0.04)',
        'border-muted': 'rgba(255,255,255,0.08)',
        'border-loud': 'rgba(255,255,255,0.16)',
        'illustrations-faint': 'rgba(255,255,255,0.04)',
        'illustrations-muted': 'rgba(255,255,255,0.08)',
        'illustrations-default': 'rgba(255,255,255,0.12)',
        'background-lighter': '#1c1c1f',
        'background-base': '#050505',
        // Legacy neon (kept for transition, prefer heat)
        'neon-purple': '#7c3aed',
        'neon-blue': '#2563eb',
        'neon-cyan': '#06b6d4',
        'neon-pink': '#ec4899',
        'neon-green': '#22c55e',
        'neon-gold': '#f59e0b',
        // Void (dark surface)
        void: {
          DEFAULT: '#050505',
          50: '#0b0b0c',
          100: '#111113',
          200: '#1a1a1d',
          300: '#242428',
          400: '#303037',
        },
      },

      // ─── Border Radius (pixel-based) ───
      borderRadius: {
        4: '4px',
        6: '6px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
      },

      // ─── Typography (semantic) ───
      fontSize: {
        'title-h1': ['60px', { lineHeight: '64px', letterSpacing: '-0.3px' }],
        'title-h2': ['52px', { lineHeight: '56px', letterSpacing: '-0.52px' }],
        'title-h3': ['40px', { lineHeight: '44px', letterSpacing: '-0.4px' }],
        'title-h4': ['32px', { lineHeight: '36px', letterSpacing: '-0.32px' }],
        'title-h5': ['24px', { lineHeight: '32px', letterSpacing: '-0.24px' }],
        'body-x-large': ['20px', { lineHeight: '28px', letterSpacing: '-0.1px' }],
        'body-large': ['16px', { lineHeight: '24px' }],
        'body-medium': ['14px', { lineHeight: '20px', letterSpacing: '0.14px' }],
        'body-small': ['13px', { lineHeight: '20px' }],
        'body-input': ['15px', { lineHeight: '24px' }],
        'label-x-large': ['20px', { lineHeight: '28px', fontWeight: '450' }],
        'label-large': ['16px', { lineHeight: '24px', fontWeight: '450' }],
        'label-medium': ['14px', { lineHeight: '20px', fontWeight: '450' }],
        'label-small': ['13px', { lineHeight: '20px', fontWeight: '450' }],
        'label-x-small': ['12px', { lineHeight: '20px', fontWeight: '450' }],
        'mono-medium': ['14px', { lineHeight: '22px' }],
        'mono-small': ['13px', { lineHeight: '20px', fontWeight: '500' }],
        'mono-x-small': ['12px', { lineHeight: '16px' }],
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },

      // ─── Shadows ───
      boxShadow: {
        'card': 'inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 30px rgba(0,0,0,0.25)',
        'card-hover': 'inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 36px rgba(0,0,0,0.32)',
        'elevated': '0 4px 20px rgba(0,0,0,0.35)',
        'glow-sm': '0 0 15px rgba(0, 153, 255, 0.15)',
        'glow-heat': '0 0 0 1px rgba(0, 153, 255, 0.15)',
        'glow-purple': '0 0 30px rgba(0, 153, 255, 0.15)',
      },

      // ─── Animations ───
      animation: {
        'fade-in': 'fadeIn 0.35s ease forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'rgb-border': 'rgbBorder 4s linear infinite',
        'spin-slow': 'spinSlow 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        rgbBorder: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },

      // ─── Background Image ───
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(5,5,5,0) 55%)',
        'mesh-purple': 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(5,5,5,0) 100%)',
      },

      // ─── Screens ───
      screens: {
        xs: { min: '390px' },
        'xs-max': { max: '389px' },
        sm: { min: '576px' },
        'sm-max': { max: '575px' },
        md: { min: '768px' },
        'md-max': { max: '767px' },
        lg: { min: '996px' },
        'lg-max': { max: '995px' },
        xl: { min: '1200px' },
        'xl-max': { max: '1199px' },
      },
    },
  },
  plugins: [],
}
