# 后期处理

后期处理是关于在最终图像（渲染）上添加效果。比如：

- 景深
- 轨迹光
- 运动模糊
- 色彩变化
- 抗齿距
- 反射和折射

在 three 官网中的[例子](https://threejs.org/examples/?q=postprocessing)

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

### RGBShift

颜色位移效果，一种赛博朋克的感觉。

```js
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";
```

### UnrealBloomPass 光辉效果

它对重现光热、激光、光剑或放射性物质非常有用。

- strength 光的强度
- radius 亮度的发散半径
- threshold 限制物体开始发光的亮度值

```js
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
const unrealBloomPass = new UnrealBloomPass();
effectComposer.addPass(unrealBloomPass);
unrealBloomPass.enabled = true;
unrealBloomPass.strength = 0.3; // 光的强度
unrealBloomPass.radius = 1; // 亮度的发散半径
unrealBloomPass.threshold = 0.6; // 限制物体开始发光的亮度值
gui.add(unrealBloomPass, "enabled");
gui.add(unrealBloomPass, "strength").min(0).max(2).step(0.001);
gui.add(unrealBloomPass, "radius").min(0).max(2).step(0.001);
gui.add(unrealBloomPass, "threshold").min(0).max(1).step(0.001);
```

## 创建自己的通道

### 着色通道

创建一个简单的控制颜色的通道。首先创建一个着色器：

- uniforms：里边的内容跟以往一样
- vertexShader：这个顶点着色器几乎总是有相同的代码，会把平面放在视图的前面
- fragmentShader：片元着色器会处理后期效果

```js
const TintShader = {
  uniforms: {},
  vertexShader: `
      void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
  fragmentShader: `
      void main(){
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
      }
    `,
};
const tintPass = new ShaderPass(TintShader);
effectComposer.addPass(tintPass);
```

此刻画面变成了一片红，需要从上一个通道中获得贴图纹理，这个纹理贴图自动存储在名为`tDiffuse`的 uniform 中。将这个值设为 null,然后`EffectComposer`会自动更新它。有了纹理贴图后，需要获取到 uv 坐标来对纹理进行检索：

```js
// 自定义着色通道
const TintShader = {
  uniforms: {
    tDiffuse: {
      value: null,
    },
  },
  vertexShader: `
      varying vec2 vUv;
      void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        vUv = uv;
      }
    `,
  fragmentShader: `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      void main(){
        vec4 color = texture2D(tDiffuse, vUv);
        gl_FragColor = color;
      }
    `,
};
```

创建一个`uTint`来控制颜色，在创建的时候，这个值设为`null`，在通道创建后再去材质中修改值。(因为着色器代码是会被重复使用的，所以要在通道创建后赋值)

```js
// 自定义着色通道
const TintShader = {
  uniforms: {
    tDiffuse: {
      value: null,
    },
    uTint: {
      value: null,
    },
  },
  vertexShader: `
      varying vec2 vUv;
      void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        vUv = uv;
      }
    `,
  fragmentShader: `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      uniform vec3 uTint;
      void main(){
        vec4 color = texture2D(tDiffuse, vUv);
        color.rgb += uTint;
        gl_FragColor = color;
      }
    `,
};
const tintPass = new ShaderPass(TintShader);
tintPass.material.uniforms.uTint.value = new THREE.Vector3();
effectComposer.addPass(tintPass);
gui.add(tintPass.material.uniforms.uTint.value, "x").min(-1).max(1).step(0.001).name("red");
gui.add(tintPass.material.uniforms.uTint.value, "y").min(-1).max(1).step(0.001).name("green");
gui.add(tintPass.material.uniforms.uTint.value, "z").min(-1).max(1).step(0.001).name("blue");
```

### 位移通道

自定义位移通道 ， 利用 uv 来产生位移效果。在 x 轴上产生一个扭曲效果

```js
const DisplacementShader = {
  uniforms: {
    tDiffuse: {
      value: null,
    },
  },
  vertexShader: `
    varying vec2 vUv;
    void main(){
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      vUv = uv;
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    void main(){
      vec2 newUv = vec2(
        vUv.x,
        vUv.y + sin(vUv.x * 10.0) * 0.1
      );
      vec4 color = texture2D(tDiffuse, newUv);
      gl_FragColor = color;
    }
  `,
};
const displacementPass = new ShaderPass(DisplacementShader);
effectComposer.addPass(displacementPass);
```

加点动画

```js
// 自定义位移通道 ， 利用uv来产生位移效果
const DisplacementShader = {
  uniforms: {
    tDiffuse: {
      value: null,
    },
    uTime: {
      value: null,
    },
  },
  vertexShader: `
    varying vec2 vUv;
    void main(){
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      vUv = uv;
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    varying vec2 vUv;
    void main(){
      vec2 newUv = vec2(
        vUv.x,
        vUv.y + sin(vUv.x * 10.0 + uTime) * 0.1
      );
      vec4 color = texture2D(tDiffuse, newUv);
      gl_FragColor = color;
    }
  `,
};
const displacementPass = new ShaderPass(DisplacementShader);
displacementPass.material.uniforms.uTime.value = 0;
effectComposer.addPass(displacementPass);
```

#### 使用法线贴图

定义一个`uNormalMap`来接收贴图

```js
// 自定义位移通道 ， 利用uv来产生位移效果
const DisplacementShader = {
  uniforms: {
    tDiffuse: {
      value: null,
    },
    uNormalMap: {
      value: null,
    },
  },
  vertexShader: `
    varying vec2 vUv;
    void main(){
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      vUv = uv;
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform sampler2D uNormalMap;
    varying vec2 vUv;
    void main(){
      vec3 normalColor = texture2D(uNormalMap,vUv).xyz * 2.0 - 1.0;
      vec2 newUv = vUv + normalColor.xy * 0.1;
      vec4 color = texture2D(tDiffuse, newUv);

      vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
      float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
      color.rgb += lightness * 2.0;
      
      gl_FragColor = color;
    }
  `,
};
const displacementPass = new ShaderPass(DisplacementShader);
displacementPass.material.uniforms.uNormalMap.value = textureLoader.load("../assets/textures/interfaceNormalMap.png");
effectComposer.addPass(displacementPass);
```

- `vec3 normalColor = texture2D(uNormalMap,vUv).xyz * 2.0 - 1.0;` 从 0,1 变为 -1,1
- `vec2 newUv = vUv + normalColor.xy * 0.1;` 在 uv 坐标上做偏移，生成新的 uv 坐标（\*0.1 是减少偏移程度）
- `vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));` 创建一个光的方向
- `float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);` 创建一个明亮程度，这个值在 0,1 之间。通过法线的方向和光的方向是否对上。面对光的就是白色，背对光的是黑色。通过 clamp 来限制值的范围，不显示黑色。

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

```js
const renderTarget = new THREE.WebGLRenderTarget(800, 600, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
});

if (renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2) renderTarget.samples = 1;

if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
  const smaaPass = new SMAAPass();
  effectComposer.addPass(smaaPass);
}
```
