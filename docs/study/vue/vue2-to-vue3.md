# vue2 -> vue3

[官网迁移指南](https://v3-migration.vuejs.org/) 为什么只有英文！QAQ

## 全局 API -> 实例 API

| 2.x 全局 API               | 3.x 实例 API                               |
| -------------------------- | ------------------------------------------ |
| Vue.config                 | app.config                                 |
| Vue.config.productionTip   | removed                                    |
| Vue.config.ignoredElements | app.config.compilerOptions.isCustomElement |
| Vue.component              | app.component                              |
| Vue.directive              | app.directive                              |
| Vue.mixin                  | app.mixin                                  |
| Vue.use                    | app.use                                    |
| Vue.prototype              | app.config.globalProperties                |
| Vue.extend                 | removed                                    |

## [全局 API 的 tree-shaking](https://v3-migration.vuejs.org/breaking-changes/global-api-treeshaking.html)

一些全局 API 或内部组件会在构建中被 tree-shaking  
如果是插件开发，会导致 vue 源代码被捆绑入插件中。需要配置下 webpack

```js
externals: {
  vue: "Vue";
}
```

## [v-model](https://v3-migration.vuejs.org/breaking-changes/v-model.html)

在自定义组件中，v-model 的 prop 和 event 名称更改：

- prop: value -> modelValue;
- event: input -> update:modelValue;

v-bind 的.sync 修饰符和组件 model 选项被删除并替换为 v-model;

## [key](https://v3-migration.vuejs.org/breaking-changes/key-attribute.html)

v-if/v-else/v-else-if 不再必要 key，因为他们会自己生成 uuid  
tempalte v-for 中的 key 应该放在 tempalte 上

## v-if v-for 优先级

如果在同一个元素上使用，v-if 优先级高于 v-for

## v-bind 合并行为

2.x 单属性始终覆盖 v-bind  
3.x 后面的覆盖前面的

## v-on.native 移除修饰符
