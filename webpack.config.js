/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpackDevelopmentConfig = require('./webpack.development.js');
const webpackProductionConfig = require('./webpack.production.js');
const package_ = require('./package.json');

require('dotenv').config();

const sourceFolder = path.resolve(__dirname, 'src');

module.exports = function (environment, arguments_) {
    const mode = arguments_.mode || 'development';

    const isDevelopmentEnvironment = mode === 'development';
    const isCI = !!process.env.CI;

    if (isCI && isDevelopmentEnvironment) {
        console.warn('You are building webpack in development mode but on CI');
    } else {
        console.log('Building with webpack in "%s" mode', mode);
    }

    const defaultConfig = {
        target: 'web',
        plugins: [
            new CaseSensitivePathsPlugin(),
            // new CopyWebpackPlugin({
            //     patterns: [
            //         {
            //             from: './src/assets/android-chrome-192x192.png',
            //             to: './',
            //         },
            //         {
            //             from: './src/assets/android-chrome-512x512.png',
            //             to: './',
            //         },
            //         { from: './src/assets/apple-touch-icon.png', to: './' },
            //         { from: './src/assets/mstile-150x150.png', to: './' },
            //         { from: './src/assets/safari-pinned-tab.svg', to: './' },
            //     ],
            // }),
            new MiniCssExtractPlugin({
                ignoreOrder: true,
                filename:
                    mode === 'production'
                        ? '[name]-[contenthash].css'
                        : '[name].css',
                chunkFilename:
                    mode === 'production'
                        ? '[name]-[contenthash].css'
                        : '[name].css',
            }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development',
            }),
            new webpack.DefinePlugin({
                __DEVELOPMENT__: JSON.stringify(mode === 'development'),
                __PRODUCTION__: JSON.stringify(mode === 'production'),
            }),
            new HtmlWebpackPlugin({
                title: package_.name,
                meta: {
                    description: package_.description,
                    'msapplication-TileColor': '#1258ff',
                    viewport:
                        'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover',
                    'mobile-web-app-capable': 'yes',
                    'apple-mobile-web-app-capable': 'yes',
                    'apple-mobile-web-app-status-bar-style':
                        'black-translucent',
                    'theme-color': '#ffffff',
                    'msapplication-navbutton-color': '#1258ff',
                    'msapplication-starturl': '/?utm_source=a2hs',
                },
                favicon: './src/assets/favicon/favicon.ico',
                template: path.resolve(__dirname, 'src', 'index.ejs'),
                minify: { collapseWhitespace: true },
                inlineSource: 'runtime.+\\.js',
                inject: true,
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer',
                // preload: /\.js$/,
                inline: 'runtime',
            }),
            new FaviconsWebpackPlugin({
                logo: './src/assets/logo.svg',
                cache: true,
                inject: true,
                prefix: 'favicons/',
                background: '#1258ff',
                theme_color: '#ffffff',
                favicons: {
                    appName: package_.name,
                    appDescription: package_.description,
                    developerName: package_.author,
                    background: '#fff',
                    theme_color: '#333',
                    icons: {
                        coast: false,
                        yandex: false,
                    },
                },
            }),
            new webpack.ids.HashedModuleIdsPlugin(),
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.m?jsx?$/i,
                    exclude: /node_modules|dist|vendors/,
                    include: [sourceFolder],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true, // important for performance
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    include: [sourceFolder],
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true, modules: false },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                },
                {
                    test: /\.(webp|avif|gif|png|jpe?g)$/i,
                    use: {
                        loader: 'file-loader',
                        options: { outputPath: 'assets/images/' },
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: {
                        loader: 'file-loader',
                        options: { outputPath: 'assets/fonts/' },
                    },
                },
                {
                    test: /\.svg$/i,
                    loader: 'svg-inline-loader',
                },
            ],
        },
    };

    const modeConfig = {
        production: webpackProductionConfig(appVersion),
        development: webpackDevelopmentConfig,
    };

    return merge.merge(defaultConfig, modeConfig[mode] || {});
};
