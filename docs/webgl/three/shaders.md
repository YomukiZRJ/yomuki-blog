# 在 three 中使用着色器

着色器是一个用`GLSL `编写的程序，它被发送到 GPU。用于定位几何图形的每个顶点，并对该几何图形的每个可见像素着色。术语`像素`是不准确的，因为渲染中的每个点不一定匹配屏幕的每个像素，这就是为什么我们更喜欢使用术语`片元`。

我们向着色器发送大量的数据，比如`顶点坐标`、`网格变换`、`相机`及其的信息、`颜色`、`纹理`、`灯光`、`雾`等参数。GPU 然后按照着色器指令处理所有这些数据，我们的几何图形出现在渲染中。

## 顶点着色器

顶点着色器的作用是定位几何图形的顶点。向其发送：

- 顶点坐标
- 网格变换（位置、旋转和比例）
- 相机信息（位置、旋转和视野）

GPU 处理这些信息，将顶点投射到一个 2D 空间。

其接收的数据有两种类型：

- `attribute`（属性）每个顶点之间发生变化，例如顶点坐标。所以这个只能在顶点着色器中使用
- `uniform` 在顶点之间不变的数据。

其还可定义一种类型，可往片元着色器发送数据

- `varing`

顶点着色器是首先触发的，放置完了顶点，可以进入片元着色器。

## 片元着色器

片元着色器的作用是为几何图形的每个可见片元着色。

相同的片元着色器将用于每个可见的几何片元。

其接收的数据类型有两种：

- `uniform`
- `varing` 从顶点着色器往片元着色器发送数据

## RawShaderMaterial 和 ShaderMaterial

[ShaderMaterial](https://threejs.org/docs/index.html#api/zh/materials/ShaderMaterial) 可以自定义着色器。与[RawShaderMaterial](https://threejs.org/docs/index.html#api/zh/materials/RawShaderMaterial)的区别在于，前者会自动将内置`uniforms`和`attributes`添加到着色器中。

### [WebGLProgram](https://threejs.org/docs/index.html#api/zh/renderers/webgl/WebGLProgram) 内置的 uniforms 和 attributes

**uniform**

- `modelMatrix` 应用相对于`Mesh`（position,rotation,scale）的转换。
  ```c#
  // object.matrixWorld
  uniform mat4 modelMatrix;
  ```
- `viewMatrix` 应用相对于相机（position,rotation,near,fat）的转换。
  ```c#
  // = camera.matrixWorldInverse
  uniform mat4 viewMatrix;
  ```
- `modelViewMatrix`
  ```c#
  // = camera.matrixWorldInverse * object.matrixWorld
  uniform mat4 modelViewMatrix;
  ```
- `projectionMatrix` 将坐标转为`裁剪空间坐标`
  ```c#
  // = camera.projectionMatrix
  uniform mat4 projectionMatrix;
  ```
- `normalMatrix` modelViewMatrix 的逆转置
  ```c#
  uniform mat3 normalMatrix;
  ```
- `cameraPosition` 相机在世界空间中的位置
  `c# // = camera position in world space uniform vec3 cameraPosition; `
  **attribute**
- `uv` 几何体的 uv 坐标
  ```c#
  attribute vec2 uv;
  ```
- `position` 点坐标
  ```c#
  attribute vec3 position;
  ```
- `normal` 法向量
  `c# attribute vec3 normal; `
  **顶点着色器**

```c#
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vec4 viewPosiotion = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosiotion;
    gl_Position = projectionPosition;
    // gl_Position=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.0);
}
```

## 为每个顶点设置 Attribute

js 中发送属性：

```js
const gemotery = new THREE.PlaneGeometry(1, 1, 32, 32);
const count = gemotery.attributes.position.count; // 顶点数量
const randoms = new Float32Array(count);
for (let index = 0; index < count; index++) randoms[index] = Math.random();
gemotery.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
```

顶点着色器中接收属性：

```c#
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main()
{
    vRandom = aRandom;
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    modelPosition.z += aRandom *0.1;
    vec4 viewPosiotion = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosiotion;
    gl_Position = projectionPosition;
    // gl_Position=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.);
}
```

纹理着色器中接收：

```c#
precision mediump float;

varying float vRandom;

void main()
{
    gl_FragColor=vec4(0.5,vRandom,1.0,1.);
}
```

## 设置 uniforms

js 中设置 uniforms 数据：

```js
const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uFrequency: {
      value: 10.0,
    },
  },
});
```

顶点着色器中接收：

```c#
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uFrequency;

attribute vec3 position;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    modelPosition.z += sin(modelPosition.x * uFrequency) * 0.1; // 波浪
    vec4 viewPosiotion = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosiotion;
    gl_Position = projectionPosition;
    // gl_Position=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.);
}
```

## 发送颜色数据

```js
const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: {
      value: new THREE.Color("pink"),
    },
  },
});
```

片元着色器：

```c#
precision mediump float;

uniform vec3 uColor;

void main()
{
    gl_FragColor=vec4(uColor,1.);
}
```

## 发送纹理

```js
const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTexture: {
      value: textureFlag,
    },
  },
});
```

顶点着色器，接收 uv 坐标并发送到片元：

```c#
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main()
{
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vec4 viewPosiotion = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosiotion;
    gl_Position = projectionPosition;
}
```

片元着色器：

```c#
precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    vec4 textureColor = texture2D(uTexture,vUv);
    gl_FragColor=textureColor;
}
```
