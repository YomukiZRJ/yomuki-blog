# typescript

## 开发

- [ts-node](https://www.npmjs.com/package/ts-node)
  一个可以直接运行 ts 文件的 node 模块，不需要编译成 js 文件
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
  ts-node 的增强版，可以实现热更新
- [tsc-watch](https://www.npmjs.com/package/tsc-watch)
  类似于 ts-node-dev，主要功能也是监听文件变化然后重新执行
- [esno](https://www.npmjs.com/package/esno) 使用 esbuild 执行 ts 文件，速度更快
- [typed-install](https://www.npmjs.com/package/typed-install)
  一个可以自动安装 ts 类型定义的工具
- [suppress-ts-error](https://www.npmjs.com/package/suppress-ts-error) 自动为项目中所有的类型报错添加 `@ts-expect-error `或 `@ts-ignore` 注释，重构项目时很有帮助。

## 代码

- [TypeStat](https://github.com/JoshuaKGoldberg/TypeStat) 将 JavaScript 转换为 TypeScript，并将 TypeScript 转换为更好的 TypeScript。
- [ts-auto-guard](https://github.com/rhys-vdw/ts-auto-guard) 自动生成类型守卫

## 类型工具库

- [type-fest](https://github.com/sindresorhus/type-fest) Hot
- [ts-toolbelt](https://github.com/millsp/ts-toolbelt) 类型工具数量多
- utility-types
- ts-essentials
- type-zoo

## 校验

### 类型校验

- tsd

### 逻辑校验

- zod

## 类型覆盖检查

- typescript-coverage-report，检查你的项目中类型的覆盖率。
- type-coverage，前者的底层依赖，可以用来定制更复杂的场景。

## 构建
