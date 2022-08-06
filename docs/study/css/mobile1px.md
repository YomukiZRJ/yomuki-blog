<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-06 09:18:27
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-06 09:23:13
-->
# 移动端1像素
即在移动端的CSS写了1px，实际上显示会比1px粗。
## 原因
- 主要原因是css像素与物理像素的区别。
- 不同的设备具有不同的像素比，dpr决定了由设备的多少个物理像素显示web css的一个像素
- 比如dpr为2时，设备上由2个像素表现css上的一个像素
## 解决方案
### 媒体查询
通过媒体查询判断不同的设备像素比，设定不同的像素 [参考](https://www.jianshu.com/p/5ff121936666)/边框图，背景图
```css
        @media screen and (-webkit-min-device-pixel-ratio:2) {
            .border {
                border: .5px solid #000;
            }
        }
        @media screen and (-webkit-min-device-pixel-ratio:3) {
            .border {
                border: .333333px solid #000;
            }
        }
```
- 兼容🚫
### :before:after和transform
原理是把原先元素的 border 去掉，然后利用 :before 或者 :after 重做 border ，并 transform 的 scale 缩小一半，原先的元素相对定位，新做的 border 绝对定位。
```css
.scale-1px{
     position: relative;
     border:none;
 } 
.scale-1px:after{
     content: '';
     position: absolute; 
     bottom: 0; 
     background: #000; 
     width: 100%; 
     height: 1px;
     -webkit-transform: scaleY(0.5); 
     transform: scaleY(0.5); 
     -webkit-transform-origin: 0 0; 
      transform-origin: 0 0; 
}
```
```js 
if(window.devicePixelRatio && devicePixelRatio >= 2){
	 document.querySelector('div').className = 'scale-1px';
}
```
### 设置vieport
通过缩放，让CSS像素等于真正的物理像素
```js
        const scale = 1 / window.DeviceRotationRate;
        const viewport = document.querySelector('meta[name=viewport');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.setAttribute('name','viewport');
            window.document.head.appendChild(viewport);
        }
        viewport.setAttribute('content','width=device-width,user-scalable=no,initial-scale='+scale+',maximum-scale='+scale+'.minimun-scale='+scale);
```
- 简单粗暴
### vh,vw方案
即将视觉窗口宽度 window.innerWidth和视觉窗口高度 window.innerHeight 等分为100份
- vw(Viewport width): 1wv 等于视觉窗口的 1%
- vh（Viewport height） 1hw 等于视觉窗口高度的 1%
- vmin ： vw和vh中的较小值
- vmax :  vw和vh中的较大值
如果视觉窗口为375px，那么1vw = 3.75px。这时ui给一个元素的宽为75px(设备独立像素).我们只需要将他设置为 75 / 3.75 = 20vw

### rem
### 使用box-shadow模拟边框