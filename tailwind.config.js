const { platformSelect } = require("nativewind/theme");
const material = require('./material-theme.json')
const LIGHT = material.schemes.light;
const DARK  = material.schemes.dark;

const toKebab = (s) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

// Build tokens like "md-on-surface", "md-primary", plus "-dark" variants.
const mdLight = Object.fromEntries(
  Object.entries(LIGHT).map(([k, v]) => [`md-${toKebab(k)}`, v])
);
const mdDark = Object.fromEntries(
  Object.entries(DARK).map(([k, v]) => [`md-${toKebab(k)}-dark`, v])
);


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        ...mdLight,
        ...mdDark,
      },
    },
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './components/**/*',
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],
  plugins: [],
};