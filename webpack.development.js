/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const sourceFolder = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: ['react-refresh/runtime', sourceFolder],
    cache: true,
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        // publicPath: '/forms/',
        sourceMapFilename: '[name].js.map',
        pathinfo: false,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ],
    devServer: {
        contentBase: [path.resolve('dist'), path.join(__dirname, 'forms')],
        disableHostCheck: true,
        compress: true,
        hot: true,
        https: true,
        inline: true,
        overlay: true,
        port: 7000,
        host: '0.0.0.0',
        historyApiFallback: true,
        after: function () {
            console.log('Server ready!');
        },
        onListening: function (server) {
            const addressObject = server.listeningApp.address();
            const { port, address } = addressObject;
            console.log(
                'Listening on port: %d Navigate on (%s)',
                port,
                `https://${address}:${port}`,
            );
        },
    },
};
