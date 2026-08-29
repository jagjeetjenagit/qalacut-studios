/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0b',
          900: '#0a0a0b',
          800: '#101012',
          700: '#16161a',
          600: '#1d1d22',
          500: '#26262c',
        },
        blood: {
          DEFAULT: '#e11123',
          light: '#ff2436',
          dark: '#a80c18',
          glow: '#ff3b48',
        },
        chrome: {
          DEFAULT: '#f4f4f6',
          dim: '#c9c9d0',
          dark: '#8a8a94',
        },
      },
      fontFamily: {
        display: ['"Anton"', 'Impact', 'sans-serif'],
        heading: ['"Oswald"', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.35em',
        mega: '0.5em',
      },
      keyframes: {
        'laser-sweep': {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateX(120%) skewX(-20deg)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', filter: 'blur(2px)' },
          '50%': { opacity: '1', filter: 'blur(0px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'laser-sweep': 'laser-sweep 3.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'scan': 'scan 6s linear infinite',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
