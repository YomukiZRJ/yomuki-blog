# three ：一些术语

- near ：近截面
- far ：远截面

当物体某些部分比摄像机的远截面远或者比近截面近的时候，不会被渲染到场景中

## 一些角度

- `Math.PI / 4 `90 度
- `Math.random() * Math.PI *2 ` 随机角度

## 一些动画

- x,y 轴上逆时针画圆

```js
position.x = Math.sin(elapsedTime) * 半径;
position.z = Math.cos(elapsedTime) * 半径;
```

- x,y 轴上顺时针画圆

```js
position.x = Math.cos(elapsedTime) * 半径;
position.z = Math.sin(elapsedTime) * 半径;
```

## 一些分布

- 在一个圆环范围内随机分布

  ```js
  const angle = Math.random() * Math.PI * 2; // 随机角度
  const radius = 3 + Math.random() * 6; // 3内圆半径 6外圆半径
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMatrial);
  console.log(x, z);
  grave.position.set(x, 0.3, z);
  graves.add(grave);
  ```
