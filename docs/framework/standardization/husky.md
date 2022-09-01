<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-30 16:26:44
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-01 14:34:46
-->
# husky
git hooks
- [husky](https://www.npmjs.com/package/husky)
- [文档](https://typicode.github.io/husky/#/)
## install
```
npm install husky --save-dev
```
## 安装
安装这个之前需关联git仓库
### 手动安装
在package中添加script，然后运行一次
```
npm set-script prepare "husky install"
npm run prepare
```
### 官网推荐安装
```
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
pnpm dlx husky-init && pnpm install # pnpm
```
## 钩子 - pre-commit
当使用git commit的时候 npm test 会被运行
```
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```
那么我想绕过这个验证怎么办？使用 Git的 **--no-verify** 配置
```
git commit -m "yolo!" --no-verify
```
### 搭配 [lint-staged](https://www.npmjs.com/package/lint-staged) 使用
在commit前lint所有的代码有点浪费时间，此插件可针对**仅在暂存区**的代码进行lint。
```
pnpm install lint-staged --D
npx husky set .husky/pre-commit "npm run lint:lint-staged"
```
## 钩子 - commit-msg
校验 **git commit** 信息是否符合规范，保证团队的一致性
### 搭配 [commitlint](https://commitlint.js.org/#/) 插件
- @commitlint/cli 校验 **git commit** 信息是否符合规范，保证团队的一致性
- @commitlint/config-conventional **Anglar** 的提交规范
```
npm i -D @commitlint/cli @commitlint/config-conventional @commitlint/cz-commitlint commitizen
```
添加钩子
```
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```
commitlint.config.js 配置文件
```js
```
## [在CI/Docker/Prod中禁用钩子](https://typicode.github.io/husky/#/?id=disable-husky-in-cidockerprod)
禁用 prepare 脚本
```
npm set-script prepare ""
npm ci --omit=dev
```


