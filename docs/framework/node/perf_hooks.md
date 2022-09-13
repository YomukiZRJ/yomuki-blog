# Node.js 的性能 API

[文档](https://nodejs.org/dist/latest-v18.x/docs/api/perf_hooks.html)

## performance.nodeTiming

提供 Node.js 本身的计事细节

- bootstrapComplete Node.js 进程完成引导的高分辨率毫秒时间戳。如果引导尚未完成，则该属性的值为 -1。
- environment 初始化 node 环境的高分辨率时间戳
- idleTime 事件循环中空闲时间的高分辨率时间戳。时间循环尚未开始则为-1
- loopExit 退出事件循环的高分率时间戳。如果事件循环尚未退出，则该属性的值为 -1。
- loopStart 事件循环开始的高分率时间戳。如果尚未开始则为-1
- nodeStart 初始化 node 进程的高分率时间戳。
- v8Start 初始化 V8 平台的高分率时间戳

```js
console.log(performance.nodeTiming);
setTimeout(() => {
  console.log(performance.nodeTiming);
}, 1000);
console.log(performance.nodeTiming);
```

![img](https://assets.yomuki.com/md/Xnip2022-09-13_10-11-37.jpg)

## performance.now()

返回当前高分辨率毫秒时间戳，其中 0 表示当前 node 进程的开始。

```js
import { performance } from "node:perf_hooks";
const start = performance.now();
console.log(start, performance.now());
// 29.190958000021055 29.196082999929786
```
