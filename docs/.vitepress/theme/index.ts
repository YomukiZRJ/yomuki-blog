/*
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 10:12:18
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-05 16:54:41
 */
import DefaultTheme from 'vitepress/theme';
import MyLayout from './MyLayout.vue'
import NavUl from "../../components/nav-ul/index.vue"
export default {
    ...DefaultTheme,
    Layout: MyLayout,
    enhanceApp({ app }) {
        app.component('nav-ul', NavUl)
    }
}