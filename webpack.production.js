/* eslint-env node */

const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');

const sourceFolder = path.resolve(__dirname, 'src');

module.exports = () => {
    return {
        cache: true,
        mode: 'production',
        devtool: 'hidden-source-map',
        entry: sourceFolder,
        output: {
            path: path.resolve('dist'),
            filename: '[name]-[contenthash:8].js',
            chunkFilename: '[name]-[chunkhash].js',
            publicPath: process.env.PUBLIC_PATH || '/',
            sourceMapFilename: '[name]-[contenthash:8].js.map',
            pathinfo: false,
            libraryTarget: 'umd',
            globalObject: "(typeof window !== 'undefined' ? window : this)",
        },
        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Number.POSITIVE_INFINITY,
                maxAsyncRequests: Number.POSITIVE_INFINITY,
                minSize: 20000,
                minChunks: 1,
                maxSize: 249856,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    pages: {
                        test: /pages/,
                        chunks: 'all',
                        priority: -20,
                        name: false,
                    },
                    vendor: {
                        test: /[/\\]node_modules[/\\]/,
                        chunks: 'all',
                        priority: -10,
                        name(module, chunks, cacheGroupKey) {
                            const moduleFileName = module
                                .identifier()
                                .split('/')
                                .reduceRight((item) => item);
                            const allChunksNames = chunks
                                .map((item) => item.name)
                                .join('~');
                            return `js/${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                        },
                    },
                    common: {
                        name: 'common',
                        minChunks: 2,
                        priority: -30,
                        reuseExistingChunk: true,
                        enforce: true,
                    },
                },
            },
            minimize: true,
            minimizer: [
                new TerserJSPlugin({
                    exclude: /\/docs|\/coverage\//,
                    terserOptions: {
                        sourceMap: true,
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                        ie8: true,
                        safari10: true,
                    },
                    extractComments: false,
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: [
                            'default',
                            { discardComments: { removeAll: true } },
                        ],
                    },
                    canPrint: true,
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        map: {
                            inline: false,
                            annotation: true,
                        },
                    },
                }),
            ],
        },
        plugins: [
            new CompressionPlugin({
                filename: '[path][name].gz[query]',
                algorithm: 'gzip',
                test: /\.(js|html)$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
            new RobotstxtPlugin(),
        ],
        performance: {
            hints: 'warning',
        },
    };
};
