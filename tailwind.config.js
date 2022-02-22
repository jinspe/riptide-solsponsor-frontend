/* eslint-disable @typescript-eslint/no-var-requires */
const { neutral } = require('tailwindcss/colors');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/*.tsx'],
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dbg: {
          l0: '#000000',
          l1: '#121212',
          l2: '#1b1b1b',
          l3: '#252525',
        },
        lbg: {
          l0: '#E6E6E6',
          l1: '#EFEFEF',
          l2: '#F5F5F5',
          l3: '#FFFFFF',
        },
        dtext: {
          t0: '#FFFFFF',
          t1: '#DDDDDD',
          t2: '#999999',
          t3: '#666666',
        },
        ltext: {
          t0: '#000000',
          t1: '#000000',
          t2: '#666666',
          t3: '#999999',
        },
        dhover: {
          gray: '#404040',
        },
        lhover: {
          gray: '#d4d4d4',
        },
        amber: {
          200: '#fde68a',
          500: '#f59e0b',
          700: '#b45309',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        stone: colors.warmGray,
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ['hover', 'active'],
      ringColor: ['hover', 'active'],
      ringOpacity: ['hover', 'active'],
    },
  },
};
