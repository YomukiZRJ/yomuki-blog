# 性能注意点

- 至少应该把目标定在 60 帧/s 的体验上

## 监视

### 性能监听插件 stats.js

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

### 禁用浏览器 FPS 限制

-[无帧率限制打开 Chrome](https://gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d)

### 监控 Draw-calls

Draw-calls 网格描绘调用是 GPU 绘制三角形的指令。场景中的对象越复杂，Draw-calls 次数也越多。

所以可以对 Draw-calls 进行监控。

- [spectorjs](https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk?hl=zh-CN) 谷歌的插件可以帮助监控 Draw-calls。

### 渲染器信息

可以看到：

- 几何体的数量、纹理的数量
- 画了多少个三角形

```js
console.log(renderer.info);
```

## 一般性原则

### 良好的 js 代码

### 清除不必要的东西

废弃场景中不需要的东西。

- [How-to-dispose-of-objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects)

## 灯光

### 避免使用

尽可能避免使用 Three.js 中的灯光，如果要用，则尽量少用，选用最廉价的灯光环境光和平行光。

### 避免添加和移除灯光

在场景中添加或移除灯光时，必须重新编译所有支持灯光的材质。如果你的场景很复杂，这个行为可以直接让你屏幕卡死。

## 阴影

### 避免使用

可以用烘焙阴影替代。

### 优化阴影贴图

利用`CameraHelper`来控制阴影相机的照射范围，尽可能最小。尽可能的使用低分辨率的贴图。

```js
directionalLight.shadow.mapSize.set(1024, 1024);
```

### 明智使用 castShadow 和 receiveShadow

在尽可能少的对象上激活 castShadow 和 receiveShadow。

### 停用阴影自动更新

现在我们的场景中，阴影贴图在每次渲染之前都会更新。

我们可以将 shadowMap 的`autoUpdate`属性设为 false 以此来停用阴影自动更新。

同时告诉 Three.js 只有必要时候才进行阴影贴图更新。

当`needsUpdate`属性被设为 true, 场景中的阴影贴图会在下次 render 调用时刷新：

```js
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.needsUpdate = true;
```

## 纹理贴图

[Texture](https://threejs.org/docs/index.html?q=Texture#api/zh/textures/Texture)

### 调整尺寸

此处的尺寸不是指贴图文件的大小，而是分辨率。尽可能的降低纹理图片的分辨率。

纹理的每个像素都会被存储在 GPU 上，不能一下子传送过于庞大数量的尺寸过大的纹理给 GPU，需要尽可能的缩小纹理的尺寸。

### 保持分辨率为 2 的幂次方

如果不这样做，渲染时候进行 **mipmap** 时 Three.js 会尝试通过将图像调整到最接近 2 的幂次方的分辨率来修复此问题，但此过程将占用资源，并可能导致质量较差的纹理贴图效果。

### 降低纹理文件大小

虽然文件大小并不会影响 GPU 的内存使用情况，但是可以有效的减少加载时间。

可以使用 TinyPNG 等在线工具来进一步减轻文件大小。

可以尝试特殊的格式 [`.basis`](https://github.com/BinomialLLC/basis_universal) ，它是一种类似.jpg 和.png 的格式，但压缩功能更强，GPU 更容易读取该格式。

### mipmap

当`Texture.minFilter`（缩小滤镜）选择没有使用**mipmap**的滤镜时，可以关闭**mipmap**的生成：

```js
texture.generateMipmaps = false;
```

## 几何体 Geometries

### 不要去更新顶点

更新几何体的顶点会影响性能。创建几何图形时可以执行一次，但避免在动画函数中执行。
如果需要为顶点设置动画，请使用**顶点着色器**。

以下是错误示范：

```js
const animation2 = () => {
  const elapsedTime = clock.getElapsedTime();
  for (let index = 0; index < count; index++) {
    const i3 = index * 3;
    const x = particlesGeometry.attributes.position.array[i3];
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
  }
  particlesGeometry.attributes.position.needsUpdate = true;
};
```

### 几何体同质化

如果多个网格使用了相同的几何体，那么，只需要创建一个就够了。

### 合并几何体

如果几何体不需要进行移动等操作，可以使用[`BufferGeometryUtils`](https://threejs.org/docs/index.html?q=BufferGeometryUtils#examples/zh/utils/BufferGeometryUtils)合并。

```js
const geometries = [];
for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);

  geometry.rotateX((Math.random() - 0.5) * Math.PI * 2);
  geometry.rotateY((Math.random() - 0.5) * Math.PI * 2);

  geometry.translate((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);

  geometries.push(geometry);
}

const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
console.log(mergedGeometry);

const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(mergedGeometry, material);
scene.add(mesh);
```

这样，就只有一次 Draw-call

## 材质 Materials

### 材质同质化

如果有多个网格使用相同的材质，那就只创建一次。

### 使用廉价的材质

## 网格 Mesh

### 实例化网格 InstancedMesh

需要独立控制各个网格而无法合并几何体，但它们却使用相同的几何体和材质，这时候可以使用[`InstancedMesh`](https://threejs.org/docs/index.html?q=InstancedMesh#api/zh/objects/InstancedMesh)。

## 模型 Models

### 低多边形

使用低多边形模型，多边形越少，帧率越好。

可以使用法线贴图添加更多细节。

### 压缩文件

- **Draco 压缩**
  - 如果模型比较复杂，可以使用 Draco 压缩。
  - 优点：大大减少文件体积
  - 缺点：解压几何体时页面可能会卡住，同时需要载入 Draco 库
- **Gzip**
  - 在服务器端进行压缩。

## 相机 Cameras

### 减少渲染对象

- **视野范围**
  - 缩小相机的视野，减少屏幕中渲染的对象。
- **近端面和远端面**
  - 减少相机的`near`近端面属性和`far`远端面属性。
  - 比如有一个非常广阔的世界，有山有水，那我们可能会看不到远在山后的小房子，将`far`值降到合适的值，让这些房子甚至不会被渲染。

## 渲染器 Renderer

- **限制像素比**
  - 在一些高像素比的设备上，渲染的像素会更多，性能消耗也更大。
  - 将像素比限制在 2
  - `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`
- **合理的使用抗齿距**
- **设置功率偏好**

  - 一些设备可能会使用不同的 GPU，可以通过`powerPreference`来提示用户怎样的配置更适用于当前的 WebGL 环境。

  ```js
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: "high-performance",
  });
  ```

  - 如果没有性能问题，则将此属性设置为`default`

## 后期处理 Postprocessing

- **减少通道数量**
  - 每个后期处理过程都将使用与渲染器分辨率（包括像素比率）相同的像素进行渲染。
  - 如果分辨率为 1920x1080，有 4 个通道，像素比为 2，则需要渲染 19202108024=33177600 像素。
  - 可以的话将其整合为一个通道。

## 着色器 Shaders

- **指定精度**
  - `ShaderMaterial.precision`
- **使用纹理贴图代替噪波**
- **使用 defines**
  - 不会变的 uniforms 可以用 defines 带图
  ```c#
  #define uDisplacementStrength 1.5
  ```
  ```js
  const shaderMaterial = new THREE.ShaderMaterial({
      defines:
      {
          uDisplacementStrength: 1.5
      },
  }
  ```
- **在顶点着色器中计算，然后发送到片元着色器**
