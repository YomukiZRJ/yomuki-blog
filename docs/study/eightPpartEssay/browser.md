<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-05 19:46:49
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-12 14:25:05
-->
# 浏览器相关
## cookie，sessionStorage,localStorage的区别
- 相同点
  - 存储在**客户端**
- 不同点
  - **大小** cookie的数据不超过4K，localStorage和sessionStorage的数据可达5M
  - **时效** cookie可以设置过期时间，在过期时间内一直有效。localStorage永久存储。sessionStorage是单次会话存储，即关闭窗口就删除了。
  - **传递** cookie的数据可以传递到服务器。其他两个是本地。
## 从输入URL到页面载入的全过程
1. 输入URL
2. 查找缓存
    - 浏览器先查看 浏览器缓存 -> 系统缓存 -> 路由缓存 是否有该地址页面。yes:showPage;no:next()
3. DNS域名解析
    - 浏览器向DNS服务器发起请求，解析域名对应的IP
4. 建立TCP连接
5. 发起HTTP请求
    - 浏览器发起读取文件的HTTP请求，该请求报文作为TCP三次握手中的第三次数据发送给TCP
6. 服务器相应请求并返回
    - 返回HTML文件
7. 关闭TCP连接
     - 通过四次挥手释放TCP
8. 浏览器渲染
     - 构建DOM树，由dom元素和属性节点组成。构建CSS规则树。
     - 将DOM树和CSS规则树 组合为 渲染树
     - 计算出每一个渲染树的节点在屏幕中的位置
     - 遍历渲染树，绘制节点
9.  JS引擎解析
    - 创建window对象
    - 加载文件
      - js引擎分析语法和词法是否合法，yes:预编译
    - 预编译
      - 寻找全局变量和函数，进行提升
    - 解释执行
## 图层
- 浏览器在渲染一个页面时，会将页面分为很多个图层，图层有大有小，每个图层上有一个或多个节点。
- Chrome浏览器满足以下任意情况就会创建图层：
  - 拥有具有3D变换的CSS属性
  - 使用加速视频解码的video节点
  - canvas
  - CSS3动画的节点
  - 拥有CSS加速属性的元素(will-change)
- 可在开发者工具中开启图层观察
## 重排（回流）和重绘
- **重排（回流）**：DOM的变化影响到了元素的几何信息，导致浏览器需要重新计算元素的几何属性，重新生成布局排列元素。
- **重绘**：一个元素外观改变，但没有影响到布局，重新将元素绘制出来
### 如何触发
- 增删改DOM节点 
- 通过display: none隐藏一个DOM节点-触发重排和重绘
- 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化
- 用户行为，缩放窗口
- 修改元素样式表 width height position
### 如何避免
- 避免频繁读取会引发回流/重绘的属性
  - 浏览器会维护队列，将引起回流和重绘的操作放入队列中，如果队列的数量或时间间隔达到一个阈值，浏览器将会清空队列，进行一次批处理。
  - 以下方法或属性会导致队列立即清空
  - clientWidth,clientHeight,clientTop,clientLeft
  - offsetWidth ,offsetHeight,offsetTop,offsetLeft
  - scrollWidth,scrollHeight,scrollTop,scrollLeft
  - width,height
  - getComputedStyle()
  - getBoundingClientRect()
- 避免频繁操作DOM
- 少使用table布局
- 动画开启GPU加速，translate使用3D变化
- 提升为合成层
  - 将元素提升为合成层有以下优点：
    - 合成层的位图，会交由 GPU 合成，比 CPU 处理要快
    - 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
    - 对于 transform 和 opacity 效果，不会触发 layout 和 paint
  - 提升合成层的最好方式是使用 CSS 的 will-change 属性：
```css
#target {
  will-change: transform;
}
```