const c = (v) => `rgb(var(--${v}) / <alpha-value>)`
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: c('bg'), side: c('side'), surface: c('surface'), line: c('line'),
        ink: c('ink'), muted: c('muted'), brand: c('brand'), brandsoft: c('brandsoft'),
        ok: c('ok'), warn: c('warn'), info: c('info'),
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
