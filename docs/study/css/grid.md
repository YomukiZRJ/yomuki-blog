# grid - 网格布局

[图解 CSS Grid 布局](https://mp.weixin.qq.com/s/dQvrijZxOMJjzwuUZGbQGw)

```css
display: grid;
```

默认情况下，网格容器都是块级元素，但也可以设成行内元素。 inline-gird  
注意，设为网格布局以后，网格项（容器子元素）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

## 网格容器属性

### 行列 grid-template-columns / grid-template-rows

`grid-template-columns` 定义列宽

`grid-template-rows` 定义行高

可用绝对单位/百分比/**repeat()/auto-fill/fr**

```css
.grid-1 {
  /* 列宽 */
  grid-template-columns: 25% 25% 25% 25%;
  /* 行宽 */
  grid-template-rows: 25% 25% 25%;
}
```

还可以用方括号定义每一条网格线名称,网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`。

```css
.grid-1 {
  /* 列宽 */
  grid-template-columns: [c1] 25% [c2] 25% [c3] 25% [c4] 25% [c5];
  /* 行宽 */
  grid-template-rows: [r1] 25% [r2] 25% [r3] 25% [r4];
}
```

### 网格区域 grid-template-areas

`grid-template-areas` 定义网格区域。
| 值 | 说明 |
| -------------- | --------------------------------- |
| grid-area-name | 使用`grid-area`设置的网格区域名称 |
| . | 空网格单元 |
| none | 没有定义网格区域 |

```css
.grid-1 {
    ....
    grid-template-areas:
        "header header header header"
        "main main none sidebar"
        "footer footer footer footer";
}
.item:nth-child(1) {
    grid-area: header;
}
```

### grid-template

grid-template-columns、grid-template-rows、grid-template-areas 三者的简写。

```css
/* grid-template-rows / grid-template-columns */
grid-template: 100px 1fr / 50px 1fr;

/* grid-template-areas grid-template-rows / grid-template-column  */
grid-template:
  "a a a" 20%
  "b b b" auto;
grid-template:
  "a a a" 40px
  "b c c" 40px
  "b c c" 40px / 1fr 1fr 1fr;
```

### 行列间隙 row-gap column-gap gap

`row-gap` 行间隙  
`column-gap` 列间隙  
`gap` row-gap column-gap(省略了第二个值，浏览器认为第二个值等于第一个值)

```css
column-gap: 10px;
row-gap: 10px;
```

### 网格对齐 justify-content align-content place-content

`justify-content`控制**网格**在**网格容器**的水平对齐方式。  
`align-content` 控制**网格**在**网格容器**的垂直对齐方式。
`place-content ` 简写属性。align-content justify-content
| 值 | 说明 |
| ------------- | -------------------------------------------------------- |
| start | 对齐网格容器左边/顶部 |
| end | 对齐网格容易右边/底部 |
| center | 对齐网格容易中心 |
| stretch | 默认值。填充整个网格容器宽度/高度 |
| space-between | 在网格项之间设置均等间隙，边缘无间隙 |
| space-evenly | 在网格项之间设置均等间隙，边缘间隙等同于中间间隙 |
| space-around | 在网格项之间设置均等间隙，边缘空白间隙为中间空白间隙一半 |

### 网格项对齐 justify-items align-items place-items

`justify-items`控制**网格项**的水平方向对齐方式。  
`align-items` 控制**网格项**的垂直方向对齐方式。
`place-items ` 简写属性。align-items justify-items（如果省略第二个值，则浏览器认为与第一个值相等。）
| 值 | 说明 |
| ------- | --------------------------- |
| start | 对齐至列的左边/行的顶 |
| end | 对齐至列的右边/行的底部 |
| center | 放置在单元格中心 |
| stretch | 默认值。填充单元格宽度/高度 |

### 多出来的网格轨道 grid-auto-columns /grid-auto-rows

`grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

## 网格项属性

### 对齐 justify-self align-self place-self

`justify-self` 设置某个网格项的水平对齐  
`align-self` 设置某个网格项的垂直对齐
`place-self` 简写属性。align-self justify-self
| 值 | 说明 |
| ------- | --------------------------- |
| start | 对齐至列的左边/行的顶 |
| end | 对齐至列的右边/行的底部 |
| center | 放置在单元格中心 |
| stretch | 默认值。填充单元格宽度/高度 |

### 网格项位置和跨越

`grid-column-start` 指定网格项左边缘的开始位置

`grid-column-end` 指定网格项右边缘的结束位置

`grid-column` 简写属性。`grid-column-start / grid-column-end `

`grid-row-start` 指定网格项顶部的开始位置

`grid-row-end` 指定网格项底部的结束位置

`grid-row` 简写属性。`grid-row-start / grid-row-end`

`grid-area` 简写属性。grid-row-start / grid-column-start / grid-row-end / grid-column-end 。也可是名称

它们的值有以下几种形式：
| 值 | 说明 |
| ----------- | ------------------------------------------------ |
| line | 网格线（数字或线名称）。数字是从 0 开始的 |
| span number | 网格项将跨越指定数量的网格轨道 |
| span name | 网格项将跨越一些轨道 ，直到遇到指定命名的网格线 |
| auto | 自动布局，或者自动跨越，或者跨越一个默认的轨道。 |

## 测量单位

`fr` （fraction 的缩写，意为"片段"）表示比例关系。如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍。

```css
.grid {
  grid-template-columns: 1fr 2fr 3fr;
  // 1/6 2/6 3/6
}
```

`min-content` 表示最小宽度。通常是网格项中最小内容或文本的大小

```css
.grid {
  grid-template-columns: 1fr min-content 1fr;
}
```

`max-content` 尽可能的宽。

```css
.grid {
  grid-template-columns: 1fr max-content 1fr;
}
```

`auto`由浏览器自己决定长度。

```
grid-template-columns: 100px auto 100px;
```

## css 函数

### repeat

`repeat()` 重复片段。该函数可以用于 CSS Grid 属性中 grid-template-columns 和 grid-template-rows。  
第一个参数：
| 值 | 说明 |
| --------- | ------------------------ |
| number | 重复次数 |
| auto-fill | 以网格项为准，自动填充 |
| auto-fit | 以网格容易为准，自动填充 |

第二个参数：
| 值 | 说明 |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| length | 非负长度 |
| percentage | 相对于网格容器的百分比（非负） |
| flex | 单位为 fr 的非负长度 |
| max-content | 代表占据网格轨道的网格项目所分配的最大内容区域的最大值。 |
| min-content | 代表占据网格轨道的网格项目所分配的最小内容区域的最小值。 |
| auto | 作为最大值时，等价于 max-content。作为最小值时，它表示轨道中单元格最小长宽(min-width/min-height)的最大值。 |

```css
repeat(4, 1fr)
repeat(2, 50px 1fr) 100px;
```

**`auto-fill`**  
每列宽度`100px`，然后自动填充，直到容器不能放置更多的列。

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

### minmax()

`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
```

### fit-content()

类似于 minmax() 函数。不同之处在于，使用 fit-content() 时，最小值是网格项中内容的大小，最大值是我们传递给它的值。这样就可以将内容设置为最小值，并根据需要将其放大到某个值。

```css
grid-template-columns: fit-content(200px) fit-content(300px) fit-content(400px);
```

## 布局实例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grid</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      html,
      body {
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

### 排列 grid-auto-flow

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。
这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"。
`row` ![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478460300-d37d1e20-8cf1-4dd8-948a-69d155f86820.png#align=left&display=inline&height=104&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=208&originWidth=207&size=3699&status=done&style=none&width=103.5)![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478889403-eabd2d21-d9eb-4ff0-b0c4-126ea28ff315.png#align=left&display=inline&height=108&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=215&originWidth=720&size=3772&status=done&style=none&width=360)
`column![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478426366-f0db851f-d861-4d05-b945-19c207f93b3a.png#align=left&display=inline&height=103&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=205&originWidth=216&size=3667&status=done&style=none&width=108)![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478939096-82d327fa-4405-4983-880f-061080b1bd90.png#align=left&display=inline&height=77&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=154&originWidth=769&size=3483&status=done&style=none&width=384.5)`
`row dense 表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。`
![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611478968608-b35dfa66-8de4-4177-821c-8ed3b8fbd3d0.png#align=left&display=inline&height=113&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=225&originWidth=770&size=3785&status=done&style=none&width=385)
`column dense`
![图片.png](https://cdn.nlark.com/yuque/0/2021/png/12445375/1611479004208-8523365e-4ad0-40ae-a2b0-6c51218dfd86.png#align=left&display=inline&height=88&margin=%5Bobject%20Object%5D&name=%E5%9B%BE%E7%89%87.png&originHeight=175&originWidth=770&size=3709&status=done&style=none&width=385)

### grid-auto-columns /grid-auto-rows

`grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

```css
#container {
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
`grid`属性是`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。

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
