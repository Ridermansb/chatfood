module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './dist/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            inter: ['inter'],
        },
        extend: {
            colors: {
                charcoal: 'var(--color-charcoal)',
                midnight: 'var(--color-midnight)',
                primary: 'var(--color-primary)',
                gray: {
                    DEFAULT: 'var(--color-gray-default)',
                    light: 'var(--color-gray-light)',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
