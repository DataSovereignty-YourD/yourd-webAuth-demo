/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  jit:true,
  darkMode:"class",//or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animated")],
}

