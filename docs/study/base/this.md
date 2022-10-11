# this

- [一篇文章带你搞懂 this 的四个绑定规则](https://juejin.cn/post/7132032582832635934)

## this 绑定

### 默认绑定

独立函数调用，指向全局

- 在浏览器环境且没有启用严格模式
- 如启用严格模式或在 node 中就会 undefined

```js
function foo() {
  return this.a;
}
var a = "a";

console.log("🚀 foo();", foo());

function bar() {
  var a = "a in bar";
  return foo();
}
console.log("🚀 bar();", bar());

function tony(fn) {
  var a = "a in tony";
  return fn();
}
console.log("🚀 tony();", tony(foo));
// 🚀 foo(); a
// 🚀 bar(); a
// 🚀 tony(); a
```

### 隐式绑定

- 对象调用

```js
function foo() {
  return this.a;
}
const a = "a";
const obj = {
  a: "a in obj",
  foo,
  inside: function () {
    return this.a;
  },
};
console.log("🚀对象调用 obj.foo：", obj.foo());

const sub = {
  a: "a in sub",
  obj,
};
console.log("🚀对象引用链 sub.obj.foo：", sub.obj.foo());

const bar = obj.foo;
console.log("🚀隐式丢失 bar：", bar());

const baz = obj.inside;
console.log("🚀隐式丢失 baz：", baz());
// 🚀对象调用 obj.foo： a in obj
// 🚀对象引用链 sub.obj.foo： a in obj
// 🚀隐式丢失 bar： a
// 🚀隐式丢失 baz： a
```

### 显式绑定

- call / apply

> 从 this 绑定的角度来说，call(..) 和 apply(..) 是一样的，它们的区别体现在参数上：第一个参数是相同的，后面的参数，call 为参数列表，apply 为数组

```js
function foo() {
  return this.a;
}
var a = "a";
var obj = {
  a: "a in obj",
};
console.log("foo.call(obj)：", foo.call(obj));
```

- Function.prototype.bind

调用 bind 返回新函数
