/**
 * search.js
 * 搜索功能预留模块。
 *
 * 当前仅完成基础接线：
 * - 拦截 [data-search-form] 的提交，阻止页面刷新
 * - 监听 [data-search-input] 的输入
 *
 * 后续可在此扩展为本地静态搜索：
 * 1. fetch("/data/posts.json") 构建索引
 * 2. 在 runSearch(query) 中做关键词匹配 / 简单分词
 * 3. 渲染结果到 [data-search-results] 容器
 */

import { qs, qsa, on } from "./utils/dom.js";

function normalize(value) {
  return (value || "").trim().toLowerCase();
}

/** 预留：执行搜索（派发自定义事件，便于其他模块订阅） */
function runSearch(query) {
  if (!query) return;

  document.dispatchEvent(
    new CustomEvent("site:search", { detail: { query } })
  );

  // TODO: 接入 /data/posts.json 索引后在此渲染结果
  // 例如：console.log("搜索关键词：", query);
}

/** 初始化搜索模块 */
export function initSearch() {
  qsa("[data-search-form]").forEach((form) => {
    on(form, "submit", (event) => {
      event.preventDefault();
      const input = qs("[data-search-input]", form);
      runSearch(normalize(input && input.value));
    });
  });

  qsa("[data-search-input]").forEach((input) => {
    on(input, "input", () => {
      // 预留：实时过滤逻辑
    });
  });
}
