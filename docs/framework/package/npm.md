<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-26 15:04:21
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-26 16:59:07
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

