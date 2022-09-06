/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-30 09:46:45
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-06 10:43:12
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
export default () => {
  const DIARY_LINK = "/daily/diary";
  const DIARY_PATH = "daily/diary"; // 日记路径
  const JSON_PATH = "daily/diary/index.json"; // 边栏文件路径
  let docsPath = cwd();
  docsPath = docsPath.slice(0, docsPath.length - 3) + "docs";
  console.log(docsPath);
  const diaryPath = resolve(docsPath, DIARY_PATH);
  /**
   * @description: 获取今天日期
   * @return {string} 20220101
   */
  function getTodayDate() {
    const today = new Date();
    return `${today.getFullYear()}${padStartToTwo(today.getMonth() + 1)}${padStartToTwo(today.getDate())}`;
  }
  /**
   * @description: 以0补全至长度为2
   * @param {String} str
   * @return {String}
   */
  function padStartToTwo(str) {
    return str.toString().padStart(2, "0");
  }
  function init() {
    const jsonPath = resolve(docsPath, JSON_PATH);
    if (!existsSync(jsonPath)) {
      console.error(`${jsonPath} 边栏文件不存在~`);
      return;
    }
    const diaryDate = process.argv.length >= 3 ? process.argv[2] : getTodayDate();
    const fileName = `${diaryDate}.md`;
    const fileContent = `# ${fileName}`;
    const filePath = resolve(diaryPath, fileName);
    if (existsSync(filePath)) {
      console.error(`${filePath} 文件已存在，请删除文件后继续~`);
      return;
    }
    const jsonContent = JSON.parse(readFileSync(jsonPath, "utf-8"));
    const checkHas = jsonContent.find(({ text }) => {
      return text === diaryDate;
    });
    if (!checkHas) {
      jsonContent.unshift({
        text: diaryDate,
        link: `${DIARY_LINK}/${diaryDate}`,
      });
    }
    writeFileSync(jsonPath, JSON.stringify(jsonContent));
    writeFileSync(filePath, fileContent);
    console.log(`${filePath} 文件生成成功~`);
  }
  init();
};
