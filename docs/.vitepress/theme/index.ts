/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-02 10:12:18
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-06 10:45:22
 */
import DefaultTheme from "vitepress/theme";
import MyLayout from "./MyLayout.vue";
import NavUl from "../components/nav-ul/index.vue";
import ImageBox from "../components/image-box/index.vue";
import "./style/var.css";
export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component("nav-ul", NavUl);
    app.component("image-box", ImageBox);
  },
};
