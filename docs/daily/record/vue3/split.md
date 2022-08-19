<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-18 13:18:36
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-18 13:39:01
-->
# 如何高质量的拆分组件和hooks？
- [Hooks时代，如何写出高质量的react和vue组件？](https://juejin.cn/post/7123961170188304391)
## 一个组件的构成
- **视图** jsx、template
- **组件逻辑** 生命周期、事件
- **业务逻辑** 获取数据，发送数据
## 组件拆分原则
- 保持功能单一。即设计原则中的**单一职责原则**
- 保持较低耦合度。不要与组件外部有过多的交互
## 拆出来的组件文件放哪？
- 只在某页面使用的组件，放在当前页面文件夹下
- 不同场景都会使用的，放在顶层公共文件夹下
- 只在此组件用的hooks放在当前组件层次的hooks文件夹下
- 通用的hooks放在顶层hooks下
## 逻辑抽离
- **业务逻辑** ： useUserLogin
- **组件逻辑**：useUserLoginControl
在 useUserLoginControl 中引入使用 useUserLogin。最后在视图页中引入 useUserLoginControl 。