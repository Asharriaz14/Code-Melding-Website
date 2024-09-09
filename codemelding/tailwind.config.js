/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/flowbite/**/*.js',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'Orange': '#FF3D00',
      'White': "#FFFFFF",
      'Content': '#1D1D1D',
      'grey': "rgb(204, 204, 204)",
      'border': "#4D4D4D"
    }},
  },
  plugins: [require('flowbite/plugin')],
}

