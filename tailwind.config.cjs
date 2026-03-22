/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0A58CA',
          50: '#EBF2FC',
          100: '#D6E4F9',
          200: '#ADC9F3',
          300: '#85AFED',
          400: '#5C94E7',
          500: '#337AE1',
          600: '#0A58CA',
          700: '#084298',
          800: '#052C66',
          900: '#031633',
        },
        surface: {
          light: '#FFFFFF',
          'light-alt': '#F8FAFC',
          dark: '#0F172A',
          'dark-alt': '#1E293B',
          'dark-card': '#1A2332',
        },
        text: {
          light: '#1E293B',
          'light-muted': '#64748B',
          dark: '#E2E8F0',
          'dark-muted': '#94A3B8',
        },
      },
      borderColor: {
        DEFAULT: '#E2E8F0',
        dark: '#334155',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'count-up': 'countUp 2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
