// const path = require('path');
// const { VueLoaderPlugin } = require('vue-loader');
const util = require('./utils');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    output: {
        path: util.resolve('dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[id].[chunkhash].js',
    },
    resolve: {
        extensions: ['.js', 'ts', '.vue', '.json'], // 引入 js vue json 文件时可以不用写后缀名
        alias: {
            '@': util.resolve('src'), // 配置 @ 指向 src
        },
    },
    module: {
        rules: [
            ...util.eslint,
            ...util.cssLoaders,
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     include: [resolve('src')],
            // },
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
            // {
            //     test: /\.less$/,
            //     // 从下到上执行
            //     use: [
            //         'style-loader',
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         // 'postcss-loader',
            //         'less-loader',
            //     ],
            //     exclude: /node_modules/, // 排除该文件夹下面的文件
            // },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            //     exclude: /node_modules/,
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240, // 图片小于这个值会被转成base64
                    name: 'images/[name].[hash:7].[ext]',
                    // name: utils.assetsPath('img/[name].[hash:7].[ext]') // 大于上面的值，图片会直接被放到这个文件夹，需要安装file-loader
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
    plugins: [new VueLoaderPlugin(), new MiniCssExtractPlugin()],
    stats: {
        children: false, // 避免过多子信息
    },
};
