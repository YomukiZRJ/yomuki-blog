<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-23 11:47:56
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-29 13:10:34
-->
# node记录
## [fs](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html)
### fs.existsSync(path)
- 同步检测路径是否存在
- 返回布尔值
- path : string | url | buffer

## [path](https://nodejs.org/dist/latest-v18.x/docs/api/path.html) 

## [process](https://nodejs.org/dist/latest-v18.x/docs/api/process.html)
### process.cwd()
返回当前运行目录
```js
const cwdPath = process.cwd();
```
### process.argv
返回node启动的命令行参数
- 第一个值为node路径
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
