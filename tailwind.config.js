/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#009688",
        accent: "#94C720",
        warn: "#C70D38",
        "default-text": "#404040",
        "table-header": "#8d8d8d",
        card: "#f2f2f2"
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      },
      spacing: {
        125: "31.25rem", // 500px,
        150: "50rem" // 800px,
      }
    }
  },
  plugins: []
};
