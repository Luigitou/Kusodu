import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            dark: '#1C1C1C',
            brighter: '#232323',
            primary: '#D9D9D9',
            white: '#FFFFFF',
            blue: '#1E90FF',
            green: '#00FF00',
            red: '#FF0000',
        },
        fontFamily: {
            sans: ['Jockey One', 'Inter', 'sans-serif'],
        },
        extend: {},
    },
    plugins: [],
};
export default config;
