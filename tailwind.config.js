/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'editor-bg': '#0b0d11',
        'editor-surface': '#1e1e1e',
        'editor-border': '#2d3139',
        'editor-text': '#d4d4d4',
        'editor-accent': '#007acc',
        'editor-selected': '#264f78',
        'editor-highlight': '#37373d',
      },
      fontFamily: {
        'mono': ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
