<!--
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-17 14:14:17
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-17 14:50:30
-->

# webpack5 配置

...中文文档居然和我机翻的英文文档是一样的，救命

## cache

[中文文档](https://webpack.docschina.org/configuration/cache/)

- **type**
  - memory 缓存存储在内存中并且不允许额外的配置。
  - **filesystem** 缓存存储在文件中 可以额外配置
- name
  - 缓存的名称。
  - 有多份配置的时候可以使用
- **profile**
  - 跟踪并记录各个 'filesystem' 缓存项的详细时间信息。
  - 默认 false
- allowCollectingMemory
  - 收集反序列化期间分配的未使用内存
  - 生产模式：默认 false
  - 开发模式：默认 true
- buildDependencies
  - ....救命啊虽然文档中的中文字我每个都能看懂，但是连起来就不懂了，这个是个啥？但是听文档的配置应该没错
    > 推荐在 webpack 配置中设置 cache.buildDependencies.config: [__filename] 来获取最新配置以及所有依赖项。
- cacheDirectory
  - 这我懂，是缓存目录！
  - 默认值为 node_modules/.cache/webpack
- cacheLocation
  - 缓存路径 。也是最终的缓存目标~
  - 默认值 path.resolve(cache.cacheDirectory, cache.name)
- cacheUnaffected
  - 仅**memory**生效且开启**experiments.cacheUnaffected**
  - 对未改变的模块进行缓存计算，只引用未改变的模块。
  - 缓存不受影响。
- compression
  - 缓存文件压缩类型
  - false - 开发模式默认值
  - gzip - 生产模式默认值
  - brotli - 一个压缩算法
- hashAlgorithm
  - 哈希生成的算法
  - md4 - 默认值
- idleTimeout
  - 缓存存储发生的时间间隔。默认 60000 是个 number
  - 什么时间间隔，我怎么看不懂，谁和谁间隔，timeout 不是超时吗？
- idleTimeoutAfterLargeChanges
  - 当检测到较大的更改时，缓存存储应在此之后发生的时间段。
  - 救命啊，这又是什么时间段？鲨了我吧
- idleTimeoutForInitialStore
  - 初始缓存存储发生后的时间段。
  - 每次看 webpack 文档都痛不欲生，啊~
- maxAge
  - 允许未使用的缓存留在文件系统缓存中的时间（以毫秒为单位）；默认为一个月。5184000000
  - **filesystem**
- maxGenerations
  - 定义内存缓存中未使用的缓存项的生命周期。
  - **memory**
  - 1 - 在一次编译中未使用的缓存被删除。
  - Infinity - 缓存将永远保存。
- maxMemoryGenerations
  - 定义内存缓存中未使用的缓存项的生命周期。
  - **filesystem**
  - [天哪，看文档吧](https://webpack.docschina.org/configuration/cache/#cacheallowcollectingmemory)

### 一般开发只需要

```js
cache: {
    // 将缓存类型设置为文件系统
    type: "filesystem",
    buildDependencies: {
      // 推荐在 webpack 配置中设置 cache.buildDependencies.config: [__filename] 来获取最新配置以及所有依赖项
      config: [__filename],
    },
  },
```
