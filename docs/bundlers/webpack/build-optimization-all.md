# webpack 构建优化总结

![img](http://assets.yomuki.com/md/%E6%9E%84%E5%BB%BA%E4%BC%98%E5%8C%96.png)

## 持久化缓存

提高二次构建性能。缓存解析结果，每次构建只重构变更的模块。

### 设置 babel-loader 的 cacheDirectory

### webpack5

- 内置[模块缓存](https://webpack.js.org/configuration/cache/#root)

```js
module.exports = {
  cache: {
    type: "filesystem",
  },
};
```

### webpack4

- [hard-source-webpack-plugin](https://www.npmjs.com/package/hard-source-webpack-plugin)为模块提供中间缓存。

## 多进程

### [thread-loader](https://www.npmjs.com/package/thread-loader)

把 thread-loader 放置在其它 loader 之前，那么放置在这个 loader 之后的 loader 就会在一个单独的 worker 池中运行。这样做的好处是把原本需要串行执行的任务并行执行。  
每个 worker 都是一个单独的 node.js 进程，其开销约为 600 ms。还有进程间通信的开销。（所以对小型项目来说添加 thread-loader 会变成负优化）  
所以一般来说项目初期用不上，后期酌情添加。

### [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)

webpack5 自带了，webpack4 需手动安装。  
仅适用于 devtool 的值为 source-map, inline-source-map, hidden-source-map and nosources-source-map。（生产映射源）  
它的配置中有一个属性 parallel,默认值 true，使用多进程并行运行来提高构建速度。

### [parallel-webpack](https://www.npmjs.com/package/parallel-webpack)

允许并行运行多个 webpack 构建。需要多个入口文件，相当于同时开启多个 webpack。

## 高效构建

### [esbuild-loader](https://github.com/privatenumber/esbuild-loader)

使用 esbuild-loader 去替代非常耗时的 babel-loader、ts-loader 等 loader。  
它把 esbuild 的能力包装成 Webpack 的 loader 来实现 Javascript、TypeScript、CSS 等资源的编译。以及提供更快的资源压缩方案。

### 使用 ESBuild 进行压缩

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.esbuildMinify,
        // `terserOptions` options will be passed to `esbuild`
        // Link to options - https://esbuild.github.io/api/#minify
        // Note: the `minify` options is true by default (and override other `minify*` options), so if you want to disable the `minifyIdentifiers` option (or other `minify*` options) please use:
        // terserOptions: {
        //   minify: false,
        //   minifyWhitespace: true,
        //   minifyIdentifiers: false,
        //   minifySyntax: true,
        // },
        terserOptions: {},
      }),
    ],
  },
};
```

### 使用 SWC 进行压缩

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        // `terserOptions` options will be passed to `swc` (`@swc/core`)
        // Link to options - https://swc.rs/docs/config-js-minify
        terserOptions: {},
      }),
    ],
  },
};
```

### [SourceMap](https://webpack.docschina.org/configuration/devtool/#root)

开发：

- eval 具有最高性能的开发构建的推荐选择。
- eval-cheap-module-source-map 首次慢，重构快
  生产构建：
- source-map 更精准
- noen 如果系统还没有异常监控系统，那省略。
  > terser-webpack-plugin 仅能在 source-map, inline-source-map, hidden-source-map and nosources-source-map 下使用

## 精简作业

减少不必要的编译步骤和对象。

### 寻址优化

合理设置 loader 的 exclude 和 include 属性。

### [noParse](https://webpack.js.org/configuration/module/#modulenoparse)跳过编译

跳过编译，对已经**提供了打包完成的 esm 文件的库**。这个时候没必要重复进行依赖打包。所以可以通过 no-parse 跳过。

```js
module.exports = {
  module: {
    noParse: /jquery|lodash|(^vue$)|(^pinia$)|(^vue-router$)/,
  },
};
```

### 开发阶段禁止产物优化

- minimize 压缩
- splitChunks 分包
- concatenateModules 模块连接
- Tree-shaking 摇树
- TerserPlugin（压缩、混淆）

in webpack5:

```js
module.exports = {
    optimization {
       removeAvailableModules: false,
       removeEmptyChunks: false, //
       splitChunks: false, // 代码分包
       minimize: false, //代码压缩
       concatenateModules: false,
       usedExports: false, // Treeshaking
  };
};
```

### [分模块构建](https://juejin.cn/post/7127098334900125710#heading-12)

### eslint 忽略检查

### 设置监听忽略目录

```js
module.exports = {
  //...
  watchOptions: {
    ignored: /node_modules/,
  },
};
```
