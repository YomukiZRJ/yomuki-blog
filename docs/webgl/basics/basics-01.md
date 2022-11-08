# WebGL 基础：一个点 & 往着色器传递数据

<image-box src="http://assets.yomuki.com/md/webgl/%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8.png" />

- [源码-绘制一个点](https://github.com/YomukiZRJ/study-webgl/tree/main/src/01%E7%BB%98%E5%88%B6%E4%B8%80%E4%B8%AA%E7%82%B9)
- [源码-交互绘制点](https://github.com/YomukiZRJ/study-webgl/tree/main/src/02%E4%BA%A4%E4%BA%92%E7%BB%98%E5%88%B6%E7%82%B9)

## 源码

定点着色器

```html
<script type="shader-source" id="vertexShader">
  void main(){
      // 声明定点位置
      gl_Position = vec4(0.0,0.0,0.0,1.0);
      // 声明待绘制的点的大小
      gl_PointSize = 10.0;
  }
</script>
```

片元着色器

```html
<script type="shader-source" id="fragmentShader">
  void main(){
      // 设置像素颜色位红色
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }
</script>
```

TypeScript

```js
// 获取canvas元素
const canvas: HTMLCanvasElement = document.querySelector("#canvas");
// 获取 WebGL 绘图环境
const gl: WebGLRenderingContext = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

/**
 * 创建定点着色器对象
 * 绘制点位位置
 */
// 获取定点着色器源码
const vertexShaderSource: string = document.querySelector("#vertexShader").innerHTML;
// 创建定点着色器对象
const vertexShader: WebGLShader = gl.createShader(gl.VERTEX_SHADER);
// 将源码分配给定点着色器对象
gl.shaderSource(vertexShader, vertexShaderSource);
// 编译顶点着色器程序
gl.compileShader(vertexShader);

/**
 * 创建片元着色器对象
 * 像素着色
 */
// 获取片元着色器源码
const fragmentShaderSource: string = document.querySelector("#fragmentShader").innerHTML;
// 创建片元着色器对象
const fragmentShader: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER);
// 将源码分配给片元着色器对象
gl.shaderSource(fragmentShader, fragmentShaderSource);
// 片元着色器编译
gl.compileShader(fragmentShader);

/**
 * 创建着色器程序
 */
// 创建着色器程序
const program: WebGLProgram = gl.createProgram();
// 将顶点着色器挂载在着色器程序上
gl.attachShader(program, vertexShader);
// 将片元着色器挂载在着色器程序锁
gl.attachShader(program, fragmentShader);
// 链接着色器程序
gl.linkProgram(program);

// 使用刚创建好的着色器程序
gl.useProgram(program);

/**
 * 开始绘制
 */
// 设置清空画布颜色为黑色
gl.clearColor(0.0, 0.0, 0.0, 1.0);
// 用上一步设置的清空画布颜色清空画布。
gl.clear(gl.COLOR_BUFFER_BIT);
// 绘制点
gl.drawArrays(gl.POINTS, 0, 1);
```

## 学习记录

1. `HTMLCanvasElement.getContext('webgl')` 获取 WebGL 绘图环境`WebGLRenderingContext`（简写`gl`）
2. 创建着色器对象
   1. `gl.createShader(type)` 创建着色器对象（`WebGLShader`）
      - type:`gl.VERTEX_SHADER` 创建定点着色器
      - type:`gl.FRAGMENT_SHADER` 创建片元着色器
   2. `gl.shaderSource(WebGLShader,source)` 设置着色器对象的 GLSL 程序代码
   3. `gl.compileShader(WebGLShader)` 编译一个 GLSL 着色器，使其成为二进制数据
3. 创建着色器程序
   1. `gl.createProgram()` 创建和初始化着色器程序（`WebGLProgram`）。它由两个`WebGLShader`（webgl 着色器）组成，分别为顶点着色器和片元着色器。
   2. `gl.attachShader(WebGLProgram,WebGLShader)` 往着色器程序中添加片段/定点着色器
   3. `gl.linkProgram(WebGLProgram)` 链接着色器程序，从而完成为程序的片元和顶点着色器准备 GPU 代码的过程。
   4. `gl.useProgram(WebGLProgram)` 将定义好的着色器程序添加到当前的渲染状态中
4. 绘制
   1. `gl.clearColor(red, green, blue, alpha)` 设置清空颜色缓冲时的颜色值
   2. `gl.clear(mask)` 使用预设值来清空缓冲(画布)。
      - mask：`gl.COLOR_BUFFER_BIT` 颜色缓冲区
      - mask：`gl.DEPTH_BUFFER_BIT` 深度缓冲区
      - mask：`gl.STENCIL_BUFFER_BIT` 模板缓冲区
   3. `gl.drawArrays(mode, first, count)` 从向量数组中绘制图元
      - mode:绘制图元的方式。（图元类型？）
        - `gl.POINTS` 绘制一系列点
        - `gl.LINE_STRIP` 绘制一个线条。上一个点连下一个点
        - `gl.LINE_LOOP` 绘制一个线圈。上一个点连接下一个点，最后一个点连接第一个点、
        - `gl.LINES` 绘制一系列单独线段。每两个点作为端点，线段之间不连接
        - `gl.TRIANGLE_STRIP` 绘制一个三角带
        - `gl.TRIANGLE_FAN` 绘制一个三角扇
        - `gl.TRIANGLES` 绘制一系列三角形。每三个点作为顶点
      - first:指定从哪个点开始绘制
      - count:指定绘制需要使用到多少个点

## 通过 javaScript 往着色器传递数据

```html
<script type="shader-source" id="vertexShader">
  // 设置浮点数精度为中等精度
  precision mediump float;
  // 接收点在 canvas 坐标系上的坐标(x,y)
  attribute vec2 a_Position;
  // 接收 canvas 的宽高尺寸;
  attribute vec2 a_Screen_Size;
  void main(){
    // 将屏幕坐标系转化为裁剪坐标（裁剪坐标系）
    vec2 position = (a_Position / a_Screen_Size) * 2.0 -1.0;
    position = position * vec2(1.0 , -1.0);
    gl_Position = vec4(position,0,1);
    // 声明待绘制的点的大小
    gl_PointSize = 10.0;
  }
</script>
```

先定义两个`attribute`变量：a_Position，a_Screen_Size。

```
vec2 position = (a_Position / a_Screen_Size) * 2.0 -1.0;
position = position * vec2(1.0 , -1.0);
```

这个操作将 canvas 坐标转为 NDC 坐标：

- `a_Position / a_Screen_Size` 将(x,y) 转化到【0, 1】区间
- 再将 【0, 1】之间的值乘以 2 转化到 【0, 2】区间
- 之后再减去 1 ，转化到 【-1, 1】之间的值
- 由于 webgl 坐标系的 y 轴正方向和 canvas y 轴正方向相反，所以
  position \* vec2(1.0, -1.0) 将 y 轴方向转换

### 片元着色器

```html
<script type="shader-source" id="fragmentShader">
  //设置浮点数精度为中等精度
  precision mediump float;
  //接收 JavaScript 传过来的颜色值（RGBA）。
  uniform vec4 u_Color;
  void main(){
    //将普通的颜色表示转化为 WebGL 需要的表示方式，即将【0-255】转化到【0,1】之间。
    vec4 color = u_Color / vec4(255, 255, 255, 1);
    gl_FragColor = color;
  }
</script>
```

定义一个全局变量(`uniform` 修饰的变量)

## 学习记录

- `gl.getAttribLocation(WebGLProgram,name)` 找到着色器中的 attribute 变量地址。
- `gl.getUniformLocation(WebGLProgram,name)` 找到着色器中的 uniform 变量地址。
- `gl.vertexAttrib2f()` 给 attribute 变量传递两个浮点数。
- `gl.uniform4f()` 给 uniform 变量传递四个浮点数。

## 遇到的问题

### canvas 宽高与实际不符

- [webgl-resizing-the-canvas](https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html)

每张画布有两种尺寸。

- 其绘图缓冲区的大小。这是画布中的像素数。
- 第二个大小是画布显示的大小。CSS 决定画布显示的大小。

通过两种方式设置画布的绘图缓冲区的大小：

```html
<canvas id="c" width="400" height="300"></canvas>
```

```js
const canvas = document.querySelector("#c");
canvas.width = 400;
canvas.height = 300;
```

至于设置一个画布的显示大小，如果你没有任何 CSS 影响画布的显示大小，显示大小将是相同的大小作为其绘图缓冲区。因此在上面的两个例子中，画布的绘图缓冲区是 400x300，它的显示大小也是 400x300。
