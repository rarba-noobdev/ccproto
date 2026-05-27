/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#050506',
        surface: {
          1: '#101114',
          2: '#181a1f',
        },
        ink: {
          DEFAULT: '#f7f7f3',
          soft: '#d9dbe0',
          muted: '#8d929c',
        },
        accent: {
          blue: '#2081ff',
          bluetron: '#2081ff',
        },
        gradient: {
          violet: '#8b2cff',
          magenta: '#ff2d88',
          orange: '#ff8a2a',
          coral: '#ff6b9d',
        },
        void: {
          DEFAULT: '#050506',
          50: '#08090b',
          100: '#101114',
          200: '#181a1f',
          300: '#22242a',
          400: '#2c2f36',
        },
        heat: {
          100: '#f7f7f3',
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
        'border-muted': 'rgba(255,255,255,0.10)',
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
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 18px 50px rgba(0,0,0,0.30)',
        focus: '0 0 0 4px rgba(32,129,255,0.18)',
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
