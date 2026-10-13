/**
 * utils/dom.js
 * DOM 相关通用工具函数。所有模块共享，保持纯函数、无副作用。
 */

/** 查询单个元素 */
export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

/** 查询多个元素，返回真正的数组 */
export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/**
 * 绑定事件，返回解绑函数。
 * 用法：const off = on(btn, "click", handler); off();
 */
export function on(target, type, handler, options) {
  if (!target) return () => {};
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

/** DOM 就绪后执行（兼容脚本提前执行的情况） */
export function ready(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
  } else {
    callback();
  }
}

/**
 * 快速创建元素。
 * createEl("a", { className: "btn", text: "更多", attrs: { href: "/blog/" } })
 */
export function createEl(tag, options = {}) {
  const el = document.createElement(tag);
  const { className, text, attrs = {}, children = [] } = options;

  if (className) el.className = className;
  if (text != null) el.textContent = text;

  Object.entries(attrs).forEach(([name, value]) => {
    if (value != null) el.setAttribute(name, String(value));
  });

  children.forEach((child) => {
    if (child) el.appendChild(child);
  });

  return el;
}
