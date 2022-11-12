/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-texture": "url('/polkadot-bg.svg')",
      },
      colors: {
        primary: "#CFB997",
        "light-yellow": "#F6F6C9",
        "dark-brown": "#182747",
        "mighty-yellow": "#FFED1E",
      },
    },
  },
  plugins: [],
};
