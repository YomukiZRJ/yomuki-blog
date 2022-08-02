<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 17:13:10
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-02 17:14:07
-->
## 一、rem
rem(root em)是一个相对单位，类似于em,em据使用它的元素的大小决定（很多人错误以为是根据父类元素，实际上是使用它的元素继承了父类的属性才会产生的错觉）。
rem的基准是相对于html元素的字体大小。
例如：根元素（html）设置fonr-size=12px;非根元素设置width: 2rem;则换成px表示就是24px。
```
html {
            font-size: 24px;
        }
        .div2 {
            width: 10rem;
            height: 10rem;
            background-color: mediumorchid;
        }
```
![image.gif](https://cdn.nlark.com/yuque/0/2021/gif/12445375/1611480927951-1dc596bc-af7e-4ac3-a896-26e82a7a4e78.gif#align=left&display=inline&height=1&margin=%5Bobject%20Object%5D&name=image.gif&originHeight=1&originWidth=1&size=43&status=done&style=none&width=1)
## 二、媒体查询Media Query

- [@media](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media) 可以针对不同的屏幕尺寸设置不同的样式
- 当你重置浏览器大小的过程中，页面会根据浏览器的宽度和高度重新渲染页面
- 目前针对很多苹果、安卓手机、平板等设备都用得到多媒体查询
### 语法
```
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```
![image.gif](https://cdn.nlark.com/yuque/0/2021/gif/12445375/1611480927958-516ed501-ebd7-4c1a-8d32-3a1edb4b84db.gif#align=left&display=inline&height=1&margin=%5Bobject%20Object%5D&name=image.gif&originHeight=1&originWidth=1&size=43&status=done&style=none&width=1)

| mediatype | 媒体类型 | 
- **all **所有设备
- **print **打印机
- **screen **电脑平板智能手机
- speech 屏幕阅读器等发声设备
- 

 |
| --- | --- | --- |
| and&#124;not&#124;only | 关键字 | 关键字将媒体类型或多个媒体特性连接到一起作为媒体条件。
- and 将多个媒体特性连接到一起，“且”
- not 排除某个媒体类型，“非”，可省略
- only 指定某个特性的媒体类型，可省略
 |
| media feature | 媒体特性 | 
 |

media feature

| aspect-ratio | 视窗（viewport）的宽高比 | 
 | 

/* 最小宽高比 */
@media (min-aspect-ratio: 8/5) {
  div {
    background: #9af; /* blue */
  }
}
/* 最大宽高比 */
@media (max-aspect-ratio: 3/2) {
  div {
    background: #9ff;  /* cyan */
  }
}
/* 明确的宽高比, 放在最下部防止同时满足条件时的覆盖*/
@media (aspect-ratio: 1/1) {
  div {
    background: #f9a; /* red */
  }
} |
| --- | --- | --- | --- |
| **width** | 视窗（viewport）的宽度，包括纵向滚动条的宽度
可以使用前缀**`min-width`**和`**max-width**`分别查询最小值和最大值。
档位从小到大写 | 
 | /* 精确宽度 */
@media (width: 360px) {
  div {
    color: red;
  }
}
/* 最小宽度  大于等于*/
@media (min-width: 35rem) {
  div {
    background: yellow;
  }
}
/* 最大宽度  小于等于*/
@media (max-width: 50rem) {
  div {
    border: 2px solid blue;
  }
} |

## 引入不同的资源CSS
```
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="xxxx.css">
```
![image.gif](https://cdn.nlark.com/yuque/0/2021/gif/12445375/1611480927965-1e0535cc-5a10-466f-a48f-c274e7548697.gif#align=left&display=inline&height=1&margin=%5Bobject%20Object%5D&name=image.gif&originHeight=1&originWidth=1&size=43&status=done&style=none&width=1)

- 从小到大
- 按照不同分辨率，引入不同的布局样式
