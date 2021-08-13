// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
       '-10': '-10',
       '9999': '9999'
     },
     opacity: {
       '15': '15%'
     },
     width: {
       '60vw': '60vw',
     },
     scale: {
       '80': '.8'
     },
     backgroundColor: {
       'black': '#000'
     }
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '768px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }

      'smup': {'min': '640px'}
    },
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
        DEFAULT: 'var(--pink)',
        dark: '#ff16d1',
      },
      gray: {
        darkest: '#1f2d3d',
        dark: "var(--gray-dark)",
        light: "var(--gray-light)",
        lightest: "var(--gray-lightest)",
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
    },
    textColor: {
      blue: "var(--blue)",
      white: "#FFF",
      gray: "var(--gray)",
      purple: "var(--purple)",
      graydark: "var(--gray-dark)",
      black: "#000"
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
