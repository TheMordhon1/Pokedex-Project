/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0e181f",
        white: "#f1f5f9",
        grey: "#949ba7",
        ligthblack: "#262f3b",
      },
    },
  },
  plugins: [],
};
