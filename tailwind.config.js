/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        faint: "#ffffff99"
      },
      aspectRatio: {
        "2/3": "2 / 3",
      },
    },
  },
  plugins: [],
};
