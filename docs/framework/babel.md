# babel

## 相关文章

- [Vue Cli 项目 babel 配置解析](https://zhuanlan.zhihu.com/p/337075666)
- [带你玩转 babel 工具链（五）彻底理解@babel/helpers 与 @babel/runtime](https://juejin.cn/post/7114486435487023112)

## [loose](https://2ality.com/2015/12/babel6-loose-mode.html) mode 松散模式

babel 中的很多插件有两种模式：

- loose mode 松散模式：产生更简单的 ES5 代码
- normal mode 正常模式：尽可能地遵循 ECMAScript 6 的语义。  
  loose mode 的缺点：
- 当您从转译的 ES6 切换到本机 ES6 时，您可能会在以后遇到问题。
  loose mode 的优点：
- 生成的代码可能更快，并且与旧引擎更兼容。它也趋向于更干净，更“ES5 风格”。  
  **建议不要用 loose mode**

## [**@babel/core**](https://babeljs.io/docs/en/babel-core)

是 Babel 实现转换的核心。

```js
const babel = require("@babel/core");
babel.transform("const a = 1;", (err, res) => {
  console.log(res);
});
```

- @babel/parser 对 js 语言进行解析的解析器。针对源码编译得到 AST（依赖了 acorn,acorn-js）
- @babel/traverse 遍历 AST
- @babel/types 提供了对具体 AST 节点修改的能力
- @babel/generator 对新的 AST 进行聚合并生成 JS 代码
  > 这就是 Babel 的底层编译原理。这也是 Babel 的插件运作原理。

## plugins && presets

plugins:从前往后执行。  
presets:从后往前执行。  
plugins -> presets。  
![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e8b52f7e7f9465991d73744c08022e5~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

## presets:[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)

```js
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}
```

智能预设，浏览器范围集成。  
默认情况下，@babel/preset-env 会使用**browserslist**配置源。除非设置了 targets 或 ignoreBrowserslistConfig 选项。

### options

- [targets](https://babeljs.io/docs/en/options#targets) 目标编译环境。
- **useBuiltIns** 配置@babel/preset-env 如何处理 polyfill。default.false。  
   false 即不处理 api，不会自动对每个文件的 api 进行转换，也不会去引入 polyfill。  
   由于@babel/polyfill 在 7.4.0 中已弃用，我们建议直接通过选项添加 core-js 和设置版本。
  ```js
  // 7.4.0 -
  npm install @babel/polyfill --save
  // 7.4.0 +
  npm install core-js@3 --save
  // or
  npm install core-js@2 --save
  ```
  - entry 对全部文件进行 api 转换，并且需要在入口文件中手动引入@babel/polyfill 或 core-js
    ```js
    // in
    import "core-js";
    // output 因环境而异
    import "core-js/modules/es.string.pad-start";
    import "core-js/modules/es.string.pad-end";
    ```
  - **usage** 对 api 的转换采用按需加载，即用到哪个方法就自动引入对应的转换代码，不会全量的引入 polyfill，无需在页面入口手动引入@babel/polyfill 或 core-js。  
    一般情况下使用**usage**是最合适的。  
    但有时，我们会用组件库，组件库中的 api 是没有被转换的，如果 babel-loader 目录中忽略了 node_modules 下的组件库文件，则这些 api 将不会得到正确转换。可以将组件库目录加入转换目录或者使用 useBuiltIns:"entry"
- corejs 指定 core-js 版本。string 或者{ version: string, proposals: boolean }。default."2.0"  
   建议指定次要版本，否则"3"将被解释为"3.0"可能不包含最新功能的 polyfill。proposals 设为 true 的话将使用提案中的 api。
- debug 在控制台打印启用的 polyfill。default.false
- include 始终包含的插件
- exclude 始终排除的插件
- loose 为此预设中允许它们的任何插件启用“松散”转换。default.false
- spec 为此预设中支持它们的任何插件启用更符合规范但可能更慢的转换。default.false
- modules 启用将 ES 模块语法转换为另一种模块类型。default.auto

## polyfill

从 Babel 7.4.0 开始，@babel/polyfill 已被弃用。

```js
// 7.4.0 -
npm install @babel/polyfill --save
// 7.4.0 +
npm install core-js@3 --save
// or
npm install core-js@2 --save
```

## plugins:@babel/plugin-transform-runtime && @babel/runtime

@babel/runtime:含有 Babel 编译所需的一些运行时 helper 函数。同时提供了 regenerator-runtime 包，对 genertor 和 async 函数进行编译降级。  
@babel/plugin-transform-runtime:它可以重复使用 babel 注入的 helper 函数，达到节省代码空间的目的。（可以看作为工具函数）

- helper 使用模块化加载
- polyfill 不污染全局，通过导出变量的形式引入，而不是直接覆盖全局方法的实现

```js
npm i @babel/runtime @babel/plugin-transform-runtime -D
```

只有配置@babel/plugin-transform-runtime, 才会使用@babel/runtime。

```js
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ],
  "plugins": [
      "@babel/plugin-transform-runtime"
  ]
}
```

> 由于@babel/plugin-transform-runtime 并不支持 targers 配置。也就是说，所有的比较新的语言特性，都会被 polyfill, 明明浏览器已经支持的功能，却还被 polyfill，这显然是不合理的。所以我更推荐在开发 lib 库的时候使用@babel/plugin-transform-runtime。

## [插件列表](https://babeljs.io/docs/en/plugins-list)

常用插件：

- @babel/plugin-proposal-decorators 装饰器-还是提案
- @babel/plugin-proposal-export-default-from 导出默认-还是提案
- @babel/plugin-proposal-export-namespace-from 导出默认为命名空间（@babel/preset-env ES2020）
