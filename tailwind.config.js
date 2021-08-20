module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],

  // 開啟just in time模式
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        'main-span': '72px'
      },
      colors: {
        'fb-bg': '#18191a',
        'fb-header': '#242526',
        'fb-input': '#3a3b3c',
        'fb-hover-input': '#5a5b5c',
        'fb-popover': '#3e4042',
        'fb-popover-hover-on': '#5e5e5e',
        'fb-active': 'rgb(56, 88, 152)',
        'fb-hover-active': 'rgb(56, 88, 130, 0.7)',
        'fb-card': '#242526',
        'fb': '#2e89ff'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('tailwindcss-textshadow')
  ]
}