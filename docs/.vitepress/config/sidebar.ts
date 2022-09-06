/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-02 10:28:13
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-06 10:53:19
 */
import { DefaultTheme } from "vitepress";
import quickCheckSidebar from "../../quick-check/sidebar";
import studySidebar from "../../study/sidebar";
import toolsSidebar from "../../tools/sidebar";
import frameworkSidebar from "../../framework/sidebar";
import diarySidebar from "../../diary/sidebar";
import informalEssaySidebar from "../../informal-essay/sidebar";
import bundlersSidebar from "../../bundlers/sidebar";
const sidebar: DefaultTheme.Config["sidebar"] = {
  "/diary/": diarySidebar,
  "/quick-check/": quickCheckSidebar,
  "/study/": studySidebar,
  "/tools/": toolsSidebar,
  "/framework/": frameworkSidebar,
  "/informal-essay/": informalEssaySidebar,
  "/bundlers/": bundlersSidebar,
};
export default sidebar;
