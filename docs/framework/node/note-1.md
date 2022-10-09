# fs.lstatSync 和 fs.statSync

两者均是获取[fs.Stats](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#class-fsstats)对象（文件的信息）  
fs.stat 获取的是路径的源文件（即使路径为软链接，获取到的也是源文件）  
fs.lstat 用于处理链接文件，当需要判断路径是否为软链接文件时，用 fs.lstat。

## stats.isSymbolicLink()

如果 fs.Stats 对象描述了符号链接，则返回 true。仅在 fs.lstat 时有效
