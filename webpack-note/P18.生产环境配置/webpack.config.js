const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //引入提取css文件插件
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') //引入压缩css文件插件

//设置node.js的环境变量,决定使用 package.json 中的 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

//复用loader
const commonCssloader = [
    //创建style标签，将js中的样式资源插入，添加到head中生效
    //'style-loader',
    //这个loader取代style-loader，提取css文件为单独的文件
    MiniCssExtractPlugin.loader,
    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
    'css-loader',
    /*css兼容性处理
      1.postcss -> 
         postcss-loader 
         postcss-preset-env插件
      2.帮postcss找到package.json中的browserslist中的配置
        ，通过配置加载指定的css兼容样式,默认使用生成环境的配置，设置node.js的环境变量,process.env.NODE_ENV = 'development';
    */
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                //postcss插件
                require('postcss-preset-env')()
            ]
        }
    }
];

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
                use: [...commonCssloader]
            },
            // 处理less文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.less$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    ...commonCssloader,
                    //将less文件编译成css文件
                    //需要下载less和less-loader
                    'less-loader'
                ]
            },
            /*eslint js语法检查:
               eslint-loader
             */
            {
                test: /\.js$/,
                exclude: /node_modules/, //只检查自己的代码，第三方库不检查
                loader: 'eslint-loader',
                enforce: 'pre', //多个loader处理同一个文件，优先执行
                options: {
                    /**设置检测规则
                     * package.json中eslintConfig中设置
                     * airbnb-->需要安装eslint-config-airbnb  eslint-plugin-import eslint
                     * 
                     */
                    fix: true //自动修复
                }
            },
            /*js兼容性处理:
               babel-loader @babel/core @babel/preset-env
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
            },
            // 处理图片文件
            {
                test: /\.(jpg|png|gif)$/,
                //多个loader，使用use:数组，只有一个loader，使用loader:
                loader: 'url-loader', //需要下载url-loader, file-loader
                options: {
                    //当图片小于8kb，就会被base64处理，
                    //优点-减少请求次数，
                    //确定-图片体积变大，影响页面加载时间
                    limit: 8 * 1024
                }
            },
            //处理html中img的图片
            {
                test: /\.html$/,
                //处理HTML中的img图片，负责引入img,从而被url-loader处理
                loader: 'html-loader'
            },
            //打包其它资源，
            {
                exclude: /\.(css|less|js|html|jpg|png|gif)$/,
                loader: 'file-loader'
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
        }),
        new optimizeCssAssetsWebpackPlugin()
    ],
    //模式
    mode: "production"
}