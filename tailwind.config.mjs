/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        analogMain: "#0a6bb2",
        analogAccent: "#ff5000",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
