# 关于如何获取 vue 自定义组件为 HTMLElement

在地图开发时，一些 popup 弹窗想使用 vue 组件，一般 content 支持 String 和 HTMLElement。

## vue2

```js
import Vue from "vue";
/**
 * 将vue组件转为HtmlElement
 * @param {*} component
 * @param {*} props
 * @returns
 */
export function returnVueComponentElement(component, props = {}) {
  const app = createApp({
    render() {
      return h(component, props);
    },
  });
  const mount = app.mount(document.createElement("div"));
  return mount.$el;
}
```

## vue3

```js
/**
 * 将vue组件转为HtmlElement
 * @param {*} component
 * @param {*} props
 * @returns
 */
export function returnVueComponentElement(component, props = {}) {
  const app = new Vue({
    render: h => h(component, { props }),
  });
  const mount = app.$mount(document.createElement("div"));
  return mount.$el;
}
```

## tip

- 将绑定了 popup 的对象传递到组件中，用于监听 popup 的关闭和开启，同时在某些操作中手动关闭。
