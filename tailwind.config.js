/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      colors: {
        bubble: {
          pink: '#FF6B97',
          lightPink: '#FFE5EC',
          yellow: '#FFD93D',
          lightYellow: '#FFF9D2',
          blue: '#4D96FF',
          lightBlue: '#E3F2FD',
          green: '#6BCB77',
          lightGreen: '#E8F5E9',
          purple: '#9D4EDD',
          lightPurple: '#F3E5F5',
          orange: '#FF9F45',
          lightOrange: '#FFE8D6',
        }
      },
      fontFamily: {
        fredoka: ['Fredoka', 'Quicksand', 'Comic Sans MS', 'sans-serif'],
      },
      animation: {
        'bounce-soft': 'bounceSoft 2s infinite ease-in-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-6deg)' },
          '75%': { transform: 'rotate(6deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
