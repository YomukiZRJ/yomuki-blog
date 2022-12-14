# WebGL 基础：绘制立方体、球体、椎体

- 💡 WebGL 坐标系。
  - 裁剪坐标系。
  - NDC 坐标系。
- 💡 坐标系变换
  - 模型变换
  - 投影变换
- 💡 立方体、球体、椎体是如何用三角面组成的。
- 💡 背面剔除的作用。

## WebGL 坐标系

WebGL 坐标系采用左手坐标系，x 轴向右为正，y 轴向上为正，z 轴往里为正，坐标分量的范围是【-1,1】。我们也称这个坐标系为标准设备坐标系，简称 `NDC 坐标系`。

### gl_Position 接收什么坐标？

在 glsl 中为 gl_Position 赋值前，做了坐标系转换（屏幕坐标转换到裁剪坐标系）操作。

`gl_Position`接收四维浮点向量，该向量代表的是`裁剪坐标系`的坐标。

`裁剪坐标系`由四个分量表示：x,y,z,w。w 代表`齐次坐标分`。

### gl_Position 接收到坐标后会干什么？

`gl_Position`接收坐标后，顶点着色器会对坐标进行透视除法`（x/w,y/w,z/w,w/w）`转为`DNC坐标系`，再把`NDC坐标`转换成对应设备的`视口坐标`。

> `裁剪坐标系` -> `DNC坐标系` -> `视口坐标`

- 透视除法：`裁剪坐标系` -> `NDC坐标系`
  - (x/w,y/w,z/w,w/w)
- 视口变换：`NDC坐标系` -> `视口坐标` (GPU)
  - 假设 canvas 视口宽度 300，高度 400
  - canvas 坐标系 X 轴坐标 = NDC 坐标系下 X 轴坐标 \* 300 / 2
  - canvas 坐标系 Y 轴坐标 = NDC 坐标系下 Y 轴坐标 \* 400 / 2

## 三角形构建立方体

一个立方体由 8 个不重复的顶点组成。

> 不重复顶点：顶点的重复与否，不仅取决于顶点的坐标信息一致，还取决于该顶点所包含的其他信息是否一致。比如顶点纹理坐标 uv、顶点法线，顶点颜色等。一旦有一个信息不同，就必须用两个顶点来表示。

8 个顶点坐标

```js
const zeroX = 0.5;
const zeroY = 0.5;
const zeroZ = 0.5;
const cubePositions = [
  [-zeroX, -zeroY, zeroZ], // v0 后方左下角
  [zeroX, -zeroY, zeroX], // v1 后方右下角
  [zeroX, zeroY, zeroZ], // v2 后方右上角
  [-zeroX, zeroY, zeroX], // v3 后方左上角
  [-zeroX, -zeroY, -zeroX], // v4 前方左下角
  [-zeroX, zeroY, -zeroX], // v5 前方左上角
  [zeroX, zeroY, -zeroZ], // v6 前方右上角
  [zeroX, -zeroY, -zeroX], // v7 前方右下角
];
```

6 个面

```js
// 6个面的顶点索引
const cubeFaceIndices = [
  [0, 1, 2, 3], // 里
  [4, 5, 6, 7], // 外
  [0, 3, 5, 4], // 左
  [1, 7, 6, 2], // 右
  [3, 2, 6, 5], // 上
  [0, 4, 7, 1], // 下
];
// 6个面颜色
const cubeFaceColors = [
  [255, 0, 0, 1], // 里 红色
  [0, 255, 0, 1], // 外 绿色
  [0, 0, 255, 1], // 左 蓝色
  [255, 255, 0, 1], // 右 黄色
  [255, 0, 255, 1], // 上 品色
  [0, 255, 255, 1], // 下 青色
];
```

### 让立方体转动起来

- `模型变换`：可以让立方体转动
- `投影变换`：可以让立方体以正常比例渲染到目标设备

在顶点着色器中定义变换矩阵，将变换矩阵左乘顶点坐标。

```
uniform mat4 u_Matrix;
 gl_Position =  u_Matrix * vec4(a_Position, 1);
```

## 小结：

- 💡 WebGL 坐标系。
  - 裁剪坐标系：`gl_Position`接收的坐标 x,y,z,w，顶点着色器转换的源坐标。
  - NDC 坐标系：`gl_Position` 顶点着色器转换的最终坐标。
