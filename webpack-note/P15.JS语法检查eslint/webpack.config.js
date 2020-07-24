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
            /*eslint 语法检查
             */
            {
                test: /\.js$/,
                exclude: /node_modules/, //只检查自己的代码，第三方库不检查
                loader: 'eslint-loader',
                options: {
                    /**设置检测规则
                     * package.json中eslintConfig中设置
                     * airbnb-->需要安装eslint-config-airbnb  eslint-plugin-import eslint
                     * 
                     */
                    fix: true //自动修复
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