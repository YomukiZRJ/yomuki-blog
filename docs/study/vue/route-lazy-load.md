# 路由懒加载

## 为什么需要懒加载？

- vue 的特点是 spa 应用（单页面应用），如果没有应用懒加载，所有的路由会被打包在一个 js 中，造成 js 文件臃肿。会影响到**首屏加载速度**，不利于用户体验。
- 利用懒加载，可以将路由打包为多个 js 文件，在用户访问时进行按需载入。减少了首屏的载入时间。
- 它只有第一次会加载页面，以后的页面切换只需要进行组件替换。
- 减少了请求体积，加快页面响应速度。
- 所以懒加载就是按需加载啦~

## 实现条件

- [es6 的 Module 的语法](https://es6.ruanyifeng.com/#docs/module)
- 以前的 CommonJS 模块就是对象，用 commonJs 引入模块 A 中的某个方法时，会将模块 A 整个对象全部载入，再进行方法赋值。
- 而使用 es6 的**import**，就可以做到只载入当前引入的方法。
- 在[webpack](https://webpack.docschina.org/api/module-methods/#import-)中，通过 import()引用的子模块会被单独分离出来，打包成一个单独的文件。

## [vue-router](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html) 实现懒加载

```js
// 将
// import UserDetails from './views/UserDetails'
// 替换成
const UserDetails = () => import("./views/UserDetails");

const router = createRouter({
  // ...
  routes: [{ path: "/users/:id", component: UserDetails }],
});
```

- 将原本静态导入的组件改为返回**Promise 组件的函数**
- Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。
- 也就是说，可以用更复杂函数，只要返回的是 Promise
- 不要用这个方法导入异步组件，因为异步组件本来就是动态导入的

```js
const UserDetails = () =>
  Promise.resolve({
    /* 组件定义 */
  });
```

- 当我们想将某些路由打包在同一个异步块时，可以使用 webpack 的命名 chunk

```js
const UserDetails = () => import(/* webpackChunkName: "group-user" */ "./UserDetails.vue");
const UserDashboard = () => import(/* webpackChunkName: "group-user" */ "./UserDashboard.vue");
const UserProfileEdit = () => import(/* webpackChunkName: "group-user" */ "./UserProfileEdit.vue");
```

- 如果使用的是 vite，可以在 rollupOptions 中定义

```js
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          'group-user': [
            './src/UserDetails',
            './src/UserDashboard',
            './src/UserProfileEdit',
          ],
        },
    },
  },
})
```
