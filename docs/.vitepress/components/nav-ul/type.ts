/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-05 17:03:00
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-05 17:21:01
 */
export interface INavItem {
  text: string;
  link: string;
}
export interface INav {
  text: string;
  collapsible?: boolean;
  items: INavItem[];
}
