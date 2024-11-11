import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#1C1D1E',
        dark: '#22252A',
        light: '#2F343E',
        primary: '#7A81A6',
      },
      fontFamily: {
        sans: ['Jockey One', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
