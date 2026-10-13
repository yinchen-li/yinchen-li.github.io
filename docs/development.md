# 开发说明（Development）

## 是否需要 npm？

**不需要。** 本项目不使用 Node.js、npm 或任何构建工具。所有代码都是浏览器可直接
运行的静态资源，直接编辑 HTML / CSS / JavaScript 即可，改完刷新页面就能看到效果。

## 本地预览

因为有 ES Modules 和 `fetch` 的限制，**建议通过一个本地静态服务器预览**，而不是
直接用 `file://` 打开（`file://` 下浏览器会因 CORS 阻止模块脚本）。

可选方式（任选其一）：

- 使用 WebStorm 内置的浏览器预览（右键 `index.html` → Open in Browser）
- 使用任意静态服务器（如编辑器插件、Python 自带的 `http.server` 等）

> 提示：如果只修改了纯样式或静态 HTML，直接双击 `index.html` 也能看到大部分效果。

## 目录约定

- 新增页面：在对应目录下创建 `index.html`，URL 形如 `/目录名/`
- 新增文章：在 `blog/` 下创建 `文章名/index.html`，并同步更新
  `data/posts.json` 以及 `blog/index.html`、`archive/index.html`
- 新增项目：在 `projects/` 下创建 `项目名/index.html`，并同步更新
  `data/projects.json` 及 `projects/index.html`

## 资源路径

页面通过相对路径引用资源（例如深度 1 页面使用 `../assets/...`）。新增页面时请
根据目录层级调整 `../` 的数量。

## 样式与脚本

- 只在 HTML 中引入 `assets/css/main.css` 与 `assets/js/main.js` 两个入口
- 新增样式：在 `assets/css/pages/` 下按页面拆分，并被 `main.css` `@import`
- 新增脚本：在 `assets/js/` 下新增模块，并在 `main.js` 中按需引入

## 主题

亮色 / 深色主题通过给 `<html>` 设置 `data-theme="dark"` 实现，相关颜色变量定义在
`assets/css/variables.css`，主题逻辑位于 `assets/js/theme.js`，用户选择保存在
`localStorage`。
