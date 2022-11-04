# WebGL 基础：三角形和缓冲区

## 三角形

- 基本三角形（`TRIANGLES`）
  - 绘制一个个独立的三角形，每三个点为一个三角形。如果提供了 6 个点，那就是两个三角形。绘制三角形的数量 = 顶点数 / 3
- 三角带（`TRIANGLE_STRIP`）
  - 如果提供 6 个点，则会绘制 4 个三角形，绘制三角形的数量 = 顶点数 - 2
    ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/22/16875b8e51710e48~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
- 三角扇（`TRIANGLE_FAN`）
  - 以第一个定点作为所有三角形的顶点进行绘制，绘制三角形的数量 = 顶点数 - 2
    ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a8dc2bb044266~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

## 创建缓冲区

```js
// 三角形三个顶点
const positions: [number] = [1, 0, 0, 1, 0, 0];
// 创建缓冲区
const buffer: WebGLBuffer = gl.createBuffer();
// 将刚刚创建的缓冲区绑定为当前顶点属性缓冲区
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// 往当前缓冲区写入数据
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
```

- `gl.createBuffer` 创建缓冲区 `WebGLBuffer`
- `gl.bindBuffer(gl.ARRAY_BUFFER, WebGLBuffer)` 绑定当前缓冲区
  - `gl.ARRAY_BUFFER` 包含顶点属性的 Buffer，如顶点坐标，纹理坐标数据或顶点颜色数据。
  - `gl.ELEMENT_ARRAY_BUFFER` 用于元素索引的 Buffer。
  - `new Float32Array(positions)` 将顶点数组转化为更严谨的类型化数组。
  - `gl.bufferData(target, data, usage)`创建并初始化了 Buffer 对象的数据存储区。
    - target ： 指定 Buffer 绑定点（`gl.ARRAY_BUFFER` `gl.ELEMENT_ARRAY_BUFFER`）
    - data ： 数据。如果为 null，数据存储区仍会被创建，但是不会进行初始化和定义。
    - usage：指定数据存储区的使用方法。
      - `gl.STATIC_DRAW` 缓冲区的内容可能经常使用，而不会经常更改。内容被写入缓冲区，但不被读取。
      - `gl.DYNAMIC_DRAW` 缓冲区的内容可能经常被使用，并且经常更改。内容被写入缓冲区，但不被读取。
      - `gl.STREAM_DRAW` 缓冲区的内容可能不会经常使用。内容被写入缓冲区，但不被读取。

## 从缓冲区读取数据

```js
/**
 * 从缓冲区读取数据
 */
function readBuffer() {
  // 每次读取两个数据
  const size = 2;
  // 每个数据的类型是32位浮点型
  const type = gl.FLOAT;
  // 不需要归一化数据
  const normalize = false;
  // 每次迭代运行需要移动数据数 * 每个数据所占内存 到下一个数据开始点
  const stride = 0;
  // 从缓冲起始位置开始读取
  const offset = 0;
  // 将 aPosition 变量获取数据的 缓冲区 指向当前绑定的 WebGLBuffer
  // 将属性绑定到了当前的缓冲区
  gl.vertexAttribPointer(aPosition, size, type, normalize, stride, offset);
}
```

- `gl.vertexAttribPointer(index, size, type, normalized, stride, offset)` 将属性绑定当前缓冲区`gl.ARRAY_BUFFER`
  - index ： 顶点属性的索引。
  - size ：指定每个顶点属性的组成数量，必须是 1，2，3 或 4。（vec2，3,4）
  - type：指定数组中每个元素的数据类型
    - `gl.BYTE` 有符号的 8 位整数，范围 [-128, 127]
    - `gl.SHORT` 有符号的 16 位整数，范围 [-32768, 32767]
    - `gl.UNSIGNED_BYTE` 无符号的 8 位整数，范围 [0, 255]
    - `gl.UNSIGNED_SHORT` 无符号的 16 位整数，范围 [0, 65535]
    - `gl.FLOAT` 32 位 IEEE 标准的浮点数
  - normalized：是否需要将非浮点类型数据单位化到【-1, 1】区间。
  - stride：步长，即每个顶点所包含数据的字节数，默认是 0 ，0 表示一个属性的数据是连续存放的。在我们的例子中，我们的一个顶点包含两个分量，X 坐标和 Y 坐标，每个分量都是一个 Float32 类型，占 4 个字节，所以，stride = 2 \* 4 = 8 个字节。但我们的例子中，缓冲区只为一个属性 a_Position 服务，缓冲区的数据是连续存放的，因此我们可以使用默认值 0 来表示。但如果我们的缓冲区为多个属性所共用，那么 stride 就不能设置为 0 了，需要进行计算。
  - offset：在每个步长的数据里，目标属性需要偏移多少字节开始读取。在我们的例子中，buffer 只为 a_Position 一个属性服务，所以 offset 为 0 \* 4 = 0。

## 绘制三角形

```js
/**
 * 绘制三角形
 */
function drawTriangle() {
  // 从顶点数组的开始位置取顶点数据
  const offset = 0;
  // 要绘制三个点，所以执行三次顶点绘制操作。
  const count = 3;
  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, offset, count);
}
```
