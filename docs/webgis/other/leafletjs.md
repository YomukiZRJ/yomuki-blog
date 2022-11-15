# leafletjs 学习记录

[leafletjs](https://leafletjs.com/)，一个移动友好的交互式地图。

> 学习参考 1：https://juejin.cn/post/7007432493569671182

## 瓦片数据源

### 什么是瓦片层？

一个超过屏幕大小的大地图，将它的每一块地形对应一张很小的图片，我们称这些小图片为瓦片。把这些瓦片拼接起来，就是完整的地图。  
![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3116203bff944e1bd569a3e2af5cd94~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)  
**瓦片地图金字塔模型**是一种多分辨率层次模型，从瓦片金字塔的底层到顶层，分辨率越来越低，但表示的地理范围不变。  
把缩放级别最高，地图尺寸最大的地图图片作为金字塔的底层（第 0 层），对其进行分块，分块从**左上角开始，从左至右，从上至下**，分割为相同大小的正方形地图瓦片，形成第 0 层瓦片矩阵。  
在第 0 层的基础上，按每像素分割为 2x2 的方法生成第 1 层地图图片，并对其分块。

- 由第 n 层的图片层 生成 第 n 层瓦片矩阵
- 第 n 层的图片层 由 第 n-1 层的图片层每个像素\*2 而来。（放大一倍）
- 总共有 N-1 层（N：地图服务平台所提供的缩放级别的数量）

瓦片地图一般采用 zyx 规范的地图瓦片。（瓦片层级，瓦片 x 坐标，瓦片 y 坐标）

- [瓦片图数据存储说明](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/Subject_introduce/Cache/MapCache/TileFormat/ZXY_format.htm)

### 瓦片数据源如何获取？

使用生成工具

- [Tiled](https://www.mapeditor.org/)
- [arcgis](https://developers.arcgis.com/)
- [天地图](http://lbs.tianditu.gov.cn/server/MapService.html)

## [map](https://leafletjs.cn/reference.html#icon)

创建并操作地图。

```js
var map = L.map("map", {
  center: [51.505, -0.09],
  zoom: 13,
});
```

- 第一个参数为**元素 id**

### options

- crs 地图使用的坐标系。
- center 中心点位
- zomm 缩放等级
- attributionControl 是否显示版权控件 default.true
- zoomControl 是否显示缩放控件 default.true

### methods

- addLayer(Layer) 将图层/图层组添加到地图上
- removeLayer(Layer) 移除图层/图层组

## [TileLayer](https://leafletjs.cn/reference.html#tilelayer)

用于在地图上加载和显示瓦片图层。

```js
L.tilelayer(<String> urlTemplate, <TileLayer options> options?)
L.tileLayer('https://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
// {foo} 为自定义拓展参数
```

### urlTemplate

z,x,y 固定参数，对应瓦片地图  
s 固定参数，对应 options.subdomains

### TileLayer options

- minZoom/maxZoom 最小最大缩放级别 default 0/18
- subdomains 瓦片服务的子域
- errorTileUrl 载入失败时显示的瓦片图片 URL
- zoomOffset 平铺 URL 中使用的缩放数字将与此发生偏移

## layerGroup 图层组

用于将几个图层分组并作为一个整体处理。如果你把它添加到地图上，任何从该组中添加或删除的图层也会在地图上添加/删除。

> 一般用于合并底图图层和标注图层，合并 markets。

```js
L.layerGroup([
  // 天地图矢量地图
  L.tileLayer(
    "http://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=您的密钥",
    {
      maxZoom: 17,
      minZoom: 5,
      tileSize: 256,
      zoomOffset: 1,
    }
  ),
  // 天地图矢量标注
  L.tileLayer(
    "http://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=您的密钥",
    {
      maxZoom: 17,
      minZoom: 5,
      tileSize: 256,
      zoomOffset: 1,
    }
  ),
]);
```

## [Icon](https://leafletjs.cn/reference.html#icon) 图标

创建图标对象。

## [marker](https://leafletjs.cn/reference.html#marker) 标记
