import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pumple: {
          bg: "#0D0D0D",
          green: "#4ADE80",
          lime: "#A3E635",
          text: "#F5F5F5",
          muted: "#6B7280",
          card: "rgba(255,255,255,0.03)",
          border: "rgba(255,255,255,0.08)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out 1s infinite",
        "float-slow": "float 6s ease-in-out infinite",
        wave: "wave 1.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "particle-1": "particle 8s ease-in-out infinite",
        "particle-2": "particle 10s ease-in-out 2s infinite",
        "particle-3": "particle 7s ease-in-out 4s infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(2deg)" },
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(20deg)" },
          "75%": { transform: "rotate(-15deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        particle: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.6" },
          "33%": { transform: "translate(30px, -40px) scale(1.2)", opacity: "1" },
          "66%": { transform: "translate(-20px, 20px) scale(0.8)", opacity: "0.4" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px 0 rgba(74,222,128,0.3)" },
          "50%": { boxShadow: "0 0 40px 10px rgba(74,222,128,0.15)" },
        },
      },
      backgroundImage: {
        "grid-green": "linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(74,222,128,0.15) 0%, transparent 60%)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      boxShadow: {
        "green-glow": "0 0 30px rgba(74,222,128,0.3)",
        "green-glow-lg": "0 0 60px rgba(74,222,128,0.2)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(74,222,128,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
