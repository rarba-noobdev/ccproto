/** @type {import('tailwindcss').Config} */

const sizes = Array.from({ length: 1000 }, (_, i) => i).reduce(
  (acc, curr) => {
    acc[curr] = `${curr}px`;
    return acc;
  },
  {
    '1/2': '50%',
    '1/3': '33.333333%',
    '2/3': '66.666667%',
    '1/4': '25%',
    '1/6': '16.666667%',
    '5/6': '83.333333%',
  }
);

const radii = Array.from({ length: 41 }, (_, i) => i).reduce(
  (acc, curr) => {
    acc[curr] = `${curr}px`;
    return acc;
  },
  { full: '999px' }
);

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: sizes,
      width: sizes,
      height: sizes,
      size: sizes,
      inset: sizes,
      gap: sizes,
      margin: sizes,
      padding: sizes,
      colors: {
        background: {
          lighter: 'var(--canvas)',
          base: 'var(--canvas-soft)',
        },
        accent: {
          black: '#262626',
          white: '#ffffff',
          amethyst: '#9061ff',
          blue: 'var(--accent-blue)',
          bluetron: 'var(--accent-blue)',
          crimson: '#eb3424',
          forest: '#42c366',
          honey: '#ecb730',
        },
        heat: {
          4: 'rgba(250,93,25,0.04)',
          8: 'rgba(250,93,25,0.08)',
          10: 'rgba(250,93,25,0.10)',
          12: 'rgba(250,93,25,0.12)',
          16: 'rgba(250,93,25,0.16)',
          20: 'rgba(250,93,25,0.20)',
          40: 'rgba(250,93,25,0.40)',
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
        'black-alpha': {
          5: 'rgba(0,0,0,0.05)',
          10: 'rgba(0,0,0,0.10)',
          20: 'rgba(0,0,0,0.20)',
          40: 'rgba(0,0,0,0.40)',
          56: 'rgba(0,0,0,0.56)',
          72: 'rgba(0,0,0,0.72)',
          88: 'rgba(0,0,0,0.88)',
        },
        border: {
          faint: 'var(--line)',
          muted: 'var(--line)',
          loud: 'var(--line-strong)',
        },
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          hover: 'var(--surface-hover)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          muted: 'var(--ink-muted)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        canvas: 'var(--canvas)',
      },
      borderRadius: radii,
      fontSize: {
        'title-h1': ['60px', { lineHeight: '64px', letterSpacing: '-0.3px' }],
        'title-h2': ['52px', { lineHeight: '56px', letterSpacing: '-0.52px' }],
        'title-h3': ['40px', { lineHeight: '44px', letterSpacing: '-0.4px' }],
        'title-h4': ['32px', { lineHeight: '36px', letterSpacing: '-0.32px' }],
        'title-h5': ['24px', { lineHeight: '32px', letterSpacing: '-0.24px' }],
        'title-h6': ['20px', { lineHeight: '28px', letterSpacing: '-0.2px' }],
        'display-large': ['clamp(48px, 8vw, 100px)', { lineHeight: '0.9', letterSpacing: '-0.075em', fontWeight: '700' }],
        'display-xl': ['clamp(64px, 12vw, 152px)', { lineHeight: '0.86', letterSpacing: '-0.085em', fontWeight: '700' }],
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
        sans: ['SuisseIntl', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['SuisseIntl', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(38,38,38,0.08), 0 2px 8px rgba(38,38,38,0.045)',
        edge: 'inset 0 1px 0 rgba(255,255,255,0.88), 0 16px 45px rgba(38,38,38,0.10)',
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
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      transitionDuration: {
        0: '0ms',
        4: '200ms',
        6: '300ms',
        10: '500ms',
        20: '1000ms',
        40: '2000ms',
      },
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
        '2xl': { min: '1440px' },
        '2xl-max': { max: '1439px' },
      },
    },
  },
  plugins: [],
}
