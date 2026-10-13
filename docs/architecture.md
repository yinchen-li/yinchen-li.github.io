# 架构说明（Architecture）

## 当前技术方案

本项目是一个**纯静态站点**，仅使用：

- HTML5
- CSS3
- 原生 JavaScript（ES Modules）
- JSON

**不使用**任何框架、构建工具、包管理器或后端服务。所有页面均为手工编写的静态
`index.html`，浏览器可直接解析运行。

## 目录职责

| 目录 | 职责 |
| --- | --- |
| 根目录 | 站点入口 `index.html`、`404.html`、`robots.txt`、`sitemap.xml` |
| `about/` `blog/` `projects/` `archive/` `tags/` | 各栏目页面，采用 `目录/index.html` 形式 |
| `assets/css/` | 模块化样式（见下） |
| `assets/js/` | 原生 JavaScript 模块 |
| `assets/images/` | 图片资源（头像、博客、项目、图标、通用） |
| `data/` | 结构化示例数据（`posts.json` / `projects.json` / `tags.json`） |
| `components/` | 未来可复用的 HTML 片段（当前为预留） |
| `docs/` | 项目文档 |

## CSS 分层

样式按“令牌 → 重置 → 布局 → 组件 → 页面”的顺序分层，统一由 `assets/css/main.css`
通过 `@import` 汇总：

```
variables.css  设计令牌（颜色、字体、间距、尺寸）
reset.css      基础重置
layout.css     整体布局（容器、页头、页脚、栅格）
components.css 通用组件（导航、卡片、标签、按钮…）
pages/*.css    页面特有样式
main.css       统一入口
```

## JavaScript 模块

使用浏览器原生 ES Modules（`<script type="module">`）：

- `main.js`：入口，负责统一初始化
- `theme.js`：亮色 / 深色主题，状态保存在 `localStorage`
- `navbar.js`：导航高亮与移动端菜单
- `search.js`：搜索功能（预留）
- `utils/dom.js`、`utils/storage.js`：通用工具函数

`data/*.json` 作为数据源，目前页面内容以静态 HTML 呈现；未来可由 JS 读取 JSON
动态渲染，或迁移到静态站点生成器。

## 未来升级路径

当内容规模增长、需要自动化构建时，可平滑迁移到以下方案（均为“内容 → 构建 →
静态 HTML”，与 GitHub Pages 部署方式兼容）：

- **Markdown**：将文章改为 Markdown 编写
- **Astro / Hugo / Jekyll / Eleventy**：静态站点生成器
- **Vue / Nuxt**：需要更强交互或组件化时

现有目录结构与样式变量可作为迁移时的基础，无需推倒重来。
