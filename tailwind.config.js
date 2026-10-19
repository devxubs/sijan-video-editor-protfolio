/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        zinc: {
          950: '#09090b',
        }
      },
      animation: {
        'orb-1': 'bg-orb-1 32s cubic-bezier(.45,.05,.55,.95) infinite',
        'orb-2': 'bg-orb-2 38s cubic-bezier(.45,.05,.55,.95) infinite',
        'orb-3': 'bg-orb-3 28s cubic-bezier(.45,.05,.55,.95) infinite',
        'particle': 'bg-particle-drift var(--duration, 18s) cubic-bezier(.25,.1,.25,1) infinite',
        'water-fill': 'water-stream-flow 2s linear infinite',
        'water-waves': 'water-wave-flow 2.6s linear infinite, water-surface-glimmer 2.2s ease-in-out infinite',
        'water-fill-halloween': 'water-stream-flow 1.8s linear infinite',
        'water-waves-halloween': 'water-wave-flow 2.4s linear infinite, water-surface-glimmer 2s ease-in-out infinite',
        'bat-1': 'bat-glide-1 26s cubic-bezier(.4,0,.6,1) infinite',
        'bat-2': 'bat-glide-2 34s cubic-bezier(.4,0,.6,1) 8s infinite',
        'pumpkin-glow': 'pumpkin-pulse 2.8s ease-in-out infinite',
        'ghost-float': 'ghost-float 4s ease-in-out infinite',
      },
      keyframes: {
        'bg-orb-1': {
          '0%': { transform: 'translate(0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(60px, -45px) scale(1.08) rotate(5deg)' },
          '50%': { transform: 'translate(110px, 20px) scale(0.96) rotate(10deg)' },
          '75%': { transform: 'translate(40px, 70px) scale(1.05) rotate(5deg)' },
          '100%': { transform: 'translate(0) scale(1) rotate(0deg)' },
        },
        'bg-orb-2': {
          '0%': { transform: 'translate(0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(-75px, 45px) scale(0.94) rotate(-6deg)' },
          '50%': { transform: 'translate(-40px, 95px) scale(1.1) rotate(-12deg)' },
          '75%': { transform: 'translate(50px, 35px) scale(0.98) rotate(-6deg)' },
          '100%': { transform: 'translate(0) scale(1) rotate(0deg)' },
        },
        'bg-orb-3': {
          '0%': { transform: 'translate(0) scale(1)' },
          '33%': { transform: 'translate(65px, -55px) scale(1.12)' },
          '66%': { transform: 'translate(-60px, -30px) scale(0.92)' },
          '100%': { transform: 'translate(0) scale(1)' },
        },
        'bg-particle-drift': {
          '0%': { opacity: '0', transform: 'translateY(105vh) scale(0.8)' },
          '12%': { opacity: 'var(--p-opacity, 0.5)' },
          '88%': { opacity: 'var(--p-opacity, 0.5)' },
          '100%': { transform: 'translate3d(var(--drift-x, 25px), -10vh, 0) scale(1.1)', opacity: '0' },
        },
        'water-stream-flow': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '120px 0' },
        },
        'water-wave-flow': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '180px 0' },
        },
        'water-surface-glimmer': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.95' },
        },
        'bat-glide-1': {
          '0%': { opacity: '0', transform: 'translate(-10vw, 15vh) scale(0.6) rotate(8deg)' },
          '15%': { opacity: '0.65' },
          '50%': { opacity: '0.8', transform: 'translate(50vw, 8vh) scale(0.85) rotate(-5deg)' },
          '85%': { opacity: '0.65' },
          '100%': { opacity: '0', transform: 'translate(110vw, 18vh) scale(0.65) rotate(12deg)' },
        },
        'bat-glide-2': {
          '0%': { opacity: '0', transform: 'translate(105vw, 30vh) scale(0.5) rotate(-10deg)' },
          '20%': { opacity: '0.55' },
          '55%': { opacity: '0.7', transform: 'translate(45vw, 22vh) scale(0.7) rotate(6deg)' },
          '80%': { opacity: '0.55' },
          '100%': { opacity: '0', transform: 'translate(-10vw, 35vh) scale(0.55) rotate(-8deg)' },
        },
        'ghost-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(3deg)' },
          '66%': { transform: 'translateY(6px) rotate(-3deg)' },
        },
        'pumpkin-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px rgba(249,115,22,0.65))', transform: 'scale(1)' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(249,115,22,0.95)) drop-shadow(0 0 28px rgba(168,85,247,0.5))', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
