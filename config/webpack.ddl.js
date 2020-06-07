const webpack = require('webpack');
const { dependencies } = require('../package');
const { resolve } = require('./utils');

const vendors = Object.keys(dependencies); // 从 package.json 里获取开发环境的依赖包
const excludeVendors = ['@babel/polyfill']; // 不打包进 vendor 的依赖

excludeVendors.forEach((dep) => {
    const index = vendors.indexOf(dep);
    if (index > -1) {
        vendors.splice(index, 1); // 逐个移除不需要打包的依赖
    }
});

module.exports = {
    mode: process.env.NODE_ENV, // 根据 mode 进行打包
    entry: {
        vendor: vendors, // 需要打包的依赖和打包后名称
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[hash].js',
        library: '[name]', // 通过 script 标签引用时需要
    },
    plugins: [
        new webpack.DllPlugin({
            // 调用 DllPlugin
            path: resolve('dist/[name]-manifest'),
            name: '[name]',
        }),
    ],
};
