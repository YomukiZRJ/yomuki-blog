# typescript 指令

## @ts-ignore

直接忽略下一行的 ts 检查。

## @ts-expect-error

只有在下一行代码真的存在错误时才能被使用，否则它会给出一个错误：

```ts
// @ts-expect-error xxxxxxx
const a: number = 'xx'

// @ts-expect-error xxxxxxx
// const b: string = 'xx'
```

## @ts-nocheck

忽略整个文件的 ts 检查。

## @ts-check

开启整个文件的 ts 检查。
