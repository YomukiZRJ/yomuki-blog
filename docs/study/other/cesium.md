# Cesium 学习记录

三维地图。  
相关资料：

- [cesium 中文网](http://cesium.xin/)
- [在线示例代码](https://sandcastle.cesium.com/)
- [让 GIS 三维可视化变得简单-初识 Cesium](https://juejin.cn/post/6854573221191090189)
- [沙箱权限问题](https://blog.csdn.net/ganggun/article/details/124825612)
- [Cesium 加载在线地图服务](https://juejin.cn/post/7095293961283043336)

## [快速开始](https://www.cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/)

```
npm i cesium
```

在 webpack 中配置静态文件

```js
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";
		/**
		 * 复制静态资源至
		 */
		new CopyWebpackPlugin({
			patterns: [
				// cesium的工作栈
				{ from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
				// cesium的静态资源（图片,json数据）
				{ from: path.join(cesiumSource, "Assets"), to: "Assets" },
				// cesium的控件
				{ from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
			],
		}),
		new webpack.DefinePlugin({
			// cesium 静态资源路径
			CESIUM_BASE_URL: JSON.stringify(""),
		}),
```

引入样式

```js
// Cesium 可视化控件样式
import "cesium/Build/Cesium/Widgets/widgets.css";
```

渲染

```js
<template>
	<div id="map"></div>
</template>

<script setup>
import { Viewer } from "cesium";
import { onMounted } from "vue";
function initMap() {
	const mapView = new Viewer("map");
}
onMounted(() => {
	initMap();
});
</script>

<style lang="less">
#map {
	width: 100%;
	height: 100%;
}
</style>
```

> Blocked script execution in 'about:blank' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.

因为 infoBox 是 iframe，H5 的新安全机制不允许在其中执行脚本。  
解决方案 1：不使用 infoBox

```js
function initMap() {
  const mapView = new Viewer("map", {
    infoBox: false,
  });
}
```

解决方案 2：设置沙箱的权限

```js
function setIframeOption() {
  const iframe = document.getElementsByClassName("cesium-infoBox-iframe")[0];
  iframe.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms");
  iframe.setAttribute("src", "");
}
```

![img](https://assets.yomuki.com/md/Xnip2022-09-23_13-49-57.jpg)  
页面上的工具控制：

```js
function initMap() {
  const mapView = new Viewer("map", {
    infoBox: false, // 关闭infobox
    geocoder: true, // 右上工具 - 查找位置
    homeButton: true, //  右上工具 - 返回初始镜头
    sceneModePicker: true, // 右上工具 - 选择视角模式 2D/3D
    baseLayerPicker: true, // 右上工具 - 图形选择器。选择地图服务和地形服务
    navigationHelpButton: true, // 右上工具 - 帮助导航
    animation: true, // 左下工具 - 动画工具。控制视图播放速度
    timeline: true, // 正下工具 - 时间线。指示当前时间，提供时间跳转。
    fullscreenButton: true, // 右下工具 - 全屏按钮。
  });
}
```

## 添加形状

```js
const entity = new Entity({
  // @see http://cesium.xin/cesium/cn/Documentation1.95/Entity.html
  name: "这是一个实体",
  // @see http://cesium.xin/cesium/cn/Documentation1.95/Cartesian3.html
  position: Cartesian3.fromDegrees(-107.0, 40.0, 300000.0), // 指定实体位置
  // 实体框
  box: {
    // @see http://cesium.xin/cesium/cn/Documentation1.95/BoxGraphics.html#.ConstructorOptions
    dimensions: new Cartesian3(400000.0, 300000.0, 500000.0), // 指定框的长度、宽度、高度
    // color @see http://cesium.xin/cesium/cn/Documentation1.95/Color.html
    material: Color.RED.withAlpha(0.8), // 填充框的材料
    outline: true, // 指定框是否为轮廓
    outlineColor: Color.GREEN, // 指定轮廓颜色
  },
});
window.mapView.entities.add(entity);
```

![img](https://assets.yomuki.com/md/Xnip2022-09-23_15-23-46.jpg)

## 载入地图

所使用到的 API：

- [WebMapServiceImageryProvider](http://cesium.xin/cesium/cn/Documentation1.95/WebMapServiceImageryProvider.html) 提供由 Web 地图服务 (WMS) 服务器托管的平铺图像

## 常用 API

### [Cartesian3](http://cesium.xin/cesium/cn/Documentation1.95/Cartesian3.html) 3D 笛卡尔坐标点

fromDegrees (longitude, latitude[, height , ellipsoid , result] ) → Cartesian3

- 经纬度->Cartesian3  
  fromDegreesArray (coordinates[, ellipsoid , result] ) → Array.< Cartesian3 >
- 经纬度数组 -> Cartesian3 数组

### [Color](http://cesium.xin/cesium/cn/Documentation1.95/Color.html) 颜色
