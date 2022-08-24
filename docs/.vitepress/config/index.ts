/*
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 10:25:51
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-23 10:15:15
 */
import { defineConfig } from 'vitepress'
import sidebar from "./sidebar"
import nav from "./nav"
export default defineConfig({
    // ...
    title: "Yomuki",
    description: "Yomuki的日常记录",
    author: "Yomuki",
    markdown: {
        lineNumbers: true, //显示代码行数
    },
    lastUpdated: true,
    themeConfig: {
        sidebar,
        nav,
        author: 'Yomuki',
        lastUpdatedText: '上次更新时间', //最后更新时间文本
        logo: "/avatar.png", //导航栏左侧头像
        footer: {
            // message: 'Released under the MIT License.',
            copyright: '备案号：浙ICP备19025079号'
        },
        docFooter: {
            //上下篇文本
            prev: '上一篇',
            next: '下一篇'
        },
    }
})