/* eslint-disable prettier/prettier */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Remix app files
    './components/**/*.{js,ts,jsx,tsx}', // if you use a components dir
  ],
  theme: {
    extend: {
      keyframes: {
        /* band slides diagonally, then drifts back */
        'aurora-pan': {
          '0%,100%': { backgroundPosition: '50% 50%' },
          '50%': { backgroundPosition: '0% 100%' },
        },

        /* blob layer stretches & rotates */
        'aurora-blob': {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '25%': { transform: 'translate3d(6%, -8%, 0) rotate(4deg)' },
          '50%': { transform: 'translate3d(-8%, 12%, 0) rotate(-3deg)' },
          '75%': { transform: 'translate3d(4%, -6%, 0) rotate(2deg)' },
        },
      },
      animation: {
        'aurora-pan': 'aurora-pan 40s ease-in-out infinite',
        'aurora-blob': 'aurora-blob 28s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
