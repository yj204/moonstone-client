const { platformSelect } = require("nativewind/theme");
 
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
    //   colors: {
    //     error: platformSelect({
    //       ios: "red",
    //       android: "blue",
    //       default: "green",
    //     }),
    //   },
    },
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};