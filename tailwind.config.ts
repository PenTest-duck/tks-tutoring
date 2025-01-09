import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import preline from "preline/plugin";
import forms from "@tailwindcss/forms";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: colors.indigo,
        error: "#ef4444", // red-500
        disabled: "#9cafa3", // gray-400
      },
    },
  },
  plugins: [preline, forms],
} satisfies Config;
