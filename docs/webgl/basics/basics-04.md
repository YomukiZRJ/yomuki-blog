# WebGL 基础：纹理贴图

## 图片素材要求

WebGL 对图片素材有严格要求：图片的高度和宽度需为 2 的 N 次幂，比如 16x16，32x32。

> 不是这个尺寸的图片也能进行贴图，但是这样会使得贴图过程更复杂，从而影响性能。

## 纹理坐标系统

纹理坐标为`UV`，`U`代表横轴坐标，`V`代表纵轴坐标。（为了和顶点坐标区分）

纹理坐标的特点：

- **左下角**为原点(0,0)
- 向右为横轴正方向，横轴最大值为 1
- 向上为纵轴正方向，纵轴最大值为 1

## 进行贴图

### 着色器部分

在顶点着色器创建`attribute`变量，接收纹理坐标值，同时创建`varying`变量，将坐标值传递给片元着色器

```
attribute vec2 a_Uv;
varying vec2 v_Uv;
```

在片元着色器创建`uniform`变量，接收纹理图片数据，再通过`texture2D`从纹理图像提取像素值。

```
uniform sampler2D texture;

// 提取纹理对应uv坐标上的颜色，赋值给当前片元（像素）。
gl_FragColor = texture2D(texture, vec2(v_Uv.x, v_Uv.y));
```

### js 部分

创建[`WebGLTexture`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLTexture)，为不透明的纹理对象提供储存和状态等纹理操作。

```js
// 创建纹理对象
const texture: WebGLTexture = gl.createTexture();
// 将刚刚创建的纹理对象绑定到二维纹理
gl.bindTexture(gl.TEXTURE_2D, texture);
// 读取二维纹理图像
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
// 设置图片放大时采用的算法
gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// 设置图片缩小时采用的算法
gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
// 为片元着色器传递 0 号纹理单元
const uTexture = gl.getUniformLocation(program, "u_Texture");
gl.uniform1i(uTexture, 0);
```

创建纹理对象 `gl.createTexture()`，返回[`WebGLTexture`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLTexture)对象

```js
const texture: WebGLTexture = gl.createTexture();
```

将给定的 WebGLTexture 对象绑定至目标点 [`gl.bindTexture(target, WebGLTexture)`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/bindTexture)

- target : GLenum
  - `gl.TEXTURE_2D` 二维纹理
  - `gl.TEXTURE_CUBE_MAP` 立方体映射纹理

```js
gl.bindTexture(gl.TEXTURE_2D, texture);
```

为片元着色器传递图片数据 [`gl.texImage2D()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/texImage2D)，这是一个重载方法，其中有一些参数可以省略

> glTexImage2D(GLenum target, GLint level, GLint internalformat, [GLsizei width, glsizei height, GLint border], GLenum format, GLenum type, const GLvoid \*pixels);

- target 纹理类型
  - `gl.TEXTURE_2D` 二维纹理贴
  - `gl.TEXTURE_CUBE_MAP_POSITIVE_X/Y/Z` 立方体映射纹理的正 X/Y/Z 面
  - `gl.TEXTURE_CUBE_MAP_NEGATIVE_X/Y/Z` 立方体映射纹理的负 X/Y/Z 面
- level 指定详细级别。0 级是基本图像等级，n 级是第 n 个金字塔简化级。
- internalformat 指定纹理中的颜色组件
  - `gl.ALPHA` `gl.RGB` `gl.RGBA`
- width 指定纹理的宽度
- height 指定纹理的高度
- border 纹理的边框宽度
- format 指定的 texel 数据格式，必须与 internalformat 相同
- type 指定 texel 数据的数据类型
  - `gl.UNSIGNED_BYTE` gl.RGBA 每个通道 8 位
  - ....
- pixels 纹理源

```js
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
```

设置图片在放大或缩小时采用的过滤算法 [`gl.texParameter[fi]()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/texParameter)

- `gl.LINEAR` 代表采用最靠近象素中心的四个象素的加权平均值，这种效果表现的更加平滑自然。
- `gl.NEAREST` 采用最靠近象素中心的纹素，该算法可能使图像走样，但是执行效率高，不需要额外的计算。

```js
gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
```
