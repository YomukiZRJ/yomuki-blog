# js in browser 库

## 工具库

- [Lodash](https://www.lodashjs.com/) 有 es 按需导入
- [underscorejs](https://underscorejs.net/#) 函数式编程的实用功能
- [outils](https://www.npmjs.com/package/outils) 业务代码工具库(用来学习挺不错的，然后自己整一个)
- [ramda](https://www.npmjs.com/package/ramda) 实用函数库，有[中文文档](https://ramda.cn/)，从不改变用户已有数据
- [nanoid](https://gitee.com/mirrors/nanoid) 唯一 id 生成
- [uuid](https://www.npmjs.com/package/uuid) uuid 生成。commonJs/ESM
- [crypto-js](https://www.npmjs.com/package/crypto-js) 加密
- [md5](https://www.npmjs.com/package/md5) md5
- [jsencrypt](https://www.npmjs.com/package/jsencrypt) RSA 加密
- [classnames](https://www.npmjs.com/package/classnames) 类名连接
- [query-string](https://www.npmjs.com/package/query-string) 解析和 stringify URL 查询字符串

## API 拓展

- [js-cookie](https://www.npmjs.com/package/js-cookie) 用于处理 cookie 的简单、轻量级 JavaScript API。ESM/commonJs
- dayjs
- [screenfull](https://www.npmjs.com/package/screenfull) 用于跨浏览器使用 JavaScript [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)的简单包装器，可让您将页面或任何元素变为全屏。
- [proxy-web-storage](https://www.npmjs.com/package/proxy-web-storage) 用 proxy 封装了 localStorage 和 sessionStorage。除了常规的数据存储，可支持事件监听和设置过期时间。

## 功能实现

- [qrcodejs2](https://www.npmjs.com/package/qrcodejs2) 二维码生成。
- [clipboard](https://www.npmjs.com/package/clipboard) 剪切板
  - [vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2) vue2 剪切板
- [nprogress](https://www.npmjs.com/package/nprogress) 浏览器进度条。
- [downloadjs](https://www.npmjs.com/package/downloadjs) 从浏览器下载文件。
- [dom-to-image](https://www.npmjs.com/package/dom-to-image) 将任意 DOM 节点转换为矢量（SVG）或光栅（PNG 或 JPEG）图像
- [html2canvas](https://www.npmjs.com/package/html2canvas) html 转 canvas

## 滚动

- [BetterScroll](https://better-scroll.github.io/docs/zh-CN/) （上拉加载、下拉刷新、Picker、鼠标滚轮、放大缩小、移动缩放、轮播图、滚动视觉差，放大镜）(监听 dom 的插件有坑，用 vueuse 代替！)

## Canvas & SVG

- [Fabric.js](http://fabricjs.com/) Javascript HTML5 canvas 工具库。

## 元素动画

- [animejs](https://animejs.com/)
- [Greensock](https://github.com/greensock/GreenSock-JS/) 用于创建高性能，零依赖性，跨浏览器动画
- [Popmotion](https://github.com/Popmotion/popmotion) 只有 12kb
- [watching-you](https://github.com/jj811208/watching-you) 元素注视着用户

## 图片动画 - 生成

- [SVGA](https://svga.io/index.html) SVGA 是一种同时兼容 iOS / Android / Flutter / Web 多个平台的动画格式。
- [lottie](https://airbnb.io/lottie/#/README) 是一个适用于 Android、iOS、Web 和 Windows 的库，它解析 Adob​​e After Effects 动画，使用 Bodymovin 以 json 格式导出，并在移动设备和 Web 上本地呈现它们！

## WebGIS(地理信息系统)

- [supermap](http://support.supermap.com.cn:8090/iserver/iClient/forJavaScript/web/introduction/leafletDevelop.html#Ready) 云 GIS 网络客户端开发平台。开源，可拓展，支持 leafletjs，openlayers，mapboxGL...对多种互联网地图信息进行了封装，例如百度地图、天地图等。
- [leafletjs](https://leafletjs.com/) 二维，开源、体积小、结构清晰、简单易用
  - [leaflet.markercluster](https://www.npmjs.com/package/leaflet.markercluster) 标记聚类
  - [leaflet-heatmap.js](https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html) 热力图插件
- [Openlayers](https://openlayers.org/) 开源，相比于 Leaflet 更加复杂和完备。
- mapbox
- 阿里的 l7
- arcgis
- [Cesium](https://www.cesium.com/) 三维地理可视化的常用库，在大尺度的可视化（地形、建筑、地球）中十分常用。
- 高德地图 JS API
- 百度地图 JS API
- 天地图 JS API
- [@turf/turf](https://turfjs.org/) 地理空间分析引擎，使用 GeoJSON 数据执行地理空间处理任务。

## WebGL(3D 网页绘图)

- three.js 基于 WebGL

## 数据可视化

- [chartjs](https://www.chartjs.org/)
- [echarts](https://echarts.apache.org/zh/index.html)
- [highcharts](https://www.highcharts.com.cn/)
- [heatmapjs](https://www.patrick-wied.at/static/heatmapjs/) 热图可视化库。有 Leaflet 插件
  - [leaflet-heatmap.js](https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html)
- [d3js](https://d3js.org/) WebGL 数据可视化库
- [mars3d](http://mars3d.cn/) WebGL&WebGIS 基于 Cesium 的三维可视化平台

## 低代码开发框架

- [Appsmith](https://github.com/appsmithorg/appsmith) 20k sarts 开源低代码框架
- [Amis](https://github.com/baidu/amis) 11k stars 百度开源的一块前端低代码框架，通过 JSON 配置就能生成各种后台页面
- [LowCodeEngine](https://github.com/alibaba/lowcode-engine) 7.5k stars 低代码研发框架。由阿里巴巴前端委员会、钉钉宜搭联合出品。短期内没有支持 vue 画布的计划，但是社区有人写了。
- [form-generator](https://github.com/JakHuang/form-generato) 6.8k stars Element UI 表单设计及代码生成器，可将生成的代码直接运行在基于 Element 的 vue 项目中；也可导出 JSON 表单，使用配套的解析器将 JSON 解析成真实的表单。
- [H5-Dooring/pc-Dooring](https://github.com/MrXujiang/h5-Dooring)H5 可视化页面配置解决方案，致力于提供一套简单方便、专业可靠、无限可能的 H5 落地页最佳实践。技术栈以 React 和 TypeScript 为主，后台采用 nodejs 开发。除了 H5 版，还提供了 PC 版。
- [YAO](https://github.com/YaoApp/yao) 4.3k 是一款支持快速创建 Web 服务和管理后台的开源低代码应用引擎。

## 代码编辑器

- [monaco-editor](https://www.npmjs.com/package/monaco-editor)

## 富文本编辑器

- [wangEditor](https://www.wangeditor.com/) 不支持 ie&移动端
- [tiptap](https://github.com/ueberdosis/tiptap) 有协作模式，有 vue3 组件
- [Quill.js](https://github.com/quilljs/quill/) 跨平台和跨浏览器支持的富文本编辑器
  - [vue-quill-editor](https://www.npmjs.com/package/vue-quill-editor) 基于 vue2
- [TinyMCE](https://github.com/tinymce/tinymce) 插件多
- [**CKEditor 5**](https://github.com/ckeditor/ckeditor5)

## word

- [docx-preview](https://www.npmjs.com/package/docx-preview) docx 文件预览
- onlyoffice

## pdf

- [pdf.js](https://github.com/mozilla/pdf.js) 解析和呈现 pdf
- [jsPDF](https://github.com/parallax/jsPDF) 用 js 生成 pdf
- [pdfmake](https://github.com/bpampuch/pdfmake) 用 js 生成 pdf
- [pdf-lib](https://github.com/Hopding/pdf-lib) 创建和修改 pdf
- [pdfkit](https://www.npmjs.com/package/pdfkit) 生成 pdf。node/browser
- [react-pdf](https://github.com/diegomura/react-pdf) pdf 生成 react 渲染器

## 图片

- [sharp](https://github.com/lovell/sharp) Node.js 图像处理库，调整 JPEG、PNG、WebP、AVIF 和 TIFF 图像大小的最快模块。
- [cropperjs](https://github.com/fengyuanchen/cropperjs) 图像裁剪器，支持 29 个裁剪选项、27 种方法、6 个事件、缩放、旋转等。
- [tui.image-editor](https://github.com/nhn/tui.image-editor) 使用 HTML5 Canvas 的全功能图像编辑器。它易于使用并提供强大的过滤器。
- [compressorjs](https://github.com/fengyuanchen/compressorjs) 图像压缩器。使用浏览器原生的 canvas.toBlob API 来做压缩工作，即**有损压缩**，**异步**压缩，在不同的浏览器有**不同的压缩效果**。一般在客户端上传之前使用这个来预压缩图片。
- [viewerjs](https://github.com/fengyuanchen/viewerjs) 图像查看器，支持 52 个查看选项、23 种操作方法、17 个事件、旋转、移动、缩放等。
- [omagesloaded](https://github.com/desandro/imagesloaded) 检查图像何时加载的 JavaScript 库。

## 音视频

- [video.js](https://github.com/videojs/video.js) 为 HTML5 世界从头开始构建的网络视频播放器。它支持 HTML5 视频和媒体源扩展，以及其他播放技术，如 YouTube 和 Vimeo（通过插件）。它支持在台式机和移动设备上播放视频。
- [plyr](https://github.com/sampotts/plyr) 是一个简单、轻量级、可访问和可定制的 HTML5、YouTube 和 Vimeo 媒体播放器，支持现代浏览器。
- [MediaElement.js](https://github.com/mediaelement/mediaelement) 是一个 HTML5 播放器，支持 MP4、WebM 和 MP3 以及 HLS、Dash、YouTube、Facebook、SoundCloud 等，具有通用 HTML5 MediaElement API，可在所有浏览器中实现一致的 UI。
- [xgplayer](https://github.com/bytedance/xgplayer) Web 视频播放器类库，它本着一切都是组件化的原则设计了独立可拆卸的 UI 组件。更重要的是它不只是在 UI 层有灵活的表现，在功能上也做了大胆的尝试：摆脱视频加载、缓冲、格式支持对 video 的依赖。尤其是在 mp4 点播上做了较大的努力，让本不支持流式播放的 mp4 能做到分段加载，这就意味着可以做到清晰度无缝切换、加载控制、节省视频流量。同时，它也集成了对 flv、hls、dash 的点播和直播支持。
- [DPlayer](https://github.com/DIYgod/DPlayer) HTML5 弹幕视频播放器，可帮助人们轻松构建视频和弹幕。
- [Howler.js ](https://github.com/goldfire/howler.j) 现代 web 音频库。它默认为 Web Audio API 并回退到 HTML5 Audio。这使得在所有平台上使用 JavaScript 处理音频变得容易且可靠。

## 表格

- ⭐️[Handsontable](https://github.com/handsontable/handsontable) 具有电子表格外观的 JavaScript 数据网格组件。适用于 React、Angular 和 Vue。它结合了数据网格功能和类似电子表格的 UX。它提供数据绑定、数据验证、过滤、排序和 CRUD 操作。
- [ag-grid ](https://github.com/ag-grid/ag-grid)功能齐全且高度可定制的 JavaScript 数据网格。它提供了出色的性能，没有第三方依赖，并且可以与所有主要 JavaScript 框架顺利集成。
- [x-spreadsheet](https://github.com/myliang/x-spreadsheet) 基于 Web 的 JavaScript（canvas）电子表格。

- [cheetah-grid](https://github.com/future-architect/cheetah-grid) 最快的 Web 开源数据表。

- [ExcelJS](https://github.com/exceljs/exceljs) Excel 电子表格文件逆向工程项目。可以读取，操作并写入电子表格数据和样式到 XLSX 和 JSON 文件。
- [SheetJS](https://github.com/SheetJS/sheetjs) 简化的电子表格，用意用来阅读、编辑和导出电子表格，其适用于 Web 浏览器和服务器，在 Office 365 中受 Microsoft 信任。**node/browser**

## 文件上传

- [Uppy](https://github.com/transloadit/uppy) （25.5⭐️）模块化 JavaScript 文件上传器，可与任何应用程序无缝集成。它速度快，具有易于理解的 API，让您不必担心比构建文件上传器更重要的问题。
- [filepond](https://github.com/pqina/filepond) 用于上传文件的 JavaScript 库，优化图像以加快上传速度，并提供出色、可访问、如丝般流畅的用户体验。
- [Dropzone](https://github.com/dropzone/dropzone) 可以将任何 HTML 元素转换为 dropzone。这意味着用户可以将文件拖放到上面，Dropzone 将显示文件预览和上传进度，并通过 XHR 为你处理上传。

- [vue-upload-component ](https://github.com/lian-yue/vue-upload-component)用于 Vue.js 的上传组件，支持多文件上传，上传目录，拖拽上传，拖拽目录，以及支持同时上传多个文件等。
- [Uppload](https://github.com/elninotech/uppload) JavaScript 图片上传器。它具有 30 多个插件的高度可定制性，完全免费和开源，并且可以与任何文件上传后端一起使用。

## 文件下载

- ⭐️[file-saver](https://www.npmjs.com/package/file-saver) 19.7k

## 文件相关其他

- [JSZip](https://github.com/Stuk/jszip) 使用 JavaScript 创建、读取和编辑 .zip 文件的库，具有简单的 API。
- [**docxtemplater**](https://github.com/open-xml-templating/docxtemplater)是一个从 docx/pptx 模板生成 docx/pptx 文档的库。它可以用数据替换 {placeholders} 并且还支持循环和条件。
- [PptxGenJS](https://github.com/gitbrent/PptxGenJS) 是一个使用功能强大、简洁的 JavaScript API 创建 PowerPoint 演示文稿。
- [PapaParse](https://github.com/mholt/PapaParse) 是一个快速而强大的 CSV（分隔文本）解析器，可以优雅地处理大文件和格式错误的输入。

## 测试

- [Vitest](https://cn.vitest.dev/) vite 提供的单元测试框架，兼容 jest，中文文档
