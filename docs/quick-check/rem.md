<!--
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-02 16:45:00
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-02 16:46:24
-->

# 20220609 - rem.js

- rem 自适应
- 因为是大屏，所以会根据最小的比例缩放
- 如果是正常 pc 应用，可以只看 width 啦

```js
// 基准大小
const baseSize = 16;
// 设置 rem 函数
function setRem() {
  const scaleWidth = document.documentElement.clientWidth / 1364;
  const scaleHeight = document.documentElement.clientHeight / 637;
  const scale = Math.min(scaleWidth, scaleHeight);
  // 设置页面根节点字体大小, 字体大小最小为12
  let fontSize = baseSize * Math.min(scale, 2) > 12 ? baseSize * Math.min(scale, 2) : 12;
  document.documentElement.style.fontSize = fontSize + "px";
}
//初始化
setRem();
//改变窗口大小时重新设置 rem,这里最好加上节流
window.onresize = function () {
  setRem();
};
```
