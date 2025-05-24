/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        heading: ['var(--font-heading)'],
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
        md: '0 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
