/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        leftWalk: {
          '0%': { backgroundPosition: '0px 216px;' },
          '100%': { backgroundPosition: '156px 216px;' }
        },
        rightWalk: {
          '0%': { backgroundPosition: '0px 144px;' },
          '100%': { backgroundPosition: '156px 144px;' }
        }
      },
      animation: {
        leftWalk: 'leftWalk 1s steps(3, end) infinite;',
        rightWalk: 'rightWalk 1s steps(3, end) infinite;'
      }
    },
  },
  plugins: [],
}

