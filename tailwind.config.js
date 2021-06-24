// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    borderWidth: {
        DEFAULT: '1px',
        '15': '15px',
        '30': '30px'
      },
    colors: {
      transparent: 'transparent',
      white: 'white',
      current: 'currentColor',
      blue: {
        light: "var(--blue-light)",
        DEFAULT: "var(--blue)",
        dark: '#009eeb'
      },
      pink: {
        light: '#ff7ce5',
        DEFAULT: '#eaafd0',
        dark: '#ff16d1',
      },
      gray: {
        darkest: '#1f2d3d',
        dark: "var(--gray-dark)",
        DEFAULT: "var(--gray)",
        light: '#e0e6ed',
        lightest: '#f9fafc'
      },
      yellow: {
        light: "var(--yellow-light)",
        DEFAULT: "var(--yellow)"
      },
      green: {
        light: "var(--green-light)",
        DEFAULT: "var(--green)"
      },
      purple: {
        DEFAULT: "var(--purple)",
        gray: "var(--purple-gray)"
      },
      red: {
        light: "var(--red-light)",
        DEFAULT: "var(--red)"
      },
      orange: {
        light: "var(--orange-light)",
        DEFAULT: "var(--orange)"
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
