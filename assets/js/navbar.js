/**
 * navbar.js
 * 导航相关逻辑：
 * - 根据当前 URL 高亮对应的导航项（设置 aria-current="page"）
 * - 移动端汉堡菜单的展开 / 收起
 */

import { qs, qsa, on } from "./utils/dom.js";

const MOBILE_BREAKPOINT = 768;

/** 归一化路径，便于比较：去掉结尾的 index.html 与多余的斜杠 */
function normalizePath(pathname) {
  let path = pathname || "/";
  if (path.endsWith("/index.html")) {
    path = path.slice(0, -"index.html".length);
  }
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path || "/";
}

/** 高亮当前页面对应的导航链接 */
function highlightActiveLink() {
  const current = normalizePath(window.location.pathname);

  qsa("[data-nav] .nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    let target;
    try {
      target = normalizePath(new URL(href, window.location.href).pathname);
    } catch (error) {
      return;
    }

    if (target === current) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/** 初始化移动端菜单交互 */
function initMobileToggle(nav) {
  const toggle = qs("[data-nav-toggle]");
  if (!toggle) return;

  const isOpen = () => nav.classList.contains("is-open");

  const open = () => {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  on(toggle, "click", () => (isOpen() ? close() : open()));

  // 点击导航链接后自动收起
  on(nav, "click", (event) => {
    if (event.target.closest("a")) close();
  });

  // 点击空白处收起
  on(document, "click", (event) => {
    if (!isOpen()) return;
    if (event.target.closest("[data-nav]")) return;
    if (event.target.closest("[data-nav-toggle]")) return;
    close();
  });

  // Esc 收起
  on(document, "keydown", (event) => {
    if (event.key === "Escape") close();
  });

  // 视口变宽时收起
  on(window, "resize", () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) close();
  });
}

/** 初始化导航模块 */
export function initNavbar() {
  const nav = qs("[data-nav]");
  if (!nav) return;

  highlightActiveLink();
  initMobileToggle(nav);
}
