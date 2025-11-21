/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#c7e0fd',
          300: '#a3cbfc',
          400: '#7eb3f9',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: '#64748b',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f1f5f9',
        muted: '#94a3b8',
      },
    },
  },
  plugins: [],
}
