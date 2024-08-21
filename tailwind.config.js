/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          shades: "#62fd76",
          DEFAULT: "#18db33", //
          tint: "#79d38585",
        },
        secondary: {
          shades: "#eef9e5",
          DEFAULT: "#e6f8d7", //
          tint: "#e6f8d7bf",
        },

        info: {
          shades: "#0e6ffd",
          DEFAULT: "#170253", //
          tint: "#d5d9ef",
        },

        warning: {
          shades: "#F6E05E",
          DEFAULT: "#D69E2E", //
          tint: "#fdf3e0",
        },

        error: {
          shades: "#F56565",
          DEFAULT: "#E53E3E", //
          tint: "#fdeaef",
        },

        accent: {
          shades: "#d9d9d9",
          DEFAULT: "#728297", //
          tint: "##e2e8f0",
        },

        white: {
          shades: "#FAFAFA",
          DEFAULT: "#FFFFFF", //
          tint: "#f6f7fb",
        },
      },
    },
  },
  plugins: [],
};
