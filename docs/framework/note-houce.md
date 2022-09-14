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
[babel-polyfill](https://github.com/zloirock/core-js#babelpolyfill)融合了 core-js 和 regenerator-runtime。与@babel/preset-evn（定义 babel 所需插件，根据 preset-env ratgets 配置自动按需加载 polyfill）、useBuiltins(entry)配合。

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
