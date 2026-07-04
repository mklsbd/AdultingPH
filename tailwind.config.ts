import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F4F6FB",
          100: "#E7EBF5",
          200: "#CBD4E8",
          300: "#A9B6D6",
          400: "#7C8FBD",
          500: "#5A6FA0",
          600: "#3F5384",
          700: "#2C3E6B",
          800: "#101C42",
          900: "#0A1330",
          950: "#050B18",
        },
        accent: {
          violet: "#5B5FEF",
          indigo: "#6D5AE6",
        },
        success: {
          DEFAULT: "#1FAA6E",
          light: "#E4F8EF",
          dark: "#0E7A4C",
        },
        warning: {
          DEFAULT: "#DD9A2B",
          light: "#FCF1DD",
          dark: "#A6710F",
        },
        danger: {
          DEFAULT: "#E4574C",
          light: "#FCE9E7",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(10, 19, 48, 0.12)",
        "glass-lg": "0 20px 60px -10px rgba(10, 19, 48, 0.35)",
        "glow-violet": "0 0 40px -8px rgba(91, 95, 239, 0.55)",
      },
      backgroundImage: {
        "mesh-navy":
          "radial-gradient(at 20% 10%, rgba(91,95,239,0.25) 0px, transparent 50%), radial-gradient(at 85% 0%, rgba(109,90,230,0.20) 0px, transparent 50%), radial-gradient(at 90% 90%, rgba(31,170,110,0.12) 0px, transparent 50%)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
