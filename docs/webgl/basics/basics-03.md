# WebGL 基础：画个矩形

- 💡 通过三角形构建矩形
- 💡 索引绘制的使用方法

## 基本三角形构建矩形

- [源码](https://github.com/YomukiZRJ/study-webgl/tree/main/src/08%E5%9F%BA%E6%9C%AC%E4%B8%89%E8%A7%92%E5%BD%A2%E6%9E%84%E5%BB%BA%E7%9F%A9%E5%BD%A2)
  > 关于顶点绘制顺序：  
  > WebGL 会认为顶点顺序为**逆时针**时代表正面，反之则是背面，区分正面、背面的目的在于，如果开启了背面剔除功能的话，背面是不会被绘制的。  
  > 所以组成三角形的顶点顺序要按照逆时针排序。

一个矩形可以由两个三角形组成（4 个点，其中 2 点共用）

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/11/165c77b134803832~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

```js
const positions = [
  30,
  30,
  255,
  0,
  0,
  1, // V0
  30,
  300,
  255,
  0,
  0,
  1, // V1
  300,
  300,
  255,
  0,
  0,
  1, // V2
  30,
  30,
  0,
  255,
  0,
  1, // V0
  300,
  300,
  0,
  255,
  0,
  1, // V2
  300,
  30,
  0,
  255,
  0,
  1 // V3
]
```

然后利用一个 buffer 读取多种数据绘制两个三角形

## 索引方式绘制

- [源码](https://github.com/YomukiZRJ/study-webgl/tree/main/src/09%E7%B4%A2%E5%BC%95%E7%BB%98%E5%88%B6%E7%9F%A9%E5%BD%A2)
  上面的绘制重复了两个点，浪费！使用`gl.drawElements(mode, count, type, offset)`可以避免重复定义顶点。
- mode:指定要渲染的图元类型。(枚举类型)
  - `gl.POINTS` `gl.LINE_STRIP` `gl.LINE_LOOP` `gl.LINES` `gl.TRIANGLES` `gl.TRIANGLE_STRIP` `gl.TRIANGLE_FAN`
- count:渲染的元素数量
- type:指定元素数组缓冲区（索引缓冲区）中的值的类型
  - `gl.UNSIGNED_BYTE` `gl.UNSIGNED_SHORT`
- offset 偏移量

```js
gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_BYTE, 0)
```

表示：采用三角形绘制，共绘制 3 个顶点，顶点索引类型是无符号 8 位整数值，从顶点索引数组的开始位置绘制。

准备四个顶点的顶点数组，还有相对应的索引数组，索引中的值分别对应使用的顶点 index

```js
// 存储顶点信息的数组
const positions = [
  30,
  30,
  255,
  0,
  0,
  1, // V0
  30,
  300,
  255,
  0,
  0,
  1, // V1
  300,
  300,
  255,
  0,
  0,
  1, // V2
  300,
  30,
  0,
  255,
  0,
  1 // V3
]
// 存储顶点索引的数组
const indices = [
  0,
  1,
  2, // 第一个三角形
  0,
  2,
  3 // 第二个三角形
]
```

创建索引数组缓冲区（`gl.ELEMENT_ARRAY_BUFFER`）：

```js
const indicesBuffer: WebGLBuffer = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
```

然后绘制

```js
gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
```

## 三角带绘制矩形

- [源码](https://github.com/YomukiZRJ/study-webgl/tree/main/src/10%E4%B8%89%E8%A7%92%E5%B8%A6%E7%BB%98%E5%88%B6%E7%9F%A9%E5%BD%A2)

<image-box src="webgl/Xnip2022-11-14_10-31-34.jpg" />

准备四个顶点进行绘制，需要注意顶点顺序。第一个三角形的顶点为 v0,v1,v2，第二个三角形的顶点为 v2,v1,v3

```js
positions = [
  30,
  300,
  255,
  0,
  0,
  1, // V0
  300,
  300,
  255,
  0,
  0,
  1, // V1
  30,
  30,
  255,
  0,
  0,
  1, // V2
  300,
  30,
  0,
  255,
  0,
  1 // V3
]
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
```

## 三角扇绘制矩形

- [源码](https://github.com/YomukiZRJ/study-webgl/tree/main/src/11%E4%B8%89%E8%A7%92%E6%89%87%E7%BB%98%E5%88%B6%E7%9F%A9%E5%BD%A2)

<image-box src="webgl/Xnip2022-11-14_11-36-51.jpg" />

需要用 6 个顶点绘制 4 个三角形。v0 点为中心点，向四边衍生四个点，形成 4 个三角形。

```js
positions = [
  165,
  165,
  255,
  255,
  0,
  1, // V0
  30,
  30,
  255,
  0,
  0,
  1, // V1
  30,
  300,
  255,
  0,
  0,
  1, // V2
  300,
  300,
  255,
  0,
  0,
  1, // V3
  300,
  30,
  0,
  255,
  0,
  1, // V4
  30,
  30,
  255,
  0,
  0,
  1 // V1
]
gl.drawArrays(gl.TRIANGLE_FAN, 0, positions.length / 6)
```

## 三角形绘制圆形

- [源码](https://github.com/YomukiZRJ/study-webgl/tree/main/src/12%E4%B8%89%E8%A7%92%E5%BD%A2%E7%BB%98%E5%88%B6%E5%9C%86%E5%BD%A2)

以三角扇的顶点作为圆心，绘制数个三角形，数量越多，圆形越平滑。（...去复习三角形三边计算吧 🙉🙉🙉）

> 顶点数量相应的变多，内存占用会变大

<image-box src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/21/165fb3037eeca21b~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" />

```js
/**
 * @description:
 * @param {*} x 圆心x坐标
 * @param {*} y 圆心y坐标
 * @param {*} radius 半径
 * @param {*} n 三角形数量
 */
function createCircleVertex (x: number, y: number, radius: number, n: number): [number] {
  const positions = [x, y, 255, 0, 0, 1]
  for (let i = 0; i <= n; i++){
    const angle = (i * Math.PI * 2) / n
    positions.push(x + radius * Math.sin(angle), y + radius * Math.cos(angle), 255, 0, 0, 1)
  }
  return positions
}
const positions = createCircleVertex(100, 100, 50, 30)
```

## 三角形绘制圆环

- [源码](https://github.com/YomukiZRJ/study-webgl/tree/main/src/13%E4%B8%89%E8%A7%92%E5%BD%A2%E7%BB%98%E5%88%B6%E5%9C%86%E7%8E%AF)

取外圆和内圆的交点，再由索引进行绘制

```js
/**
 * @description:
 * @param {*} x 圆心x坐标
 * @param {*} y 圆心y坐标
 * @param {*} outerRadius 外环半径
 * @param {*} innerRadius 内环半径
 * @param {*} n 三角形数量
 */
function createCircleVertex (x: number, y: number, outerRadius: number, innerRadius: number, n: number): { positions: [number]; indices: [number] } {
  const positions = []
  for (let i = 0; i <= n; i++){
    const angle = (i * Math.PI * 2) / n
    positions.push(x + innerRadius * Math.sin(angle), y + innerRadius * Math.cos(angle), 255, 0, 0, 1)
    positions.push(x + outerRadius * Math.sin(angle), y + outerRadius * Math.cos(angle), 255, 0, 0, 1)
  }
  const indices = []
  for (let i = 0; i < n; i++){
    const p0 = i * 2
    const p1 = i * 2 + 1
    let p2 = (i + 1) * 2 + 1
    let p3 = (i + 1) * 2
    if (i === n - 1){
      p2 = 1
      p3 = 0
    }
    indices.push(p0, p1, p2, p2, p3, p0)
  }
  return {
    positions,
    indices
  }
}
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
```
