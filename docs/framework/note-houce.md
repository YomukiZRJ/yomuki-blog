# 《前端架构师 - 技术建设与架构设计思想》笔记

# vite

vite，一个基于浏览器原生 ES imports 的开发服务器。利用浏览器解析 import，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。

- 基于 ESM。实现了快速启动，即时模块热更新。
- 在服务器端实现按需编译。

## core-js 及 polyfill 理念

### core-js

core-js 是一个用 Lerna 搭建的 Monorepo 风格的项目。（可以看它的[仓库](https://github.com/zloirock/core-js)）  
**core-js**包是实现基础 polyfill 的核心逻辑。可以全局也可以按需引入。

```js
import "core-js";
import "core-js/actual/array/from";
Array.from(new Set([1, 2, 3, 2, 1])); // => [1, 2, 3]
```

**core-js-pure** 提供了不污染全局变量的 polyfill 能力。导出独立命名空间，进而避免污染全局变量。

```js
import _from from "core-js-pure/actual/array/from";
_from(new Set([1, 2, 3, 2, 1])); //  => [1, 2, 3]
```

[**core-js-compact** ](https://github.com/zloirock/core-js/tree/master/packages/core-js-compat)维护遵循 Browserslist 规范的 polyfill 需求数据。帮我们找到**符合目标环境**的 polyfill 需求合集。

```js
// 筛选出全球浏览器使用份额大于2.5%的区域
const { list, targets } = require("core-js-compact")({ targets: ">2.5%" });
```

```js
import compat from "core-js-compat";

const {
  list, // array of required modules
  targets, // object with targets for each module
} = compat({
  targets: "> 1%", // browserslist query or object of minimum environment versions to support, see below
  modules: [
    // optional list / filter of modules - regex, sting or an array of them:
    "core-js/actual", // - an entry point
    "esnext.array.unique-by", // - a module name (or just a start of a module name)
    /^web\./, // - regex that a module name must satisfy
  ],
  exclude: [
    // optional list / filter of modules to exclude, the signature is similar to `modules` option
    "web.atob",
  ],
  version: "3.25", // used `core-js` version, by default - the latest
});
```

[**core-js-builder**](https://github.com/zloirock/core-js/tree/master/packages/core-js-builder) 可以结合 core-js-compact 和 core-js 使用。利用 webpack 能力，按需打包 core-js 代码。

```js
import builder from "core-js-builder";
builder({
    targets:'>0.5%',
    filename:"'./my-core-js-bundle.js"
}).then(code->{}).catch(err=>{})
// 符合需求的core-js将被打包到my-core-js-bundle.js中
```

综上，可见：

- core-js 将自身能力充分解耦。
- core-js-compact 可以被 Babel 生态使用，由 Babel 分析出环境需要的 polyfill。
- core-js-builder 可以被 Node.js 使用，构建出不同场景所需的 polyfill 包。  
  core-js 体现了**工程复用能力**。（什么是工程复用能力？）

### 如何复用一个 polyfill？

一般来说，如果浏览器不支持 Array.prototype.every，手动编写一个支持 Array.prototype.every 的 polyfill 并不困难。

```js
if(!Array.prototype.every){
    Array.prototype.every = function(callback,thisArg){
        ....
    }
}
```

core-js-pure 不同于 core-js，它提供了不污染命名空间的引用方式。实现 polyfill 的逻辑需要被 core-js 和 core-js-pure 同时引用，只需要区分最后导出方式。

- [polyfill 核心逻辑.js](https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/array-iteration.js)
- [internals/export](https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/export.js) 导出实现
  在 core-js 中，target:"Array",proto:true 表明需要在 Array 原型上以“污染原型”的方式来拓展方法。

```js
var $ = require('../internals/export');
var $every = require('../internals/array-iteration').every;
$({target:"Array",proto:true},{
    every:function every(callback){
        return $every(this,callback,...)
    }
})
```

在 core-js-pure/export 。同时，core-js-pure 中的 override 文件在构建阶段复制了 core-js 内的核心逻辑，提供了复写 polyfill 逻辑的能力，通过构建流程实现 core-js-pure 与 override 内容的替换。**利用构建能力实现复用**

### polyfill

polyfill 就是社区提供一段代码，让我们在不兼容某些特性的浏览器上使用该特性。  
什么是完美的 polyfill 方案？侵入性最小、工程化，自动化程度最高、业务影响最低。

#### 构建植入 polyfill

[babel-polyfill](https://github.com/zloirock/core-js#babelpolyfill)结合了 **core-js** 和 **regenerator-runtime**。与@babel/preset-evn（定义 babel 所需插件，根据 preset-env ratgets 配置自动按需加载 polyfill）、useBuiltins(entry)配合。

> useBuiltins(usage)：useBuiltins 被配置为 usage 时，它可以真正根据代码情况分析 AST(抽象语法树)，并进行更细粒度的按需引用。因为 javascript 是弱类型语言，foo.includes 无法判断 foo 是数组还是字符串，因此会把数组原型方法和字符串原型方法同时打包为 polyfill bundle。

```js
{
    "presets":[
        ["@babel/env",{
            useBuiltins:'entry',
            targets:{chrome:44}
        }]
    ]
}
```

#### 在线动态打补丁

以[Polyfill.io](https://polyfill.io/v3/)为代表。它提供了 CDN 服务，使用者可以根据所需环境生成包链接。  
例如：https://polyfill.io/v3/polyfill.min.js?features=es2015。在业务中引入该包，则高版本的浏览器会返回空白，低版本浏览器会返回polyfill bundile。实现了按需打补丁。  
按需打补丁：

- **按照用户终端环境打补丁**
- **按照业务代码使用情况打补丁**

## Babel

Babel 是一个 JavaScript“编译器”。它会完成以下内容：

- 语法转换。一般为高级语言特性降级。（一些高级语法 像?.）
- polyfill 特性的实现和接入。
- 源码转换。比如 JSX  
  从工程化来说，Babel 需要秉承以下理念：
- 可拔插。需求一套灵活的插件机制，方便接入各种工具。
- **可调试。**在编译过程中提供一套 Source Map 来帮助使用者在编译结果和编译前源码之间建议映射关系，方便调试。
- 基于协定。灵活的配置方式。（Babel 的 loose 选项可帮助开发者在“尽量还原规范”和“更小的编译产出体积”之间找到平衡）

### Babel 架构包解析

[Babel](https://github.com/babel/babel)([官网文档](https://babeljs.io/docs/en/))是一个使用 Lerna 的 Momorepo 风格的仓库。

#### [**@babel/core**](https://babeljs.io/docs/en/babel-core)

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

#### **@babel/cli**

是 Babel 提供的命令行。可从终端以命令行形式编译文件或目录。（用 commander 库搭建的命令行，cli 获取配置内容，最终由 babel/core 完成编译）

#### **@babel/standalone**

可在非 Node 环境（eg.Web）下自动编译 type 值为 text/babel , text/jsx 的 script 标签。

#### **@babel/polyfill & @babel/preset-env**

- @babel/polyfill **core-js**和**regenerator-runtime**（对编译/转译 async 函数的运行时支持）结合
- @babel/preset-env 配置支持的目标环境（浏览器范围/node.js 版本范围）
  - 是如何根据适配环境按需引入 polyfill 的？
    > @babel/preset-env 通过配置 targets 参数，遵循 Browserslist 规范，结合 core-js-compact，即可筛选出所需的 polyfill。（P70）

#### **@babel/plugin-transform-runtime & @babel/runtime**

- @babel/plugin-transform-runtime 它可以重复使用 babel 注入的 helper 函数，达到节省代码空间的目的。（可以看作为工具函数）
- @babel/runtime 含有 Babel 编译所需的一些运行时 helper 函数。同时提供了 regenerator-runtime 包，对 genertor 和 async 函数进行编译降级。
  总结如下：
- @babel/plugin-transform-runtime 需和 @babel/runtime 配合使用
- @babel/plugin-transform-runtime 在编译时使用，作为 devDependencies
- @babel/plugin-transform-runtime 将业务代码进行编译，引用@babel/runtime 提供的 helper 函数，达到缩减编译产出物的目的。还能避免污染全局作用域。
- @babel/runtime 用于运行时，作为 denpdencies

#### 其他包

- @babel/plugin Babel 插件集合
- @babel/plugin-syntax-\* Babel 语法插件。拓展@babel/parser 的一些能力。提供新特性能力。
- @babel/plugin-proposal-\* 用于对提议阶段的语言特性进行编译转换
- [@babel/plugin-transform-\*](https://babeljs.io/docs/en/babel-plugin-transform-modules-umd) Babel 的转换插件
  - @babel/plugin-transform-modules-umd 转为 umd 格式（用于让公共库可用 script 标签直接引入）
- @babel/template 封装了基于 AST 的模板能力。将字符串代码转为 AST
- @babel/node 类似于 Node.js cli 。提供了在命令行执行高级语法的环境。（运行时编译转换）
- @babel/register 为 require 增加 hook，使用后，所有被 Node.js 引用的文件都会被 Babel 先转码。（运行时编译转换）
- [@babel/loader](https://www.npmjs.com/package/babel-loader) webpack loader

## 公共库搭建

p103 文章展示了如何用 webpack 搭建公共库。（用 father 好像更方便？）  
package.json 中的入口文件字段说明：

- main 定义了 npm 包的入口文件，浏览器环境和 Node.js 环境均可使用
- module 定义了 npm 包的 ESM 规范入口文件，浏览器环境和 Node.js 环境均可使用
- browser 定义了 npm 包在浏览器环境下的入口文件
  webpack 在浏览器环境下，优先选择 browser > module > main；在 Node.js 中，module >main。

## 代码拆分与按需加载

合理的代码拆分与按需加载可以使项目体积更小、页面加载更快。  
比如，页面上有一个包含复杂业务逻辑的悬浮层，只有 10%的用户会点击。在用户点击时再进行对这一部分脚本的请求。

### 按需打包的实现

#### **使用 ESM 支持的 TreeShaking 方案。**

webpack4 新增了一个 sideEffects 新特性，它允许我们通过配置的方式，去标识我们的代码是否有副作用，从而为 Tree-shaking 提供更大的压缩空间。  
这里的副作用指的是模块执行时除了导出成员之外所做的事情。  
sideEffects 一般用于 npm 包标记是否有副作用。  
开启了**sideEffects**配置后，webpack 在打包时就会先检查当前代码所属的 package.json 中有没有 sideEffects 的标识，以此来判断这个模块是不是又副作用。如果这个模块没有副作用，这些没被用到的模块就不会被打包。（这个特性在 production 模式下会自动开启）

```js
module.exports = {
  mode: "none",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  optimization: {
    sideEffects: true,
  },
};
```

#### **编写 Babel 插件实现自动按需打包**

如果第三方库不支持 tree shaking 方案，可以通过 babel 插件改变业务代码中对模块的引用路径来实现按需打包。  
比如 babel-plugin-import。它会将以下引入

```js
import { Button as Btn, Input } from "antd";
```

改为

```js
import _Button from "antd/lib/button";
import _Input from "antd/lib/input";
```
