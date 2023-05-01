/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hivelyPurple: "#6466F1",
        hivelyBlue: "#11F0CC",
        hWarning: "#EEC643",
        hError: "#DA2C38",
        hBlue: {
          50: "#E7FDFA",
          100: "#CFFCF4",
          200: "#9FF9EA",
          300: "#6FF6DF",
          400: "#3FF3D5",
          500: "#11F0CC",
          600: "#0CC0A2",
          700: "#099079",
          800: "#066051",
          900: "#033028",
        },
        hPurple: {
          50: "#F6F6FE",
          100: "#ECEDFD",
          200: "#D0D1FB",
          300: "#B9BAF9",
          400: "#9395F5",
          500: "#6466F1",
          600: "#5759F0",
          700: "#3F42EE",
          800: "#1A1DEA",
          900: "#1113B6",
        },
      },
    },
  },
  plugins: [],
};
