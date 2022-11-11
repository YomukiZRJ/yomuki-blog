# 架构库

- [Tooling.Report](https://bundlers.tooling.report/) 构建工具对比平台
- [Bun](https://bun.sh/) js/ts 运行环境，兼容 Node.js 的所有 API，运行速度大大快于 Node.js。

## npm 工具

- [pnpm](https://www.pnpm.cn/)
- [semver](https://www.npmjs.com/package/semver) npm 语义版本。用于检查 npm 版本
- [npm-run-all](https://www.npmjs.com/package/npm-run-all) 用于并行或顺序运行多个 npm 脚本的 CLI 工具。有 Node Api
- [changesets](https://github.com/changesets/changesets) 用于 Monorepo 项目下版本以及 Changelog 文件管理的工具

## cli 脚手架

- 命令解析
  - ⭐️[commander](https://www.npmjs.com/package/commander) nodejs 命令行。创建命令执行 命令解析。
  - [minimist](https://www.npmjs.com/package/minimist) 命令行参数解析
- 交互提示
  - [prompts](https://www.npmjs.com/package/prompts) 187kb 7.4k star
  - [Inquirer](https://www.npmjs.com/package/inquirer) 88kb 16.7k star
  - [Enquirer](https://www.npmjs.com/package/enquirer) 197kb 6.7k star type 比 prompts 多 页面更时尚
    - 自动补全，表单输入，打分器，Scale 级别说明。
- 文字颜色
  - [kolorist](https://www.npmjs.com/package/kolorist)
  - [kleur](https://www.npmjs.com/package/kleur) 支持链式，嵌套
  - ⭐️[chalk](https://www.npmjs.com/package/chalk) 41.3kb 19k star 支持链式，嵌套
  - ⭐️[gradient-string](https://www.npmjs.com/package/gradient-string) 渐变色 11.5 kB 779 star

## 构建工具

- [unplugin-vue-components](https://www.npmjs.com/package/unplugin-vue-components) Vue 的按需组件自动导入。支持 vite&webpack
- [unplugin-auto-import](https://www.npmjs.com/package/unplugin-auto-import) Vite, Webpack, Rollup and esbuil 的自动导入插件
- [webpack](https://webpack.docschina.org/)
  - terser-webpack-plugin 体积优化 - 处理 js 的压缩和混淆，移除不需要的函数
  - compression-webpack-plugin 体积优化 - gzip 压缩
  - optimize-css-assets-webpack-plugin 体积优化 - 重复的 css 可以快速去重
  - hard-source-webpack-plugin 模块缓存 - 为模块提供中间缓存 （webpack5 内置[模块缓存](https://webpack.js.org/configuration/cache/#root)了）
  - duplicate-package-checker-webpack-plugin 检测是否引入了一个包多个版本
  - progress-bar-webpack-plugin 进度条
  - webpack-bundle-analyzer 构建体积分析 - 检测打包出来的体积
  - speed-measure-webpack-plugin 构建速度分析 - 分析总打包时间，各阶段 loader 打包耗时，并输出分析文件
  - case-sensitive-paths-webpack-plugin 路径强制大小写
  - eslint-webpack-plugin
  - html-webpack-plugin HTML 打包 引入资源
  - copy-webpack-plugin 静态资源复制
  - vue-loader/dist/index 定义过的其它规则复制并应用到 .vue 文件里相应语言
  - DefinePlugin 编译时配置全局变量 webpack5 内置
- vite
  - [vite-plugin-vue-layouts](https://www.npmjs.com/package/vite-plugin-vue-layouts) vue3 路由布局
  - [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock) `vite2` 用于本地及开发环境数据 mock
- [father](https://github.com/umijs/father) 配置简单，适合打包小工具

## 构建相关

- [dotenv](https://www.npmjs.com/package/dotenv) 将环境变量从.env 文件加载到 process.env
  - [dotenv-defaults](https://www.npmjs.com/package/dotenv-defaults)

## node 开发相关

- [nodemon](https://nodemon.io/) 监视源代码中的任何更改并自动重新启动服务器。
- [Fastify](https://www.fastify.io/) 基于 Node.js 的快速且低开销的 Web 框架
- [Sharp](https://sharp.pixelplumbing.com/) 高性能图像处理
- [Playwright](https://playwright.dev/docs/intro) node.js 跨浏览器的 web 测试和自动化框架
- [node-cron](https://www.npmjs.com/package/node-cron) 微型任务调度程序。定时任务
- [chokidar](https://www.npmjs.com/package/chokidar) 文件监控
- [sequelize](https://github.com/sequelize/sequelize) ORM 工具。（DB）
- [ts-node](https://www.npmjs.com/package/ts-node) 用于 node.js 的 TypeScript 执行和 REPL

## 测试工具

- [mockjs](https://www.npmjs.com/package/mockjs) 模拟数据生成器
- [Jest](https://github.com/facebook/jest) [中文](https://www.jestjs.cn/)
- Mocha [中文](https://mochajs.cn/) 运行在 nodejs 的
- [debug](https://www.npmjs.com/package/debug) 一个模仿 Node.js 核心调试技术的小型 JavaScript 调试实用程序。适用于 Node.js 和 Web 浏览器。
- [memlab](https://facebookincubator.github.io/memlab/) 内存泄露检测。browser&node

## 服务器

- [budo](https://www.npmjs.com/package/budo) 基于 browserify 的开发服务器。专注于增量重新加载、LiveReload 集成
- [anywhere](https://www.npmjs.com/package/anywhere) 随启随用的静态文件服务器。将当前目录变成一个静态文件服务器的根目录。
- [http-server](https://www.npmjs.com/package/http-server) 一个简单的静态 HTTP 服务器。用于测试、本地开发和学习。

## 其他

- [browserify](https://browserify.org/) 在浏览器中 require( 'modules' )。
- [winston](https://www.npmjs.com/package/winston) 日志库
- [lru-cache](https://www.npmjs.com/package/lru-cache) 页面缓存？
- [ejs](https://ejs.bootcss.com/) 模板引擎
