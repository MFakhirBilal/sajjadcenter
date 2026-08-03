/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e'
        },
        champagne: {
          50: '#fdfbf7',
          100: '#f9f5ed',
          200: '#f3e9d8',
          500: '#c5a880',
          600: '#a8895e'
        },
        slate: {
          925: '#0B1120'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'white-card': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'white-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.1), 0 8px 10px -4px rgba(0, 0, 0, 0.04)',
        'film-glow': '0 0 25px rgba(217, 119, 6, 0.25)'
      },
      animation: {
        'film-zoom': 'filmZoom 12s ease-out infinite alternate',
        'film-fade-up': 'filmFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2.5s infinite linear'
      },
      keyframes: {
        filmZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' }
        },
        filmFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: []
};
