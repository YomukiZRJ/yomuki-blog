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
