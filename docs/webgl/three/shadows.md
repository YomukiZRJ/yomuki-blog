# 阴影

threejs 中有一个内置的阴影解决方案，它很方便，但并非完美。

## three 中的内置阴影是如何工作的？

当第一次渲染时，ThreeJS 会首先为每个应该投射阴影的光进行渲染。这些渲染图将模拟光线看到的东西，就好像它是一个照相机。在这些灯光渲染过程中，`MeshDepthMaterial `将替换所有的网格材质。

这个结果将被存储为纹理(`textures`)和命名阴影贴图(`shadow maps`)

它将会被应用在每一个应该接收阴影的材质上。[eg](https://threejs.org/examples/webgl_shadowmap_viewer.html)

## 阴影渲染

- 将渲染器的阴影渲染打开

  ```js
  renderer.shadowMap.enabled = true
  ```

- 允许物体投射阴影

  ```js
  sphere.castShadow = true
  ```

- 允许物体接收阴影

  ```js
  plane.receiveShadow = true
  ```

- 允许灯光投射阴影
  ```js
  Light.castShadow = true
  ```

## 效果优化

#### 控制阴影贴图大小来提高阴影质量 💡

- 默认值为 512
- 值必须为 2 的幂次方（和纹理一样，因为是阴影纹理贴图）

```js
directionalLight.shadow.mapSize.width = 512 * 4
directionalLight.shadow.mapSize.height = 512 * 4
```

#### 修改阴影贴图计算类型 💡

| value                     | 性能消耗 | 速度 | 效果 | 备注                                                                                               |
| ------------------------- | -------- | ---- | ---- | -------------------------------------------------------------------------------------------------- |
| `BasicShadowMap`          | 低       | 快   | 差   | -                                                                                                  |
| `PCFShadowMap`**default** | 高       | -    | 一般 | 使用`PCF`（Percentage-Closer Filtering）算法                                                       |
| `PCFSoftShadowMap`        | 高       | -    | 一般 | 在使用低分辨率阴影图时具有更好的软阴影                                                             |
| `VSMShadowMap`            | 低       | -    | 一般 | 使用`VSM`（Variance Shadow Map）算法。更受约束，会有意向不到的结果。所有阴影接收者也将会投射阴影。 |

```js
renderer.shadowMap.type = THREE.PCFShadowMap
```

## 性能优化

#### 控制相机照射范围 💡

通过设置阴影相机的参数来控制相机照射范围，因此来进行性能优化。

添加`CameraHelper`（相机辅助）来控制阴影相机的照射范围

```js
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(cameraHelper)
```

相机为 **正交相机** 时，设置远、近、上、下、左、右距离

```js
directionalLight.shadow.camera.near = 0.3
directionalLight.shadow.camera.far = 5
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
```

相机为 **透视相机** 时，设置 fov、near、far

```js
spotLight.shadow.camera.fov = 20
spotLight.shadow.camera.near = 2
spotLight.shadow.camera.far = 6
```

#### 使用纹理贴图代替阴影 💡

将阴影加在纹理贴图中，不用 three 生成。

一种是**静态阴影**。这种阴影是固定的，所以直接将阴影 P 在接收方的纹理中。

还有一种是**动态阴影**。这种阴影需要跟着物体一起动，创建一个`Mesh`来当阴影，根据物体的运动来更新这个`Mesh`的 position,scale,rotation。

```js
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    alphaMap: shadowTexture,
    transparent: true,
    color: 0x000000
  })
)
sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // update object
  sphere.position.x = Math.cos(elapsedTime) * 1.5
  sphere.position.z = Math.sin(elapsedTime) * 1.5
  sphere.position.y = Math.abs(Math.sin(elapsedTime) * 3)

  // 更新阴影
  sphereShadow.position.x = sphere.position.x
  sphereShadow.position.z = sphere.position.z
  sphereShadow.material.opacity = (1 - Math.abs(sphere.position.y)) * 0.5

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
```

## 阴影痤疮问题

#### 什么是阴影痤疮 ❓

渲染圆润平滑的边缘时，颜色不满一个像素位时，那个像素点会产生阴影，投射到自身上。
<image-box src="webgl/Xnip2023-01-17_10-30-44.jpg" />
<image-box src="webgl/Xnip2023-01-17_10-32-23.jpg" />

#### 使用`normalBias`来解决 💡

定义用于查询阴影映射的位置沿对象法线偏移多少。

增加这个值可以用来减少阴影痤疮，特别是在大型场景中，光照射到几何在一个浅的角度。代价是阴影可能会显得扭曲。

```js
directionLight.shadow.normalBias = 0.05
```
