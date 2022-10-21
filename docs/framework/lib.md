# 如何打包类库

- [类库打包](https://juejin.cn/book/7034689774719860739/section/7036006603732025344)
  - [示例仓库](https://github.com/JowayYoung/fe-engineering/tree/main/js-lib/bruce-us)

一个工具库得明确 bundle 文件的运行环境是`Web`，还是`Node`，还是双环境。Web 与 Node 的部分代码无法打包在一起，具体原因如下。

- Web 独有`window`全局变量，Node 独有`global`全局变量
- Web 独有`BOM/DOM`等对象，Node 独有`Fs/Path`等模块
- Web 可兼容`IIFE`与`AMD`，Node 可兼容`CJS`，两者都兼容`CMD`、`UMD`和`ESM`

bundle 文件最终的模块规范确定为`CJS`、`ESM`和`UMD`。

为了更好地拥有该模糊提示功能，推荐使用`typescript`编写工具库，在打包代码时顺便生成`d.ts`声明文件。

## 目录结构

以 Web 工具为例：

```txt
project
├─ dist          # 输出目录
│  ├─ index.js
│  ├─ index.esm.js
│  ├─ index.umd.js
│  ├─ index.d.ts
├─ src           # 源码目录
│  ├─ index.ts # 源码
│  ├─ index.umd.ts
├─ .gitignore
├─ .npmignore
└─ package.json
```

`.npmignore`和`.gitignore`

```text
.DS_Store
node_modules
package-lock.json
yarn.lock
```

## 打包工具 - [rollup](https://rollupjs.org/guide/zh/)

`rollup`配置简单，内置 ES6 解析、摇树优化、作用提升。  
`@rollup/plugin-typescript` 编译 ts  
`@rollup/plugin-node-resolve`自动寻找引用到的 Npm 模块
`@rollup/plugin-commonjs`将 CJS 转换为 ESM 再让其参与到后续编译中  
`rollup-plugin-dts`合并声明文件  
`rollup-plugin-cleandir`清理 dist 文件夹  
`rollup-plugin-terser`压缩

```js
import TypescriptPlugin from "@rollup/plugin-typescript";
import CommonjsPlugin from "@rollup/plugin-commonjs";
import NodeResolvePlugin from "@rollup/plugin-node-resolve";
import DtsPlugin from "rollup-plugin-dts";
import { cleandir as CleandirPlugin } from "rollup-plugin-cleandir";
import { terser as TerserPlugin } from "rollup-plugin-terser";
const PLUGINS = [
  TypescriptPlugin(),
  CommonjsPlugin(),
  NodeResolvePlugin(),
  TerserPlugin({
    compress: { drop_console: false },
    format: { comments: false },
  }),
];
export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
    },
    plugins: [...PLUGINS, CleandirPlugin("dist")],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.esm.js",
      format: "esm",
    },
    plugins: PLUGINS,
  },
  {
    input: "src/index.ts",
    output: { file: "dist/index.d.ts", format: "esm" },
    plugins: [DtsPlugin()],
  },
  // {
  // 	input: "src/index.umd.ts",
  // 	output: {
  // 		file: "dist/index.umd.js",
  // 		format: "umd",
  // 		name: "pakname",
  // 	},
  // },
];
```
