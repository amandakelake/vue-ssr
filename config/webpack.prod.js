const path = require('path');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    // mode: 'production',
    bail: true,
    devtool: 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash].js',
    },
    plugins: [new OptimizeCSSAssetsPlugin()],
});
