# Provide & Inject

## 应用实例提供

在编写插件时特别有用，作为 globalProperties.

```js
import { createApp } from "vue";
const app = createApp(/* ... */);
app.provide("message", "hello");
```

## 普通组件中提供

- 不保持响应性

```js
export default {
  data() {
    return {
      message: "hello!",
    };
  },
  provide() {
    // 使用函数的形式，可以访问到 `this`
    return {
      message: this.message,
    };
  },
};
```

- 保持响应性

```js
import { computed } from "vue";

export default {
  data() {
    return {
      message: "hello!",
    };
  },
  provide() {
    return {
      // 显式提供一个计算属性
      message: computed(() => this.message),
    };
  },
};
```

## 组合式中提供

需在 setup 阶段同步调用。（根中执行）

```js
<script setup>
  import {(ref, provide)} from 'vue' import {fooSymbol} from './injectionSymbols' // 提供静态值 provide('foo', 'bar') // 提供响应式的值 const count =
  ref(0) provide('count', count) // 提供时将 Symbol 作为 key provide(fooSymbol, count)
</script>
```

## 在普通组件中注入

注入会在组件自身的状态之前被解析

```js
export default {
  // 当声明注入的默认值时
  // 必须使用对象形式
  inject: {
    message: {
      from: "message", // 当与原注入名同名时，这个属性是可选的
      default: "default value",
    },
    user: {
      // 对于非基础类型数据，如果创建开销比较大，或是需要确保每个组件实例
      // 需要独立数据的，请使用工厂函数
      default: () => ({ name: "John" }),
    },
  },
};
```

## 在组合式中注入

```js
<script setup>
  import {inject} from 'vue' import {fooSymbol} from './injectionSymbols' // 注入值的默认方式 const foo = inject('foo') // 注入响应式的值 const count
  = inject('count') // 通过 Symbol 类型的 key 注入 const foo2 = inject(fooSymbol) // 注入一个值，若为空则使用提供的默认值 const bar = inject('foo',
  'default value') // 注入一个值，若为空则使用提供的工厂函数 const baz = inject('foo', () => new Map()) //
  注入时为了表明提供的默认值是个函数，需要传入第三个参数 const fn = inject('function', () => {}, false)
</script>
```

## 使用 symbol 作为注入名

```js
// keys.js
export const myInjectionKey = Symbol()
// 在供给方组件中
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* 要提供的数据 */
      }
    }
  }
}
// 注入方组件
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```
