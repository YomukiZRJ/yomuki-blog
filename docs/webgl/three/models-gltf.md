# 引入模型

## 3d 图形格式

3d 图形格式[wiki](https://en.wikipedia.org/wiki/List_of_file_formats#3D_graphics)

如果需要精确的数据并且无法找到软件所支持的适当格式，那么要创建自己的数据。

常用的 3d 图形格式：

- OBJ
- FBX
- STL
- PLY
- COLLADA
- 3DS
- GLTF

## GLTF

GLTF 代表 GL 传输格式，它是由 Khronos 集团(OpenGL，WebGL，Vulkan，Collada 背后的家伙和许多成员，如 AMD/ATI，Nvidia，Apple，id Software，Google，Nintendo 等)制作的。

它支持不同的数据集。有像几何图形和材料这样的数据，可以有像相机、灯光、场景图、动画、骨架、变形甚至多个场景这样的数据。

它还支持各种文件格式，比如 json、二进制(binary)、嵌入纹理(textures)。

GLTF 已经成为实时性方面的标准。因为它正在成为一种标准，大多数 3D 软件、游戏引擎和图书馆都支持它。这意味着您可以很容易地在不同的环境中得到相似的结果。

这并不意味着在所有情况下都必须使用 GLTF。如果只是需要一个几何图形，你最好使用其他格式，如 OBJ，FBX，STL，或 PLY。你应该在每个项目上测试不同的格式，看看你是否有所需要的所有数据，如果文件不是太重，如果压缩了，解压缩信息需要多长时间，等等。

### `glTF` 格式

默认格式，它包含很多文件

```
------glTF文件包
|-Duck.gltf
|-Duck0.bin
|-DuckCM.png
```

- `.gltf`文件：是一个 json 格式的文件，包含了相机、灯光、场景、材质、对象转换，但是没有几何结构和纹理
- `.bin`是一个二进制文件，通常包含了数据像几何体（顶点坐标，uv 坐标）
- `.png` 是一个纹理

当引入`Duck.gltf`时，其他会自动被引入。

### `glTF-Binary` 格式

```
------glTF-Binary文件包
|-Duck.glb
```

只有一个二进制文件，包含了所有数据。所示它方便载入比较轻，但是难修改。

### `glTF-Draco` 格式

```
------glTF-Draco文件包
|-0.bin
|-Duck.bin
|-Duck.gltf
|-DuckCM.png
```

和 glTF 差不多，但是缓冲区数据经过 Draco 压缩，所以更轻。

Draco 是谷歌在开源 Apache 许可证下开发该算法，并不是 gltf 独有的。

### `glTF-Embedded` 格式

```
------glTF-Embedded 文件包
|-Duck.gltf
```

只有一个文件，但是很大。

## 使用 GLTFLoader 载入模型

```js
const glTFLoader = new GLTFLoader();
glTFLoader.load(
  "../assets/models/Duck/glTF/Duck.gltf",
  /**
   * 载入完成
   */
  gltf => {
    console.log(gltf);
    scene.add(gltf.scene);
  },
  /**
   * 载入中
   */
  xhr => {
    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
  },
  /**
   * 载入失败
   */
  error => {
    console.error(error);
  }
);
```

如果场景中有不想载入的东西（比如相机）等要怎么办？

- 层层获取到要导入的 mesh，然后导入
- 过滤一下
- 把模型载入到 3d 软件中，编辑下，再导出。

`glTF`, `glTF-Binary`,`glTF-Embedded` 都可以用这种方法载入。如果是`glTF-Draco`,则还需要`DRACOLoader`。

使用`DRACOLoader`的话需要把 draco 算法文件复制下来，放在项目的静态资源中。一般资源在`three/examples/js/libs/`下。

```js
const glTFLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("../draco/"); // 设置draco算法路径
glTFLoader.setDRACOLoader(dracoLoader); // 设置draco解析器
glTFLoader.load("../assets/models/Duck/glTF-Draco/Duck.gltf", gltf => {
  scene.add(gltf.scene);
});
```

> 此时，仍可载入`glTF`, `glTF-Binary`,`glTF-Embedded`，只有在载入`glTF-Draco`的时候会使用`DRACOLoader`。

## 使用动画

```js
/**
 * 动画
 */
mixer = new THREE.AnimationMixer(gltf.scene); // 创建动画剪辑器
surveyAction = mixer.clipAction(gltf.animations[0]);
surveyAction.play();
```

- 在帧动画里更新

```js
const clock = new THREE.Clock();
let oldTime = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldTime;
  oldTime = elapsedTime;

  if (mixer) mixer.update(deltaTime);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
```
