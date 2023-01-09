# 物理引擎：cannon

- [官网](https://schteppe.github.io/cannon.js/)
- 比 ammo 轻量级，比 ammo 更容易实现
- 很多年没更新了，但是有维护的 fork
  - 有 es &ts 版的 fork [cannon-es](https://www.npmjs.com/package/cannon-es)

## 创建一个物理世界

- 创建物理世界对象
  ```js
  const world = new CANNON.World();
  ```
- 在这个世界中添加重力，参数是一个三维向量
  ```js
  world.gravity.set(0, -9.82, 0); // y轴向下的重力
  ```

## 创建物理材质

- 创建材质
  ```js
  const concreteMaterial = new CANNON.Material("concrete"); // 混凝土
  const plasticMaterial = new CANNON.Material("plastic"); // 塑料
  ```
- 关联两材质，定义两种材料相遇时发生的情况
  ```js
  const concretePlasticContactMaterial = new CANNON.ContactMaterial(concreteMaterial, plasticMaterial, {
    friction: 0.1, // 摩擦力
    restitution: 0.7, // 补偿（反弹力） 1为弹至原始位置
  });
  ```
- 在物理世界里添加关联材质
  ```js
  world.addContactMaterial(concretePlasticContactMaterial);
  ```
- 也可以定义一个默认材质，然后绑定物理世界的默认材质关联（如果均为一种材质的话，就很方便，不需要再物理对象中添加材质了）
  ```js
  const defaultMaterial = new CANNON.Material("default");
  const defaultContactMatertial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
    friction: 0.1,
    restitution: 0.7,
  });
  world.addContactMaterial(defaultContactMatertial);
  // 设置这个世界的默认材质关联
  world.defaultContactMaterial = defaultContactMatertial;
  ```

## 创建物理对象

- 创建球体形状
  ```js
  const sphereShape = new CANNON.Sphere(0.5);
  ```
- 创建物理对象，并且将形状绑定为球体
  ```js
  const sphereBody = new CANNON.Body({
    mass: 1, // 质量
    position: new CANNON.Vec3(0, 3, 0),
    shape: sphereShape,
    // material: defaultMaterial
  });
  ```
- 在物理世界中添加这个物理对象
  ```js
  world.addBody(sphereBody);
  ```
- 旋转物理对象，设置给定轴和角度
  ```js
  // 旋转轴为x的反方向，角度为90°
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
  ```
- 添加力量
  - `applyForce`
    - 在世界的某一点施加力量（而不是严格的施加在表面）
    - 如风、多米诺骨牌的小推力，愤怒的小鸟。
    - 会增加力（Body.force）和力矩（Body.torque）
      ```js
      // 在物理世界更新之前，模拟风
      sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);
      // update 物理世界
      world.step(1 / 60, deltaTime, 3);
      ```
  - `applyImpulse`
    - 像`applyForce`，但不会增加力，而是增加速度
    - 增加 Body.velocity 和 Body.angularVelocity （速度和角速度）
  - `applyLocalForce`
    - 和`applyForce`相同，但坐标是身体的局部坐标
      ```js
      // 添加一个往x轴正方向上的力量，作用点在球体的正中心
      sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0));
      ```
  - `applyLocalImpulse `
    - 和`applyImpulse`相同，但坐标是身体的局部坐标
