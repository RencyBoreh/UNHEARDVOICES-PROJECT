// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
});
