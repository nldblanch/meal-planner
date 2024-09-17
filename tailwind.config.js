/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "rgb(9, 9, 11)",
        background: "rgb(255, 255, 255)",
        primary1: "rgb(65, 152, 223)",
        secondary1: "rgb(46, 111, 89)",
        accent1: "rgb(100, 138, 190)",
        negative1: "rgb(206, 47, 47)",
        faint: "#ffffff99",
        darkText: "rgb(255, 255, 255)",
        darkBackground: "rgb(9, 9, 11)",
        
      },
      aspectRatio: {
        "2/3": "2 / 3",
      },
    },
  },
  plugins: [],
};
