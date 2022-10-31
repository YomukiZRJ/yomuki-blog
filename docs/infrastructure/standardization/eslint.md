# eslint

- [冲突解决](https://juejin.cn/post/7012160233061482532)
- extends 后面的覆盖前面的
-

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

## [eslint-rules](http://eslint.cn/docs/rules/)

记录下对启用有争议的规则

- eslint:recommended : ✅
- 会被 fix 自动修复的 : 🛠

## rules：js 语法逻辑相关

| rules                                                                                  | 规则说明                                                     | 说明                                                                              |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| ✅[no-empty](http://eslint.cn/docs/rules/no-empty)                                     | 禁止空块语句                                                 |                                                                                   |
| [no-await-in-loop](http://eslint.cn/docs/rules/no-await-in-loop)                       | 禁止在循环中出现 await                                       |                                                                                   |
| ✅[no-prototype-builtins](http://eslint.cn/docs/rules/no-prototype-builtins)           | 禁止直接使用 Object.prototypes 的内置属性                    | 📢 这个开启的话，会使很多对象方法调用变得复杂。如果在旧项目上使用，影响范围会很大 |
| ✅[no-sparse-arrays](http://eslint.cn/docs/rules/no-sparse-arrays)                     | 禁止使用稀疏数组                                             | var colors = [ "red",, "blue" ];                                                  |
| [no-template-curly-in-string](http://eslint.cn/docs/rules/no-template-curly-in-string) | 禁止在常规字符串中出现模板字面量占位符语法                   | "Hello ${name}!"                                                                  |
| ✅[no-unreachable](http://eslint.cn/docs/rules/no-unreachable)                         | 禁止在 return、throw、continue 和 break 语句后出现不可达代码 |                                                                                   |

## rules：代码格式
