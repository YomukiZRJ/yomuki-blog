/*
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 10:34:47
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-26 14:59:03
 */
import { DefaultTheme } from "vitepress"
const nav: DefaultTheme.Config['nav'] = [
    { text: '日常记录', link: '/daily/' },
    {
        text: '今天不学习 明天变垃圾', items: [
            {
                text: "瞎看",
                link: "/study/"
            },
            {
                text: "架构，从入门到放弃",
                link: "/framework/"
            }
        ],
    },
    { text: '前端屠龙宝刀点击就送', link: '/tools/' },
    { text: 'code仓库', link: 'https://github.com/YomukiZRJ/yomuki-blog' }
]
export default nav