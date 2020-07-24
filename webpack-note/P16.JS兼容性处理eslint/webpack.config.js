const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件

//设置node.js的环境变量
process.env.NODE_ENV = 'development';

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
            /*js兼容性处理:babel-loader @babel/core @babel/preset-env
             */
            {
                test: /\.js$/,
                exclude: /node_modules/, //只检查自己的代码，第三方库不检查
                loader: 'babel-loader',
                options: {
                    //预设,只是babel-loader做怎样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage', //按需加载
                                corejs: { //指定core-js版本
                                    version: 3
                                },
                                targets: { //指定兼容的浏览器版本
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17',
                                }
                            }
                        ]
                    ]
                }
            }
        ]
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
    mode: "development",
    //mode:"production"
}