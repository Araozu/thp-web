/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
            colors: {
                "c-thp": "var(--c-thp)",
                "c-bg": "var(--c-bg)",
                "c-text": "var(--c-text)",
                "c-text-2": "var(--c-text-2)",
                "c-purple": "var(--c-purple)",
                "c-border-1": "rgba(150,150,150,0.25)",
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
            "mono": "var(--font-code)",
            "display": "var(--font-display)",
            "body": "var(--font-body)",
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
                        maxWidth: '1400px',
                    },
                },
                '.small-container': {
                    width: '98%',
                    '@screen sm': {
                        maxWidth: '640px',
                    },
                    '@screen md': {
                        maxWidth: '768px',
                    },
                    '@screen lg': {
                        maxWidth: 'inherit',
                    },
                }
            })
        }
    ],
}
