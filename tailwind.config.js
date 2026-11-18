/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mousse: {
          DEFAULT: '#2E4036',
          light: '#3D5447',
          dark: '#1F2C25',
        },
        argile: {
          DEFAULT: '#CC5833',
          light: '#DE6E4B',
          dark: '#A94324',
        },
        creme: {
          DEFAULT: '#F2F0E9',
          card: '#FAF9F5',
          dark: '#E2DEC9',
        },
        charbon: {
          DEFAULT: '#1A1A1A',
          deep: '#111613',
          muted: '#2A2A2A',
        }
      },
      fontFamily: {
        title: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
        dramatic: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
