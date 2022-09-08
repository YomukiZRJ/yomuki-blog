<!--
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-29 13:11:11
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-29 13:33:17
-->

# node 的 process 模块

- [process](https://nodejs.org/dist/latest-v18.x/docs/api/process.html)
- 支持 ESM

```js
import { cwd } from "node:process";
```

## process.cwd()

返回当前进程运行目录

```js
const cwdPath = process.cwd();
```

## process.version

返回当前 node 版本

```js
const nodeV = process.version;
```

## process.argv

返回 node 启动的命令行参数

- 第一个值为 node 路径
- 第二个值为启动的文件路径
- 后续的为启动参数

```js
npm run init 123 321

console.log(process.argv);
// [
//   "/Users/yomuki/.nvm/versions/node/v18.5.0/bin/node",
//   "/Users/yomuki/My/Study/SourceCode/tdesign-vue/my-init/init",
//   "123",
//   "321",
// ];
```

## process.exit([code])

终止进程。

- code
  - 0：默认值。以成功状态终止进程
  - 1：以失败状态终止进程

```js
import { exit } from "node:process";
exit();
```
