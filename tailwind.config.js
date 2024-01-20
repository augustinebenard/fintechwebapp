/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#F5F5F5",
          700: "#999999",
          800: "#666666",
          900: "#333333",
        },
        secondary: {
          100: "#FFD6D6",
          200: "#e09da1",
          300: "#d16d73",
          400: "#c13c44",
          500: "#B20B15",
          600: "#8e0911",
          700: "#6b070d",
          800: "#470408",
          900: "#240204",
        },
        gray: {
          100: "#F9F9F9",
          200: "#9C9CA7",
          300: "#5F5E66",
          400: "#59595c",
          500: "#2F3033",
          600: "#262629",
          700: "#1c1d1f",
          800: "#131314",
          900: "#090a0a",
        },
        bg: {
          neutral99: "#FFFBFE",
          neutral10: "#1C1B1F",
        },
        surface: {
          neutral99: "#FFFBFE",
          neutral10: "#1C1B1F",
        },
        surfaceVariant: {
          neutral90: "#FFFBFE",
          neutral30: "#49454F",
        },
        outline: {
          neutral50: "#79747E",
        },
        FAF7F7: "#FAF7F7",
        FFE6E6: "#FFE6E6",
        CC952B: "#CC952B",
        EA212D: "#EA212D",
        Z46AC5C: "#46AC5C",
        B3261E: "#B3261E",
        Z79747E1A: "#79747e1a",
        E4E4F1: "#E4E4F1",
        Z828387: "#828387",
        Z828282: "#828282",
        FFF5F5: "#FFF5F5",
        Z667085: "#667085",
      },
    },
  },
  plugins: [],
}