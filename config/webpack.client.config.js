const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(base, {
    entry: {
        client: path.resolve(__dirname, '../src/entry-client.js'),
    },

    plugins: [
        // 此插件在输出目录中生成 `vue-ssr-client-manifest.json`。
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../template/index.html'),
            filename: 'index.html',
        }),
    ],
});
