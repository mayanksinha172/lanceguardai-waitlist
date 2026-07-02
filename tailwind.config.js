/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F6F1E5',
          bright:  '#FCF9F1',
          shade:   '#EFE8D8',
        },
        ink: {
          DEFAULT: '#191407',
          soft:    'rgba(25,20,7,0.62)',
          faint:   'rgba(25,20,7,0.38)',
          hair:    'rgba(25,20,7,0.14)',
        },
        pen:   '#D92B1C',
        money: '#1E6B45',
        mark:  '#F5D90A',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        ui:      ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        stampIn: {
          '0%':   { transform: 'scale(2.4) rotate(-14deg)', opacity: '0' },
          '55%':  { transform: 'scale(0.92) rotate(-5deg)', opacity: '1' },
          '75%':  { transform: 'scale(1.06) rotate(-7deg)' },
          '100%': { transform: 'scale(1) rotate(-6deg)', opacity: '1' },
        },
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        confettiBurst: {
          '0%':   { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-120px) rotate(720deg)', opacity: '0' },
        },
      },
      animation: {
        marquee:    'marquee 30s linear infinite',
        'stamp-in': 'stampIn 0.5s cubic-bezier(0.22, 1.4, 0.36, 1) both',
        caret:      'caret 1s steps(1) infinite',
        confetti:   'confettiBurst 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
