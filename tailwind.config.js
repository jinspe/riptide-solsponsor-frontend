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
        darkbg: '#202124',
        lightbg: '#F2F2F2',
        dtext: {
          title: '#FFFFFF',
          high: '#DDDDDD',
          med: '#999999',
          low: '#666666',
        },
        ltext: {
          title: '#000000',
          high: '#000000',
          med: '#666666',
          low: '#999999',
        },
        dhover: {
          gray: '#404040',
        },
        lhover: {
          gray: '#d4d4d4',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
};
