<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-26 15:04:21
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-30 13:04:02
-->
# npm
- [npm cli文档](https://docs.npmjs.com/cli/v8/commands/npm)
## 扁平化
在安装依赖的时候，会在node_m中查找，如果遇到相同版本的依赖，就不安装。
- 如果A依赖P@1.0.0 ，B依赖P@2.0.0。并且在packages配置中，A在B之前，那么P@1.0.0会被安装在A同级，P@2.0.0会被安装在B的node_m中。目录结构如下：
![img](http://assets.yomuki.com/md/npm-1.png)
- 如果这个时候再安装一个C，它依赖P@1.0.0，那么就会在node_m目录中查找相同依赖，跳过了这个P的安装，目录结构如下：
![img](http://assets.yomuki.com/md/npm-2.png)
- 这个时候再安装一个D，它依赖P@2.0.0，那么搜索node_m目录发现版本号不同，便安装下D的node_m下，目录结构就变成了这样：
![img](http://assets.yomuki.com/md/npm-3.png)
- 如果A升级了，也依赖P@2.0.0。那么会先删除A@1.0.0，安装A@2.0.0，安装的时候发现P@1.0.0还是在使用，便只能安装在A中的node_m下，目录结构如下：
![img](http://assets.yomuki.com/md/npm-4.png)
- 如果C也升级，也依赖P@2.0.0了。会先删除C@1.0.0，安装C@2.0.0，在C的同级安装P@2.0.0，目录结构如下：
![img](http://assets.yomuki.com/md/npm-5.png)
- 这样，P@2.0.0就同时出现在了两个层次中，好不优雅。使用 **npm dedupe**来简化整体结构
### 扁平化的缺点
- 用户可以直接引用没有定义在package中的包。会产生**幽灵依赖**
- 扁平化算法的复杂性高
- 依赖结构的不确定性
> 如何解决这些问题呢？用pnpm呀！🌝
## lockfile
npm从v5版开始增加了lockfile，其目的是保证任意机器上运行npm i 命令都能得到相同的node_modules。 
### **为什么单一的package.json不能确定唯一的依赖树？**
- 不同版本npm的安装策略不同和算法有所不同。
- npm i 会根据包中的semver-range version更新依赖，某些依赖自上次安装后可能有了新版本。

### lockfile文件说明
- version 依赖版本号
- resolved 依赖包安装源
- integrity 包完整性的hash值
- dev 是否为顶层依赖
- dependencies 当子依赖和当前已安装的顶层依赖冲突时，子依赖放这（参照扁平化）
```js
"node_modules/@eslint/eslintrc": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-1.3.0.tgz",
      "integrity": "sha512-UWW0TMTmk2d7hLcWD1/e2g5HDM/HQ3csaLSqXCfqwh4uNDuNqlaKWXmEsL4Cs41Z0KnILNvwbHAah3C2yt06kw==",
      "dev": true,
      "dependencies": {
        "ajv": "^6.12.4",
        "debug": "^4.3.2",
        "espree": "^9.3.2",
        "globals": "^13.15.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.0",
        "minimatch": "^3.1.2",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      }
    },
```
### **是否要将lockfile提交至仓库**
- 如果开发一个应用，建议将lockfile提交至仓库。可以保证项目组成员，运维等在执行npm i 后得到相同的node_modules。
- 如果开发一个供外部使用的库。看情况。一般这个库是被其他项目依赖的，在不使用lockfile的情况下，就可以复用项目中已载入的包，可以避免重复依赖。
- 如果开发的库依赖了一个有精准版本号的模块，那么提交lockfile至仓库可能会造成同一个依赖的不同版本都被下载的情况。建议定义在peerDependencies中。

**总结，推荐做法就是将lockfile提交至仓库中，npm publish的时候忽略lockfile。**
### 不同版本npm处理lockfile的区别
- 在npmv5.0.x中，npm i命令会根据lockfile安装依赖，不管package.json
- 在npmv5.1.0 ~ v5.4.2中，npm i会无视lockfile文件，下载最新的包并更新到lockfile中
- 在npmv5.4.2后
  - 如果项目中只有package.json，执行npm i 会根据pak生成lockfile；
  - 如果项目中存在package.json和lockfile，并且两文件中的依赖版本兼容，即使依赖有了新版本，也会根据lockfile下载
  - 如果项目中存在package.json和lockfile，并且两文件中有依赖版本不兼容，则会根据package中的版本安装，然后更新lockfile
  - 如果package-lock和npm-shrinkwrap.json（npm早期使用的版本锁定）同时存在，则package-lock会被忽略。
## 依赖类型
npm有以下几种依赖：
- dependencies：项目依赖
- devDependencies：开发依赖
- peerDependencies：同版本依赖
- bundledDependencies：捆绑依赖
- optionalDependencies：可选依赖
### dependencies
项目依赖，这些依赖会成为线上生产环境中的代码。当它关联npm包被下载时，dependencies模块下的依赖也会被一起下载。
### devDependencies
开发依赖，仅在开发环境中使用。仅仅是一个规范化的作用，并不是说写在这里的依赖就不会被打包进生产环境。
### peerDependencies
同版本依赖，即如果你安装我，你也得安装我对应的依赖。它的使用场景多数为：
- 插件不能单独运行
- 插件正确运行的前提是，下载安装核心依赖库
- 不建议重复下载核心依赖库
- 插件API的设计必须符合核心依赖库的插件编写规范
- 在项目中，同一插件体系下的核心依赖库版本最好相同
### bundledDependencies
捆绑依赖，与npm pack打包命令有关。目前好像用不着，用到了再看。
### optionalDependencies
可选依赖，即使这个依赖安装失败，也没事。