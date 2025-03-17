export default {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                'arabic':  ['Arabic', 'serif'],
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}