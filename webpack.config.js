/**
 * Created by jiayongli on 2017/6/26.
 */
let path = require('path');
let ROOT_PATH = path.resolve(__dirname);
let BUILD_PATH = path.resolve(ROOT_PATH, 'build');
let merge = require('webpack-merge');
let fs = require('fs');

let webpack = require('webpack');
let HtmlwebpackPlugin = require('html-webpack-plugin');

let data = JSON.parse(fs.readFileSync('views.json', 'utf-8'));
let getHtmlPluginArr = function () {
    var pageList = data.pageList;
    var resultObj = {
        "pluginArr": [],
        "entryObj": {}
    };
    for (var index = 0; index < pageList.length; index++) {
        var element = pageList[index];
        var src = element.src;
        //通过对views.json中src的路径截取获得分发路径
        var dist = (function () {
            var s1 = src.split("./views/")[1];
            var s2 = s1.substr(0, s1.lastIndexOf("/"));
            return s2;
        })();
        var title = element.title;
        resultObj.entryObj[dist] = src;
        
        //利用路径一部分来进行HtmlwebpackPlugin的chunks
        resultObj.pluginArr.push(
            new HtmlwebpackPlugin({
                chunks: [dist], //当前页面js
                title: title,
                template: "views/template.ejs",//页面模板地址
                filename:'html/' + dist + '.html',//打包后地址
                chunksSortMode: "dependency" //按chunks的顺序对js进行引入
            })
        );
    }
    return resultObj;
};
let appJsonObj = getHtmlPluginArr();

let commonConfig = {
    plugins:appJsonObj.pluginArr,
}
module.exports = merge(commonConfig,{
    entry:appJsonObj.entryObj,
    output: {
        path: BUILD_PATH,
        filename: "js/[name].js"
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            
            {
                test: /\.js$|\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options:{
                        presets: ['es2015', 'react'],
                        plugins: ['transform-class-properties']
                    }
                },
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader:"less-loader",
                        options:{
                            modifyVars:{
                                "primary-color":"#1DA57A"
                            }
                    }
                }]
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],
    devtool: 'source-map',
});
