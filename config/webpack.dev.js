const path = require("path")
const uglify = require("uglifyjs-webpack-plugin")
const htmlPlugin = require("html-webpack-plugin")
const extractTextPlugin = require("extract-text-webpack-plugin")
// const MiniCssExtractPlugin  = require("mini-css-extract-plugin") 

var website ={
    publicPath:"http://localhost:8888/"
}

module.exports = {
    mode : 'development',
    // 入口文件配置
    entry : {
        main : './src/main.js',
        main2 : './src/main2.js'
    },
    // 出口文件配置
    output : {
        // 打包路径
        path : path.resolve(__dirname,'../dist'),
        // 打包出的文件名称
        // filename : 'bundle.js' // 只有一个入口文件时
        filename : '[name].js', //当有多个入口文件时,出口文件按入口文件来命名
        publicPath : website.publicPath
    },
    // 模块:定义CSS，图片怎么转换、压缩
    module : {
    	rules:[
    		// css loader
    		{
    			test : /\.css$/,
    			use: extractTextPlugin.extract ({
    				fallback: "style-loader",
                    use: "css-loader"
    			})
    			// use : [
    			// 	MiniCssExtractPlugin.loader,
    			// 	{ loader : "style-loader" },
    			// 	{ loader : "css-loader" }
    			// ]
    		},
    		{
                test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        limit:500  //是把小于500B的文件打成Base64的格式，写入JS
                    }
                }]
            }
    	]
    },
    // 插件：用于生产模板和各项功能
    plugins : [
    	new uglify(), // 对js进行压缩
    	new htmlPlugin({ // 对html进行压缩
    		minify : {
    			removeAttributeQuotes:true  //removeAttrubuteQuotes是去掉属性的双引号。
    		},
    		hash:true, // 为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template:'./src/index.html' //是要打包的html模版路径和文件名称。
    	}),
    	new extractTextPlugin("css/index.css")  //这里的/css/index.css 是分离后的路径
    	// new MiniCssExtractPlugin({
	    //   filename: "./css/index.css"
	    //   // chunkFilename: "[id].css"
	    // })
    ],
    // 配置webpack开发服务功能
    devServer : {
    	// 设置基本目录结构
    	contentBase:path.resolve(__dirname,'../dist/'),
    	// 服务器的ip地址，可以使用IP或者localhost
    	host : 'localhost',
    	// 服务器压缩是否开启
    	compress : true,
    	// 配置端口号
    	port : 8880
    }
}