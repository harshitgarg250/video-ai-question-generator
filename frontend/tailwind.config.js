/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        body: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          900: "#07080B",
          800: "#0B0D12",
          700: "#121520",
          600: "#1A2030",
          500: "#22293A",
        },
        neon: {
          500: "#5BF8D1",
          400: "#77FFE0",
        },
        haze: "rgba(255, 255, 255, 0.08)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(91, 248, 209, 0.18)",
      },
      backdropBlur: {
        glass: "18px",
      },
    },
  },
  plugins: [],
};
