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
        // lightMode
        'fb-bg': '#f0f2f5',
        'fb-header': '#ffffff',
        'fb-input': '#e4e6eb',
        'fb-hover-input': '#f2f2f2',
        'fb-popover': '#e1e3e8',
        'fb-popover-hover-on': '#d7d9de',
        'fb-active': '#e5f1fd',
        'fb-hover-active': '#d5e8fc',
        'fb-card': '#ffffff',
        'fb': '#2e89ff',

        // darkMode
        'fb-bg-dark': '#18191a',
        'fb-header-dark': '#242526',
        'fb-input-dark': '#3a3b3c',
        'fb-hover-input-dark': '#5a5b5c',
        'fb-popover-dark': '#3e4042',
        'fb-popover-hovering-dark': '#5e5e5e',
        'fb-active-dark': 'rgb(56, 88, 152)',
        'fb-hovering-active-dark': 'rgb(56, 88, 130, 0.7)',
        'fb-card-dark': '#242526',
        'fb-dark': '#2e89ff',
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