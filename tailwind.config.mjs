/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50:  '#fdfaf5',
          100: '#f9f2e4',
          200: '#f0dfc0',
          300: '#e4c690',
          400: '#d4a660',
          500: '#c0883a',
        },
        sea: {
          50:  '#f0f7f9',
          100: '#d0e8ef',
          200: '#9dcfe0',
          300: '#5aaec8',
          400: '#2d8fad',
          500: '#1a6e8a',
          600: '#145972',
          700: '#0f4459',
          800: '#0a3040',
          900: '#061e28',
        },
        warm: {
          50:  '#fefefe',
          100: '#faf8f5',
          200: '#f2ede6',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(6,30,40,0.45) 0%, rgba(6,30,40,0.2) 50%, rgba(6,30,40,0.6) 100%)',
      },
    },
  },
  plugins: [],
};
