# GeoJSON

> [中文网](https://www.oschina.net/translate/geojson-spec),[文章 1](https://juejin.cn/post/6844903954669633544)

[GeoJSON](https://geojson.org/) 是一种用于编码各种地理数据结构的格式。

> 规范 ([RFC 7946](https://www.rfc-editor.org/rfc/rfc7946))

## GeoJSON 对象

GeoJSON 对象可以表示**几何**、**特征**或者**特征集合**。

- 几何：点、线、面、多点、多线、多面和几何集合(GeometryCollection)
- 特征：包含一个几何对象和其他属性(Feature)
- 特征集合：一系列特征(FeatureCollection)
  GeoJSON 对象属性：
- **type**：必须的。type 的值必须是下面之一："Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection", "Feature", 或者 "FeatureCollection"。
- crs：可选的。坐标参考系统对象
- bbox：可选的。边界框数组

## 几何(Geometry)对象

GeoJSON 支持以下几何类型：Point，MultiPoint，LineString，MultiLineString，Polygon，和 MultiPolygon。  
对象属性：

- **coordinates**：必有的。坐标点数组。

### Point - 点

一个位置

```js
{ "type": "Point", "coordinates": [100.0, 0.0] }
```

### MultiPoint - 多点

多个位置

```js
{
    "type": "MultiPoint",
    "coordinates": [
        [ 100, 0 ],
        [ 101, 1 ]
    ]
}
```

### LineString - 线

两个或者多个位置的数组。线性环市具有 4 个或者更多位置的封闭的线。第一个和最后一个位置是相等的（它们表示相同的的点）。

```js
{
    "type": "LineString",
    "coordinates": [
        [ 100, 0 ],
        [ 101, 1 ]
    ]
}
```

### MultiLineString - 多线

```js
{
    "type": "MultiLineString",
    "coordinates": [
        [ [100.0, 0.0], [101.0, 1.0] ],
        [ [102.0, 2.0], [103.0, 3.0] ]
    ]
}
```

### Polygon - 面

一个线性环坐标数组。对拥有多个环的的面来说，第一个环必须是外部环，其他的必须是内部环或者孔。

```js
// 没有孔
{
    "type": "Polygon",
    "coordinates": [
        [
            [ 100, 0 ],
            [ 101, 0 ],
            [ 101, 1 ],
            [ 100, 1 ],
            [ 100, 0 ]
        ]
    ]
}‘

// 有空
{
    "type": "Polygon",
    "coordinates": [
        [
            [ 100, 0 ],
            [ 101, 0 ],
            [ 101, 1 ],
            [ 100, 1 ],
            [ 100, 0 ]
        ],
        [
            [ 100.2, 0.2 ],
            [ 100.8, 0.2 ],
            [ 100.8, 0.8 ],
            [ 100.2, 0.8 ],
            [ 100.2, 0.2 ]
        ]
    ]
}
```

### MultiPolygon - 多面

面坐标数组的数组

```js
{
  "type": "MultiPolygon",
  "coordinates":
    [
        [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
        [
            [
                [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]
            ],
            [
                [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]
            ]
        ]
    ]
}
```

## 几何集合(GeometryCollection)

对象属性：

- **geometries**：必有的。包含几何对象的集合

```js
{ "type": "GeometryCollection",
  "geometries": [
    { "type": "Point",
      "coordinates": [100.0, 0.0]
      },
    { "type": "LineString",
      "coordinates": [ [101.0, 0.0], [102.0, 1.0] ]
      }
  ]
}
```

## 特征对象(Feature)

对象属性：

- **geometry**：必有的。值为几何对象或 null
- **properties**：必有的。对象或 null

```js
{
    "type":"Feature",
    "properties":{},
    "geometry":{ "type": "Point", "coordinates": [100.0, 0.0] }
}

```

## 特征集合对象(FeatureCollection)

对象属性：

- **features**：必有的。是一个数组，包含特征对象的集合。

```js
{
  "type": "FeatureCollection",
  "features": []
}
```

## 坐标参考系统对象

- 默认的 CRS 是地理坐标参考系统，使用的是 WGS84 数据，长度和高度的单位是十进制标示。
- 名字为"crs"成员的值必须是 JSON 对象（指的是下面的 CRS 对象）或者 JSON 的 null。如果 CRS 的值为 null,那么就假设没有 CRS 了。
- crs 成员应当位于（特征集合、特征、几何的顺序的）层级结构里 GeoJSON 对象的**最顶级**，而且在自对象或者孙子对象里不应该重复或者覆盖。
- 非空的 CRS 对象有两个强制拥有的对象:**"type"** 和 **"properties"**。
- type 成员的值必须是字符串，这个字符串说明了 CRS 对象的类型。
- 属性成员的值必须是对象。
- CRS 应不能更改坐标(coordinates)顺序

### name crs

```js
{
    "type": "name",
    "properties": {
        "name": "urn:ogc:def:crs:EPSG::4326"
    }
}
```

### link crs

```js
"crs": {
  "type": "link",
  "properties": {
    "href": "http://example.com/crs/42", // data.crs 使用本地文件也行
    "type": "proj4" // URI里用来表示CRS参数的格式。建议值是:"proj4","ogcwkt",esriwkt",不过可以使用其他值
    }
  }
```

## 边界框

bbox：坐标范围信息。它的值为 2\*n 数组，这儿 n 是所包含几何对象的维数，并且所有坐标轴的最低值后面跟着最高者值。  
bbox 的坐标轴的顺序遵循几何坐标轴的顺序。除此之外，bbox 的坐标参考系统假设匹配它所在 GeoJSON 对象的坐标参考系统。

## 生成器

- [中国 geojson](http://datav.aliyun.com/portal/school/atlas/area_selector#&lat=33.521903996156105&lng=104.29849999999999&zoom=4)
- [geojson.io](http://geojson.io/#map=2/20.0/0.0)
