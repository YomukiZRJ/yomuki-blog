# 内置变量

## gl_Position - Vertex

顶点的**裁剪坐标系坐标**，包含 X, Y, Z，W 四个坐标分量，顶点着色器接收到这个坐标之后，对它进行透视除法，即将各个分量同时除以 W，转换成 **NDC 坐标**，NDC 坐标每个分量的取值范围都在【-1, 1】之间，GPU 获取这个属性值作为顶点的最终位置进行绘制。

## gl_PointSize - Vertex

```c#
mediump float gl_PointSize;
```

点大小。在不同设备下，由于设备的像素比可能不同，显示出来的大小可能也会不同。

在 three 中可以通过以下方式格式化：

```js
material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    uSize: {
      value: 8.0 * renderer.getPixelRatio(), // 处理不同设备下的像素比问题
    },
  },
});
```

## gl_FragColor - Fragment

片元颜色，包含 R,G,B,A 四个颜色分量，且每个分量的取值范围在【0,1】之间，不同于我们常规颜色的【0，255】取值范范围，赋值时，也需要对其进行转换。

转换公式为： (R 值/255，G 值/255，B 值/255，A 值/1）。

## gl_FragCoord - Fragment

```c#
mediump vec4 gl_FragCoord;
```

## gl_PointCoord - Fragment

```c#
mediump vec2 gl_PointCoord;
```

**只读**的。其值由 OpenGL ES 2.0 流水线根据点精灵的位置和半径计算和分配。可以用来当粒子的`uv坐标`，用它来画各种图形。

```c#
gl_FragColor = vec4(gl_PointCoord,1.0, 1.0);
```
