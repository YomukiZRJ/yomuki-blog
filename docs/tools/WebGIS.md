# WebGIS

## 地图 box

### 1. [leafletjs](https://leafletjs.com/)

- [leaflet.markercluster](https://www.npmjs.com/package/leaflet.markercluster) 标记聚类
- [leaflet-heatmap.js](https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html) 热力图插件
- [@geoman-io/leaflet-geoman-free](https://www.npmjs.com/package/@geoman-io/leaflet-geoman-free) 绘图插件 leaflet.pm 的替代品
- leaflet-geosearch 地址搜索插件
- leaflet-ellipse 椭圆

### 2. [Openlayers](https://openlayers.org/)

相比于 Leaflet 更加复杂和完备。

### 3. [Cesium](https://www.cesium.com/)

三维地理可视化的常用库，在大尺度的可视化（地形、建筑、地球）中十分常用。

## helper

### 1. [@turf/turf](https://turfjs.org/)

地理空间分析引擎。输出 geojson。

## 三方封装

### 1. [supermap](http://support.supermap.com.cn:8090/iserver/iClient/forJavaScript/web/introduction/leafletDevelop.html#Ready)

云 GIS 网络客户端开发平台。开源，可拓展，支持 leafletjs，openlayers，mapboxGL...对多种互联网地图信息进行了封装，例如百度地图、天地图等。

### 2. [mars3d](http://mars3d.cn/)

WebGL&WebGIS 基于 Cesium 的三维可视化平台
