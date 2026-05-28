/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fbfbfb',
        surface: {
          1: '#ffffff',
          2: '#f2f0ec',
        },
        ink: {
          DEFAULT: '#262626',
          soft: 'rgba(38,38,38,0.76)',
          muted: 'rgba(38,38,38,0.56)',
        },
        accent: {
          blue: '#2a6dfb',
          bluetron: '#2a6dfb',
        },
        gradient: {
          violet: '#8b2cff',
          magenta: '#ff2d88',
          orange: '#ff8a2a',
          coral: '#ff6b9d',
        },
        void: {
          DEFAULT: '#fbfbfb',
          50: '#f9f9f9',
          100: '#f2f0ec',
          200: '#ebe8e1',
          300: '#ded8cc',
          400: '#cfc6b8',
        },
        heat: {
          100: '#fa5d19',
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
        'border-muted': 'rgba(38,38,38,0.10)',
      },
      borderRadius: {
        4: '4px',
        6: '6px',
        10: '10px',
        15: '15px',
        20: '20px',
        30: '30px',
        pill: '100px',
      },
      fontSize: {
        'display-xl': ['clamp(64px, 12vw, 152px)', { lineHeight: '.84', letterSpacing: '-0.085em', fontWeight: '900' }],
        'display-lg': ['clamp(48px, 8vw, 100px)', { lineHeight: '.88', letterSpacing: '-0.075em', fontWeight: '900' }],
        'title-lg': ['40px', { lineHeight: '44px', letterSpacing: '-0.055em' }],
        'title-md': ['28px', { lineHeight: '34px', letterSpacing: '-0.04em' }],
        'body-md': ['14px', { lineHeight: '22px' }],
        'body-sm': ['13px', { lineHeight: '20px' }],
      },
      fontFamily: {
        sans: ['SuisseIntl', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['SuisseIntl', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: 'inset 0 1px 0 rgba(255,255,255,0.86), 0 18px 50px rgba(38,38,38,0.10)',
        focus: '0 0 0 4px rgba(42,109,251,0.14)',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
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
      },
      screens: {
        xs: { min: '390px' },
        sm: { min: '576px' },
        md: { min: '768px' },
        lg: { min: '996px' },
        xl: { min: '1200px' },
      },
    },
  },
  plugins: [],
}
