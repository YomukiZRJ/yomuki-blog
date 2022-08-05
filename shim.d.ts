/*
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-05 16:50:40
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-05 16:52:08
 */
declare module '*.vue' {
    import { type DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}