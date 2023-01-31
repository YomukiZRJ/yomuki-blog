# 用着色器画图形

## 画个圆

### 锐利的边缘

```c#
float strength = distance(gl_PointCoord, vec2(0.5));
strength = step(0.5,strength); // 锐化边缘
strength = 1.0 - strength; // 反一下
gl_FragColor = vec4(vec3(strength), 1.0);
```

### 模糊的边缘

```c#
float strength = distance(gl_PointCoord, vec2(0.5)); // 此时这个值的范围是 0-0.5
strength *= 2.0;// 此时这个值的范围是 0-1
strength = 1.0 - strength; // 反一下
gl_FragColor = vec4(vec3(strength), 1.0);
```

### 发光的圆

```c#
float strength = distance(gl_PointCoord, vec2(0.5));
strength = 1.0 - strength;
strength = pow(strength,10.0); // 幂函数
```
