<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-29 14:12:02
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-01 14:43:08
-->
# node 的 fs 模块
- [fs](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html)
## fs.existsSync(path)
- 同步检测路径是否存在
- 返回布尔值
- path : string | url | buffer
## fs.unlinkSync(path)
- 从文件系统中删除一个名字。如果该名称是文件的最后一个链接，并且没有进程打开该文件，则该文件将被删除。
  - 没引用，没打开，就删除
- 如果名称是文件的最后一个链接，但任何进程仍然打开该文件，则该文件将一直存在，直到引用它的最后一个文件描述符关闭。
  - 没引用，但打开了，等用它的关闭
- 如果名称引用了符号链接，则删除该链接。
  - 引用了链接，就删除链接
## fs.rmdirSync(path[, options])
删除一个目录，该目录必须为空。
## fs.rmSync(path[, options]) v14.14.0
同步删除文件和目录
- options   
  - recursive：默认false。是否递归删除
## fs.readdirSync(path[, options])
读取目录的内容
- options
  - encoding 默认值utf8。指定编码的字符串。
  - withFileTypes 默认false。设置为true，结果将包含[fs.Dirent](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#class-fsdirent)对象。
```js
import { readdirSync } from "node:fs";
import { cwd } from "node:process";
const files = readdirSync(cwd());
console.log(files);
// [ 'fs', 'package.json' ]

const files = readdirSync(cwd(), {
  withFileTypes: true,
});
// [
//   Dirent { name: 'fs', [Symbol(type)]: 2 },
//   Dirent { name: 'package.json', [Symbol(type)]: 1 }
// ]
```
## fs.readFileSync(path[, options])
返回path的内容，如果当path为目录时，与fs.readdirSync(path[, options])相同。
- options 
  - encoding 默认值null。
  - [flag](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#file-system-flags) 默认值r。
## fs.writeFileSync(file, data[, options])
同步写入文件。
## fs.writeFile(file, data[, options], callback)
异步写入文件，如果文件已存在则替换文件
```js
fs.writeFile(resolve(cwd(), "re.js"), "const a = 'asd';", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("success");
  }
});
```
## fs.copyFileSync(src, dest[, mode])
同步复制文件。复制src到dest

## fs.mkdirSync(path[, options])
同步创建目录
```js
mkdirSync(resolve(cwd(), "xxxx/aaaa"), { recursive: true });
```
## fs.mkdir(path[, options], callback)
异步创建目录
- options
  - recursive：默认false。为true时创建目录路径
```js
mkdir(resolve(cwd(), "111/ss"), { recursive: true }, (err, pathstr) => {
  console.log(err, pathstr);
});
// null /Users/yomuki/My/Study/js/node/111
```
## fs.statSync(path[, options])
检索路径的[fs.Stats](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#class-fsstats)。
- options
  - bigint：默认false。stats中的数值是否为bigint.
  - throwIfNoEntry：默认true。如果不存在文件系统条目，是否会抛出异常，而不是返回undefined。
## [fs.Stats](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#class-fsstats)
有关于文件信息的对象。
### stats.isDirectory()
是否目录。true/false

## 入参说明
### File system flags
**flag**
- 'a'：打开文件进行追加。如果文件不存在，则创建该文件。
- 'ax'：与'a'相似，如果路径存在则失败。
- 'a+'：打开文件进行读取和追加。如果文件不存在，则创建该文件。
- 'ax+'：与'ax+'相似，但如果路径存在则失败。
- 'as+'：以同步模式打开文件进行读取和追加。如果文件不存在，则创建该文件。
- 'r': 打开文件进行阅读。如果文件不存在，则会发生异常。
- 'r+'：打开文件进行读写。如果文件不存在，则会发生异常。
- 'rs+'：以同步方式打开文件进行读写。指示操作系统绕过本地文件系统缓存。
  - 这主要用于在 NFS 挂载上打开文件，因为它允许跳过可能过时的本地缓存。它对 I/O 性能有非常实际的影响，因此除非需要，否则不建议使用此标志。
  - 这不会变成fs.open()或fsPromises.open()变成同步阻塞调用。如果需要同步操作， fs.openSync()应该使用类似的东西。
- 'w'：打开文件进行写入。该文件被创建（如果它不存在）或被截断（如果它存在）。
- 'wx': 喜欢'w'但如果路径存在则失败。
- 'w+'：打开文件进行读写。该文件被创建（如果它不存在）或被截断（如果它存在）。
- 'wx+': 喜欢'w+'但如果路径存在则失败。