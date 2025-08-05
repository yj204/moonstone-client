const { platformSelect } = require("nativewind/theme");
 
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
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};