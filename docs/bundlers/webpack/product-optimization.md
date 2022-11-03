# webpack 构建产物优化

## 分割代码

[splitChunks](https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks)

```js
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			chunks: "all", // 表示哪些代码需要优化，默认为 async ；initial(初始块)、async(按需加载块)、all(全部块)
			minSize: 20000, // 表示在压缩前的最小模块大小，默认为 20000
			minChunks: 1, // 要提取的chunk最少被引用次数，默认为2
			maxAsyncRequests: 30, // 按需加载时的最大并行请求数，默认30
			maxInitialRequests: 30, // 入口点的最大并行请求数，默认30
			enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值，默认值50000，其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略。
			// cacheGroups: {
			// 	vendor: {
			// 		test: /[\\/]node_modules[\\/]/,
			// 		name(module) {
			// 			// use npm
			// 			// get the name. E.g. node_modules/packageName/not/this/part.js
			// 			// or node_modules/packageName
			// 			// const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
			// 			// return `npm.${packageName.replace("@", "")}`;
			// 			// use pnpm
			// 			const packageName = module.context.match(/[\\/]node_modules\/.pnpm[\\/](.*?)([\\/]|$)/)[1];
			// 			return `npm.${packageName.replaceAll("@", "").replaceAll("+", "-")}`;
			// 		},
			// 	},
			// },
		},
```

## 摇树

删除项目中未被引用代码，只对**ESM**生效。  
在 webpack 中只需将打包环境设置为生产环境就能让摇树优化生效。

```js
export default {
  // ...
  mode: "production",
};
```

## 按需加载

将路由页面/触发性功能单独打包为一个文件，使用时才加载，减轻首屏渲染的负担，详见[vue 路由懒加载](../../study/vue/route-lazy-load)。

## 动态垫片

根据用户使用的环境按需打 polyfill 补丁。  
以[Polyfill.io](https://polyfill.io/v3/)为代表。它提供了 CDN 服务，使用者可以根据所需环境生成包链接。  
例如：[https://polyfill.io/v3/polyfill.min.js?features=es2015](https://polyfill.io/v3/polyfill.min.js?features=es2015)。在业务中引入该包，则高版本的浏览器会返回空白，低版本浏览器会返回 polyfill bundile。实现了按需打补丁。

- [官网 CDN 服务](https://polyfill.io/v3/polyfill.min.js)
- [阿里 CDN 服务](https://polyfill.alicdn.com/polyfill.min.js)

使用`html-webpack-tags-plugin`在打包时自动加入动态垫片，同时注释掉@babel/preset-env 相关配置。

```js
import HtmlTagsPlugin from "html-webpack-tags-plugin";

export default {
  // ...
  plugins: [
    // ...
    new HtmlTagsPlugin({
      append: false, // 在生成资源后加入
      publicPath: false, // 使用公共路径
      tags: ["https://polyfill.alicdn.com/polyfill.min.js"], // 资源路径
    }),
  ],
};
```

## html 压缩 html-webpack-plugin

```js
import HtmlPlugin from "html-webpack-plugin";

export default {
  // ...
  plugins: [
    // ...
    HtmlPlugin({
      // ...
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }, // 压缩HTML
    }),
  ],
};
```

## js 代码压缩 terser-webpack-plugin

```js
	optimization: {
		minimize: true,
		minimizer: [
			/**
			 * 做压缩和混淆 https://github.com/terser/terser#minify-options
			 * @see https://webpack.js.org/plugins/terser-webpack-plugin/
			 */
			new TerserWebpackPlugin({
				parallel: true, // 多进程并发，默认true
				terserOptions: {
					format: {
						comments: false, // 是否保留注释
					},
					compress: {
						// pure_funcs: ["console.log"],
						drop_console: true
					},
				},
				extractComments: false, // 是否将注释剥离到单独的文件中 默认true
			}),
		],
	},
```

## css 代码压缩

- [css-minimizer-webpack-plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin)
