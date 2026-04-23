import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          900: '#0A0A0B',
          800: '#161618',
          cyan: '#00F3FF',
        },
        background: "#0A0A0B",
        foreground: "#f3f4f6",
        primary: "#00F3FF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: { 
        'glow-pulse': 'glow 3s infinite alternate',
        'scroll': 'scroll 25s linear infinite', 
      },
      keyframes: { 
        glow: {
          '0%': { 'box-shadow': '0 0 5px #00F3FF' },
          '100%': { 'box-shadow': '0 0 20px #00F3FF' },
        },
        scroll: { 
          '0%': { transform: 'translateX(0)' }, 
          '100%': { transform: 'translateX(-50%)' } 
        } 
      }
    },
  },
  plugins: [],
};
export default config;
