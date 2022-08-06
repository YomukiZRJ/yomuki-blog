<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-05 20:43:25
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-06 08:53:30
-->
# css相关
## CSS选择器及优先级
- 选择器
  - id选择器
  - 类选择器
  - 属性选择器
  - 伪类选择器 :hover
  - 标签选择器
  - 相邻选择器
  - 子选择器
  - 后代选择器
  - 通配符选择器*
- 优先级
  - important
  - 内联 1000
  - id选择器 0100
  - 类选择器/伪类选择器./属性选择器 0010
  - 关系选择器 通配符 0000
  - !important > 行内样式>ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性
## position
- 固定定位 fixed:基于浏览器定位。脱离文档流
- 绝对定位 absolute:基于上一个有定位的祖先元素定位。脱离文档流
- 相对定位 relative:基于自己本身定位。原生占据文档流。
- 粘性定位 sticky:基于最近的滚动祖先和最近块级祖先定位。原生占据文档流。
- 默认值 static
## 盒模型
- 标准盒模型 content-box：width，height为内容高度、宽度。
- IE盒模型 border-box：width，height包含了内容+内边距+边框
## BFC（块级格式上下文）
- 一个css布局概念，规定了区域中的box如何布局，并且这个区域的子元素不会影响到外部元素
### BFC的原理布局规则
- 内部box会在垂直方向一个接一个
- 同一个BFC中相邻两个的margin会发生重叠
- BFC的区域不会与float box重叠
- BFC是一个独立容器，里面的元素不会影响到外部元素
- 浮动元素也参与计算BFC高度
### 建立BCF
- 绝对定位 position:fixed / absolute
- display 为 inline-block、table-cells、flex
- 浮动元素：float 除 none 以外的值
- overflow 除了 visible 以外的值 (hidden、auto、scroll)
- body 根元素
### 可以解决
- 边距重叠问题（下边距重叠/上边距塌陷）
- 高度塌陷（清除浮动，当我们不给父节点设置高度，子节点设置浮动的时候，会发生高度塌陷）（计算BFC高度时浮动元素也参于计算）
- 避免某元素被浮动元素覆盖
## 清除浮动方式
- 建立BCF 父级添加overflow属性
- 建立伪类选择器清除浮动 clear:both;
## 水平垂直居中
- text-align:center;line-height; 让文字水平垂直居中
- position:absolute;top:0;right:0;left:0;bottom:0;margin:auto;  绝对定位 + marigin auto
- position:absolute;top:50%;left:50%;margin-left:-自身一半;margin-top:-自身一半；绝对定位 + margin负值
- 绝对定位 + translate
- table布局
- flex布局 display:flex;justify-content:center;(主轴)align-items:center;（交叉轴）
- grid布局 display:grid;justify-content:center;(主轴)align-items:center;（交叉轴）
## 隐藏页面元素
- opacity：0；不改变元素布局，依旧可触发点击等事件。
- visibility：hidden；不改变元素布局，不会触发事件，在文档中保留原始布局，所以只触发重绘
- display：none；影响布局，触发回流和重绘