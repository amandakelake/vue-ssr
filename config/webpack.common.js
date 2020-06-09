const path = require('path');
const util = require('./utils');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const alternativePlugin = () => {
    const prodConfig = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../template/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
        }),
    ];
    const devConfig = [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../template/index.html'),
        }),
    ];
    return util.IS_PROD ? prodConfig : devConfig;
};

module.exports = {
    mode: process.env.NODE_ENV,
    output: {
        path: util.resolve('dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[id].[chunkhash].js',
    },
    resolve: {
        extensions: ['.js', 'ts', '.vue', '.json'],
        alias: {
            '@': util.resolve('src'),
        },
    },
    module: {
        rules: [
            ...util.eslint,
            ...util.cssLoaders,
            {
                test: /\.(js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                exclude: /(node_modules)/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240, // 图片小于这个值会被转成base64
                    name: 'images/[name].[hash:7].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'fonts/[name].[hash:7].[ext]',
                },
            },
        ],
    },
    plugins: [
        ...alternativePlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
    ],
    stats: {
        children: false, // 避免过多子信息
    },
};
