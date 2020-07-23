/*
文件名：webpack.config.js:webpack配置文件
作  用：指示webpackg干什么活，当运行webpack指令时，会加载里面的配置

所以的构建工具都是基于node.js 平台运行的，模块化默认采用commonJs

loader 安装，使用
plugin 安装，已入，使用

*/

const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件

module.exports = {
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: []
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        })
    ],
    //模式
    mode: "development"
    //mode:"production"

}