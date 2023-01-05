# 粒子

粒子（`Particles`）可以创建星星、烟雾、雨、粉尘、火焰等等。

粒子的好处在于可以拥有成千上万的粒子们，只要帧率合理。缺点是每个粒子都是由面向摄像机的平面（两三角）组成。

## 通过内置几何体创建粒子

```js
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
const particlesMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.0078 });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);
```

## 在某立方体范围内创建随机粒子

```js
const vertices = [];
for (let index = 0; index < 1000; index++) {
  const x = (Math.random() - 0.5) * 4;
  const y = (Math.random() - 0.5) * 4;
  const z = (Math.random() - 0.5) * 4;
  vertices.push(x, y, z);
}
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
const particlesMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.009 });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);
```

## 通过 alphaMap 改变粒子形状

```js
const particlesMaterial = new THREE.PointsMaterial({ color: "#8a6666", size: 0.09, transparent: true, alphaMap: particleTexture });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
```

## 解决粒子边缘被渲染的问题

- 如果用的是`alphaMap`，可以搭配使用`alphaTest`。（如果不透明度低于此值，则不会渲染材质）
  ```js
  particlesMaterial.alphaTest = 0.001;
  ```
- 关闭深度测试
  - 但是这个方法会导致该粒子不进行深度渲染。如果同场景中存在其他对象，该粒子会不管远近都渲染出来。
    ```js
    particlesMaterial.depthTest = false;
    ```
- 关闭材质对深度缓冲区的影响
  ```js
  particlesMaterial.depthWrite = false;
  ```
- 关闭材质对深度缓冲区的影响，并修改此材质显示对象时要使用的混合方式为加法混合，但是消耗性能。适用于需要亮亮的效果
  ```js
  particlesMaterial.depthWrite = false;
  particlesMaterial.blending = THREE.AdditiveBlending;
  ```
