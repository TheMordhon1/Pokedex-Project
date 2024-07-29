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
        // element color
        el_undefined: "rgba(229, 231, 235, 1)",
        el_bug: "rgba(157, 193, 48, 1)",
        el_dark: "rgba(95, 96, 109, 1)",
        el_dragon: "rgba(7, 115, 199, 1)",
        el_electric: "rgba(237, 213, 63, 1)",
        el_fairy: "rgba(239, 151, 230, 1)",
        el_fighting: "rgba(217, 66, 86, 1)",
        el_fire: "rgba(252, 108, 109, 1)",
        el_flying: "rgba(155, 180, 232, 1)",
        el_ghost: "rgba(121, 117, 212, 1)",
        el_grass: "rgba(93, 190, 98, 1)",
        el_ground: "rgba(215, 133, 85, 1)",
        el_ice: "rgba(152, 216, 216, 1)",
        el_normal: "rgba(154, 157, 161, 1)",
        el_poison: "rgba(181, 99, 206, 1)",
        el_psychic: "rgba(248, 88, 136, 1)",
        el_rock: "rgba(195, 177, 98, 1)",
        el_steel: "rgba(184, 184, 208, 1)",
        el_water: "rgba(96, 165, 250, 1)",
      },
    },
  },
  plugins: [],
};
