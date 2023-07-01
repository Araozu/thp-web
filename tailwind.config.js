/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./static/**/*.html"],
  theme: {
    extend: {
      colors: {
        "c-bg": "var(--c-bg)",
        "c-text": "var(--c-text)",
        "c-purple": "var(--c-purple)",
        "c-purple-light": "var(--c-purple-light)",
        "c-box-shadow": "var(--c-box-shadow)",
        "c-bg-card": "var(--c-bg-card)",
        "c-ping": "var(--c-pink)",
        "c-background-2": "var(--c-background-2)",
      }
    },
    fontFamily: {
      "mono": ["Inconsolata", "Iosevka", "monospace"],
      "display": ["'Fugaz One'", "Inter", "'Fira Sans Condensed'", "sans-serif"],
      "body": ["'Fira Sans Condensed'", "Inter", "sans-serif"],
    },
  },
  plugins: [],
}

