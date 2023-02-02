# 工具函数

## 随机数

[随机数函数](https://thebookofshaders.com/10/)

```c#
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
```

## 2d 旋转矩阵

```c#
mat2 rotate2d(float _angle){
    return mat2(
                cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
```
