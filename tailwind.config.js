/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070C18',
          900: '#0B132B',
          800: '#131F42',
          700: '#1C2E5D',
          600: '#253C79',
          500: '#34529E',
        },
        ocean: {
          900: '#082F49',
          800: '#0C4A6E',
          700: '#0369A1',
          600: '#0284C7',
          500: '#0EA5E9',
          400: '#38BDF8',
          100: '#E0F2FE',
          50: '#F0F9FF',
        },
        emerald: {
          950: '#022C22',
          900: '#064E3B',
          800: '#065F46',
          700: '#047857',
          600: '#059669',
          500: '#10B981',
          400: '#34D399',
          100: '#D1FAE5',
          50: '#ECFDF5',
        },
        marine: {
          teal: '#0D9488',
          cyan: '#06B6D4',
          accent: '#14B8A6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
