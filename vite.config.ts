/*
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-05 16:20:05
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-05 16:20:44
 */
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vueJsx()]
})