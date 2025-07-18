// tailwind.config.js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        babyPink: '#ffc0cb',
        softPurple: '#dda0dd',
        violet: '#8a2be2',
      },
      backgroundImage: {
        'pink-purple': 'linear-gradient(to right, #ffc0cb, #dda0dd, #8a2be2)',
      },
    },
  },
  plugins: [],
};
