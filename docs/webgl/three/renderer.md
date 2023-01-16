# 渲染器

## 生成参数

- `alpha` 控制默认的透明 alpha 值。当设置为 true 时，值为 0。否则为 1。默认值为 false。
  - 当需要透明背景的时候，将它设置为 true
- `antialias`是否执行抗锯齿。 默认 false

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

- 开启物理光照

  ```js
  renderer.physicallyCorrectLights = true;
  ```

- 设置渲染器输出编码，以正确的形式输出纹理 [啥区别](https://www.donmccurdy.com/2020/06/17/color-management-in-threejs/)
  ```js
  /**
   * 设置渲染器输出编码
   * THREE.LinearEncoding 默认的
   * THREE.sRGBEncoding
   * THREE.BasicDepthPacking
   * THREE.RGBADepthPacking
   */
  renderer.outputEncoding = THREE.sRGBEncoding;
  ```
- 设置色调映射。这个属性用于在普通计算机显示器或者移动设备屏幕等低动态范围介质上，模拟、逼近高动态范围（HDR）效果。[eg](https://threejs.org/examples/#webgl_tonemapping)
  ```js
  /**
   * 设置渲染器的色调映射
   * THREE.NoToneMapping default
   * THREE.LinearToneMapping
   * THREE.ReinhardToneMapping
   * THREE.CineonToneMapping
   * THREE.ACESFilmicToneMapping
   */
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  ```
- 设置曝光度
  ```js
  renderer.toneMappingExposure = 3;
  ```
- 开启投影并设置投影映射类型
  ```js
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  ```
