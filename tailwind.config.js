/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        circle: {
          '0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' },
        },
        circle_fast: {
          '0%': { transform: 'rotate(0deg) translateX(5px) rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg) translateX(5px) rotate(360deg)' },
        },
        slide_in: {
          '50%': { transform: 'translateX(-90%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slide_in_mobile: {
          '50%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'circle': 'circle 20s linear infinite',
        'circle-fast': 'circle_fast 10s linear infinite',
        'slide-in': 'slide_in 1s ease-in-out',
        'slide-in-mobile': 'slide_in_mobile 1s ease-in-out',
      },
      fontFamily: {
        solaris: ['SOLARIS', 'cursive'],
        spiegel: ['SPIEGEL', 'cursive']
      },
      colors: {
        main: "#FFD6AC",
        lightGray: "#393839",
        darkGray: "#211F21",
        blanco: "#F5F5F7",
      },
    },
  },
  plugins: [],
}
