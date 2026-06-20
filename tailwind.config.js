/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#05050F",
          900: "#0A0A18",
          800: "#12121F",
          700: "#1A1A35",
          600: "#222245",
        },
        gold: {
          300: "#F5D98A",
          400: "#E8C97A",
          500: "#C9A84C",
          600: "#B8942E",
          700: "#9A7A1E",
        },
        platinum: "#F5F5F0",
        silver: "#A8A8B3",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans:    ["'Inter'", "system-ui", "sans-serif"],
        accent:  ["'Montserrat'", "sans-serif"],
      },
      backgroundImage: {
        "gold-shimmer": "linear-gradient(90deg,#C9A84C 0%,#E8C97A 50%,#C9A84C 100%)",
        "hero-gradient": "linear-gradient(135deg,rgba(5,5,15,0.92) 0%,rgba(10,10,24,0.75) 60%,rgba(201,168,76,0.12) 100%)",
      },
      animation: {
        shimmer:   "shimmer 2.5s linear infinite",
        float:     "float 6s ease-in-out infinite",
        "ping-slow":"ping 2.5s cubic-bezier(0,0,0.2,1) infinite",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        gold:      "0 0 30px rgba(201,168,76,0.25)",
        "gold-lg": "0 0 60px rgba(201,168,76,0.35)",
        card:      "0 8px 40px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
