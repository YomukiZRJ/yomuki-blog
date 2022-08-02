/*
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 10:28:13
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-02 16:58:42
 */
import { DefaultTheme } from "vitepress"
const sidebar: DefaultTheme.Config['sidebar'] = {
    '/daily/': [
        {
            text: '记录',
            collapsible: true,
            // collapsed: true,
            items: [
                {
                    text: "2022/07/28 - axios",
                    link: '/daily/record/20220728/'
                },
                {
                    text: "2022/06/09 - EventBus",
                    link: '/daily/record/20220609-eventBus'
                },
                {
                    text: "2022/06/09 - rem.js",
                    link: '/daily/record/20220609-rem.js'
                }
            ]
        },
        {
            text: '随手笔记',
            collapsible: true,
            // collapsed: true,
            items: [
                {
                    text: "2022/07/22 - 2022掘金开发者大会笔记1",
                    link: '/daily/note/20220722-01'
                },
                {
                    text: "2022/07/22 - 2022掘金开发者大会笔记2",
                    link: '/daily/note/20220722-02'
                },
                {
                    text: "2022/07/22 - 2022掘金开发者大会笔记3",
                    link: '/daily/note/20220722-03'
                },
                {
                    text: "2021/01/24 - 移动1像素",
                    link: '/daily/note/20210124-01'
                },
            ]
        },
    ],

    '/study/': [
        {
            text: 'ttttts',
            collapsible: true,
            // collapsed: true,
            items: [
                {
                    text: "浅入浅出ts - 数据类型",
                    link: '/study/ts/ts-01'
                },
            ]
        },
        {
            text: '插件相关',
            collapsible: true,
            // collapsed: true,
            items: [
                {
                    text: "lodash - 数组",
                    link: '/study/lodash-01/'
                },
                {
                    text: "vueuse - 元素",
                    link: '/study/vueuse-01/'
                },
            ]
        },
    ],
    '/tools/': [
        {
            text: '屠龙宝刀',
            items: [
                {
                    text: "js插件库",
                    link: '/tools/js'
                },
                {
                    text: "css库",
                    link: '/tools/css'
                },
                {
                    text: "生成工具",
                    link: '/tools/generate'
                }
            ]
        },
        {
            text: 'c+cv',
            items: [
                {
                    text: "小元素",
                    link: '/tools/ccv/element'
                }
            ]
        },
        {
            text: '素材库',
            items: [
                {
                    text: "图片",
                    link: '/tools/material/img'
                }
            ]
        },
    ]
}
export default sidebar