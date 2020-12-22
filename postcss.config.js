/* eslint-env node */

module.exports = {
    sourceMap: true,
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('cssnano'),
    ],
};
