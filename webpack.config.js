/**
 * Created by jiayongli on 2017/6/26.
 */
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var merge = require('webpack-merge');
var fs = require('fs');

const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');

var data = JSON.parse(fs.readFileSync('views.json', 'utf-8'));

var getHtmlPluginArr = function () {
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
                template: "views/template.html",//页面模板地址
                filename:'html/'+dist + '.html',//打包后地址
                chunksSortMode: "dependency" //按chunks的顺序对js进行引入
            })
        );
    }
    return resultObj;
};
var appJsonObj = getHtmlPluginArr();
var commonConfig = {
    plugins:appJsonObj.pluginArr,
}
module.exports = merge(commonConfig,{
    entry:appJsonObj.entryObj,
    output: {
        path: BUILD_PATH,
        filename: "js/[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$|\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-class-properties']
                },
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    devtool: 'source-map',
});
