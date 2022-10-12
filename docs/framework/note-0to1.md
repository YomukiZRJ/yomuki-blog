# 《从 0 到 1 落地前端工程化》学习笔记

## 前端工程化

**前端工程化**是指用软件工程的技术与方法对前端开发的技术、工具、流程、经验、方案等指标标准化。  
它有以下四大特性：

- 模块化
- 组件化
- 规范化
- 自动化

它的目的是**降低成本、增加效率**。  
前端工程化是对项目的整体架构与整体规划。

### 模块化

指将复杂应用拆分为多个块，对内数据私有化，对外暴露接口和其他通信模块。  
**着重在文件层面上对代码与资源实现拆分与组装。**  
Web 项目的一般目录结构

```txt
project
├─ dist          # 输出目录
│  ├─ prod         # 生产环境执行代码
│  └─ test         # 测试环境执行代码
├─ src           # 源码目录
│  ├─ apis         # 接口模块：包括全局接口请求的功能，控制数据定向转换
│  ├─ assets       # 资源模块：包括样式、脚本、字体、图像、音频、视频等资源文件
│  ├─ components   # 组件模块：包括全局通用的基础组件、皮肤主题和字体图标
│  ├─ layouts      # 布局模块：包括以布局为最小粒度的组件集合，由至少一个基础组件组成
│  ├─ flows        # 流程模块：包括以流程为最小粒度的组件集合，由至少一个基础组件组成
│  ├─ pages        # 页面模块：包括以页面为最小粒度的组件集合，由至少一个基础组件组成
│  ├─ routes       # 路由模块：包括全局页面跳转的功能，控制页面自由切换
│  ├─ stores       # 数据模块：包括全局数据状态的功能，控制数据驱动视图
│  ├─ views        # 视图模块：包括以视图为最小粒度的组件集合，由至少一个基础组件组成
│  ├─ utils        # 工具模块：包括全局通用的常量与方法
│  ├─ index.html   # 模板入口文件
│  ├─ index.js     # 脚本入口文件
│  └─ index.scss   # 样式入口文件
└─ package.json
```

Node 项目的一般目录结构（一般用不上）

```txt
project
├─ dist          # 输出目录
│  ├─ prod         # 生产环境执行代码
│  └─ test         # 测试环境执行代码
├─ src           # 源码目录
│  ├─ assets       # 资源模块：包括样式、脚本、字体、图像、音频、视频等资源文件
│  ├─ models       # 模型模块：包括全局数据模型的功能
│  ├─ routes       # 路由模块：包括全局接口请求的功能
│  ├─ utils        # 工具模块：包括全局通用的常量与方法
│  └─ index.js     # 脚本入口文件
└─ package.json
```

### 组件化

组件化指将一个通用功能拆分为单元，对内满足功能交互需求，对外提供属性接口拓展用户需求。  
**着重在功能层面上对交互与设计实现拆分与组装。**  
它实现了代码复用，提高开发效率。  
组件封装需要做到**高内聚低耦合**，优秀的组件化遵循以下设计哲学：

- 将设计图划分为最小组件层次
- 使用预设规范创建组件静态版本
- 确定组件内部最小且完整的状态的表示方式
- 确定组件内部最小且完整的状态的存放方式
- 实现数据流的正向传递与反向传递

### 规范化

指将一系列预设规范接入工程各个阶段，通过各项指标标准化开发流程，协同所有开发者以标准化的方式定义工作流程。

### 自动化

将一系列繁琐重复的工作流程交由程序根据预设脚本自动处理，整个工作流程无需人工参与。常见于：

- 自动化构建
- 自动化测试
- 自动化打包
- 自动化发布
- 自动化部署

更高级的有：

- 持续集成
- 持续交付
- 持续部署