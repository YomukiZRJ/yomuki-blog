# 工具类型

## 对象

### 将一个对象类型的所有键值设为 T

```ts
/**
 * 将一个对象类型的所有键值设为T
 */
type TransformKeyValue<O, T> = {
  [K in keyof O]: T;
};
/**
 * 将一个对象类型的所有键值设为string
 */
type TransformKeyValueToString<O> = TransformKeyValue<O, string>;
```

### 复制一个类型对象

```ts
type Clone<T> = {
  [K in keyof T]: T[K];
};
```

### 复制一个类型对象，并全部设置为可选

```ts
type ClonePartial<T> = {
  [K in keyof T]?: T[K];
};
```

### 截取类型对象

```typescript
pick<T extends object, U extends keyof T>(object: T, ...props: Array<U>): Pick<T, U>;
```

## 推断

### 推断函数的返回类型

```ts
type Func = (...arg: any[]) => any;
type FunctionReturnType<T extends Func> = T extends (...arg: any[]) => infer R ? R : never;
```

### 推断数组首尾类型

```ts
type ExtractStartAndEnd<T extends any[]> = T extends [infer A, ...any[], infer B] ? [A, B] : T;
```

### 调换数组首尾类型

```ts
type SwapStartAndEnd<T extends any[]> = T extends [infer A, ...infer B, infer C] ? [C, ...B, A] : T;
```

### 推断对象中的某些属性的属性值类型

```ts
type PropType<T, K extends keyof T> = T extends {
  [P in K]: infer U;
}
  ? U
  : never;
```
