# 内置函数

## common

### step

```c#
float step(float edge, float x)
vec2 step(vec2 edge, vec2 x)
vec3 step(vec3 edge, vec3 x)
vec4 step(vec4 edge, vec4 x)
```

如果 x 小于 edge，则 step 函数返回 0.0，否则返回 1.0。

- 色阶

```c#
float strength = mod(vUv.y * 10.0,1.0);
strength = step(0.5,strength);
```

### mod

```c#
float mod(float x, float y)
vec2 mod(vec2 x, vec2 y)
vec3 mod(vec3 x, vec3 y)
vec4 mod(vec4 x, vec4 y)
```

Mod 函数返回 x 减去 y 和 floor (x/y)的乘积。

### floor

```c#
float floor(float x)
vec2 floor(vec2 x)
vec3 floor(vec3 x)
vec4 floor(vec4 x)
```

函数返回小于或等于 x 的最大整数。

### clamp

```c#
float clamp(float x, float minVal, float maxVal)
vec2 clamp(vec2 x, vec2 minVal, vec2 maxVal)
vec3 clamp(vec3 x, vec3 minVal, vec3 maxVal)
vec4 clamp(vec4 x, vec4 minVal, vec4 maxVal)
```

大于 minVal，小于 maxVal，则返回 x。如果 x 小于 minVal，则返回 minVal。如果 x 大于 maxVal，则返回 maxVal。

## power

### pow

```c#
float pow(float x, float y)
vec2 pow(vec2 x, vec2 y)
vec3 pow(vec3 x, vec3 y)
vec4 pow(vec4 x, vec4 y)
```

幂函数返回 x 的幂。

## 几何

### length

```c#
float length(float x)
float length(vec2 x)
float length(vec3 x)
float length(vec4 x)
```

函数返回由欧几里德范数定义的向量的长度，即平方分量和的平方根。

### distance

```c#
float distance(float p0, float p1)
float distance(vec2 p0, vec2 p1)
float distance(vec3 p0, vec3 p1)
float distance(vec4 p0, vec4 p1)
```

距离函数返回两点之间的距离。两点的距离是向量 d = p0-p1 的长度，从 p1 开始，指向 p0。

## 纹理

- `texture2D`
  - 第一个参数是 `sampler2D`
  - 第二个参数是 uv 坐标（vec2）
