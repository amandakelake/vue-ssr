const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');

module.exports = merge(base, {
    target: 'node', // 打包的是服务器端依赖的代码，target要设置为node
    entry: {
        server: path.resolve(__dirname, '../src/entry-server.js'), // 入口文件改了
    },
    output: {
        libraryTarget: 'commonjs2', // 同理  打包的是服务器端依赖的代码
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../template/index.ssr.html'),
            filename: 'index.ssr.html',
            files: {
                js: 'client.bundle.js', // 不要在index.ssr.html中引入打包出的server.bundle.js 要引为浏览器打包的client.bundle.js 为了让Vue在直出的html进行激活
            },
            excludeChunks: ['server'],
        }),
    ],
});
