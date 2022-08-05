/*
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 10:28:13
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-05 17:33:08
 */
import { DefaultTheme } from "vitepress"
import dailySidebar from '../../daily/sidebar';
import studySidebar from '../../study/sidebar';
import toolsSidebar from '../../tools/sidebar';
const sidebar: DefaultTheme.Config['sidebar'] = {
    '/daily/': dailySidebar,
    '/study/': studySidebar,
    '/tools/': toolsSidebar
}
export default sidebar