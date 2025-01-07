import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import preline from "preline/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: colors.indigo,
      },
    },
  },
  plugins: [preline],
} satisfies Config;
