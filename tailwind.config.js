module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      yellow:{
        normal: "hsla(50, 100%, 63%, 1)",
        dark: "hsla(50, 100%, 23%, 1)",
        light: "hsla(55, 100%, 83%, 1)"
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
