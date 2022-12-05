# three 基础：Object3D 及其子类

[Object3D](https://threejs.org/docs/index.html#api/zh/core/Object3D)是大部分对象的基类，提供了属性和方法对三维空间中的物体进行操作。

## 属性

- castShadow 是否渲染阴影 默认 false
- receiveShadow 材质是否接收阴影

## 方法

- add() 添加对象到这个对象的子级。

```js
// 往场景里添加一个点光源
const scene = new THREE.Scene();
scene.add(PointLight);
```

- remove(...,...) 从当前对象的子集中移除对象
- position.set(x,y,z) 设置当前对象的位置
  - position.setComponent(index,value) 设置 x,y,z 中某一向量的值

```js
camera.position.set(200, 300, 200); // 设置相机位置
point.position.set(400, 200, 300); // 设置点光源位置
```

- lookAt(vector/x,y,z) 旋转物体使其面朝一个点

```js
camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)
```

## 子类 - 场景 - [Scene](https://threejs.org/docs/index.html?q=scene#api/zh/scenes/Scene)

场景是用来放置物体、灯光、摄像机的地方。它的父类为 Object3D

```js
const scene = new THREE.Scene();
```

## 子类 - 相机 - [Camera](https://threejs.org/docs/index.html#api/zh/cameras/Camera)

- Camera 抽象基类
  - [PerspectiveCamera](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera) 透视相机
    - 使用**透视投影**，用来模拟人眼所看到的景象。
  - [OrthographicCamera](https://threejs.org/docs/index.html#api/zh/cameras/OrthographicCamera) 正交相机
    - 使用**正交投影**，不论相机距离物体远近，渲染出来的物体大小不变，渲染 2D 场景或者 UI 元素。

## 子类 - 光源 - Light

- [Light](https://threejs.org/docs/index.html#api/zh/lights/Light) 抽象基类
  - 环境光 [AmbientLight](https://threejs.org/docs/index.html#api/zh/lights/AmbientLight)
    - 均匀照亮场景中的所有物体。不能用来投射阴影，因为没有方向。
  - 平行光 [DirectionalLight](https://threejs.org/docs/index.html?q=DirectionalLight#api/zh/lights/DirectionalLight)
    - 从特定地点发射无限远的平行光。通常来模拟太阳光。该光源可以投射阴影
  - 点光源 [PointLight](https://threejs.org/docs/index.html#api/zh/lights/PointLight)
    - 从一个点向各个方向发射的光源。该光源可以投射阴影
      ```js
      const point = new THREE.PointLight(0xffffff);
      point.position.set(400, 200, 300);
      point.intensity = 0.5; // 修改光的强度
      point.distance = 9999; // 修改光的照射范围.默认为0，即无穷大
      point.decay = 2; // 修改衰减度
      ```
  - 聚光灯 [SpotLight](https://threejs.org/docs/index.html#api/zh/lights/SpotLight)
    - 光线从一个点沿一个方向射出，沿着一个一个圆锥体进行照射，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大。
    - 模仿手电筒，带有灯罩的灯泡
      ```js
      const spotLight: THREE.SpotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(100, 200, 50);
      spotLight.intensity = 2; // 设置光照强度
      spotLight.distance = 300; // 光源距离
      spotLight.angle = Math.PI / 8; // (Math.PI / 4 为90度) 光线散射角度，最大为Math.PI / 2
      spotLight.penumbra = 0.5; // 聚光锥的半影衰减百分比。0-1.默认0 (用来设置光亮和不亮地方的过渡效果)
      spotLight.decay = 0.5; // 衰减量
      ```
    - 将 target 绑定为一个三维对象，以此改变光的照射方向
      ```js
      const spotLightTarget: THREE.Object3D = new THREE.Object3D();
      spotLightTarget.position.set(-100, -100, 0);
      spotLight.target = spotLightTarget;
      scene.add(spotLightTarget);
      ```
    - 将 target 绑定在某个模型对象上 就可以追踪这个对象了
      ```js
      spotLight.target = mesh;
      ```
    - 开启阴影渲染
      ```js
      spotLight.castShadow = true;
      ```
  - 半球光 [HemisphereLight](https://threejs.org/docs/index.html#api/zh/lights/HemisphereLight)
    - 不能投射阴影。光照颜色从天空光线颜色渐变到地面光线颜色。

## 子类 - 物体

### [Points](https://threejs.org/docs/index.html#api/zh/objects/Points)

用于显示点（`gl.POINTS`）的类。

```js
new THREE.Points(THREE.BufferGeometry, THREE.PointsMaterial);
```

```js
const points = new THREE.Points(new THREE.SphereGeometry(50), new THREE.PointsMaterial({ color: 0xffff00 }));
points.position.set(-100, 100, 100);
```

### [Line](https://threejs.org/docs/index.html#api/zh/objects/Line)

用于显示连续的线（`gl.LINE_STRIP`上一个点连下一个点）的类。

```js
new THREE.Line(THREE.BufferGeometry, THREE.LineBasicMaterial);
```

基于`Line`的物体类：

- [LineLoop](https://threejs.org/docs/index.html#api/zh/objects/LineLoop) 环线。使用`gl.LINE_LOOP`渲染，线的头尾相接。
- [LineSegments](https://threejs.org/docs/index.html#api/zh/objects/LineSegments) 线段。使用`gl.LINES`渲染，两点一线。
  - 空间坐标轴 [AxesHelper](https://threejs.org/docs/index.html?q=AxesHelper#api/zh/helpers/AxesHelper)

### [Mesh](https://threejs.org/docs/index.html#api/zh/objects/Mesh)

基于三角形为多边形网格的物体类。

基于`Mesh`的类：

- [InstancedMesh](https://threejs.org/docs/index.html#api/zh/objects/InstancedMesh) 实例化网格
  - 可以用来渲染大量具有相同几何体、材质，但是不同变换的物体。
    ```js
    const instanced = new THREE.InstancedMesh(
      new THREE.BoxGeometry(50, 50, 50),
      new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.5 }),
      4
    );
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    for (let i = 0; i < instanced.count; i++) {
      position.x = Math.random() * 100 - 50;
      position.y = Math.random() * 100 - 50;
      position.z = Math.random() * 100 - 50;
      rotation.x = Math.random() * 2 * Math.PI;
      rotation.y = Math.random() * 2 * Math.PI;
      rotation.z = Math.random() * 2 * Math.PI;
      quaternion.setFromEuler(rotation);
      scale.x = scale.y = scale.z = Math.random() * 1;
      matrix.compose(position, quaternion, scale);
      instanced.setMatrixAt(i, matrix);
    }
    instanced.position.set(-100, 100, 0);
    scene.add(instanced);
    ```

## 子类 - 组 - Group

[Group](https://threejs.org/docs/index.html#api/zh/objects/Group) 用来聚集一些 object3D 对象。

```js
const points = new THREE.Points(new THREE.SphereGeometry(50), new THREE.PointsMaterial({ color: 0xffff00 }));
points.position.set(-100, 100, 100);
const line = new THREE.Line(
  new THREE.BoxGeometry(50, 50, 50),
  new THREE.LineBasicMaterial({
    color: 0xffff00,
  })
);
/**
 * 组
 */
const group = new THREE.Group();
group.add(points, line);
scene.add(group);
```
