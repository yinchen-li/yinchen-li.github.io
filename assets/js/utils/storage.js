/**
 * utils/storage.js
 * localStorage 安全封装：统一命名前缀、异常捕获，避免隐私模式下报错。
 */

const PREFIX = "yinchen-li:";

function withPrefix(key) {
  return `${PREFIX}${key}`;
}

/** 读取字符串，失败或不存在时返回 fallback */
export function getItem(key, fallback = null) {
  try {
    const value = window.localStorage.getItem(withPrefix(key));
    return value === null ? fallback : value;
  } catch (error) {
    console.warn("[storage] 读取失败：", error);
    return fallback;
  }
}

/** 写入字符串，成功返回 true */
export function setItem(key, value) {
  try {
    window.localStorage.setItem(withPrefix(key), String(value));
    return true;
  } catch (error) {
    console.warn("[storage] 写入失败：", error);
    return false;
  }
}

/** 删除某一项 */
export function removeItem(key) {
  try {
    window.localStorage.removeItem(withPrefix(key));
    return true;
  } catch (error) {
    console.warn("[storage] 删除失败：", error);
    return false;
  }
}

/** 读取 JSON，解析失败时返回 fallback */
export function getJSON(key, fallback = null) {
  const raw = getItem(key, null);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("[storage] JSON 解析失败：", error);
    return fallback;
  }
}

/** 写入 JSON */
export function setJSON(key, value) {
  try {
    return setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("[storage] JSON 序列化失败：", error);
    return false;
  }
}
