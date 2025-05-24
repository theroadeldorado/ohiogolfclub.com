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
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
        md: '0 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const textShadows = theme('textShadow');
      const utilities = {};

      Object.entries(textShadows).forEach(([key, value]) => {
        utilities[`.text-shadow-${key}`] = {
          textShadow: value,
        };
      });

      addUtilities(utilities);
    },
  ],
};
