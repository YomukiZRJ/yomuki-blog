<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-16 09:37:16
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-16 09:39:57
-->
# 样式兼容记录
## chrome浏览器 input 自动填充 会有背景色
- 关闭自动填充 autocomplete="off"
- 动画解决
```css
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-transition-delay: 111111s;
        -webkit-transition: color 11111s ease-out, background-color 111111s ease-out;
    } 
```