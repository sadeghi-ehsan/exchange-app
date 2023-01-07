/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#009688",
        accent: "#94C720",
        warn: "#C70D38",
        text: "#404040",
        "table-header": "#8d8d8d"
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      }
    }
  },
  plugins: []
};
