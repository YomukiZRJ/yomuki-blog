# GLSL 基础

## 变量定义

用来接收 JavaScript 传递过来的信息。

- `attribue` 变量：只能在顶点着色器中定义。
- `uniform` 变量：既可以在顶点着色器中定义，也可以在片元着色器中定义。
- `varing `变量：它用来从顶点着色器中往片元着色器传递数据。使用它我们可以在顶点着色器中声明一个变量并对其赋值，经过插值处理后，在片元着色器中取出插值后的值来使用。

## 内置属性

### gl_Position

顶点的**裁剪坐标系坐标**，包含 X, Y, Z，W 四个坐标分量，顶点着色器接收到这个坐标之后，对它进行透视除法，即将各个分量同时除以 W，转换成 **NDC 坐标**，NDC 坐标每个分量的取值范围都在【-1, 1】之间，GPU 获取这个属性值作为顶点的最终位置进行绘制。

### gl_FragColor

片元颜色，包含 R,G,B,A 四个颜色分量，且每个分量的取值范围在【0,1】之间，不同于我们常规颜色的【0，255】取值范范围，赋值时，也需要对其进行转换。

转换公式为： (R 值/255，G 值/255，B 值/255，A 值/1）。

### 内置属性 gl_PointSize

绘制到屏幕的点的大小，仅在图元为**点**时生效。

## vec4

包含四个浮点元素的容器类型。

vec 是 vector(向量)的简写。还有 vec2、vec3 等类型，代表包含 2 个或者 3 个浮点数的容器。