# 工业化阿北 · 科技与商业知识库

网站地址：https://fuckai001.com/

本项目继续使用 Hugo + GitHub + Cloudflare Pages，主题已迁移为 Relearn 8.3.0。主题子模块固定在提交 `57a5af8154477e659fb1a408f42a83ab22c10324`，升级需单独验证。

## 页面与风格

- 全中文界面，单一浅色模式；深色侧边目录、绿色强调色、浅色正文。
- 首页 → 知识目录 → 科技 / 商业。支持展开目录、页面目录与前后页导航。
- 科技与商业是栏目介绍，文章尚待整理；不会把原主题的占位文章当作正式内容。
- 中文搜索在浏览器本地运行，支持词组和空格分隔的多个关键词，标题匹配优先。
- 数学公式、搜索、主题字体和脚本从本站加载，无需依赖外部公式或搜索服务。
- 窄屏自动收起侧栏，首页栏目入口改为单列。

## 本地运行

建议使用 Hugo Extended 0.158.0；主题最低要求为 0.141.0。

```sh
git clone --recurse-submodules https://github.com/abeixu/my-DigitalTech-site.git
cd my-DigitalTech-site
hugo server
```

已有仓库更新后，先同步主题：

```sh
git submodule sync
git submodule update --init --recursive
hugo --minify --panicOnWarning
```

## 新增文章

科技文章放在 `content/docs/technology/`，商业文章放在 `content/docs/business/`。子目录的 `_index.md` 用于建立多级栏目。

```sh
hugo new content docs/technology/first-note.md
```

将文章头部的 `draft: true` 改为 `draft: false` 后发布。标题使用中文；`weight` 数值越小，排序越靠前。正文从二级标题开始，页面标题由主题生成。

```yaml
---
title: "文章标题"
weight: 10
draft: false
---
```

栏目页会自动列出新增文章，侧栏和搜索索引也会随构建更新。

## 数学公式

支持行内公式 `$y = wx + b$`、`\(y = wx + b\)`，以及块公式：

```tex
\[
L = \frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2
\]
```

也可以使用 `$$` 包围块公式。公式由主题自带的 MathJax 渲染。

## 调整外观

- `hugo.yaml`：站名、主题、导航、中文搜索及公式设置。
- `assets/css/custom.css`：中文字体、行距、内容宽度、侧栏宽度、移动端布局。
- `layouts/partials/logo.html`：侧栏站名。
- `layouts/partials/menu-footer.html`：侧栏底部文字。
- `i18n/zh-CN.toml`：中文提示文字。
- `assets/js/search-chinese.js`：中文搜索适配器。

不要直接修改 `themes/hugo-theme-relearn/`，在项目的 `layouts/` 和 `assets/` 中覆盖对应文件即可。

## 原主题示例

`content/docs/section-1/` 和 `content/posts/` 中保留了原示例正文与地址，标记为 `hidden: true` 和 `legacyExample: true`。它们不进入菜单、站内搜索、站点地图和订阅列表；访问旧地址时只显示中文说明。

需要恢复某一示例时，删除它的 `hidden`、`legacyExample`、`disableToc` 和 `outputs` 配置。原首页和原目录介绍也可通过 Git 历史恢复。

## 部署与回退

继续使用已有的 Cloudflare Pages 项目及自定义域名，不需要改动 DNS。

- 生产分支：`main`
- 构建命令：`hugo --minify`
- 输出目录：`public`
- 建议环境变量：`HUGO_VERSION=0.158.0`

构建依赖 Git 子模块，请确保克隆过程获取主题子模块。仓库现有的构建工作流也会获取子模块并执行构建。

需要回退时，在 GitHub 中回退本次迁移提交，Cloudflare Pages 会按原来的主题重新构建。也可以在 Cloudflare Pages 中回滚到先前成功的部署。
