const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  purge: ['./src/**/*.js'],
  theme: {
    fontFamily: {
      head: ['Avenir Next', 'sans-serif'],
      sans: ['Sora', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      ...colors,
      background: 'var(--background, #151515)',
      foreground: 'var(--foreground, #D7D7D7)',
      headings: 'var(--headings, #FFFFFF)',
      gray700: 'var(--gray700, #242424)',
      gray500: 'var(--gray500, #4F4F4F)',
      inverseBg: 'var(--inverse-bg, #fff)',
    },
    extend: {
      colors: {
        red: {
          ...colors.red,
          DEFAULT: '#E94040',
        },
        blue: {
          ...colors.blue,
          DEFAULT: '#67BBEF',
        },
        green: {
          ...colors.green,
          DEFAULT: '#67D3BE',
        },
        purple: {
          ...colors.purple,
          DEFAULT: '#8A65AA',
        },
        yellow: {
          ...colors.yellow,
          DEFAULT: '#F5BF32',
        },
        palered: { DEFAULT: '#EB697F' },
      },
    },
  },
  variants: {},
  plugins: [],
};
