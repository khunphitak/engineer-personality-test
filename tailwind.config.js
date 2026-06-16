/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        architect: '#6B46C1',
        builder: '#0D9488',
        catalyst: '#EA580C',
        connector: '#2563EB',
      },
      fontFamily: {
        sans: ['Prompt', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
