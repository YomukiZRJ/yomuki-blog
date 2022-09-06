import jsonSidebar from "./index.json";
import viteSidebar from "./vite/index.json";
import webpackSidebar from "./webpack/index.json";
// console.log(diaryJson)
export default [
  {
    text: "构建工具",
    collapsible: true,
    collapsed: false,
    items: [
      {
        text: "感谢大佬们的好文章！",
        link: "/bundlers/article",
      },
      ...jsonSidebar,
    ],
  },
  {
    text: "webpack",
    collapsible: true,
    collapsed: false,
    items: webpackSidebar,
  },
  {
    text: "vite",
    collapsible: true,
    collapsed: false,
    items: viteSidebar,
  },
];
