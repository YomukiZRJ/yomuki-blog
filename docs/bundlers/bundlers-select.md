<!--
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-09-01 12:21:58
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-01 12:49:18
-->

# 构建工具的选择

- [Tooling.Report](https://bundlers.tooling.report/) 构建工具对比平台
  主要从 6 个维度对构建工具进行分析。

## code splitting

代码分割。即导出**公共模块**，避免重复打包，以及在页面运行时实现合理的**按需加载**。

## hashing

对打包资源进行版本信息隐射。**最大化利用缓存机制**  
有效的缓存策略将直接影响页面加载表现。为了实现合理的 hash 机制，需要分析打包资源，导出模块间的依赖关系，根据依赖上下文决定产出包的 hash 值。

### webpack 中的 hash chunkhash contenthash

**hash** 反映了项目的构建版本，同一次打包中的 hash 值是一样的。但如果某个模块内容没有变化，也会产生新的 hash 值，导致缓存命中率较低。  
**chunkhash** 会根据入口文件（entry）进行依赖解析。
**contenthash** 会根据文件具体内容生成 hash 值。

## importing modules

依赖机制。esm/commonjs

## non-JavaScript resources

对导入其他非 JS 类型资源的支持。

## output module formats

输出模块化。对应 importing modules 。构建输出内容的模块化方式需更灵活。esm/commonjs

## transformations

编译。对 js 代码的压缩，未引用代码的删除
