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

## 包相关

### 验证包名是否符合规范

```js
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}
```

### 验证包名是否符合规范

```js
function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-");
}
```

### package.json

读取

```js
const newPackage = JSON.parse(fs.readFileSync(src, "utf8"));
```

写入

```js
fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + "\n");
```

依赖排序

```js
function sortDependencies(packageJson) {
  const sorted = {};

  const depTypes = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {};

      Object.keys(packageJson[depType])
        .sort()
        .forEach(name => {
          sorted[depType][name] = packageJson[depType][name];
        });
    }
  }

  return {
    ...packageJson,
    ...sorted,
  };
}
```
