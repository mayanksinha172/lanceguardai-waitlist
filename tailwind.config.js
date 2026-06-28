/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas:  '#030610',
        ink:     '#EDF0FF',
        surface: {
          card:     '#07091A',
          elevated: '#0C0F24',
          deep:     '#040614',
        },
        accent: {
          green:  '#11ff99',
          blue:   '#4080FF',
          gold:   '#FFD60A',
          orange: '#FF6B35',
          red:    '#FF2D55',
        },
        mute:  '#8892B0',
        ash:   '#6A7490',
        stone: '#3A4060',
      },
      fontFamily: {
        display:   ['"Syne"', 'sans-serif'],
        marketing: ['"DM Sans"', 'sans-serif'],
        ui:        ['"DM Sans"', 'sans-serif'],
        mono:      ['"JetBrains Mono"', 'monospace'],
        body:      ['"DM Sans"', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':       { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':       { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':       { opacity: '1',   transform: 'scale(1.15)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        confettiBurst: {
          '0%':   { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-120px) rotate(720deg)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(400px)', opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          to:   { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.97)' },
          '50%':       { opacity: '0.7', transform: 'scale(1.03)' },
        },
      },
      animation: {
        'blob-slow':  'blob 14s ease-in-out infinite',
        'blob-mid':   'blob 10s ease-in-out infinite 2s',
        'blob-fast':  'blob 8s ease-in-out infinite 1s',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'marquee':    'marquee 32s linear infinite',
        'confetti':   'confettiBurst 0.8s ease-out forwards',
        'float':      'float 5s ease-in-out infinite',
        'scan-line':  'scanLine 3s ease-in-out infinite 1.5s',
        'shimmer':    'shimmer 2s linear infinite',
        'orbit':      'orbit 8s linear infinite',
        'breathe':    'breathe 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
