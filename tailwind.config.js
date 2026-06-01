/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   '#0f1117',
          secondary: '#151822',
          card:      '#1a1f2e',
        },
        cyan: {
          DEFAULT: '#22d3ee',
          dim:     '#0891b2',
          glow:    'rgba(34,211,238,0.15)',
        },
        gold: '#f59e0b',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'mc-world': "url('https://wallpapercave.com/wp/wp12221024.jpg')",
      },
    },
  },
  plugins: [],
}
