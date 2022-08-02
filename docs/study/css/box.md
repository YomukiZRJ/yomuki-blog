<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 17:25:09
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-02 17:26:14
-->
BoxModel。所有的HTML元素可以看成是盒子。
一个盒子中主要的属性就5个：width、height、padding、border、margin。（即边距，边框，填充，和实际内容）
分为 标准盒子模型 （width仅是内容宽）和 IE盒子模型（width含边框和内边距）
通过box-sizing属性设置。

## 标准盒子模型 content-box

![](https://cdn.nlark.com/yuque/0/2021/jpeg/12445375/1611464401693-f6dba115-fd23-4a4c-a9d4-17f60a012b2f.jpeg#align=left&display=inline&height=523&margin=%5Bobject%20Object%5D&originHeight=523&originWidth=774&size=0&status=done&style=none&width=774)
**盒子总宽度/高度 = width +padding + border +margin (即weight和height是内容宽高)**
## IE盒子模型 border-box
![](https://cdn.nlark.com/yuque/0/2021/jpeg/12445375/1611464873844-8306e7a0-2ac5-4531-a87a-eba0e9307c4a.jpeg#align=left&display=inline&height=507&margin=%5Bobject%20Object%5D&originHeight=507&originWidth=761&size=0&status=done&style=none&width=761)
**盒子总宽/高 = width/height + margin (即wdith/height包含了border和padding)**
## 代码对比
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>盒子模型</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .div1{
            width: 100px;
            height: 100px;
            padding: 10px;
            margin: 10px;
            border: 1px solid #000; 
        }

        .div2{
            width: 100px;
            height: 100px;
            padding: 10px;
            margin: 10px;
            border: 1px solid #000; 
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div class="div1">context-box</div>
    <div class="div2">border-box</div>
</body>
</html>
```
## ![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611465424901-73dcd6db-a9ca-408b-8385-8e7e61683fa2.png#align=left&display=inline&height=99&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=198&originWidth=241&size=6081&status=done&style=none&width=120.5)![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611465434676-ccee59c7-4abf-444c-8936-488f2ff8b52c.png#align=left&display=inline&height=98&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=195&originWidth=237&size=5801&status=done&style=none&width=118.5)
## JS获取盒模型宽高

- dom.style.width/height ； 获取**行内样式**的宽高，style标签和外链的获取不到。
- [window.getComputedStyle(dom)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle).width; 取得样式定义里的width/height (带单位的字符串) **IE9+。**
- [dom.currentStyle.width](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/currentStyle)；和上面一样。这个属性实现在**旧版本的IE**浏览器中。
- [dom.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect).width ; 得到渲染后宽高（内容+边框+内边距），返回的是不带单位的数值。 **IE9+**
- [dom.offsetWidth ](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth)测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。返回的是不带单位的数值 .兼容性比较好。
## 题目
子元素高度100px，上边距10px，求父元素的实际高度。
```css
			.father {
            width: 100px;
            background-color: antiquewhite;
            /* overflow: hidden; */
        }
        .son {
            width: 100px;
            height: 100px;
            background-color: aqua;
            margin-top: 10px;
        }
```

- 父元素添加 overflow: hidden; 则父元素高度为110px 。（给父元素创建了BFC，块级格式化上下文）
- 父元素不加 overflow: hidden; 则父元素高度为100px
