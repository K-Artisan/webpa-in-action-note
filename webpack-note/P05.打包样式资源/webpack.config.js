/*
文件名：webpack.config.js:webpack配置文件
作  用：指示webpackg干什么活，当运行webpack指令时，会加载里面的配置

所以的构建工具都是基于node.js 平台运行的，模块化默认采用commonJs

*/

const {
    resolve //用于拼接绝对路径
} = require('path');

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
        rules: [
            /**
             * 详细的loader配置
             * 不同文件必须配置不同的loader处理
             */

            // 处理css文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.css$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader'
                ]
            },
            // 处理less文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.less$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader',
                    //将less文件编译成css文件
                    //需要下载less和less-loader
                    'less-loader'
                ]
            },
        ]
    },
    // plugins的配置
    plugins: [

    ],
    //模式
    mode: "development"
    //mode:"production"

}