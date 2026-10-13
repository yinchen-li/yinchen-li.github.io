# 部署说明（Deployment）

## 目标

将站点部署到 **GitHub Pages**，最终访问地址为：

```
https://yinchen-li.github.io
```

因为仓库名是 `yinchen-li.github.io`（用户主页仓库），站点会发布在根路径 `/` 下，
无需额外的子路径配置。

## 部署方式：main 分支根目录

本项目的部署方式为：

- **Source（发布源）**：`Deploy from a branch`
- **Branch（分支）**：`main`
- **Folder（目录）**：`/ (root)`，即仓库根目录

即：把 `main` 分支的**根目录内容**直接作为站点发布。由于仓库根目录已包含
`index.html`，无需任何构建步骤。

## 操作步骤

1. 将本项目文件推送到 GitHub 仓库 `yinchen-li.github.io` 的 `main` 分支根目录
2. 打开仓库 **Settings → Pages**
3. 在 **Build and deployment** 中选择：
   - Source：`Deploy from a branch`
   - Branch：`main`，目录选择 `/ (root)`
4. 保存后等待片刻，访问 `https://yinchen-li.github.io` 即可

## 注意事项

- 首页入口文件必须是根目录下的 `index.html`
- `404.html` 会被 GitHub Pages 自动用作自定义 404 页面
- `robots.txt` 与 `sitemap.xml` 已放置在根目录，便于搜索引擎抓取
- 本项目无构建产物，因此**每次只需推送源文件**，不需要上传任何 `dist/` 目录
- 由于是纯静态站点，推送后无需额外配置即可生效
