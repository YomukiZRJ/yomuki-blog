# 纹理

## 颜色纹理 Color

- 最常用的。
- **颜色**反照率纹理。
- 只会获取纹理的像素，并将它们应用到几何图形中

## 阿法尔纹理 ALPHA

- alpha 纹理是灰度图像
- 白色部分可见
- 黑色部分不可见

## 高度/位移纹理 HEIGHT / DISPLACEMENT

- 灰度图像
- **会移动顶点**
- 如果是白色，顶点向上移动
- 如果是黑色，顶点向下移动
- 如果是灰色（介于黑白之间的完美灰色），顶点不会移动
- 就可以形成类似于地面的东西（有起伏）
- 需要有足够多的顶点来形成这些**起伏**

## 法向量纹理 NORMAL

- 会添加一些小细节
- 不会移动顶点。
- 照明细节，会引诱光线认为面向的方向是不同的。
- 对于**添加细节**有良好性能，因为不需要过多的顶点。

## 环境遮蔽 Ambient occlusion

- 是灰度图像
- 在裂缝中添加假阴影
- 物理上的不准确。（所以是假阴影啦）
- 有助于创建**对比度**，查看细节

## 金属 Metalness

- 灰度图像
- 白色为金属
- 黑色为非金属
- 有助于创建反射（如果是金属，我们可以看到金属反射后面的东西）

## 粗糙度 Roughness

- 灰度图像
- 由金属 Metalness 衍生的
- 白色是粗糙的
- 黑色是光滑的
- 有助于驱散光线。
- 地毯是非常坚固的，你不会看到光线在上面反射，而水面是非常光滑的，你可以看到光线在上面反射。

## pbr 原则

以上纹理都遵循 pbr 原则。pbe 代表着物理渲染。

more about 物理渲染：

- [basic-theory-of-physically-based-rendering](https://marmoset.co/posts/basic-theory-of-physically-based-rendering/)
- [physically-based-rendering-and-you-can-too](https://marmoset.co/posts/physically-based-rendering-and-you-can-too/)

## 滤镜

## mipmapping

什么是 mipmapping？往 gpu 发送多张不同尺寸的纹理贴图，根据具体显示来决定用哪张

### `minFilter` 缩小滤镜

当纹理像素大于渲染像素时，贴图将如何采样。

比如原本纹理贴图像素和渲染的 object 一样大，然后往后移动相机，渲染的 object 变小了，纹理贴图被挤压在一小片渲染区域内，此时就会触发**缩小滤镜**。

- `THREE.LinearMipmapLinearFilter`它将使用 **mipmapping** 以及三次线性滤镜。**默认值**
- `THREE.NearestFilter` 使用最接近的纹素的值，非常清晰的，像素点更加锐利以及会闪烁。
- `THREE.LinearFilter` 获取四个最接近的纹素，并在他们之间进行双线性插值
- `THREE.NearestMipmapNearestFilter` 选择与被纹理化像素的尺寸最匹配的 mipmap， 并 NearestFilter（最靠近像素中心的纹理元素）为标准来生成纹理值。
- `THREE.NearestMipmapLinearFilter` 选择与被纹理化像素的尺寸最接近的两个 mipmap， 并以 NearestFilter 为标准来从每个 mipmap 中生成纹理值。最终的纹理值是这两个值的加权平均值。
- `THREE.LinearMipmapNearestFilter` 选择与被纹理化像素的尺寸最匹配的 mipmap， 并以 LinearFilter（最靠近像素中心的四个纹理元素的加权平均值）为标准来生成纹理值。
- `THREE.LinearMipmapLinearFilter` 选择与被纹理化像素的尺寸最接近的两个 mipmap， 并以 LinearFilter 为标准来从每个 mipmap 中生成纹理值。最终的纹理值是这两个值的加权平均值。

当不需要 mipmaps 的滤镜时，可以不要生成 mipmaps

```js
colorTexture.generateMipmaps = false;
```

### `magFilter` 放大滤镜

当纹理像素小于渲染像素时，贴图将如何采样

- `THREE.LinearFilter` 获取四个最接近的纹素，并在他们之间进行双线性插值。默认值
- `THREE.NearestFilter` 使用最接近的纹素的值 。更清晰的，高性能
  - 当为`gradientMap`时，采用这个值会让渲染时只渲染纹理里的颜色。

## 纹理文件上的优化

- `jpg` 失真压缩，小
- `png` 无损压缩，大

### 调整尺寸

此处的尺寸不是指贴图文件的大小，而是分辨率。尽可能的降低纹理图片的分辨率。

纹理的每个像素都会被存储在 GPU 上，不能一下子传送过于庞大数量的尺寸过大的纹理给 GPU，需要尽可能的缩小纹理的尺寸。

### 保持分辨率为 2 的幂次方

如果不这样做，渲染时候进行 **mipmap** 时 Three.js 会尝试通过将图像调整到最接近 2 的幂次方的分辨率来修复此问题，但此过程将占用资源，并可能导致质量较差的纹理贴图效果。

### 降低纹理文件大小

虽然文件大小并不会影响 GPU 的内存使用情况，但是可以有效的减少加载时间。

可以使用 TinyPNG 等在线工具来进一步减轻文件大小。

可以尝试特殊的格式 [`.basis`](https://github.com/BinomialLLC/basis_universal) ，它是一种类似.jpg 和.png 的格式，但压缩功能更强，GPU 更容易读取该格式。

## 纹理代码上的优化

### mipmap

当`Texture.minFilter`（缩小滤镜）选择没有使用**mipmap**的滤镜时，可以关闭**mipmap**的生成：

```js
texture.generateMipmaps = false;
```
