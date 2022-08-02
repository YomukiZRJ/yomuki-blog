/*
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 10:28:13
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-02 13:10:14
 */
import { DefaultTheme } from "vitepress"
const sidebar: DefaultTheme.Config['sidebar'] = [
    {
        text: '记录',
        items: [
            {
                text: "2022/07/28 - axios",
                link: '/record/20220728-axios'
            }
        ]
    },
    {
        text: '笔记',
        items: [
            {
                text: "2022/07/22 - 2022掘金开发者大会笔记1",
                link: '/note/20220722-01'
            },
            {
                text: "2022/07/22 - 2022掘金开发者大会笔记2",
                link: '/note/20220722-02'
            },
            {
                text: "2022/07/22 - 2022掘金开发者大会笔记3",
                link: '/note/20220722-03'
            }
        ]
    }
]
export default sidebar