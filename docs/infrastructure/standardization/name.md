# 命名规范

- [codelf](https://unbug.github.io/codelf/) 取个什么参数名？
- [京东命名规范](https://guide.aotu.io/docs/name/dir.html)
- [腾讯命名规范](https://tgideas.qq.com/doc/frontend/spec/common/name.html)
- [阿里命名规范](https://developer.aliyun.com/article/850913#slide-3)

## 常见的不规范命名

- 单词拼写错误：` form`，`from `
- 中英混用
- 以 1-9，a-z 命名：`type1`，`type2`
- 混用命名格式：`addressList`，`addresslist`，`addressrs`
- 单复数不分：`address`，`addresses`
- 正反义词错用：`showDialog`，`isDialog`，`visibleDialog`

## 命名法

- 大驼峰 PascalCase：`UserInfo`
- 小驼峰 camelCase：`userInfo`
- kebab-case：`user-info`
- snake_case：`user_info`

## 文件资源命名

采用 `kebab-case`

## 变量命名

变量使用`camelCase`，常量使用`MAX_CODE`

- 布尔类型：`has`,`is`,`wether`,`can`,`should`
- 数组/集合：以`s`或`list`后缀结尾

## 函数命名

普通函数使用`camelCase`，构造函数使用`PascalCase`

- 以动词为前缀，`add`,`update`,`delete`,`get`,`say`
  - `query` 查询数据
  - `send` 发送数据
- 钩子函数/vue3 组合式可以以`use`为前缀
- vue 混入可以以`mixin`为前缀

## 类

类中的私有属性以`_`(before es2022)或`#`(after es2022)开头

## css 命名

- [CSS 方法论](https://juejin.cn/post/7113732818663899166)

### BEM

- Block（块）：`.list`,`card`,`navbar`
- Element（元素）：使用`__`来连接 Block，`.list__item`,`.card__img`
- Modifier（装饰器）：使用`--`来连接 Block 或 Element ：`.list__item--active`
- 使用`-`来进行语义化连接：`.goods-list__item`

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1406eacb6e44dcf94c1bd6d5369d73c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## js 命名汇总

### 动词

- `add` / `update` / `delete` / `detail` / `get`
- `set` 设置
- `remove` 删除
- `create` 创建`destory` 销毁,
- `start` 启动/`stop` 停止,
- `open` 打开/`close` 关闭,
- `read` 读取/`write` 写入,
- `load` 载入/`save` 保存,
- `begin` 开始/`end` 结束,
- `backup` 备份/`restore` 恢复,
- `import` 导入/`export` 导出,
- `split` 分割/`merge` 合并,
- `inject` 注入/`extract` 提取,
- `attach` 附着/`detach` 脱离,
- `bind` 绑定/`separate` 分离,
- `view` 查看/`browse` 浏览,
- `edit` 编辑/`modify` 修改,
- `select` 选取/`mark` 标记,
- `copy` 复制/`paste` 粘贴,
- `undo` 撤销/`redo` 重做,
- `insert` 插入/`delete` 移除,
- `add` 加入/`append` 添加,
- `clean` 清理/`clear` 清除,
- `index` 索引/`sort` 排序,
- `find` 查找/`search` 搜索,
- `increase` 增加/`decrease` 减少,
- `play` 播放/`pause` 暂停,
- `launch` 启动/`run` 运行,
- `compile` 编译/`execute` 执行,
- `debug` 调试/`trace` 跟踪,
- `observe` 观察/`listen` 监听,
- `build` 构建/`publish` 发布,
- `input` 输入/`output` 输出,
- `encode` 编码/`decode` 解码,
- `encrypt` 加密/`decrypt` 解密,
- `compress` 压缩/`decompress` 解压缩,
- `pack` 打包/`unpack` 解包,
- `parse` 解析/`emit` 生成,
- `connect` 连接/disconnect 断开,
- `send` 发送/receive 接收,
- `download` 下载/upload 上传,
- `refresh` 刷新/synchronize 同步,
- `update` 更新/revert 复原,
- `lock` 锁定/unlock 解锁,
- `check out` 签出/`check in` 签入,
- `submit` 提交/`commit` 交付,
- `push` 推/`pull` 拉,
- `expand` 展开/`collapse` 折叠,
- `enter` 进入/`exit` 退出,
- `abort` 放弃/`quit` 离开,
- `obsolete` 废弃/`depreciate` 废旧,
- `collect` 收集/`aggregate` 聚集

## css 命名汇总

### 状态

- `prev` 上一个
- `next` 下一个
- `current` 当前的
- `show` 显示的
- `hide` 隐藏的
- `open` 打开的
- `close` 关闭的
- `selected` 选中的
- `active` 激活的
- `default` 默认的
- `toggle` 反转的
- `disabled` 禁用的
- `danger` 危险的
- `primary` 主要的
- `success` 成功的
- `info` 提醒的
- `warning` 警告的
- `error` 错误的
- `lg` 大型的
- `sm` 小型的
- `xs` 超小的

### 布局

- `header` 头部
- `body` 主体
- `footer` 尾部
- `main` 主栏
- `side` 边栏
- `box` , `container` 容器

### 部件

- `list` 列表
- `item` 列表项
- `table` 表格
- `form` 表单
- `link` 链接
- `title`,`caption`,`heading` 标题
- `menu` 标题
- `group` 集合
- `bar` 条
- `content` 内容
- `result` 结果

### 组件

- `button`
- `icon`
- `dropdown` 下拉菜单
- `toolbar` 工具栏
- `page` 分页
- `thumbnail` 缩略图
- `alert` 警告框
- `progress` 进度条
- `navbar` 导航条
- `nav` 导航
- `subnav` 子导航
- `breadcrumb` 面包屑
- `label` 标签
- `badge` 徽章
- `jumbotron` 巨幕
- `panel` 面板
- `well` 洼地
- `tab` 标签页
- `tooltip` 提示框
- `popover` 弹出框
- `carousel` 轮播图
- `collapse` 手风琴
- `affix` 定位浮标

### 语义化小部件

- 品牌 `brand`
- 标志 `logo`
- 额外部件 `addon`
- 版权 `copyright`
- 注册 `regist`
- 登录 `login`
- 搜索 `search`
- 热点 `hot`
- 帮助 `help`
- 信息 `info`
- 提示 `tips`
- 开关 `toggle`
- 新闻 `news`
- 排行 `top`
- 下载 `download`
