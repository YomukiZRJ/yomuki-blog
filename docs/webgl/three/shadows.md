# 阴影

threejs 中有一个内置的阴影解决方案，它很方便，但并非完美。

## three 中的内置阴影是如何工作的？

当第一次渲染时，ThreeJS 会首先为每个应该投射阴影的光进行渲染。这些渲染图将模拟光线看到的东西，就好像它是一个照相机。在这些灯光渲染过程中，`MeshDepthMaterial `将替换所有的网格材质。

这个结果将被存储为纹理(`textures`)和命名阴影贴图(`shadow maps`)

它将会被应用在每一个应该接收阴影的材质上。[eg](https://threejs.org/examples/webgl_shadowmap_viewer.html)

## 阴影渲染

- 将渲染器的阴影渲染打开

  ```js
  renderer.shadowMap.enabled = true;
  ```

- 允许物体投射阴影

  ```js
  sphere.castShadow = true;
  ```

- 允许物体接收阴影

  ```js
  plane.receiveShadow = true;
  ```

- 允许灯光投射阴影
  ```js
  Light.castShadow = true;
  ```

## 阴影效果优化

- 控制阴影贴图大小来提高阴影质量
  - 默认值为 512
  - 值必须为 2 的幂次方（和纹理一样，因为是阴影纹理贴图）
    ```js
    directionalLight.shadow.mapSize.width = 512 * 4;
    directionalLight.shadow.mapSize.height = 512 * 4;
    ```

## 阴影性能优化

- 通过设置阴影相机的参数来控制相机照射范围，因此来进行性能优化
  - 相机为正交相机时，设置远、近、上、下、左、右距离
    ```js
    directionalLight.shadow.camera.near = 0.3;
    directionalLight.shadow.camera.far = 5;
    directionalLight.shadow.camera.top = 2;
    directionalLight.shadow.camera.right = 2;
    directionalLight.shadow.camera.bottom = -2;
    directionalLight.shadow.camera.left = -2;
    ```
  - 相机为透视相机时，设置 fov、near、far
    ```js
    spotLight.shadow.camera.fov = 20;
    spotLight.shadow.camera.near = 2;
    spotLight.shadow.camera.far = 6;
    ```
- 将阴影加在纹理贴图中，不用 three 生成
  - 一种是静态阴影
  - 还有一种是动态阴影，跟着物体一起动

## 阴影贴图计算类型

- BasicShadowMap 高性能，低品质
- PCFShadowMap 默认值。低性能，品质还行
- PCFSoftShadowMap 低性能，柔软的部位表现更好
- VSMShadowMap 低性能，更受约束。会有意向不到的结果

`PCFShadowMap`是最常用的。
