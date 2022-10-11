# prettier

## 配置

```js
/**
 * @see https://prettier.io/docs/en/options.html
 */
module.exports = {
  /**
   * 每行多少单词换行
   */
  printWidth: 80,
  /**
   * 使用tab缩进
   */
  useTabs: true,
  /**
   * 缩放级别空格数
   * useTabs:false 时有效
   */
  tabWidth: 2,
  /**
   * 使用单引号
   */
  singleQuote: false,
  /**
   * 句末使用分号
   */
  semi: true,
  /**
   * 尾随逗号
   * "es5"- 在 ES5 中有效的尾随逗号（对象、数组等）。TypeScript 中的类型参数中没有尾随逗号。
   * "none"- 没有尾随逗号。
   * "all"- 尽可能使用尾随逗号（包括函数参数和调用）
   * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Trailing_commas
   */
  trailingComma: "es5",
  /**
   * 在对象的括号中打印空格 -> { foo: bar }
   */
  bracketSpacing: true,
  /**
   * 将多行 HTML（HTML、JSX、Vue、Angular）元素的">"放在最后一行的末尾，而不是单独放在下一行
   */
  bracketSameLine: false,
  /**
   * 箭头函数括号
   * "always"- 始终包括括号。例子：(x) => x
   * "avoid"- 尽可能省略括号。例子：x => x
   */
  arrowParens: "avoid",
  /**
   * 在 HTML、Vue 和 JSX 中每行强制执行单个属性。
   * v2.6.0
   */
  singleAttributePerLine: false,
};
```
