# tsconfig 配置

## noImplicitAny

开启时，使用`any`会报错

## strictNullChecks

当 `strictNullChecks` 为 `true` 时，`null` 和 `undefined` 只能赋值给 `any` 和它们各自。

```ts
const x: number = null // error, 'null' is not assignable to 'number'
```

当 `strictNullChecks` 为 `false` 时，`null` 和 `undefined` 可以赋值给任何类型。

```ts
const x: number = null // ok
```

## StrictFunctionTypes

开启对函数入参的逆变检查
