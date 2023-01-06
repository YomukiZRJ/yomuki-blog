# Raycaster 光线投射器

[Raycaster](https://threejs.org/docs/index.html?q=ca#api/zh/core/Raycaster)向特定方向投射(或射出)光线，并测试哪些物体与其相交，光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。

可以使用这种技术来检测

- 玩家面前是否有一堵墙
- 激光枪是否击中了什么东西
- more

## create

- origin 三维向量，射线的起点
- direction 三维向量，射向的方向
- near
- far

```js
const rayOrigin = new THREE.Vector3(-3, 0, 0); // 射线起始点
const rayDirection = new THREE.Vector3(10, 0, 0); // 射线射向的方向
rayDirection.normalize(); // 将方向转为单位向量 (1,0,0)
console.log(rayDirection);

const raycaster = new THREE.Raycaster(); // 射线对象
raycaster.set(rayOrigin, rayDirection);
```

## 以相机为起始点，鼠标为方向

```js
const mouse = new THREE.Vector2();
raycaster.setFromCamera(mouse, camera);
window.addEventListener("mousemove", event => {
  // mouse的x和y范围在 -1 ~ 1之间
  mouse.x = (event.clientX / width.value) * 2 - 1;
  mouse.y = -((event.clientY / height.value) * 2 - 1);
});
```
