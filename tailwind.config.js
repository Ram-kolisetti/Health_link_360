/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef9ff',
          100: '#d9f2ff',
          200: '#bce8ff',
          300: '#8ad9ff',
          400: '#51c1ff',
          500: '#27a3ff',
          600: '#0a85f6',
          700: '#0a6de6',
          800: '#1058ba',
          900: '#134b92',
          950: '#0f2f5c',
        },
        secondary: {
          50: '#f0fdf6',
          100: '#dcfceb',
          200: '#bbf7d6',
          300: '#86eeb6',
          400: '#4bdb8f',
          500: '#22c06c',
          600: '#16a057',
          700: '#158047',
          800: '#16653c',
          900: '#145434',
          950: '#052e1b',
        },
        accent: {
          50: '#fff9eb',
          100: '#ffefc6',
          200: '#ffdc86',
          300: '#ffc246',
          400: '#ffa61c',
          500: '#f98203',
          600: '#dd6201',
          700: '#b74305',
          800: '#94340c',
          900: '#7a2c0e',
          950: '#461403',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'glass': '4px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
      },
    },
  },
  plugins: [],
}