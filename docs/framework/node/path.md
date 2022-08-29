<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-29 13:33:39
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-29 13:45:15
-->
# node 的 path 模块
- [path](https://nodejs.org/dist/latest-v18.x/docs/api/path.html) 
- ESM 
```js
import path from "node:path";
```
## path.resolve([...paths])
将一系列路径或路径段解析为绝对路径。路径序列从右往左处理，每个后续path路径都在前面，直到构造出绝对路径。
- 如果没有path传递段，path.resolve()将返回当前工作目录的绝对路径。
```js
const indexPath = path.resolve(path.resolve(), "init/index.js");
// /Users/yomuki/My/Study/SourceCode/tdesign-vue/my-init/init/index.js
```
```js
const indexPath = path.resolve(cwd(), "init/index.js");
const indexPath2 = path.resolve(path.resolve(), "init/index.js");
console.log(indexPath === indexPath2);
// true
```

