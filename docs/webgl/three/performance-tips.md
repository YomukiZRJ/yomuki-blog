# 性能注意点

- 至少应该把目标定在 60 帧/s 的体验上

## 监视

### 性能监听插件 stats.js

[stats.js](https://github.com/mrdoob/stats.js/)

```js
import Stats from "stats.js";
export default () => {
  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  function animate() {
    stats.begin();

    // monitored code goes here

    stats.end();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
};
```

### 禁用浏览器 FPS 限制

-[无帧率限制打开 Chrome](https://gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d)

### 监控 Draw-calls

Draw-calls 网格描绘调用是 GPU 绘制三角形的指令。场景中的对象越复杂，Draw-calls 次数也越多。

所以可以对 Draw-calls 进行监控。

- [spectorjs](https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk?hl=zh-CN) 谷歌的插件可以帮助监控 Draw-calls。

### 渲染器信息

可以看到：

- 几何体的数量、纹理的数量
- 画了多少个三角形

```js
console.log(renderer.info);
```

## 一般性原则

### 良好的 js 代码

### 清除不必要的东西

废弃场景中不需要的东西。

- [How-to-dispose-of-objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects)

## 灯光

### 避免使用

尽可能避免使用 Three.js 中的灯光，如果要用，则尽量少用，选用最廉价的灯光环境光和平行光。

### 避免添加和移除灯光

在场景中添加或移除灯光时，必须重新编译所有支持灯光的材质。如果你的场景很复杂，这个行为可以直接让你屏幕卡死。

## 阴影

### 避免使用

可以用烘焙阴影替代。

### 优化阴影贴图

利用`CameraHelper`来控制阴影相机的照射范围，尽可能最小。尽可能的使用低分辨率的贴图。

```js
directionalLight.shadow.mapSize.set(1024, 1024);
```

### 明智使用 castShadow 和 receiveShadow

在尽可能少的对象上激活 castShadow 和 receiveShadow。

### 停用阴影自动更新

现在我们的场景中，阴影贴图在每次渲染之前都会更新。

我们可以将 shadowMap 的`autoUpdate`属性设为 false 以此来停用阴影自动更新。

同时告诉 Three.js 只有必要时候才进行阴影贴图更新。

当`needsUpdate`属性被设为 true, 场景中的阴影贴图会在下次 render 调用时刷新：

```js
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.needsUpdate = true;
```

## 纹理贴图

### 调整尺寸
