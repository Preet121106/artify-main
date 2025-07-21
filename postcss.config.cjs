// postcss.config.cjs  (CommonJS)
const tailwindcss = require('@tailwindcss/postcss'); // Tailwind v4 PostCSS plugin
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    tailwindcss(), // 👈 note the function call
    autoprefixer(), // keeps vendor prefixes working
  ],
};
