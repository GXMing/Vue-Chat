const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");



module.exports = (env,argv) => {
    console.log(argv.mode+"!!!!!!");
    const dev = argv.mode === "development"?true:false;
    const publicPath = dev?
                       "/":
                       "./dist/";


//devServer  运行时publicPath不能为 ./ 会变成 /./ 找不到文件

    const config = {
        entry : {
            main : "./src/main.js",
        },
        output : {
            filename : "js/[name].js",
            //publicPath 影响文件内url路径地址   不影响文件产生输出地址   即publicPath 不会影响 path
            publicPath: publicPath,
            path : path.resolve(__dirname,'dist')
        },
        devtool:'source-map',
        devServer : {
            // contentBase : "./dist",  // 即index所在目录   服务器从哪里开始提供内容
            compress : true,   //服务gzip压缩
            historyApiFallback: true,
            //noInfo : true,  //webpack 打包信息隐藏
            inline : true,
            hot : true,
            // overlay : { 
            //     errors: true, //控制台错误显示在浏览器
            // },
            open : true,
            host : '192.168.2.232',
            port : 8090
        },
        module : {
            rules : [
                {
                    test : /\.css$/,
                    use : [
                        // dev
                        // ?'style-loader'
                        // :MiniCssExtractPlugin.loader,
                        // 'css-loader'
                        // 'postcss-loader'
                        'style-loader',
                        {loader:'css-loader',options:{minimize:true,sourceMap: true}},
                        'postcss-loader'
                    ]
                },
                {
                    test : /\.less$/,
                    use : [
                        // dev
                        // ?'style-loader'
                        // :MiniCssExtractPlugin.loader,
                        // 'css-loader','less-loader','postcss-loader'
                        'style-loader',
                        {loader:'css-loader',options:{minimize:true,sourceMap: true}},
                        {loader:'less-loader',options:{sourceMap:true }},'postcss-loader'
                    ]
                },
                {
                    test : /\.(jpg|png|gif|svg)$/,
                    loader:'file-loader',
                    options:{
                        name:'image/[hash].[ext]'
                    }
                },
                {
                    test: /\.vue$/,
                    loader:"vue-loader",
                    options:{ sourceMap:true }
                },
                {
                    test : /\.js$/,
                    exclude : "/node_modules/",
                    include : path.resolve(__dirname,"src"),
                    loader : "babel-loader"
                }
            ]
        },
        optimization:{
            // minimizer:true,  //代码压缩 production默认为true  以前UglifyJsPlugin
            runtimeChunk:{  //分离webpack打包代码
                name:'manifest'
            },
            splitChunks:{
                //异步加载打包设置  
                // chunks: 'async',  //异步加载
                // minSize: 30000,   //大于30kb才打包
                // minChunks: 1,
                // maxAsyncRequests: 5,
                // maxInitialRequests: 3,
                // automaticNameDelimiter: '~',
                // name: true,
                cacheGroups:{ //自定义打包模块
                    // vue:{ // 键值可以自定义
                    //     chunks:'initial', // 插件作用的chunks范围
                    //     name:'vue', // 入口的entry的key
                    //     enforce:true   // 强制 
                    // },
                    // default:false,
                    vendors: { //库打包
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'initial',
                        priority: 11,
                    }
                    // styles: {
                    //     name: 'test',
                    //     test: /\.css$/,
                    //     chunks: 'all',
                    //     enforce: true
                    // }
                    // commons2: {//公共部分js打包
                    //     name: 'commons',
                    //     chunks: 'initial',
                    //     minChunks:1,
                    //     priority: 10,
                    // }
                }
            }
        },
        plugins : [
            // new webpack.HotModuleReplacementPlugin(),  //热加载 命令行启动--hot可以自动添加
            new cleanWebpackPlugin(['dist','./index.html']),
            new VueLoaderPlugin(),
        // 　　new MiniCssExtractPlugin({
        //     　　filename: "css/[name]-[contenthash:8].css",
        //         publicpath:"../"
        //     }),
            new htmlWebpackPlugin({
                title : "Vue-chat",
                template : "./src/index.html",
                // 这里将  生产时的index生成在顶级目录，devServer时生成在dist目录!!!
                // 因为htmlWebpackPlugin 会生成在path目录下(index.html) 顶级目录为path上级(../index.html)
                // devServe虚拟生成path的目录并开始引用而index就存在path 如果在../index devServe就获取不到
                // 不推荐！！！
                filename: dev?"index.html":path.resolve(__dirname,"index.html")
            }),
        ]
    }
    
    if(!dev){
        config.output.filename = "js/[name]-[chunkhash:8].js"
        config.devtool = "none"
        // config.plugins.push(new OptimizeCSSAssetsPlugin({})) //提取css压缩
    }
    return config;
}





// favicon:"./favicon.ico",
//https://segmentfault.com/a/1190000014466696#articleHeader8
//https://blog.csdn.net/qq_26733915/article/details/79458533    SplitChunksPlugin