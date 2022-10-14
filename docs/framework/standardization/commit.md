# 提交信息验证

`commitlint`：提交信息格式验证

`commitizen`：生成规范的提交信息

## 为什么需要规范 commit message？

- 帮助别人 Review（一看就知道这个提交是干啥的）
- 有效地输出 Changlog
- 提升项目质量

## Angular 提交规范

Angular 团队制定的提交规范是目前市面上公认为最合理、最系统、最流行的提交规范。

[Angular 提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)的格式包括`Header`、`Body`、`Footer`三个内容。`Header`为必填项，`Body`和`Footer`是可省略项。

```
<type>(<scope>): <subject>
# 空一行
<body>
# 空一行
<footer>
```

### Header

该部分仅一行，包括三个字段：`type`、`scope`、`subject`。

- `type` 说明提交类型。必填
- `scope` 说明影响范围。可选
- `subject` 说明细节描述。可选

以下`type`值可满足多数日常开发

| 值       | 功能     | 描述                               |
| -------- | -------- | ---------------------------------- | ------------------------ |
| feat     | 功能     | 新增功能，迭代项目需求             |
| fix      | 修复     | 修复缺陷                           |
| docs     | 文档     | 文档更新                           |
| style    | 代码样式 | 变动代码格式，不影响代码逻辑       |
| refactor | 重构     | 重构代码                           |
| perf     | 性能     | 性能优化                           |
| test     | 测试     | 新增测试用例                       |
| build    | 构建     | 更新构建，改动构建工具或外部依赖   |
| ci       | 脚本     | 更新 CI 或执行脚本配置             |
| chore    | 事务     | 变动事务，改动其他不影响代码的事务 |
| revert   | 回滚     | 撤销某次代码提交                   |
| merge    | 合并     | 合并分支                           | ，合并分支代码到其他分支 |
| sync     | 同步     | 同步分支，同步分支代码到其他分支   |
| impr     | 改进     | 改进功能，升级当前功能模块         |

`scope` 说明本次改动的影响范围。根据功能可划分为**数据层**、**视图层**、**控制层**。根据交互可划分为**组件**、**布局**、**流程**、**视图**、**页面**。

`subject` 细节描述，精炼简洁，一般遵循以下规则：

- 以动词开头
- 使用第一人称现在时
- 首个字母不能大写
- 结尾不能存在句号

好的`Header`示例：

```
feat(View): 新增主题皮肤切换按钮
```

### Body

该部分可多行书写，为`subject`做更详尽的描述，内容应该包括改动动机和改动前后对比。

### Footer

该部分只适用于两种情况：

**不兼容变动**：当前代码与上一版本不兼容，则以`BREAKING CHANGE`开头，关联**变动描述**、**变动理由**和**迁移方法**

**问题关闭**：当前代码已修复某些 Issue，则以`Closes`开头，关联目标**Issue**

## commitlint 验证提交信息

[commitlint](https://commitlint.js.org/#/) 可以校验提交信息是否规范。

```
npm install -D @commitlint/cli @commitlint/config-conventional
```

创建规则配置文件 `commitlint.config.js`

```js
/**
 * @see https://commitlint.js.org/#/
 */
module.exports = {
  /**
   * 忽略的commit信息
   */
  ignores: [commit => commit.includes("init")],
  /**
   * 拓展配置
   */
  extends: ["@commitlint/config-conventional"],
  // parserPreset: "conventional-changelog-conventionalcommits",
  /**
   * 规则
   * @see: https://commitlint.js.org/#/reference-rules
   * 0 禁用规则，1 警告，2 错误
   * always | never
   * value 适用于规则的值
   */
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "subject-case": [0],
    "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert", "md"]],
  },
};
```

## commitzen 生成规范的提交信息

使用`commitizen`的`git cz`命令代替原生的`git commit`命令，帮助开发者生成符合规范的提交说明。

使用[`cz-git`](https://cz-git.qbb.sh/zh/) 替换 `commitizen`命令行工具的交互方式

### 为什么使用 cz-git？

轻量级，高度自定义，与 commitlint 配合，支持在 commit 中添加 emoji
