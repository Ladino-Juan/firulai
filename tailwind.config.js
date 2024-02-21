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
        }
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'circle': 'circle 20s linear infinite',
        'circle-fast': 'circle_fast 10s linear infinite'
      },
      fontFamily: {
        solaris: ['SOLARIS', 'cursive'],
        spiegel: ['SPIEGEL', 'cursive']
      },
      colors: {
        main: "#FFD6AC",
        lightGreen: "#8CC540",
        darkGreen: "#FFFFFF",
        blanco: "#FFFFFF",
        lightPurple: "#9290F8",
        darkPurple: "#5955FC",
        lightOrange: "#FFCB87",
        darkOrange: "#FF914C"
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'gallery': 'inset 17px -17px 47px #a6a6a6, inset -17px 17px 47px #ffffff'
      }
    },
  },
  plugins: [],
}
