import { DefaultTheme } from "vitepress";
import quickCheckSidebar from "../../quick-check/sidebar";
import studySidebar from "../../study/sidebar";
import toolsSidebar from "../../tools/sidebar";
import frameworkSidebar from "../../framework/sidebar";
import diarySidebar from "../../diary/sidebar";
import informalEssaySidebar from "../../informal-essay/sidebar";
import bundlersSidebar from "../../bundlers/sidebar";
import infrastructureSidebar from "../../infrastructure/sidebar";
import webglSidebar from "../../webgl/sidebar";
const sidebar: DefaultTheme.Config["sidebar"] = {
  "/diary/": diarySidebar,
  "/quick-check/": quickCheckSidebar,
  "/study/": studySidebar,
  "/tools/": toolsSidebar,
  "/framework/": frameworkSidebar,
  "/informal-essay/": informalEssaySidebar,
  "/bundlers/": bundlersSidebar,
  "/infrastructure/": infrastructureSidebar,
  "/webgl/": webglSidebar,
};
export default sidebar;
