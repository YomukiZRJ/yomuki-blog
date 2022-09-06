<!--
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-17 09:50:13
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-17 16:10:59
-->

# webpack 随手记

## hash

- hash
  - 每次构建都会使 webpack 计算新的 hash。
- chunkhash
  - chunkhash 基于入口文件及其关联的 chunk 形成，某个文件的改动只会影响与它有关联的 chunk 的 hash 值，不会影响其他文件
- contenthash
  - 根据文件内容创建。当文件内容发生变化时，contenthash 发生变化

## 插件

### 开发插件

- html-webpack-plugin HTML 打包 引入资源
- copy-webpack-plugin 静态资源复制
- vue-loader/dist/index 定义过的其它规则复制并应用到 .vue 文件里相应语言
- DefinePlugin 编译时配置全局变量 webpack5 内置

### 规范插件

- case-sensitive-paths-webpack-plugin 路径强制大小写
- eslint-webpack-plugin

### 分析插件

- duplicate-package-checker-webpack-plugin 检测是否引入了一个包多个版本
- progress-bar-webpack-plugin 进度条
- webpack-bundle-analyzer 构建体积分析 - 检测打包出来的体积
- speed-measure-webpack-plugin 构建速度分析 - 分析总打包时间，各阶段 loader 打包耗时，并输出分析文件

### 优化插件

- terser-webpack-plugin 体积优化 - 处理 js 的压缩和混淆，移除不需要的函数
- compression-webpack-plugin 体积优化 - gzip 压缩
- optimize-css-assets-webpack-plugin 体积优化 - 重复的 css 可以快速去重
- hard-source-webpack-plugin 模块缓存 - 为模块提供中间缓存 （webpack5 内置[模块缓存](https://webpack.js.org/configuration/cache/#root)了）

## loader

- babel-loader
- style-loader 和 vue-style-loader 冲突
  - vue-style-loader 支持 vue 中的 ssr（服务端渲染）
  - style-loader 功能更丰富 懒注入、可以指定位置插入标签
- css-loader
- less-loader postcss-loader
- thread-loader 多进程打包
- file-loader url-loader webpack5 内置了 asset 了
- [esbuild-loader](https://github.com/privatenumber/esbuild-loader) 代替 babel-loader ts-loader

## 性能优化

- 压缩代码。删除注释 压缩 jscss
- CDN 加速
- Tree Shaking
- 代码分隔
