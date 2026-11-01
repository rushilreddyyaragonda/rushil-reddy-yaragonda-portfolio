/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        paper: {
          DEFAULT: '#f7f4ef',
          dark: '#ede8e0',
        },
        ink: {
          DEFAULT: '#1c1c1e',
          soft: '#3a3a3e',
          muted: '#6b6b70',
        },
        graphite: {
          DEFAULT: '#d4d0c8',
          soft: '#e4e0d8',
        },
        cobalt: {
          DEFAULT: '#1e3a8a',
          bright: '#2563eb',
        },
        amber: {
          DEFAULT: '#b45309',
          soft: '#d97706',
        },
      },
    },
  },
  plugins: [],
};
