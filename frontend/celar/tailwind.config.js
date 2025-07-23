/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4B6B3C",
        gray: "#5C5B57",
        success: "#6EE7B7",
        warning: "#FACC15",
        error: "#DC4C3E",
      },
    },
  },
  plugins: [],
};
