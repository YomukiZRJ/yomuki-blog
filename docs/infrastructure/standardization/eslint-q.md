# eslint 踩坑小记

## 将 type 分开引入时，报`no-duplicate-imports`

```js
import { threeResizeKey } from "./utils/event-bus-key";
import type { threeResizeEvent } from "./utils/event-bus-key";
```

以上代码在`no-duplicate-imports`开启时会报错，因为这个规则没有区分 type 导入

#### 解决方案 💡

用`eslint-plugin-import`插件中的`import/no-duplicates`代替 eslint 核心的`no-duplicate-imports` [see](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md#rule-details)
