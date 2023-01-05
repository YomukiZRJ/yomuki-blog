# three 基础：BufferGeometry 及其子类

[BufferGeometry](https://threejs.org/docs/index.html#api/zh/core/BufferGeometry) 是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。

- 通过 `BufferGeometry` 和 `BufferAttribute` 创建自定义几何体
  ```js
  const geometry = new THREE.BufferGeometry(); // 创建一个缓冲几何体
  // 6个顶点坐标
  const vertices = new Float32Array([0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10]);
  // 创建属性缓冲区对象，3个为一组（3个表示一个顶点坐标）
  const attribue = new THREE.BufferAttribute(vertices, 3);
  // 设置几何体attributes属性的位置属性
  geometry.setAttribute("position", attribue);
  ```
  - 添加自定义几何体的网格
    ```js
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide, // 两面可见
      })
    );
    scene.add(mesh);
    ```
  - 添加自定义几何体的点模型
    ```js
    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: 0x0000ff,
        size: 10.0,
      })
    );
    scene.add(points);
    ```
  - 添加自定义几何体的线模型
    ```js
    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: 0xff0000,
      })
    );
    scene.add(line);
    ```
- `.center()` 移动几何体的中心（可以使几何体居中）

## three 中的几何体

- [BoxGeometry](https://threejs.org/docs/index.html#api/zh/geometries/BoxGeometry) 立方体
- [SphereGeometry](https://threejs.org/docs/index.html#api/zh/geometries/SphereGeometry) 球体

  - `widthSegments`,`heightSegments` 分段数会影响球体的平滑程度，可以用这两个参数来创建不同平整度的“球体”。
    <image-box src="http://assets.yomuki.com/md/webgl/Xnip2022-11-29_13-47-35.jpg" />
  - 可以用`phiStart`,`phiLength`,`thetaStart`,`thetaLength`来创建不完整的球体

- [CylinderGeometry](https://threejs.org/docs/index.html?q=CylinderGeometry#api/zh/geometries/CylinderGeometry) 圆柱体
- [PolyhedronGeometry](https://threejs.org/docs/index.html?q=IcosahedronGeometry#api/zh/geometries/PolyhedronGeometry) 多面几何体

  - 四面缓冲几何体 [TetrahedronGeometry](https://threejs.org/docs/index.html?q=IcosahedronGeometry#api/zh/geometries/TetrahedronGeometry)
  - 八面缓冲几何体 [OctahedronGeometry](https://threejs.org/docs/index.html?q=OctahedronGeometry#api/zh/geometries/OctahedronGeometry)
  - 十二面缓冲几何体 [DodecahedronGeometry](https://threejs.org/docs/index.html?q=DodecahedronGeometry#api/zh/geometries/DodecahedronGeometry)
  - 二十面缓冲几何体 [IcosahedronGeometry](https://threejs.org/docs/index.html?q=IcosahedronGeometry#api/zh/geometries/IcosahedronGeometry)

- [PlaneGeometry](https://threejs.org/docs/index.html#api/zh/geometries/PlaneGeometry) 平板
- ExtrudeGeometry 挤压几何体
  - TextGeometry 文字几何体
    - 使用 typeface
    - 如何获取 typeface?
      - 使用[转换工具](http://gero3.github.io/facetype.js/)
      - 使用 three.js 中内置的`node_modules/three/examples/fonts`
      - 更改`curveSegments`和`bevelSegments`来优化性能

## setAttribute 能 set 哪些

- `uv2`
  - 复制 uv 坐标，用于 aomap
    ```js
    floor.geometry.setAttribute("uv2", new THREE.BufferAttribute(floor.geometry.attributes.uv.array, 2));
    ```
