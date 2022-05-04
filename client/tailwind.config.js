module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      black: "#1f1f1f",
      purple: {
        100: "#a545cc",
        200: "#cb6ce6",
      },
      white: "#ffffff",
      gray: "#a1a1aa",
      red: {
        500: "#ef4444",
        700: "#b91c1c",
      },
      blue: {
        100: "#ebf8ff",
        200: "#bee3f8",
        300: "#90cdf4",
        400: "#63b3ed",
        500: "#4299e1",
        600: "#3182ce",
        700: "#2b6cb0",
        800: "#2c5282",
        900: "#2a4365",
      },
    },
    extend: {
      boxShadow: {
        header:
          "-5px -5px 25px -1px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};
