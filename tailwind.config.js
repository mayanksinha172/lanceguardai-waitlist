/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blueprint: {
          DEFAULT: '#0B2545',
          panel:   '#0E2C53',
          deep:    '#081C36',
        },
        line: {
          DEFAULT: 'rgba(214,232,255,0.92)',
          soft:    'rgba(214,232,255,0.6)',
          faint:   'rgba(214,232,255,0.35)',
          hair:    'rgba(214,232,255,0.16)',
          grid:    'rgba(214,232,255,0.05)',
        },
        alert: '#FF5A45',
        amber: '#FFC857',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        hand:    ['"Architects Daughter"', 'cursive'],
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
        blip: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
      },
      animation: {
        marquee:    'marquee 30s linear infinite',
        'stamp-in': 'stampIn 0.5s cubic-bezier(0.22, 1.4, 0.36, 1) both',
        caret:      'caret 1s steps(1) infinite',
        blip:       'blip 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
