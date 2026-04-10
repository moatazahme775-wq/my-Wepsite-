import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Tahoma", "Arial", "system-ui", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"]
      },
      colors: {
        brand: {
          50: "#f4f7ff",
          100: "#e8eeff",
          500: "#3b5bdb",
          700: "#274690",
          900: "#16213e"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
