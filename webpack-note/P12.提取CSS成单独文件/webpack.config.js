const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //引入提取css文件插件

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
            // 处理css文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.css$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    //'style-loader',
                    //这个loader取代style-loader，提取css文件为单独的文件
                    MiniCssExtractPlugin.loader,
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader'
                ]
            }

        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //对输出的css文件进行重名命
            filename: 'css/buit.css'
        })
    ],
    //模式
    mode: "development",
    //mode:"production"
}