import cssData from "./css/index.json";
export default [
  {
    text: "基础",
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: "目录",
        link: "/study/",
      },
      {
        text: "好文收集",
        link: "/study/article",
      },
    ],
  },
  {
    text: "vue",
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: "路由懒懒懒加载（按需载入）",
        link: "/study/vue/route-lazy-load",
      },
    ],
  },
  {
    text: "ts",
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: "浅入浅出ts - 数据类型",
        link: "/study/ts/ts-01",
      },
    ],
  },
  {
    text: "css",
    collapsible: true,
    // collapsed: true,
    items: cssData,
  },
  {
    text: "其他",
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: "cesium学习记录",
        link: "/study/other/cesium",
      },
      {
        text: "Turf学习记录",
        link: "/study/other/Turf",
      },
      {
        text: "GeoJSON学习记录",
        link: "/study/other/GeoJSON",
      },
      {
        text: "leafletjs学习记录",
        link: "/study/other/leafletjs",
      },
      {
        text: "lodash - 数组",
        link: "/study/other/lodash-01",
      },
      {
        text: "vueuse - 元素",
        link: "/study/other/vueuse-01",
      },
    ],
  },
  {
    text: "八股文sos",
    collapsible: true,
    // collapsed: true,
    items: [
      {
        text: "浏览器",
        link: "/study/eightPpartEssay/browser",
      },
      {
        text: "css",
        link: "/study/eightPpartEssay/css",
      },
      {
        text: "js",
        link: "/study/eightPpartEssay/js",
      },
    ],
  },
];
