# 一次规范化配置记录

## 相关依赖

| 依赖                                                                        | 说明                                                                                                  |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| eslint@^8.21.0                                                              | 校验.js .vue                                                                                          |
| [vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser)@^9.1.0 | .vue 文件自定义解析器 **Node.js ^14.17.0, 16.0.0 or later.**                                          |
| [eslint-plugin-vue](https://eslint.vuejs.org/)@^9.5.1                       | vue 相关。这个插件允许我们使用 ESLint 检查.vue 文件的 template 和 script，以及.js 文件中的 vue 代码。 |
| eslint-config-standard@^17.0.0                                              | eslint standard 规范                                                                                  |
| eslint-plugin-import@^2.26.0                                                | eslint-config-standard 必要依赖                                                                       |
| eslint-plugin-n@^15.3.0                                                     | eslint-config-standard 必要依赖                                                                       |
| eslint-plugin-promise@^6.0.1                                                | eslint-config-standard 必要依赖                                                                       |
| eslint-plugin-prettier@^4.2.1                                               | 将 Prettier 的 rules 以插件的形式加入到 ESLint 里面                                                   |
| eslint-config-prettier@^8.5.0                                               | 关掉所有和 Prettier 冲突的 ESLint 的配置                                                              |
| prettier@^8.21.0                                                            | 格式化                                                                                                |
| stylelint@^14.13.0                                                          | 样式 lint                                                                                             |
| stylelint-config-standard @^28.0.0                                          | stylelint 标准规范                                                                                    |
| postcss-html@^1.5.0                                                         | 被捆绑的必须依赖                                                                                      |
| stylelint-config-prettier@^9.0.3                                            | 配置 stylelint 和 prettier 兼容                                                                       |
| stylelint-config-html@^1.1.0                                                | stylelint-config-html/vue vue 中 template 样式格式化                                                  |
| stylelint-scss@^4.3.0                                                       | stylelint 的 scss 插件                                                                                |
| stylelint-config-standard-scss@^5.0.0                                       | stylelint scss 标准规范                                                                               |
| husky@^8.0.0                                                                | git 钩子                                                                                              |
| lint-staged@^13.0.3                                                         | 暂存区 lint                                                                                           |
| [@commitlint/cli](https://commitlint.js.org/#/)@^17.1.2                     | commit 信息验                                                                                         |
| @commitlint/config-conventional@^17.1.0                                     |                                                                                                       |
| commitizen@^4.2.5                                                           | commit 信息提示                                                                                       |
| cz-git@^1.3.11                                                              | commit 信息生成工具                                                                                   |

## 流程

1. 开发时，成员通过编辑器插件获取 lint 提示和自动修复
2. 提交时，会使用 lint-staged 对缓存区代码进行 lint fix。
3. 提交时，会验证 commit 信息（可通过 npm run commit 自动生成 commit 信息）（或注释掉 commit 验证）
   ![img](http://assets.yomuki.com/md/%E6%97%A0%E6%A0%87%E9%A2%98-2022-09-28-0928.png)

## .vscode 配置

extensions.json 所启用插件

```js
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "stylelint.vscode-stylelint"
  ]
}
```

settings.json 各文件格式化默认配置

```js
{
  "[vue]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "[css]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
  "stylelint.validate": ["css", "less", "postcss", "scss", "sass", "vue"],
  "editor.codeActionsOnSave": {
    "source.fixAll": true, // 开启自动修复
    "source.fixAll.stylelint": true // 开启stylelint自动修复
  }
}
```

## prettier 说明

prettier 用于代码格式化，prettier 配置会覆盖 eslint 和 stylelint。配置文件为 **.prettierrc.js**

```js
/**
 * @see https://prettier.io/docs/en/options.html
 */
module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};
```

## eslint 说明

eslint 用于校验 js 代码规范。配置文件为 **.eslintrc.js**。以 standard 为基准，由于仓库代码中有很多文件不符合规范，且无法被 fix，所以在 rules 里将这些不影响程序运行的 rules 设为了 1/0。如果想严格符合规范，可删除 rules 中的这部分，手动修复文件。

> vue-eslint-parser 的运行环境为 Node.js ^14.17.0, 16.0.0 or later

```js
/**
 * @see http://eslint.cn/docs/rules/  eslint
 * @see https://eslint.vuejs.org/ vue
 * @see https://standardjs.com/rules.html standard
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true, //  ES6 全局变量
  },
  parserOptions: {
    ecmaVersion: 9, // 语法
    sourceType: "module",
  },
  /**
   * 全局变量 主要用于防止【禁用未声明的变量 (no-undef)】误判
   * @see https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-globals
   */
  globals: {},
  extends: ["standard", "plugin:vue/recommended", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": 1, // 变量定义了没使用
    eqeqeq: 1, // 使用===，而不是==
    "vue/multi-word-component-names": 0, // vue组件名不能为单个单词。
    camelcase: 1, // 变量命名规范
    "no-multi-str": 0, // 禁止使用多行字符串
    "no-case-declarations": 1, //  不允许在 case 子句中使用词法声明
    "no-prototype-builtins": 0, // 禁止直接调用Object.prototypes 的内置属性
    "no-dupe-keys": 1, // 键名重复
    "no-duplicate-case": 1, // 重复case
    "import/no-duplicates": 1, // 重复引入
    "no-array-constructor": 1, // 禁止使用 Array 构造函数
    "array-callback-return": 1, // 缺少return
    "no-unreachable": 1, // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
    "no-new": 0, // 使用 new 关键字调用构造函数但却不将结果赋值
    "vue/no-unused-components": 1, // 引入组件未使用
    "vue/require-valid-default-prop": 1, // prop的默认值是否符合规范
    "vue/valid-template-root": 1, // 校验template root
    "vue/no-dupe-keys": 1, // 键名重复
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {},
    },
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      rules: {},
    },
  ],
};
```

## stylelint 说明

stylelint 用于校验样式规范，为了统一样式格式化以及提示样式编写的不规范。配置文件为 **.stylelintrc.js**。和 eslint 一样，仓库中不符合规范且无法 fix 的太多了，在 rules 里暂时关闭了这些规则。

```js
/**
 * @see: https://stylelint.io
 */
module.exports = {
  /* 继承某些已有的规则 */
  extends: [
    "stylelint-config-standard", // 配置stylelint拓展插件
    "stylelint-config-standard-scss",
    "stylelint-config-html/vue", // 配置 vue 中 template 样式格式化
    "stylelint-config-prettier", // 配置stylelint和prettier兼容
  ],
  overrides: [
    // 扫描 .vue/html 文件中的<style>标签内的样式
    {
      files: ["**/*.{vue,html}"],
      customSyntax: "postcss-html",
    },
  ],
  /**
   * null  => 关闭该规则
   */
  rules: {
    "color-function-notation": null,
    "no-descending-specificity": null,
    "block-no-empty": null,
    "scss/at-mixin-pattern": null,
    "scss/at-import-partial-extension": null,
    "alpha-value-notation": null,
    "font-family-no-missing-generic-family-keyword": null,
    "selector-class-pattern": null,
    "scss/no-duplicate-mixins": null,
    "scss/double-slash-comment-whitespace-inside": null,
  },
};
```

## husky 说明

git hooks 工具。

- pre-commit 进行 commit 操作时，触发
- commit-msg commit msg 校验 （不需要可注释了）

## lint-staged 说明

lint-staged 用于对暂存区代码进行 lint。配合 husky 可确保 push 到仓库中的代码是符合规范的。配置文件为**lint-staged.config**

```js
module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{scss,less,styl,html}": ["prettier --write", "stylelint --fix"],
  "*.md": ["prettier --write"],
};
```

## commit 说明

用 @commitlint/cli @commitlint/config-conventional 对提交信息进行验证。但是记信息格式规范以及手输信息太麻烦了也容易出错，所以可用 commitizen cz-git 通过 cli 交互生成提交信息。

> 不想验证的话在 husky 的 commit-msg 中注释掉命令。（目前就是注释的）

相关位置文件为**commitlint.config.js**，commit 交互提示也在这配置

- feature : 🚀 新增功能
- fix : 🐛 修复缺陷
- docs : 📚 文档更新
- style : 🎨 代码格式
- refactor : 📦 代码重构
- perf : ⚡️ 性能提升
- test : 🚨 测试相关
- build : 🛠 构建相关
- ci : 🎡 持续集成
- revert : ⏪️ 回退代码
- chore : 🔨 其他修改

## 问题点记录

### Parsing error: Unexpected token xxxx

async 报错。原因为 ecmaVersion 配置错了。
原来配置：

```js
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: 'module',
      },
```

修改为：

```js
      parserOptions: {
        ecmaVersion: 9,
        sourceType: 'module',
      },
```
