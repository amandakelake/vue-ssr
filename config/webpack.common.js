const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

// webpack里面的相对路径是以当前的配置文件为基准的，不是以根路径为准
const resolve = (dir) => path.join(__dirname, '../', dir);

module.exports = {
    entry: {
        app: path.join(__dirname, '../', 'src/index.js'),
    },
    resolve: {
        extensions: ['.js', 'ts', '.vue', '.json'], // 引入 js vue json 文件时可以不用写后缀名
        alias: {
            '@': resolve('src'), // 配置 @ 指向 src
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src')],
            },
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
                test: /\.less$/,
                // 从下到上执行
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    'less-loader',
                ],
                exclude: /node_modules/, // 排除该文件夹下面的文件
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192, // 图片小于这个值会被转成base64
                    name: 'assets/img/[name].[hash:7].[ext]',
                    // name: utils.assetsPath('img/[name].[hash:7].[ext]') // 大于上面的值，图片会直接被放到这个文件夹，需要安装file-loader
                },
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
};
