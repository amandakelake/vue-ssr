const path = require('path');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../', 'tpl/index.html'),
            minify: {
                // 压缩 html
                removeComments: true, // 移除注释
                collapseWhitespace: true, // 移除空格
                removeAttributeQuotes: true, // 移除属性引号
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        new OptimizeCSSAssetsPlugin(),
    ],
});
