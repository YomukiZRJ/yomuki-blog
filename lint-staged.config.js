/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-09-01 15:38:56
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-01 15:40:10
 */
module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write"],
  "*.{scss,less,styl,html}": ["prettier --write"],
  "*.md": ["prettier --write"],
};
