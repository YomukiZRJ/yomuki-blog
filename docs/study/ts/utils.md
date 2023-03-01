# 工具类型

## 将一个对象类型的所有键值设为 T

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

## 复制一个类型对象

```ts
type Clone<T> = {
  [K in keyof T]: T[K];
};
```

## 复制一个类型对象，并全部设置为可选

```ts
type ClonePartial<T> = {
  [K in keyof T]?: T[K];
};
```

## 截取类型对象

```typescript
pick<T extends object, U extends keyof T>(object: T, ...props: Array<U>): Pick<T, U>;
```
