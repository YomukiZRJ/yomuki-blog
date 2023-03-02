# 真实渲染

有时候，模型导入后的效果会和在 3d 软件中的不同。

## 让渲染更真实

#### 开启物理光照 💡

```js
renderer.physicallyCorrectLights = true
```

没开
<image-box src="webgl/Xnip2023-01-17_16-00-18.jpg" />
开了
<image-box src="webgl/Xnip2023-01-17_15-59-57.jpg" />

#### 设置输出编码 💡

大部分情况下是`THREE.sRGBEncoding`

- 渲染器

```js
renderer.outputEncoding = THREE.sRGBEncoding
```

- 纹理（环境纹理）

```js
envMapTexture.encoding = THREE.sRGBEncoding
```

> 由 gltf 引入的模型，所有的贴图都已经自动设置 `sRGBEncoding `了。

#### 设置色调映射 💡

`toneMapping`这个属性用于在普通计算机显示器或者移动设备屏幕等低动态范围介质上，模拟、逼近高动态范围（HDR）效果。[点击查看不同效果](https://threejs.org/examples/#webgl_tonemapping)

- `THREE.NoToneMapping` default
- `THREE.LinearToneMapping`
- `THREE.ReinhardToneMapping`
- `THREE.CineonToneMapping`
- `THREE.ACESFilmicToneMapping`

```js
renderer.toneMapping = THREE.ACESFilmicToneMapping
// 曝光度
renderer.toneMappingExposure = 3
```

#### 开启抗齿距 💡

```js
const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
  antialias: true
})
```

#### 设置阴影 💡

关于[阴影](/webgl/three/shadows)
