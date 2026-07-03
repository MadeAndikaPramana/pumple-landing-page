import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pumple: {
          bg: "#0D0D0D",
          surface: "#141414",
          green: "#4ADE80",
          lime: "#A3E635",
          text: "#F5F5F5",
          muted: "#9CA3AF",
          dim: "#6B7280",
          red: "#F87171",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      animation: {
        marquee: "marquee 50s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(74,222,128,0.25)",
        glow: "0 0 40px rgba(74,222,128,0.18)",
        "glow-lg": "0 0 80px rgba(74,222,128,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
