# 容器属性
```css
display: grid;
```
默认情况下，容器元素都是块级元素，但也可以设成行内元素。 inline-gird
注意，设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

### 行列grid-template-columns /grid-template-rows 

`grid-template-columns`属性定义每一列的列宽，`grid-template-rows`属性定义每一行的行高。
可用绝对单位/百分比/**repeat()/auto-fill/fr**
#### repeat
grid-template-rows: **repeat**(3,30px);
```
grid-template-columns: repeat(2, 100px 20px 80px);
```
#### auto-fill
每列宽度`100px`，然后自动填充，直到容器不能放置更多的列。
```
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```
#### fr
为了方便表示比例关系，网格布局提供了`fr`关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍。
```css
grid-template-columns: repeat(12, 1fr);
grid-template-rows: 50px 1fr 50px;
```
#### minmax()
`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。
```
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
```
#### auto 关键字
由浏览器自己决定长度。
```
grid-template-columns: 100px auto 100px;
```
#### 网格线的名称
`grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。
```
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```
上面代码指定网格布局为3行 x 3列，因此有4根垂直网格线和4根水平网格线。方括号里面依次是这八根线的名字。
网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`。
#### 布局实例
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grid</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }
        html,body {
            height: 100%;
        }
        .container {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: 50px 1fr 50px;
            height: 100%;
        }
        .header {
            grid-column: span 12;
            background-color: crimson;
        }
        .menu {
            grid-column: span 2;
            background-color: darkblue;
        }
        .main {
            grid-column: span 10;
            background-color: darkcyan;
        }
        .footer {
            grid-column: span 12;
            background-color: cyan;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header"></div>
        <div class="menu"></div>
        <div class="main"></div>
        <div class="footer"></div>
    </div>
</body>
</html>
```
![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478096057-80bd2182-0a4b-4c2c-86a8-612201f27283.png#align=left&display=inline&height=452&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=904&originWidth=1462&size=10350&status=done&style=none&width=731)
### 间距grid-row-gap/grid-column-gap/grid-gap
`grid-row-gap`属性设置行与行的间隔（行间距），`grid-column-gap`属性设置列与列的间隔（列间距）。
```
grid-gap: <grid-row-gap> <grid-column-gap>;
```
如果`grid-gap`省略了第二个值，浏览器认为第二个值等于第一个值。
根据最新标准，上面三个属性名的`grid-`前缀已经删除，`grid-column-gap`和`grid-row-gap`写成`column-gap`和`row-gap`，`grid-gap`写成`gap`。
### 区域grid-template-areas
网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域。
```
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
```
### 排列grid-auto-flow
划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。
这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"。
`row` ![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478460300-d37d1e20-8cf1-4dd8-948a-69d155f86820.png#align=left&display=inline&height=104&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=208&originWidth=207&size=3699&status=done&style=none&width=103.5)![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478889403-eabd2d21-d9eb-4ff0-b0c4-126ea28ff315.png#align=left&display=inline&height=108&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=215&originWidth=720&size=3772&status=done&style=none&width=360)
`column![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478426366-f0db851f-d861-4d05-b945-19c207f93b3a.png#align=left&display=inline&height=103&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=205&originWidth=216&size=3667&status=done&style=none&width=108)![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478939096-82d327fa-4405-4983-880f-061080b1bd90.png#align=left&display=inline&height=77&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=154&originWidth=769&size=3483&status=done&style=none&width=384.5)`
`row dense 表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。`
![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478968608-b35dfa66-8de4-4177-821c-8ed3b8fbd3d0.png#align=left&display=inline&height=113&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=225&originWidth=770&size=3785&status=done&style=none&width=385)
`column dense`
![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611479004208-8523365e-4ad0-40ae-a2b0-6c51218dfd86.png#align=left&display=inline&height=88&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=175&originWidth=770&size=3709&status=done&style=none&width=385)
### justify-items /align-items /place-items 
`justify-items`属性设置单元格内容的水平位置（左中右），`align-items`属性设置单元格内容的垂直位置（上中下）。
```
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```
> - start：对齐单元格的起始边缘。
> - end：对齐单元格的结束边缘。
> - center：单元格内部居中。
> - stretch：拉伸，占满单元格的整个宽度（默认值）。

```
place-items: <align-items> <justify-items>;
```
如果省略第二个值，则浏览器认为与第一个值相等。
### justify-content /align-content /place-content 
`justify-content`属性是整个内容区域在容器里面的水平位置（左中右），`align-content`属性是整个内容区域的垂直位置（上中下）。
```
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```
> - start - 对齐容器的起始边框。

![](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611479466763-66984598-63b3-4d60-8fa7-f9382a8918af.png#align=left&display=inline&height=349&margin=%5Bobject%20Object%5D&originHeight=349&originWidth=582&size=0&status=done&style=none&width=582)
> - end - 对齐容器的结束边框。

![](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611479467101-bf7f593b-edc6-43b9-8f66-9dd240661e6a.png#align=left&display=inline&height=334&margin=%5Bobject%20Object%5D&originHeight=334&originWidth=591&size=0&status=done&style=none&width=591)
> - center - 容器内部居中。

![](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611479467104-1f2cced2-1c57-4bb4-a5f8-ce3f75dcbe30.png#align=left&display=inline&height=331&margin=%5Bobject%20Object%5D&originHeight=331&originWidth=578&size=0&status=done&style=none&width=578)
> - stretch - 项目大小没有指定时，拉伸占据整个网格容器。

![](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611479467145-34ba8586-3bc1-4cd7-8491-244f8307e0ed.png#align=left&display=inline&height=343&margin=%5Bobject%20Object%5D&originHeight=343&originWidth=592&size=0&status=done&style=none&width=592)
> - space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。

![](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611479467146-b9020ada-fcfc-4d93-b095-a3adbb7538c4.png#align=left&display=inline&height=338&margin=%5Bobject%20Object%5D&originHeight=338&originWidth=575&size=0&status=done&style=none&width=575)
> - space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。

![](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611479467605-e75a0241-0749-466f-b150-b4a0f69a53dd.png#align=left&display=inline&height=340&margin=%5Bobject%20Object%5D&originHeight=340&originWidth=575&size=0&status=done&style=none&width=575)
> - space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

![](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611479467166-920409d7-b66c-4100-84d1-a118ab1f6bd7.png#align=left&display=inline&height=337&margin=%5Bobject%20Object%5D&originHeight=337&originWidth=588&size=0&status=done&style=none&width=588)
`place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。
```
place-content: <align-content> <justify-content>
```
下面是一个例子。
```
place-content: space-around space-evenly;
```
如果省略第二个值，浏览器就会假定第二个值等于第一个值。
### grid-auto-columns /grid-auto-rows 
`grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。
```css
#container{
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-rows: 50px; 
}

.item {
  font-size: 2em;
  text-align: center;
  border: 1px solid #e5e4e9;
}

.item-1 {
  background-color: #ef342a;
}

.item-2 {
  background-color: #f68f26;
}

.item-3 {
  background-color: #4ba946;
}

.item-4 {
  background-color: #0376c2;
}

.item-5 {
  background-color: #c077af;
}

.item-6 {
  background-color: #f8d29d;
}

.item-7 {
  background-color: #b5a87f;
}

.item-8 {
  background-color: #d0e4a9;
  grid-row-start: 4;
  grid-column-start: 2;
}

.item-9 {
  background-color: #4dc7ec;
  grid-row-start: 5;
  grid-column-start: 3;
}
```
### grid-template /grid
`grid-template`属性是`grid-template-columns`、`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式。
`grid`属性是`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、  `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。
# 项目属性
### grid-column-start grid-column-end grid-row-start grid-row-end 
项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。
> - `grid-column-start`属性：左边框所在的垂直网格线
> - `grid-column-end`属性：右边框所在的垂直网格线
> - `grid-row-start`属性：上边框所在的水平网格线
> - `grid-row-end`属性：下边框所在的水平网格线

```
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}
```
![](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611479977197-4b0cbe9d-88a3-4c05-8011-7482ab70bc22.png#align=left&display=inline&height=508&margin=%5Bobject%20Object%5D&originHeight=508&originWidth=386&size=0&status=done&style=none&width=386)
```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>环绕式布局</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .container {
            display: grid;
            grid-template-columns: repeat(3,100px);
            grid-template-rows: repeat(3,100px);
            gap: 10px;
        }
        .container > div {
            background-color: darksalmon;
        }
        .item1 {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 4;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="item1">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
    </div>
</body>
</html>
```
![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611480346632-381aec6f-9c4e-421c-8451-80823e811372.png#align=left&display=inline&height=246&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=491&originWidth=493&size=5657&status=done&style=none&width=246.5)
这四个属性的值，除了指定为第几个网格线，还可以指定为网格线的名字。
```
.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
}
```
这四个属性的值还可以使用`span`关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。
```
.item-1 {
  grid-column-start: span 2;
}
```
### grid-column /grid-row 
`grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，`grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。
```
.item {
  grid-column: <start-line> / <end-line>;
  grid-row: <start-line> / <end-line>;
}
```
```
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```
```
.item-1 {
  background: #b03532;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
/* 等同于 */
.item-1 {
  background: #b03532;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
```
### grid-area
`grid-area`属性指定项目放在哪一个区域。
```
.item-1 {
  grid-area: e;
}
```
`grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。
```
.item {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```
### justify-self ，align-self ，place-self 
`justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。
`align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。
```
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```
这两个属性都可以取下面四个值。
> - start：对齐单元格的起始边缘。
> - end：对齐单元格的结束边缘。
> - center：单元格内部居中。
> - stretch：拉伸，占满单元格的整个宽度（默认值）。

