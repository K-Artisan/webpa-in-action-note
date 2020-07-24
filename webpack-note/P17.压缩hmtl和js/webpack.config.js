const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件

module.exports = {
    //入口起点
    entry: './src/js/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'js/built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: [

        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html',
            'minify': {
                collapseWhitespace: true, //移除空格
                removeComments: true, //移除注释
            }

        })
    ],
    //模式
    mode: "production" //生产环境下会自动压缩js代码
    //mode:"production" 
}