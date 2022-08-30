<!--
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-30 14:17:16
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-30 16:00:18
-->

# eslint

## eslint cli option

- --ext [String] 指定 JavaScript 文件扩展名-默认值：.js

### 修复

- --fix 自动修复问题
- --fix-dry-run 自动修复，但是不保存更改
- --fix-type Array
## 依赖
- [eslint](http://eslint.cn) [规则](http://eslint.cn/docs/rules)
- eslint-config-prettier 关掉所有和 Prettier 冲突的 ESLint 的配置
- eslint-plugin-prettier 将 Prettier 的 rules 以插件的形式加入到 ESLint 里面
- eslint-plugin-vue 为 Vue 使用 ESlint 的插件 [规则](https://eslint.vuejs.org/rules)
- @typescript-eslint/eslint-plugin ESLint 插件，包含了各类定义好的检测 TypeScript 代码的规范 [规则](https://typescript-eslint.io/rules)
- @typescript-eslint/parser ESLint 的解析器，用于解析 TypeScript，从而检查和规范 TypeScript 代码
```text
pnpm i eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```
