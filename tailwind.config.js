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
                "c-ping": "var(--c-pink)",
                "c-background-2": "var(--c-background-2)",
                "c-primary": "var(--c-primary)",
                "c-secondary": "var(--c-secondary)",
                "c-nav-bg": "var(--c-nav-bg)",
            }
        },
        fontFamily: {
            "mono": ["'Fira Code'", "Inconsolata", "Iosevka", "monospace"],
            "display": ["'Josefin Sans'", "'Fugaz One'", "sans-serif"],
            "body": ["'Fira Sans Condensed'", "Inter", "sans-serif"],
            "nav-title": ["'Josefin Sans'", "'Fugaz One'", "sans-serif"],
        },
    },
    plugins: [],
}

