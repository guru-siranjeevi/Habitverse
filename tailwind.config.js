/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#070C16',
          card: '#0F172A',
          cardHover: '#131E35',
          cardInner: '#0B1322',
          surface: '#152138',
        },
        brand: {
          teal: '#00D5B6',
          tealDark: '#0A8F82',
          cyan: '#00D9F5',
          orange: '#FF8438',
          green: '#22C55E',
          purple: '#A855F7',
          pink: '#EC4899',
          red: '#EF4444',
          yellow: '#EAB308',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 20px -5px rgba(0, 213, 182, 0.4)',
        'glow-cyan': '0 0 20px -5px rgba(0, 217, 245, 0.4)',
        'glow-purple': '0 0 20px -5px rgba(168, 85, 247, 0.4)',
        'glow-orange': '0 0 20px -5px rgba(255, 132, 56, 0.4)',
        'card-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
