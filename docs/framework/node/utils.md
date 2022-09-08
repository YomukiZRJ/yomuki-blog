# utils

## 获取 package.json

ESM

```js
const pakDir = path.resolve(fileURLToPath(import.meta.url), "../", "package.json");
const pkg = JSON.parse(readFileSync(pakDir, "utf-8"));
```

commonJs

```js
const pkg = require("../package.json");
```

## 检查 node 版本是否符合库需求

使用插件[semver](https://www.npmjs.com/package/semver)进行版本语义化检查

```js
// 读取package
const pakDir = path.resolve(fileURLToPath(import.meta.url), "../", "package.json");
const pkg = JSON.parse(readFileSync(pakDir, "utf-8"));
// 检查node版本 函数抄自vue-cli
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    console.log(
      "You are using Node " + process.version + ", but this version of " + id + " requires Node " + wanted + ".\nPlease upgrade your Node version."
    );
    process.exit(1);
  }
}
checkNodeVersion(pkg.engines.node);
```
