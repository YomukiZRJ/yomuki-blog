# scene

场景是用来放置物体、灯光、摄像机的地方。它的父类为 Object3D

```js
const scene = new THREE.Scene();
```

## 常用

- 设置场景背景
  ```js
  /**
   * 环境地图
   */
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const envMapTexture = cubeTextureLoader.setPath("../assets/environmentMaps/0/").load([
    "px.jpg", // 正x
    "nx.jpg", // 负x
    "py.jpg", // 正y
    "ny.jpg", // 负y
    "pz.jpg", // 正z
    "nz.jpg", // 负z
  ]);
  /**
   * 设置场景背景
   */
  scene.background = envMapTexture;
  ```
- 设置场景中所有物理材质的环境贴图
  ```js
  scene.environment = envMapTexture;
  ```
- 循环获取场景中的所有东西。（包括 group 中的嵌套）
  ```js
  scene.traverse(obj => {
    console.log(obj);
  });
  ```
