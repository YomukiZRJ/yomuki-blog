# changesets

[changesets](https://github.com/changesets/changesets)一个用于 Monorepo 项目下版本以及 Changelog 文件管理的工具

## 使用记录

1. 安装

```
npm install @changesets/cli
npx changeset init
```

2. 生成 changeset 文件

```
npx changeset
```

- major : 大版本
- minor ：小版本

3. 更新版本
   消耗 changeset 文件，修改对应的包的版本号，生成 CHANGELOG

```
npx changeset version
```

4. 发布包

```
npx changeset publish
```
