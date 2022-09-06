<!--
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-09-01 09:38:10
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-01 11:08:56
-->

# webpack3 -> 5 升级记录

- [https://www.cnblogs.com/juexin/p/14667561.html](https://www.cnblogs.com/juexin/p/14667561.html)

## 删除-安装

```
npm uninstall webpack webpack-dev-server
npm i webpack webpack-dev-server webpack-cli -D
```

## 使用 npm-check-updates 更新 pak 中的依赖

```
npm i npm-check-updates -g
ncu  // 检查最新依赖
ncu -u // 更新pak中的依赖版本
npm i // 安装依赖
```

不小心把 vue 版本一起升上去了...改回来

### optimize-css-assets-webpack-plugin

npm i 的时候出现报错：

> Could not resolve dependency:npm ERR! peer webpack@"^4.0.0" from optimize-css-assets-webpack-plugin@6.0.1

原因为 webpack5 不支持 optimize-css-assets-webpack-plugin 了，用 css-minimizer-webpack-plugin 代替。所以删除 optimize-css-assets-webpack-plugin。

### uglifyjs-webpack-plugin

> Could not resolve dependency:npm ERR! peer webpack@"^4.0.0" from uglifyjs-webpack-plugin@2.2.0
> 用 terser-webpack-plugin 代替。

### extract-text-webpack-plugin

> Could not resolve dependency:npm ERR! peer webpack@"^3.1.0" from extract-text-webpack-plugin@3.0.2
> 用 mini-css-extract-plugin 代替。

### friendly-errors-webpack-plugin

> peer webpack@"^2.0.0 || ^3.0.0 || ^4.0.0" from friendly-errors-webpack-plugin@1.7.0
> 这个插件已不再维护了，但是社区有个好心人整了个 5 能用的@soda/friendly-errors-webpack-plugin。不过这插件不用也没事...

### 安装上述新版本

```
npm i -D css-minimizer-webpack-plugin terser-webpack-plugin mini-css-extract-plugin
```

## 删除 url-loader

```
npm uninstall url-loader
```

修改相关配置

```js
{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
}
//  >>>>>
{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 转换成data-uri的条件
            maxSize: 10000 // 10kb
          }
        },
        generator: {
          filename: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
},
```

## webpack-merge 修改

```js
const merge = require("webpack-merge");
// >>>>
const { merge } = require("webpack-merge");
```

## 修改 copy-webpack-plugin 配置

```js
 new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: config.dev.assetsSubDirectory,
          ignore: [".*"]
        }
      ]
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, "../static"),
    //     to: config.dev.assetsSubDirectory,
    //     ignore: [".*"]
    //   }
    // ])
```

## NamedModulesPlugin 替换

用 optimization 的 moduleIds 进行替换

## module.exports.node 替换

```js
// node >>>> fallback
  fallback: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
```

## 配置 terser-webpack-plugin

```js
optimization: {
  minimizer: [
    /**
     * 做压缩和混淆 https://github.com/terser/terser#minify-options
     * https://webpack.js.org/plugins/terser-webpack-plugin/#remove-comments
     */
    new TerserWebpackPlugin({
      minify: TerserWebpackPlugin.uglifyJsMinify,
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    }),
  ];
}
```

## 配置 [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)

```js
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
    }),
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath("css/[name].[contenthash].css"),
    //   allChunks: true
    // }),
```

## 其他配置修改

```js
{
        test: /\.less$/,
        // loader: "style-loader!css-loader!less-loader",
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
}
```
