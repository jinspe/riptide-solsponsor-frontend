/* eslint-disable @typescript-eslint/no-var-requires */
const { neutral } = require('tailwindcss/colors');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const svgToDataUri = require('mini-svg-data-uri');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/*.tsx'],
  darkMode: 'class', // or 'media' or 'class' or false
  variants: {
    extend: {
      ringWidth: ['hover', 'active'],
      ringColor: ['hover', 'active'],
      ringOpacity: ['hover', 'active'],
      appearance: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        select: {
          'background-image': `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${theme(
              'colors.trueGray.500',
              colors.trueGray[500]
            )}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
          )}")`,
        },
      });
    }),
  ],
  theme: {
    extend: {
      fontSize: {
        '4xs': '.4rem',
        '45xs': '.45rem',
        '3xs': '.5rem',
        '2xs': '.6rem',
        xs: '.75rem',
        sm: '.875rem',
        tiny: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
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
          950: '#0D0D0D',
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
      scale: {
        0: '0',
        25: '.25',
        50: '.5',
        75: '.75',
        90: '.9',
        95: '.95',
        100: '1',
        105: '1.05',
        110: '1.1',
        125: '1.25',
        150: '1.5',
        200: '2',
        250: '2.5',
        300: '3',
      },
    },
  },
};
