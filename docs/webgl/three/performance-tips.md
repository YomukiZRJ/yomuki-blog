# 性能注意点

- 至少应该把目标定在 60 帧/s 的体验上

## 性能监听插件 stats.js

[stats.js](https://github.com/mrdoob/stats.js/)

```js
import Stats from "stats.js";
export default () => {
  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  function animate() {
    stats.begin();

    // monitored code goes here

    stats.end();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
};
```
