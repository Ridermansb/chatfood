/* eslint-env node */

import path from 'path';
import * as webpack from 'webpack';
import TerserJSPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const sourceFolder = path.resolve(__dirname, 'src');

const config: webpack.Configuration = {
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
                    name(
                        module: webpack.Module,
                        chunks: Array<webpack.Chunk>,
                        cacheGroupKey: string,
                    ): string {
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
                        ecma: 2015,
                    },
                    compress: {
                        ecma: 5,
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
            new CssMinimizerPlugin({
                cache: true,
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
    ],
    performance: {
        hints: 'warning',
    },
};

export default config;
