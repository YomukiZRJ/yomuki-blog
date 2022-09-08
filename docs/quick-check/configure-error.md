<!--
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-16 09:49:37
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-17 10:00:05
-->

# 环境配置问题记录

## TypeScript intellisense is disabled on template. To enable, configure `"jsx"...

- 在 jsconfig 或 tsconfig 中添加"jsx": "preserve",

## needs an import assertion of type "json"

不能 import 一个 JSON 文件。但已经有提案**Import Assertions**了，可能以后就行啦
