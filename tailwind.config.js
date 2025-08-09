/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#C3FF0A",
        background: "#212121",
        textPrimary: "#F5F5DC",
        textSecondary: "#616161",
      },
      fontFamily: {
        pextralight: ["LufgaExtraLight", "sans-serif"],
        plight: ["LufgaLight", "sans-serif"],
        pregular: ["LufgaRegular", "sans-serif"],
        pmedium: ["LufgaMedium", "sans-serif"],
        psemibold: ["LufgaSemiBold", "sans-serif"],
        pbold: ["LufgaBold", "sans-serif"],
        pextrabold: ["LufgaExtraBold", "sans-serif"],
        pthin: ["LufgaThin", "sans-serif"],
        pblack: ["LufgaBlack", "sans-serif"],
      },
    },
  },
  plugins: [],
};
