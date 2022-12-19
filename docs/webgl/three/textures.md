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

## 正常纹理 NORMAL

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
