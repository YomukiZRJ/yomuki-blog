<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-30 16:26:44
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-30 16:32:58
-->
# husky
git hooks
- [husky](https://www.npmjs.com/package/husky)
- [文档](https://typicode.github.io/husky/#/)
## install
```
npm install husky --save-dev
```
## 首先初始化下
在package中添加script，然后运行一次
```
npm set-script prepare "husky install"
npm run prepare
```
## 添加钩子
当使用git commit的时候 npm test 会被运行
```
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```
