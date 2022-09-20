# Turf 学习记录

> 相关文章：https://juejin.cn/post/6968626897156603918

Turf.js 是 MapBox 公司研发的基于浏览器端的**空间分析库**。支持 GeoJSON 矢量数据。

## MEASUREMENT 测量

- area 计算区域面积 (geojson)=>number
- centerOfMass 计算质心(质量分布的平均位置)
-

## HELPER 帮助函数

- point 创建 点特征
- multiPoint 创建一个多点特征

## JSONS 连接

- pointsWithinPolygon 点面连接，返回特征集合对象。(points,polygons)=>FeatureCollection <(Point|MultiPoint)>
