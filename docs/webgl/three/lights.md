# 灯光

属于`Object3d`

- [Light](https://threejs.org/docs/index.html#api/zh/lights/Light) 抽象基类

## 灯光类型

- 环境光 [AmbientLight](https://threejs.org/docs/index.html#api/zh/lights/AmbientLight)
  - 均匀照亮场景中的所有物体。
  - 不能用来投射阴影，因为没有方向。
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
- 平面光 RectAreaLight
  - 用来模拟像明亮的窗户或者条状灯光光源
  - 不能投射阴影
  - 只支持 `MeshStandardMaterial` 和 `MeshPhysicalMaterial` 两种材质

## tips

- 添加灯光会影响性能。极限大约在 50
- 尽可能少的使用灯光，使用成本更低的灯
- 最低成本的灯光：
  - AmbientLight
  - HemisphereLight
- 中等成本的灯光：
  - DirectionalLight
  - PointLight
- 高成本的灯光：
  - SpotLight
  - RectAreaLight
- baked
  - 由于灯光消耗性能，为了尽可能少的使用灯光，可以将灯照效果加入在纹理中。
