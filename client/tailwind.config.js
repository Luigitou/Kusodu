/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1C1D1E',
        dark: '#22252A',
        light: '#2F343E',
        primary: '#7A81A6',
        white: '#FFFFFF',
        red: '#A67A7A',
        green: '#7CA67A',
      },
      fontFamily: {
        sans: ['"Lexend"', 'sans-serif'],
        jockey: ['"Jockey One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
