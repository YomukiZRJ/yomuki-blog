# 后期处理

后期处理是关于在最终图像（渲染）上添加效果。比如：

- 景深
- 轨迹光
- 运动模糊
- 色彩变化
- 抗齿距
- 反射和折射

## EffectComposer 效果合成器

[`EffectComposer`](https://threejs.org/docs/index.html?q=Eff#examples/zh/postprocessing/EffectComposer)，这个类管理后期处理过程链，根据他们的添加/插入顺序执行，最后一个过程会被自动渲染到屏幕上。

### import

```js
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
```

```js
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
```

### use

创建一个`effectComposer`

```js
const effectComposer = new EffectComposer(renderer);
effectComposer.setSize(width.value, height.value);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

添加一个渲染过程

```js
const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);
```

用`effectComposer`代替原来的渲染函数

```js
// renderer.render(scene, camera)
effectComposer.render();
```

### DotScreenPass

点状网目板效果，黑白的。

```js
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
const dotScreenPass = new DotScreenPass();
effectComposer.addPass(dotScreenPass);
```

### GlitchPass

故障效果，一种屏幕被黑客骇入的感觉。

```js
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
const glitchPass = new GlitchPass();
glitchPass.goWild = false; // 为true的时，会有一种闪瞎的效果
effectComposer.addPass(glitchPass);
```

## RGBShift

颜色位移效果，一种赛博朋克的感觉。

```js
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";
```

## 为什么使用 EffectComposer 的时候，画面会变暗？

因为`renderer.outputEncoding`不起效果了。

```js
renderer.outputEncoding = THREE.sRGBEncoding; // 没效果啦
```

老方法：创建一个`WebGLRenderTarget`来解决。(在`v0.146.0`中没效果了 未知原因)[相关 issues](https://github.com/mrdoob/three.js/issues/24843)

新方法：加入伽马矫正

### WebGLRenderTarget

```js
// width 和height不重要，因为后面的setSize会更新它们
const renderTarget = new THREE.WebGLRenderTarget(800, 600, {
  encoding: THREE.sRGBEncoding,
});
const effectComposer = new EffectComposer(renderer, renderTarget);
```

### GammaCorrectionShader

使用伽马矫正：

```js
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";
const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
effectComposer.addPass(gammaCorrectionPass);
```

## 抗齿距咋整？

在像素比大于 1 的屏幕，头盔边缘的锯齿又出现了。

`EffectComposer`会使用`WebGLRenderTarget`渲染，而`WebGLRenderTarget`不支持抗齿距。

### 使用通道来完成抗齿距

有以下四种通道：

- `FXAA` 性能良好，结果一般，可能导致模糊
- `SMAA` 效果比 FXAA 好，性能消耗也大
- `SSAA` 效果最好，性能最差
- `TAA` 性能良好，但结果有限

```js
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
const smaaPass = new SMAAPass();
effectComposer.addPass(smaaPass);
```

### 使用`WebGLRenderTarget.samples`来修复

但是，这个方法仅在支持 WEBGL2 的浏览器中使用

```js
const renderTarget = new THREE.WebGLRenderTarget(800, 600, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
  // encoding: THREE.sRGBEncoding,
  samples: 1,
});
const effectComposer = new EffectComposer(renderer, renderTarget);
```

### 两者结合

- 如果屏幕像素比等于 1，且浏览器支持 WebGL2，则使用`samples`
- 如果屏幕像素比等于 1，且浏览器不支持 WebGL2，则使用通道
- 其他的 不管
