const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    devtool: 'eval-source-map',
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8088/',
    },
    devServer: {
        port: 8088,
        historyApiFallback: {
            index: 'index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js'
            },
            shared: packageJson.dependencies,
         }),
    ],
}

module.exports = merge(commonConfig, devConfig);
