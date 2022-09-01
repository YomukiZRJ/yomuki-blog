<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-14 09:49:25
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-31 10:07:16
-->
# pnpm记录
[pnpm](https://www.pnpm.cn/)
## 等价命令
- npm install > pnpm install
- npm i pkg > pnpm add pkg
- npm run cmd > pnpm cmd
## 初始化
- pnpm init
## 创建pnpm工作环境文件
- [pnpm-workspace.yaml 配置说明](https://www.pnpm.cn/pnpm-workspace_yaml)
```
touch pnpm-workspace.yaml 
```
```js
packages:
  - "packages/*"
  - "!**/test/**"
```
## 在工作目录下创建项目并初始化项目
```
mkdir packages 
cd packages
mkdir yomuki-A
cd yomuki-A
pnpm init -y
```
## 使用工作目录中的包
```
pnpm add xxx --workspace
```
## scripts配置
yomuki-A/packages
```
"dev": "node index.js"
```
根目录 packages
```
"dev": "pnpm run dev --filter '*'"
"cli:add": "pnpm run add --filter yomuki-template-cli"
<!-- --filter <package_selector> <command> -->
```

## 问题记录
- Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
  - 在packages中配置type  "type": "module"
  - 而且这参数得配在前面，配后头不生效