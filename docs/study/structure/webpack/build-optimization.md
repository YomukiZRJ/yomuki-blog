<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-17 10:25:37
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-01 12:43:17
-->
# webpack 构建优化
## 参考文章
- [基于webpack4的构建效率优化](https://juejin.cn/post/7127098334900125710)
## 为什么构建会慢？
webpack的构建流程主要为：
1. 递归遍历各个入口文件。
2. 基于入口文件不断寻找依赖逐个编译再递归处理
每次递归都需要经历 String->AST->String
然后通过不同的 loader 处理一些字符串或者执行一些 JavaScript 脚本
然后nodejs是单线程，js是单线程语言，所以限制了效率
所以可得出构建优化方向为：
- 缓存
- 多进程
- 寻路优化
- 抽离拆分
- 构建工具替换
## 分析构建问题
- **speed-measure-webpack-plugin** 
> 统计 webpack 打包时间，分析总的打包时间，分析各阶段loader 的耗时，并且可以输出一个文件用于永久化存储数据。
- dev开发阶段优化
    - 在开发阶段，需要**热更新**。但是像代码混淆压缩，图片压缩这些功能可以不用开启，以此来加快构建时间。
- build打包优化
    - 需在保证最终项目体积小的情况下加快构建速度。
## 缓存优化
- **hard-source-webpack-plugin**
> 为模块提供中间缓存，缓存默认存放路径是 node_modules/.cache/hard-source（webpack5内置[模块缓存](https://webpack.js.org/configuration/cache/#root)了）
- webpack5 cache
- 设置 babel-loader 的 cacheDirectory
  - 指定目录用来缓存loader，之后的构建读取这个缓存
- DDL 
  - 大佬说配置非常繁琐，并且最终收效甚微。
## 多进程
- thread-loader
  - 把 thread-loader 放置在其它 loader 之前，那么放置在这个 loader 之后的 loader 就会在一个单独的 worker 池中运行。这样做的好处是把原本需要串行执行的任务并行执行。
## 寻址优化
合理设置 loader 的 exclude 和 include 属性。
## [分模块构建](https://juejin.cn/post/7127098334900125710#heading-12)
指某项目中有路由A,B,C,D。当前仅基于A进行开发，就只构建A模块。
需要使webpack在初始化遍历路由收集依赖的时候，跳过不需要的模块。
即，需在项目启动时，通过命令脚本，动态生成需要构建的路由列。
- 使用 [NormalModuleReplacementPlugin](https://webpack.docschina.org/plugins/normal-module-replacement-plugin/) 插件进行文件替换
  - 对于项目的入侵小，只需添加前置脚本及修改 Webpack 配置
  - 通过生成临时路由文件的方式，替换原路由文件，对项目无任何影响
将原本的路由文件替换掉
```js
new webpack.NormalModuleReplacementPlugin(
  /src\/route\/routes.js/,
  './dev.routes.js'
);
``` 
### dev.routes如何生成呢？
- [Inquirer](https://github.com/SBoudrias/Inquirer.js/) 交互命令行
- [esj](https://ejs.bootcss.com/) 嵌入式 JavaScript 模板引擎
## 开发构建优化
某些 utility, plugin 和 loader 都只用于生产环境。例如，在开发环境下使用 TerserPlugin 来 minify(压缩) 和 mangle(混淆破坏) 代码是没有意义的。通常在开发环境下，应该排除以下这些工具：
- TerserPlugin
- [fullhash]/[chunkhash]/[contenthash]
- AggressiveSplittingPlugin
- AggressiveMergingPlugin
- ModuleConcatenationPlugin
## 生产构建优化
- 可在build阶段去掉代码静态检查 eslint
- 使用[esbuild-loader](https://github.com/privatenumber/esbuild-loader) 去替代非常耗时的 babel-loader、ts-loader 等 loader
  - 它把 esbuild 的能力包装成 Webpack 的 loader 来实现 Javascript、TypeScript、CSS 等资源的编译。以及提供更快的资源压缩方案。
