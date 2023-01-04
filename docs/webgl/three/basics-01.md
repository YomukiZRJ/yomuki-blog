# three ：一些术语

- near ：近截面
- far ：远截面

当物体某些部分比摄像机的远截面远或者比近截面近的时候，不会被渲染到场景中

## 一些角度

- `Math.PI / 4 `90 度

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
