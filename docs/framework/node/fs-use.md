<!--
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-29 15:09:35
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-29 15:58:12
-->

# fs 应用

## 删除某个文件夹的所有内容

### rmSync node >= 14.14.0

```js
fs.rmSync(resolve(cwd(), "del"), {
  recursive: true,
});
```

### 递归删除文件夹 node <14.14.0

```js
function deleteFolderRecursive(path) {
  // 目录是否存在
  if (fs.existsSync(path)) {
    // 读取目录下的内容，循环目录中的文件名
    fs.readdirSync(path).forEach(file => {
      // 拼接文件路径
      const current = `${path}/${file}`;
      // 当前文件是否为目录
      if (fs.statSync(current).isDirectory()) {
        // 递归
        deleteFolderRecursive(current);
      } else {
        // 不为目录直接删除文件
        fs.unlinkSync(current);
      }
    });
    // 删除一个目录 目录为空
    fs.rmdirSync(path);
  }
}
```

## 验证目录是否为空或不存在

```js
function canSkipEmptying(dir: string) {
  // 目录不存在 > true
  if (!fs.existsSync(dir)) {
    return true;
  }
  // 目录存在 但其下文件长度为0(即不存在文件在目录中) > true
  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    return true;
  }
  // 目录存在 但其只有一个文件，且是git > true
  if (files.length === 1 && files[0] === ".git") {
    return true;
  }
  // 目录中有东西 > false
  return false;
}
```
