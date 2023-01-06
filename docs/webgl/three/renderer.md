# 渲染器

## 生成参数

- `alpha` 控制默认的透明 alpha 值。当设置为 true 时，值为 0。否则为 1。默认值为 false。
  - 当需要透明背景的时候，将它设置为 true
-

## 常用配置

- 设置设备像素比。通常用于避免 HiDPI 设备上绘图模糊
  ```js
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  ```
- 设置画布的背景色、透明度

  ```js
  // 设置背景色以及透明度
  renderer.setClearColor("red", 0);

  // 单独设置背景透明度
  renderer.setClearAlpha(0);
  ```
