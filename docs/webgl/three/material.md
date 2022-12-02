# three 基础：材质

[Material](https://threejs.org/docs/index.html#api/zh/materials/Material)是材质的抽象基类。

- 构造属性
  - 定义材质是否透明 `transparent`:false ，开启后 opacity 有效
  - 材质透明度 `opacity`
  - `vertexColors` 是否使用定点着色，默认 false。开启的时候记得把 color 属性给嘎了
  - `visible` 材质是否可见，默认 false

## 网格材质 Mesh

- 基础网格材质 [MeshBasicMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial)

  - 不受光照影响。

- Lambert 网格材质 [MeshLambertMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshLambertMaterial)

  - 与光照有反应，漫反射，**非光泽表面** 的材质，没有镜面高光。
  - 该材质使用基于非物理的 Lambertian 模型来计算反射率。很好地模拟一些表面（例如未经处理的木材或石材），但不能模拟具有镜面高光的光泽表面（例如涂漆木材）。
  - 构造属性
    - 是否将几何体渲染为线框 `wireframe`:false

- Phong 网格材质 [MeshPhongMaterial](https://threejs.org/docs/?q=MeshPhongMaterial#api/zh/materials/MeshPhongMaterial)

  - 具有镜面高光的光泽表面的材质

  - 构造属性
    - 高光颜色 `specular`
    - 高亮程度 越高越亮 `shininess`

- 标准网格材质 [MeshStandardMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshStandardMaterial)

  - PBR 物理材质，更好的模拟**金属、玻璃**等效果。拥有更精确和逼真的结果，代价是计算成本更高。

## 点材质

用于渲染点的材质。

- 点材质 [PointsMaterial](https://threejs.org/docs/index.html?q=Point#api/zh/materials/PointsMaterial)
