/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-02 10:34:47
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-06 10:48:46
 */
import { DefaultTheme } from "vitepress";
const nav: DefaultTheme.Config["nav"] = [
  {
    text: "日常",
    items: [
      {
        text: "日记",
        link: "/diary/",
      },
      {
        text: "随笔",
        link: "/informal-essay/",
      },
      {
        text: "速查",
        link: "/quick-check/",
      },
    ],
  },
  {
    text: "学到老，活到老",
    items: [
      {
        text: "基础",
        link: "/study/",
      },
      {
        text: "前端基建",
        link: "/infrastructure/about",
      },
      {
        text: "WebGL",
        link: "/webgl/about",
      },
      {
        text: "WebGIS",
        link: "/webgis/about",
      },
      {
        text: "架构 - 从入门到放弃",
        link: "/framework/",
      },
      {
        text: "架构 - 构建",
        link: "/bundlers/",
      },
    ],
  },
  { text: "前端屠龙宝刀点击就送", link: "/tools/" },
  { text: "code仓库", link: "https://github.com/YomukiZRJ/yomuki-blog" },
];
export default nav;
