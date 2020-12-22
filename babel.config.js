/* eslint-env node */

module.exports = function (api) {
    const isDevelopmentEnvironment = api.env() === 'development';
    const isCI = !!process.env.CI;
    if (isCI && isDevelopmentEnvironment) {
        console.warn('You are loading babel in development mode but on CI');
    } else {
        console.log(`Loading babel in ${api.env()} mode`);
    }
    api.cache(isDevelopmentEnvironment);

    // noinspection SpellCheckingInspection
    return {
        presets: [
            [
                '@babel/preset-react',
                {
                    development: isDevelopmentEnvironment,
                },
            ],
            [
                '@babel/preset-env',
                {
                    modules: false,
                    loose: true,
                    shippedProposals: true,
                    useBuiltIns: 'entry',
                    corejs: 3,
                },
            ],
        ],
        plugins: [
            'syntax-async-functions',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-transform-async-to-generator',
            [
                '@babel/plugin-transform-arrow-functions',
                { spec: true, loose: true },
            ],
            [
                'module-resolver',
                {
                    root: ['.'],
                    extensions: ['.js', '.jsx'],
                    alias: {
                        '^@components/(.+)': './src/components/\\1',
                        '^@assets/(.+)': './src/assets/\\1',
                    },
                },
            ],
            [
                '@babel/plugin-proposal-object-rest-spread',
                { loose: true, useBuiltIns: true },
            ],
            [
                '@babel/plugin-transform-destructuring',
                { loose: true, useBuiltIns: true },
            ],
            ['@babel/plugin-syntax-dynamic-import'],
            [
                '@babel/plugin-proposal-class-properties',
                { spec: true, loose: true },
            ],
        ],

        env: {
            production: {
                plugins: ['transform-react-remove-prop-types'],
            },
            development: {
                sourceMaps: true,
                plugins: [
                    'react-refresh/babel',
                    '@babel/plugin-transform-react-jsx-source',
                    '@babel/plugin-transform-react-display-name',
                ],
            },
            test: {
                sourceMaps: true,
                plugins: ['@babel/plugin-transform-modules-commonjs'],
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: 'commonjs',
                            useBuiltIns: 'entry',
                            corejs: 3,
                            targets: {
                                node: 'current',
                                browsers: 'defaults, not dead',
                            },
                        },
                    ],
                ],
            },
        },
    };
};
