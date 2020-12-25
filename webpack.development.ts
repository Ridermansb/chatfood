/* eslint-env node */

import path from 'path';
import * as webpack from 'webpack';
import {
    Configuration as WebpackDevelopmentServerConfiguration,
    default as WebpackDevServer,
} from 'webpack-dev-server';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const sourceFolder = path.resolve(__dirname, 'src');

interface Configuration extends webpack.Configuration {
    devServer?: WebpackDevelopmentServerConfiguration;
}
interface ListeningAppExtended extends WebpackDevServer {
    listeningApp?: {
        address: () => {
            port: number;
            address: string;
        };
    };
}

const config: Configuration = {
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
    plugins: [new ReactRefreshWebpackPlugin()],
    devServer: {
        contentBase: [path.resolve('dist'), path.join(__dirname, 'forms')],
        disableHostCheck: true,
        compress: true,
        hot: true,
        https: true,
        writeToDisk: true,
        inline: true,
        overlay: true,
        port: 9500,
        host: '0.0.0.0',
        historyApiFallback: true,
        after: function (): void {
            console.log('Server ready!');
        },
        onListening: function (server: ListeningAppExtended): void {
            if (server.listeningApp) {
                const addressObject = server.listeningApp?.address();
                const { port, address } = addressObject;
                console.log(
                    'Listening on port: %d Navigate on (%s)',
                    port,
                    `https://${address}:${port}`,
                );
            }
        },
    },
};

export default config;
