/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          shades: "#62fd75",
          DEFAULT: "#019933", //
          tint: "#79d38585",
        },
        secondary: {
          shades: "#eef9e5",
          DEFAULT: "#e6f8d7", //
          tint: "#f9fbfc",
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
          shades: "#dbe0eb",
          DEFAULT: "#728297", //
          tint: "#f4f6fa",
        },

        white: {
          shades: "#FAFAFA",
          DEFAULT: "#FFFFFF", //
          tint: "#f6f7fb",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
