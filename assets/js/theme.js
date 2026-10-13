/**
 * theme.js
 * 亮色 / 深色主题切换。
 * - 主题状态保存在 localStorage（键名由 storage.js 统一加前缀）
 * - 未手动设置时跟随系统 prefers-color-scheme
 * - 通过在 <html> 上设置 data-theme="dark" 驱动 variables.css 中的变量切换
 */

import { qsa, on } from "./utils/dom.js";
import { getItem, setItem } from "./utils/storage.js";

const THEME_KEY = "theme";
const THEME = { LIGHT: "light", DARK: "dark" };

const THEME_COLORS = {
  light: "#ffffff",
  dark: "#0f1419",
};

const systemPrefersDark =
  typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

/** 已保存的显式主题（未设置返回 null） */
function getStoredTheme() {
  const value = getItem(THEME_KEY);
  return value === THEME.DARK || value === THEME.LIGHT ? value : null;
}

/** 依据保存值 / 系统偏好计算应使用的主题 */
export function getPreferredTheme() {
  const stored = getStoredTheme();
  if (stored) return stored;
  return systemPrefersDark && systemPrefersDark.matches ? THEME.DARK : THEME.LIGHT;
}

/** 当前生效主题 */
export function getTheme() {
  return document.documentElement.getAttribute("data-theme") || getPreferredTheme();
}

/** 仅应用到 DOM，不持久化 */
export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.light);
  }
}

/** 设置并（可选）持久化主题 */
export function setTheme(theme, persist = true) {
  applyTheme(theme);
  if (persist) setItem(THEME_KEY, theme);
  syncToggles(theme);
}

/** 在亮色 / 深色之间切换 */
export function toggleTheme() {
  setTheme(getTheme() === THEME.DARK ? THEME.LIGHT : THEME.DARK);
}

/** 同步所有切换按钮的无障碍状态 */
function syncToggles(theme) {
  const isDark = theme === THEME.DARK;
  qsa("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute(
      "aria-label",
      isDark ? "切换到亮色模式" : "切换到深色模式"
    );
  });
}

/** 初始化主题模块 */
export function initTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);
  syncToggles(theme);

  qsa("[data-theme-toggle]").forEach((button) => {
    on(button, "click", toggleTheme);
  });

  // 用户未手动选择时，跟随系统变化
  on(systemPrefersDark, "change", () => {
    if (getStoredTheme()) return;
    const next = getPreferredTheme();
    applyTheme(next);
    syncToggles(next);
  });
}
