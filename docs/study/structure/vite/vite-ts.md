# Vue 3 + TypeScript + Vite 配置学习

[参考](https://github.com/HalseySpicy/Geeker-Admin)

## 创建

- [vite](https://vitejs.cn/guide/#scaffolding-your-first-vite-project)
- [pnmp](https://www.pnpm.cn/cli/init)

## 配置

返回配置类型为 UserConfig（用 ts 的话移上去会有类型和默认值提示，以及英文注解...好好学英语 QAQ）
[部分配置的默认值](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts)

- root
  - 项目根目录，绝对|相对，默认为 process.cwd()
- base
  - 用于开发或生产时的基础公共路径。默认/
- publicDir
  - 作为静态资源的文件夹（打包的时候整个文件夹复制过去），false 可关闭
  - 默认值为 public
- cacheDir
  - 存储缓存文件的目录。存储预打包的依赖项或 vite 生成的某些缓存文件
  - 默认值 node_modules/.vite
- mode
  - 在配置中指明将会把 serve 和 build 时的模式 都 覆盖掉。也可以通过命令行 --mode 选项来重写。
- define
  - 定义全局常量替换方式
- plugins
  - 插件
- resolve.alias
  - 路径别名 [配置文档](https://github.com/rollup/plugins/tree/master/packages/alias#entries)

```js
    alias: [
        // @/xxxx => src/xxxx
        {
          find:'@/',
          replacement: pathResolve('src')+ '/' ,
        },
        // #/xxxx => types/xxxx
        {
          find:'#/',
          replacement: pathResolve('types')+ '/' ,
        },
```

- resolve.extensions
  - 导入时省略的拓展名
  - 默认值 ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  - 官方不建议忽略.vue
- [css.modules](https://vitejs.cn/config/#css-modules)
- css.postcss
  - 内联的 postcss 配置，如果提供了该内联配置，Vite 将不会搜索其他 PostCSS 配置源。
- css.preprocessorOptions
  - 给指定的预处理器传递选项

```js
preprocessorOptions: {
	scss: {
		additionalData: `@import "@/styles/var.scss";`;
	}
}
```

- json.namedExports
  - 是否支持从 .json 文件中进行按名导入。默认 true
- json.stringify
  - 是否支持导入的 JSON 会被转换为 export default JSON.parse("...")。开启此项，则会禁用按名导入。默认 false
- esbuild
  - [ESbuild 转换配置](https://esbuild.github.io/api/#transform-api)
  - esbuild.pure
    - 如果结果值未使用，则可以删除该表达式。
    - 如果想删除 console.Api 可以用 drop

```js
// /* @__PURE__ */或/* #__PURE__ */之前的特殊注释意味着如果结果值未使用，则可以删除该表达式。
let button = /* @__PURE__ */ React.createElement(Button, null );
// 用drop
esbuild app.js --drop:debugger
esbuild app.js --drop:console
// ...这要怎么在run中配置 小小的脑袋 等会试试
```

- assetsInclude
  - 静态资源处理文件类型 默认值在[部分配置的默认值](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts)
- server
  - host 设置为 0.0.0.0 或者 true 将监听所有地址
  - port 如果端口已经被使用，Vite 会自动尝试下一个可用的端口
  - strictPort 设为 true 时，端口占用时不会再切换端口
  - https 启用 TLS + HTTP/2 ，这是什么？
  - open 是否自动打开页面。可设打开路径名
  - [proxy 代理](https://vitejs.cn/config/#server-proxy)
  - cors 默认启用并允许任何源 跨域的吧
  - hmr 禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。
  - watch 这我应该用不着....
  - middlewareMode 以中间件模式创建 Vite 服务器。 [ssr 服务器](https://vitejs.cn/guide/ssr.html#setting-up-the-dev-server)
  - fs.strict 限制为工作区 root 路径以外的文件的访问。 默认 true
  - origin 用于定义开发调试阶段生成资产的 origin。
- build
  - target 浏览器构建目标
    - 默认值 [modules](https://caniuse.com/es6-module)
    - 其他值 [esbuils.target](https://esbuild.github.io/api/#target)
  - outDir 输出路劲 默认 dist
  - assetsDir 指定的静态资源输出路劲 默认 assets
  - assetsInlineLimit 小于此阈值的导入或引用资源将内联为 base64 编码，设为 0 禁用
  - cssCodeSplit 默认 true
    - 启用/禁用 CSS 代码拆分。
    - 启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。
    - 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
  - cssTarget 为 CSS 的压缩设置一个不同的浏览器
    - 应只在针对非主流浏览器时使用。
    - 最直观的示例是当你要兼容的场景是安卓微信中的 webview 时，它支持大多数现代的 JavaScript 功能，但并不支持 CSS 中的 #RGBA 十六进制颜色符号。 这种情况下，你需要将 build.cssTarget 设置为 chrome61，以防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式。
  - sourcemap 构建后是否生成 sourcemap 文件。默认 false
  - rollupOptions [底层 rollup 打包配置](https://rollupjs.org/guide/en/#big-list-of-options)
  - ssr 生成面向 ssr 的构建
  - minify 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。 默认 esbuild boolean | 'terser' | 'esbuild'
  - brotliSize 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
  - chunkSizeWarningLimit chunk 大小警告的限制（以 kbs 为单位）。
- preview
  - host
  - port
  - open
  - cors
- optimizeDeps
  - include 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
  - exclude 在预构建中强制排除的依赖项。

## dev 插件

- @types/node ts node 类型
- @vitejs/plugin-vue-jsx vue jsx 插件
- [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) 扩展浏览器支持
  - terser 依赖的依赖
- vite-plugin-compression gzip 打包
- [rollup-plugin-visualizer ](https://www.npmjs.com/package/rollup-plugin-visualizer)打包分析 和 build.brotliSize 啥区别？
  - 前者生成了个包文件详情的 html 页面 较为详细
  - 后者是打印出来的每个包的大小
  - filename 文件名
  - open 是否自动打开页面
  - gzipSize 从源代码中收集 gzip 大小并将其显示在图表中。
  - ..提示需要装 rollup，但是不装好像也没报错....还是装了
  - 应该是 vite 内置了，pnpm 装完后跳的结果是更新成功
- postcss postcss-html autoprefixer
- vite-plugin-html html 文件处理

```js
import { createHtmlPlugin } from "vite-plugin-html"
        createHtmlPlugin({
            inject: {
                data: {
                    title: VITE_APP_TITLE
                }
            }
        }),
        // <title><%= title %></title>
```

- vite-plugin-vue-setup-extend name 可以写在 script 标签上

## 规范化

### 格式化相关

- [prettier](https://www.prettier.cn)
  - pnpm i prettier -D

### 代码规范

- [eslint](http://eslint.cn) [规则](http://eslint.cn/docs/rules)
- eslint-config-prettier 关掉所有和 Prettier 冲突的 ESLint 的配置
- eslint-plugin-prettier 将 Prettier 的 rules 以插件的形式加入到 ESLint 里面
- eslint-plugin-vue 为 Vue 使用 ESlint 的插件 [规则](https://eslint.vuejs.org/rules)
- @typescript-eslint/eslint-plugin ESLint 插件，包含了各类定义好的检测 TypeScript 代码的规范 [规则](https://typescript-eslint.io/rules)
- @typescript-eslint/parser ESLint 的解析器，用于解析 TypeScript，从而检查和规范 TypeScript 代码

```text
pnpm i eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```

### 样式规范

- [stylelint](https://stylelint.io)
- stylelint-config-html Stylelint 的可共享 HTML（和类似 HTML）配置，捆绑 postcss-html 并对其进行配
- stylelint-config-recommended-vue 扩展 stylelint-config-recommended 共享配置，并为 Vue 配置其规
- stylelint-config-standard 打开额外的规则来执行在规范和一些 CSS 样式指南中发现的通用约定，包括：惯用 CSS 原则，谷歌的 CSS 样式指南，Airbnb 的样式指南，和 @mdo 的代码指南
- stylelint-config-recess-order 属性的排序（插件
- stylelint-config-prettier 关闭所有不必要的或可能与 Prettier 冲突的规

```text
pnpm i stylelint stylelint-config-html stylelint-config-recommended-vue stylelint-config-standard stylelint-config-recess-order stylelint-config-prettier -D
```

### EditorConfig

- 帮助开发人员在 **不同的编辑器** 和 **IDE** 之间定义和维护一致的编码样式。

### git

- husky 操作 **git** 钩子的工具（在 **git xx** 之前执行某些命令）
  - pnpm i husky -D
  - 在 package 中设置脚本 "prepare": "husky install"
  - pnpm run prepare (先添加 git 仓库再运行命令)
- lint-staged 在提交之前进行 **eslint** 校验，并使用 **prettier** 格式化本地暂存区的代码
  - pnpm install lint-staged --D
  - 在 husky 下添加 pre-commit 文件。**作用：通过钩子函数，判断提交的代码是否符合规范，并使用 prettier 格式化代码**

```
npx husky add .husky/pre-commit "npm run lint:lint-staged"
```

- 添加 lint-staged.config.js
- @commitlint/cli 校验 **git commit** 信息是否符合规范，保证团队的一致性
- @commitlint/config-conventional **Anglar** 的提交规范
  - pnpm i @commitlint/cli @commitlint/config-conventional -D
  - 在 husky 下添加 commit-msg 。

```
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

- commitizen 基于 **Node.js** 的 **git commit** 命令行工具，生成标准化的 **commit message**
  - pnpm install commitizen -D
  - 可以快速使用 cz 或 git cz 命令进行启动。
- cz-git 一款工程性更强，轻量级，高度自定义，标准输出格式的 **commitize** 适配器
  - pnpm install cz-git -D
  - 配置 package
  - 创建 commitlint.config.js

```
"config": {
		"commitizen": {
			"path": "node_modules/cz-git"
		}
	}
```

## 问题记录

- module is not defined in ES module scope
  - 把 package.json 里的 type": "module"删了
