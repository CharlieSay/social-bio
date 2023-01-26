/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1.4s infinite both',
      },
      keyframes: {
        blink: {
          '0%': {
            opacity: '0.2',
          },
          '20%': {
            opacity: '1',
          },
          '100%': {
            opacity: ' 0.2',
          },
        },
      },
    },
  },
  plugins: [],
}
