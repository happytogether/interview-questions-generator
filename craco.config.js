const FastRefreshCracoPlugin = require('craco-fast-refresh')

// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ],
    },
  }
}
