/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#3B82F6',
          dark: '#0B1120',
          light: '#F8FAFC',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float-slow': 'float-organic-slow 15s ease-in-out infinite',
        'float-reverse': 'float-organic-reverse 18s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float-organic-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '25%': { transform: 'translate3d(15px, -15px, 0) rotate(2deg)' },
          '50%': { transform: 'translate3d(0, -25px, 0) rotate(0deg)' },
          '75%': { transform: 'translate3d(-15px, -15px, 0) rotate(-2deg)' }
        },
        'float-organic-reverse': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '25%': { transform: 'translate3d(-15px, 15px, 0) rotate(-2deg)' },
          '50%': { transform: 'translate3d(0, 25px, 0) rotate(0deg)' },
          '75%': { transform: 'translate3d(15px, 15px, 0) rotate(2deg)' }
        }
      }
    }
  },
  plugins: [],
};
