/* eslint-env node */

module.exports = function (api) {
    const isDevelopmentEnvironment = api.env() === 'development';
    const isCI = !!process.env.CI;
    if (isCI && isDevelopmentEnvironment) {
        console.warn('You are loading babel in development mode but on CI');
    } else {
        console.log(`Loading babel in ${api.env()} mode`);
    }
    api.cache.using(() => process.env.NODE_ENV);

    // noinspection SpellCheckingInspection
    return {
        presets: [
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
            [
                '@babel/preset-react',
                {
                    development: isDevelopmentEnvironment,
                },
            ],
            [
                '@babel/preset-typescript',
                {
                    isTSX: true,
                    allExtensions: true,
                    onlyRemoveTypeImports: true,
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
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    alias: {
                        '^@components/(.+)': './src/components/\\1',
                        '^@assets/(.+)': './src/assets/\\1',
                        '^@api$': './src/api/index.ts',
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
                    '@babel/plugin-transform-react-jsx-source',
                    '@babel/plugin-transform-react-display-name',
                    [
                        'react-refresh/babel',
                        {
                            disableRefreshCheck: true,
                        },
                    ],
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
