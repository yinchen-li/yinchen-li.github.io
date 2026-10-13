/**
 * main.js
 * 站点脚本入口。所有页面统一引入本文件（type="module"）。
 *
 * 职责：
 * 1. 初始化主题（亮色 / 深色）
 * 2. 初始化导航（高亮当前项、移动端菜单）
 * 3. 初始化搜索（预留）
 * 4. 填充页脚年份等通用运行时信息
 */

import { qsa, ready } from "./utils/dom.js";
import { initTheme } from "./theme.js";
import { initNavbar } from "./navbar.js";
import { initSearch } from "./search.js";

/** 填充 [data-current-year] 占位元素 */
function fillCurrentYear() {
  const year = String(new Date().getFullYear());
  qsa("[data-current-year]").forEach((el) => {
    el.textContent = year;
  });
}

/** 统一初始化 */
function init() {
  initTheme();
  initNavbar();
  initSearch();
  fillCurrentYear();
}

ready(init);

export { init };
