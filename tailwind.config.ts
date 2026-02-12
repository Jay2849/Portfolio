import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        background: "hsl(220 20% 4%)",
        foreground: "hsl(180 10% 85%)",
        muted: {
          DEFAULT: "hsl(220 15% 10%)",
          foreground: "hsl(220 10% 50%)",
        },
        accent: {
          DEFAULT: "hsl(180 100% 50%)",
          foreground: "hsl(220 20% 4%)",
        },
        border: "hsl(180 20% 15%)",
        card: {
          DEFAULT: "hsl(220 20% 7%)",
          foreground: "hsl(180 10% 85%)",
        },
        neon: {
          cyan: "hsl(180 100% 50%)",
          green: "hsl(142 76% 50%)",
          amber: "hsl(38 92% 55%)",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
}

export default config
