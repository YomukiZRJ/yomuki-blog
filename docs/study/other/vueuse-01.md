# 元素

npm i @vueuse/core

## window

### useWindowFocus

跟踪当前窗口是否为焦点

### useWindowScroll

跟踪当前窗口滚动

### useDocumentVisibility

文档可见性。隐藏标签页/最小化标签页

- 值 string
  - hidden
  - visible

```vue
<template>
  <div>Hello</div>
</template>
<script setup>
import { useDocumentVisibility } from "@vueuse/core";
import { watch } from "vue";
const winVisibility = useDocumentVisibility();
watch(
  () => winVisibility.value,
  val => {
    console.log("winVisibility", val);
  }
);
</script>
<style lang="less"></style>
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/12445375/1658298214847-4d799aed-c6da-4250-8c76-17d7e0035734.png#clientId=ue0d7c747-b2f8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=128&id=PHSMP&margin=%5Bobject%20Object%5D&name=image.png&originHeight=256&originWidth=482&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32975&status=done&style=none&taskId=ufa268f12-f0eb-4800-8be8-738963b6b12&title=&width=241)

### useWindowSize

监听窗口大小改变

## element

### useActiveElement

当前激活的元素

```vue
<template>
  <div>
    Hello
    <input type="text" placeholder="1" />
  </div>
</template>
<script setup>
import { useActiveElement } from "@vueuse/core";
import { watch } from "vue";
const activeEl = useActiveElement();
watch(
  () => activeEl.value,
  val => {
    console.log("activeEl", val);
  }
);
</script>
<style lang="less"></style>
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/12445375/1658297866394-b395e647-1cc9-49b4-9024-4d34123d11f3.png#clientId=ue0d7c747-b2f8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=181&id=u815e1f32&margin=%5Bobject%20Object%5D&name=image.png&originHeight=362&originWidth=894&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58050&status=done&style=none&taskId=u9c5e8898-82bb-4afe-833b-479494c76ae&title=&width=447)

### useElementVisibility

跟踪元素可见性
[指令版本](https://vueuse.org/core/useElementVisibility/#directive-usage)

```vue
<template>
  <div ref="target">
    <h1>Hello world</h1>
  </div>
</template>

<script>
import { ref } from "vue";
import { useElementVisibility } from "@vueuse/core";

export default {
  setup() {
    const target = ref(null);
    const targetIsVisible = useElementVisibility(target);

    return {
      target,
      targetIsVisible,
    };
  },
};
</script>
```

### [useIntersectionObserver](https://vueuse.org/core/useIntersectionObserver/)

检测目标元素可见性

### useDraggable

拖拽元素

```vue
<template>
  <div class="app" @click="log('app')">
    <div class="box" ref="boxRef" :style="style" @click="log('Draggable')">
      <div class="children" @click="log('children')"></div>
    </div>
  </div>
</template>
<script setup>
import { useDraggable } from "@vueuse/core";
import { ref, watchEffect } from "vue";
const boxRef = ref(null);
const { x, y, style } = useDraggable(boxRef, {
  initialValue: { x: 20, y: 20 }, // 初始位置
  exact: false, // 仅在点击被绑定的元素时才拖动 (子元素点击无效)
  preventDefault: false, // 阻止默认行为
  stopPropagation: false, // 阻止捕获和冒泡阶段中当前事件的进一步传播
  onStart: (position, event) => {
    console.log("on onStart", position, event);
  },
  onMove: () => {},
  onEnd: () => {},
});
const log = str => {
  console.log(str);
};
watchEffect(() => {
  console.log("x", x.value, "y", y.value, "style", style.value);
});
</script>
<style>
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.box {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: black;
}

.children {
  width: 20px;
  height: 20px;
  background: red;
}
</style>
```

### useDropZone

可以将文件拽拖至该元素

```vue
<template>
  <div class="app">
    <div class="box" ref="boxRef"></div>
  </div>
</template>
<script setup>
import { useDropZone } from "@vueuse/core";
import { ref, watchEffect } from "vue";
const boxRef = ref(null);
const { isOverDropZone } = useDropZone(boxRef, file => {
  console.log("on-drop", file);
});
watchEffect(() => {
  console.log("isOverDropZone", isOverDropZone.value);
});
</script>
<style>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.box {
  position: absolute;
  width: 300px;
  height: 300px;
  background-color: black;
}
</style>
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/12445375/1658304945883-26d9fe15-21c2-482d-b255-231fc8869bae.png#clientId=ue0d7c747-b2f8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=115&id=uf2acf6ad&margin=%5Bobject%20Object%5D&name=image.png&originHeight=230&originWidth=512&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30001&status=done&style=none&taskId=u542083ea-7da7-4d40-b77d-7b523d6bbba&title=&width=256)

### useElementBounding

元素边界

- x 坐标
- y 坐标
- top 上边界到元素头部距离
- right 左边界到元素右侧距离
- bottom 上边界到元素底部距离
- left 左边界到元素左侧距离
- width 元素宽度
- hegiht 元素高度

```vue
<template>
  <div class="app">
    <div class="box" ref="boxRef"></div>
  </div>
</template>
<script setup>
import { useElementBounding } from "@vueuse/core";
import { ref, watchEffect } from "vue";
const boxRef = ref(null);
const { x, y, top, right, bottom, left, width, height } = useElementBounding(boxRef);
watchEffect(() => {
  console.log(x.value, y.value, top.value, right.value, bottom.value, left.value, width.value, height.value);
});
</script>
<style>
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.box {
  position: absolute;
  top: -40px;
  width: 300px;
  height: 300px;
  background-color: black;
}
</style>
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/12445375/1658306171934-c620fa26-1435-4f00-a439-9d6bca3fa158.png#clientId=u0ea4d803-5ffb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=71&id=u7e1b2ad5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=142&originWidth=516&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15723&status=done&style=none&taskId=u3abb5f40-1259-422a-8ca1-989450e0ec5&title=&width=258)

### useElementSize

元素大小

- width
- height

```vue
<template>
  <div ref="el">Height: {{ height }} Width: {{ Width }}</div>
</template>

<script>
import { ref } from 'vue'
import { useElementSize } from '@vueuse/core'

export default {
  setup() {
    const el = ref(null)
    const { width, height } = useElementSize(el)

    return {
      el,
      width,
      height,
    }
  }
})
</script>
```

### useMouseInElement

监听元素内的鼠标

### useMutationObserver

监听元素的 dom 树的改变

### useResizeObserver

报告元素内容或边框的改变。
比 elementSize 更具体，似乎有履历
