const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
    target: 'node', // 打包的是服务器端依赖的代码，target要设置为node
    devtool: 'source-map',
    entry: {
        server: path.resolve(__dirname, '../src/entry-server.js'), // 入口文件改了
    },
    output: {
        libraryTarget: 'commonjs2', // 同理  打包的是服务器端依赖的代码
    },
    externals: nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: /\.css$/
    }),
    plugins: [
        // 将服务器的整个输出构建为单个JSON文件    默认文件名为 `vue-ssr-server-bundle.json`
        new VueSSRServerPlugin(),
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
