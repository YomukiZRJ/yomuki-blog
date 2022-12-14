# vue3 自定义指令 js 版

## 自定义指令说明

### 钩子

- created：在绑定元素的 attribute 或事件监听器被应用之前调用。在指令需要附加在普通的 v-on 事件监听器调用前的事件监听器中时，这很有用。
- beforeMount：当指令第一次绑定到元素并且在挂载父组件之前调用。
- mounted：在绑定元素的父组件被挂载后调用。
- beforeUpdate：在更新包含组件的 VNode 之前调用。

- updated：在包含组件的 VNode **及其子组件的 VNode** 更新后调用。
- beforeUnmount：在卸载绑定元素的父组件之前调用
- unmounted：当指令与元素解除绑定且父组件已卸载时，只调用一次。

### 安装

```js
const xxPlugin = {
  install(app, options) {
    app.directive("xx", {});
  },
};

export default xxPlugin;
```

```js
import { createApp } from "vue";
import App from "./App.vue";
import xxPlugin from "";

createApp(App).use(xxPlugin, {
  // 添加一些配置参数
});
```

# 复制 v-copy

v-copy="?text:String"

```js
const copy = {
  mounted(el, { value }) {
    el.$value = value;
    el.handler = () => {
      if (!el.$value) {
        // 没有值的时候
        console.log("无复制内容");
        return;
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement("textarea");
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = "readonly";
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value;
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea);
      // 选中值并复制
      textarea.select();
      const result = document.execCommand("Copy");
      if (result) {
        console.log("复制成功");
      }
      document.body.removeChild(textarea);
    };
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener("click", el.handler);
  },
  // 当传进来的值更新的时候触发
  updated(el, { value }) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unmounted(el) {
    el.removeEventListener("click", el.handler);
  },
};
```

## 防抖 v-debounce[fn]="?ms:Number"

同理可用 lodash 改写节流和防抖

```js
const debounce = {
  created(el, { arg, value }) {
    let timer;
    el.handler = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        arg();
      }, value || 1000);
    };
    el.addEventListener("click", el.handler);
  },
  unmounted(el) {
    el.removeEventListener("click", el.handler);
  },
};
```

```js
<button v-debounce:[hello]="1000">test</button>
<button v-debounce:[hello]>test2</button>
```

## 过滤表情符号 v-emoji

```js
function findEle(parent, type) {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type);
}

function trigger(el, type) {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

const emoji = {
  mounted(el) {
    // 正则规则可根据需求自定义
    const regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g,
      $inp = findEle(el, "input");
    el.$inp = $inp;
    $inp.handle = function () {
      let val = $inp.value;
      $inp.value = val.replace(regRule, "");
      trigger($inp, "input");
    };
    $inp.addEventListener("keyup", $inp.handle);
  },
  unmounted(el) {
    el.$inp.removeEventListener("keyup", el.$inp.handle);
  },
};
```

## 图片懒加载 v-lazy

..下次补上
