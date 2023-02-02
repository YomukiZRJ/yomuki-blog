# three 基础：材质

[Material](https://threejs.org/docs/index.html#api/zh/materials/Material)是材质的抽象基类。

- 构造属性
  - 定义材质是否透明 `transparent`:false ，开启后 opacity 有效
  - 材质透明度 `opacity`
  - `vertexColors` 是否使用定点着色，默认 false。开启的时候记得把 color 属性给嘎了
  - `visible` 材质是否可见，默认 false

## 材质类型

- 网格材质 Mesh
  - [MeshBasicMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial)基础网格材质
    - 光照无效
  - MeshNormalMaterial 法线网格材质
    - 光照无效
    - 什么是法线？物体外侧的向量方向（关乎到关照，反射）
    - 一般用于调试法线
  - MeshMatcapMaterial
    - 光照无效
    - 根据法线选择正确的颜色
    - 根据纹理图片渲染明暗，在没有光源的情况下，物体也会呈现出明暗面
    - `matcap` 设置纹理
  - MeshDepthMaterial 深度网格材质
    - 光照无效
    - 深度基于相机远近平面。白色最近，黑色最远。
  - [MeshLambertMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshLambertMaterial)Lambert 网格材质
    - 光照有效，漫反射，**非光泽表面** 的材质，没有镜面高光。
    - 模拟地表（例如未经处理的木材或石材）
  - [MeshPhongMaterial](https://threejs.org/docs/?q=MeshPhongMaterial#api/zh/materials/MeshPhongMaterial)Phong 网格材质
    - 光照有效，镜面高光
    - 高光颜色 `specular`
    - 高亮程度 越高越亮 `shininess`
  - MeshToonMaterial 卡通阴影效果的材质
  - [MeshStandardMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshStandardMaterial)标准网格材质
    - PBR 物理材质，模拟金属、玻璃，精准和逼真，计算成本高
  - MeshPhysicalMaterial 物理网格材质
    - MeshStandardMaterial 的扩展，提供了更高级的基于物理的渲染属性
    - 外层有个透明样的图层
- [PointsMaterial](https://threejs.org/docs/index.html?q=Point#api/zh/materials/PointsMaterial)点材质

## 使用 MeshStandardMaterial 还原一个物体

- 添加金属度纹理
  ```js
  standardMaterial.metalnessMap = matalnessTexture;
  ```
- 添加粗糙度纹理
  ```js
  standardMaterial.roughnessMap = roughnessTexture;
  ```
- 添加颜色纹理
  ```js
  standardMaterial.map = colorTexture;
  ```
- 添加环境遮挡纹理(需要第二组 uv)

  ```js
  sphereMesh.geometry.setAttribute("uv2", new THREE.BufferAttribute(sphereMesh.geometry.attributes.uv.array, 2)); // 复制uv

  standardMaterial.aoMap = ambientOcclusionTexture;
  standardMaterial.aoMapIntensity = 1; // 强度
  ```

- 添加顶点位移纹理
  ```js
  standardMaterial.displacementMap = heightTexture; // 位移纹理。需要足够多的顶点
  standardMaterial.displacementScale = 0.05;
  ```
- 添加法线贴图纹理(更改颜色照亮的方式，只改变光照)
  ```js
  standardMaterial.normalMap = normalTexture;
  standardMaterial.normalScale.set(0.5, 0.5);
  ```
- 添加不透明度纹理
  ```js
  standardMaterial.transparent = true;
  standardMaterial.alphaMap = alphaTexture;
  ```

## 通过钩子修改材质

[`Material.onBeforeCompile`](https://threejs.org/docs/index.html?q=Mater#api/en/materials/Material.onBeforeCompile)在编译着色器程序之前立即执行的可选回调。使用着色器源代码作为参数调用此函数。

材质的着色器一般位于`node_modules/three/src/renderers/shaders`中。

### 修改顶点

将顶点着色器中的`#include <begin_vertex>`替换掉。`#include <begin_vertex>`原来的代码：

```c#
export default /* glsl */`
vec3 transformed = vec3( position );
`;
```

### 添加静态 uniforms

```js
material.onBeforeCompile = shader => {
  shader.uniforms.uXXXX = {
    value: 0,
  };
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
      #include <common>
      float uTime;
      `
  );
};
```

### 添加动态 uniforms

```js
// 塞点需要变的uniforms进去
material.defines = {
  uTime: 0,
};
```
