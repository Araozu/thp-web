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
            "display": ["Inter", "'Josefin Sans'", "'Fugaz One'", "sans-serif"],
            "body": ["'Fira Sans'", "Inter", "sans-serif"],
        },
    },
    corePlugins: {
        container: false
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                '.container': {
                    width: '98%',
                    '@screen sm': {
                        maxWidth: '640px',
                    },
                    '@screen md': {
                        maxWidth: '768px',
                    },
                    '@screen lg': {
                        maxWidth: '1024px',
                    },
                    '@screen xl': {
                        maxWidth: '1280px',
                    },
                }
            })
        }
    ],
}

