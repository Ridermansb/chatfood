/* eslint-env node */

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import webpackDevelopmentConfig from './webpack.development';
import webpackProductionConfig from './webpack.production';
import package_ from './package.json';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires
require('dotenv').config();

const sourceFolder = path.resolve(__dirname, 'src');

interface IArguments {
    mode: string;
}

module.exports = function (environment: unknown, arguments_: IArguments) {
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
                favicons: {
                    appName: package_.name,
                    appDescription: package_.description,
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
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.m?[jt]sx?$/i,
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
                    test: /\.(svg|webp|avif|gif|png|jpe?g)$/i,
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
                // {
                //     test: /\.svg$/i,
                //     loader: 'svg-inline-loader',
                // },
            ],
        },
    };

    const modeConfig = new Map<string, webpack.Configuration>([
        ['production', webpackProductionConfig],
        ['development', webpackDevelopmentConfig],
    ]);

    const config = modeConfig.get(mode);

    if (config) {
        return merge<webpack.Configuration>(defaultConfig, config);
    }
    return defaultConfig;
};
