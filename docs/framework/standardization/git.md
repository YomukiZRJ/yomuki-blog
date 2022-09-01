<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-31 13:44:40
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-31 14:54:26
-->
# git 提交规范
- **Subject** 一句话概述commit主题(必须)
- **<Body>** 详细描述 What 和 Why (可选)
- **<Footer>** 不兼容或关闭 issue 等说明(可选)
## Subject
主题(Subject)是 commit 的简短描述，不超过50个字符。
- 用一句话说明本次所作的提交, 如果一句话说不清楚，那有可能这个提交得拆分成多次
- 主要采用 Verb + Object + Adverb 的形式描述，常见动词及示例如下
  1. feat: 添加代码和逻辑, 如 feat: add xxx field/method/class
  2. fix: 修复bug，如 fix: #123, fix xxx error
  3. docs: 文档更新，如 docs: change documents
  4. style: 样式修改，如 style: add class or change style
  5. refactor: 代码重构, 如refactor: rename, move, extract, inline等
  6. perf: 代码性能优化，perf: improves performance
  7. test: 代码单元测试，test: test menu component
  8. build: 项目构建，build: build project
  9. ci: 修改CI文件 ci: change gitlab-ci.yml
  10. chore: 构建过程或辅助工具的变动 chore: change webpack
## Body
详细描述本次 commit 做了什么、为什么这样做(不是怎么做的)
- 每行不要超过70字符
1. 这个改动解决了什么问题？
2. 这个改动为什么是必要的？
3. 会影响到哪些其他的代码？
    - bug fix - 组件 bug 修复；
    - breaking change - 不兼容的改动；
    - new feature - 新功能
## Footer
用于关闭 Issue 或存在不兼容时添加相关说明等
1. breaking change: 与上一个版本不兼容的相关描述、理由及迁移办法
2. close #issue: 关闭相关问题（附链接）
3. revert: 撤销以前的commit
## 使用 [commitlint](https://commitlint.js.org/#/) 规范提交
- @commitlint/cli 校验 **git commit** 信息是否符合规范，保证团队的一致性
- @commitlint/config-conventional **Anglar** 的提交规范
```
npm install commitizen -g
npm i @commitlint/cli @commitlint/config-conventional -D
npm i -D cz-git
```
commitlint.config.js
```js
module.exports = {
	ignores: [(commit) => commit.includes("init")],
	extends: ["@commitlint/config-conventional"],
	// parserPreset: "conventional-changelog-conventionalcommits",
	rules: {
		// @see: https://commitlint.js.org/#/reference-rules
		"body-leading-blank": [2, "always"],
		"footer-leading-blank": [1, "always"],
		"header-max-length": [2, "always", 108],
		"subject-empty": [2, "never"],
		"type-empty": [2, "never"],
		"subject-case": [0],
		"type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"]],
	},
	prompt: {
		messages: {
			skip: ":skip", // 该字段可以通过回车跳过
			max: "upper %d chars", // 最大字符数
			min: "%d chars at least", // 最少字符数
			emptyWarning: "can not be empty", // 该字段不能为空
			upperLimitWarning: "over limit", // 超出字数限制
			lowerLimitWarning: "below limit", // 字符数小于下限
		},
		questions: {
			type: {
				description: "选择你要提交的类型 :",
				enum: {
					feat: {
						description: "🚀  新增功能",
						title: "Features",
						emoji: "🚀",
					},
					fix: {
						description: "🐛  修复缺陷",
						title: "Bug Fixes",
						emoji: "🐛",
					},
					docs: {
						description: "📚  文档变更",
						title: "Documentation",
						emoji: "📚",
					},
					style: {
						description: "🎨  代码格式（不影响功能，例如空格、分号等格式修正）",
						title: "Styles",
						emoji: "🎨",
					},
					refactor: {
						description: "📦  代码重构（不包括 bug 修复、功能新增）",
						title: "Code Refactoring",
						emoji: "📦",
					},
					perf: {
						description: "⚡️  性能优化",
						title: "Performance Improvements",
						emoji: "⚡️",
					},
					test: {
						description: "🚨  添加疏漏测试或已有测试改动",
						title: "Tests",
						emoji: "🚨",
					},
					build: {
						description: "🛠   构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）",
						title: "Builds",
						emoji: "🛠",
					},
					ci: {
						description: "🎡  修改 CI 配置、脚本",
						title: "Continuous Integrations",
						emoji: "🎡",
					},
					chore: {
						description: "🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）",
						title: "Chores",
						emoji: "🔨",
					},
					revert: {
						description: "⏪️  回滚 commit",
						title: "Reverts",
						emoji: "⏪️",
					},
				},
			},
			scope: {
				description: "选择一个提交范围（可选）(e.g. component or file name):",
			},
			subject: {
				description: "填写简短精炼的变更描述 :\n",
			},
			body: {
				description: "填写更加详细的变更描述（可选）。使用 " | " 换行 :\n",
			},
			isBreaking: {
				description: "有什么非兼容性的变化吗？",
			},
			breakingBody: {
				description: "非兼容性更改提交需要一个主体。请输入提交本身的较长描述",
			},
			breaking: {
				description: "列举非兼容性重大的变更（可选）。使用 " | " 换行 :\n",
			},
			isIssueAffected: {
				description: "此更改是否影响任何open issues?",
			},
			issuesBody: {
				description: "如果issues已解决，则提交需要一个主体。请输入提交本身的较长描述",
			},
			issues: {
				description: 'Add issue references (e.g. "fix #123", "re #123".)',
			},
		},
	},
};

```
package.json配置
```js
{
  "scripts": {
    "commit": "git add . && git-cz"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  }
}
```