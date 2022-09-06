import diaryJson from "./index.json";
// console.log(diaryJson)
export default [
  {
    text: "日记",
    collapsible: true,
    collapsed: false,
    items: diaryJson,
  },
];
