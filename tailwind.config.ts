import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    //사용자 지정 테마
    extend: {
      height: {
        //h-128
        "128": "128px",
      },
      width: {
        //w-128
        "128": "128px",
      },
      animation: {
        //animate-spin-slow
        "spin-slow": "spin 3s linear",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class", //다크모드 선택
} satisfies Config;
