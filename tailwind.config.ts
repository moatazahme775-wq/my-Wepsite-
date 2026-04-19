import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff8ed",
          100: "#ffeed1",
          200: "#ffd9a0",
          300: "#ffc06a",
          400: "#ffa53f",
          500: "#ff8a1f",
          600: "#f06d0e",
          700: "#c7570c",
          800: "#9d4512",
          900: "#7e3a12"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
} satisfies Config;
