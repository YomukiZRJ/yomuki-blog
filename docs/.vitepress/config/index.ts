/*
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 10:25:51
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-02 15:32:41
 */
import { defineConfig } from 'vitepress'
import sidebar from "./sidebar"
import nav from "./nav"
export default defineConfig({
    // ...
    title: "Yomuki 随便写写",
    description: "记录下日常",
    lastUpdated: true,
    themeConfig: {
        sidebar,
        nav,
        // footer: {
        //     message: 'Released under the MIT License.',
        //     copyright: 'Copyright © 2019-present Evan You'
        //   },
    }
})