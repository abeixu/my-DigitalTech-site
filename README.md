# 疯狂阿北 · 个人知识网站

网站地址：https://fuckai001.com/

使用 Hugo Extended、Relearn 主题、GitHub 和 Cloudflare Pages。Relearn 子模块固定在 8.3.0（`57a5af8154477e659fb1a408f42a83ab22c10324`）。

## 当前页面

顶部是固定导航栏，左侧是目录，右侧是文章。可见站名为“疯狂阿北”，浏览器标签标题仍为“Crazy abei”。顶部“商业问题”“科技”“组织和人”目前都是链接；前两者中的“商业问题”和“组织和人”对应栏目正文暂时隐藏。

顶栏高 60px，目录宽 265px；站名字号 20px、副标题 16px、目录和正文字号 15px。文章最大宽度 1100px，左右内边距 30px，正文行高 1.88。当前颜色和布局以 `assets/css/custom.css` 为准。浏览器图标使用 `assets/images/logo.svg`。

目录沿用 Relearn 的复选框结构，由 `assets/js/menu-state.js` 按路径在当前会话中保存各目录的展开状态。目录首次访问默认收起；点击其他目录先打开目录文章，再次点击当前目录标题才切换子目录。顶栏标题没有首页链接，目录没有可见展开箭头。

## 内容与文件

- `content/docs/`：知识目录，科技和商业栏目。
- `content/llm/`：大模型系列，九篇文章按 front matter 的 `weight` 排序。
- `content/business/`、`content/people/`：顶部导航对应的暂存栏目。
- 隐藏的 Relearn 示例文章保留旧 URL，并通过 `layouts/partials/content.html` 显示兼容提示。
- `hugo.yaml`：站点与主题功能配置。
- `layouts/partials/site-header.html`：顶部站名和导航。
- `layouts/partials/custom-footer.html`：加载目录状态脚本。
- `assets/css/custom.css`：本网站样式。
- `assets/images/logo.svg`：浏览器图标。

文章通常从二级标题开始，一级标题由主题生成。行内公式支持 `$...$`、`\(...\)`；块公式支持 `$$...$$`、`\[...\]`。请保留既有文章 URL。

## 本地构建

建议 Hugo Extended 0.158.0；主题要求至少 0.141.0。

```sh
git clone --recurse-submodules https://github.com/abeixu/my-DigitalTech-site.git
cd my-DigitalTech-site
hugo --minify --panicOnWarning
```

已有仓库先执行 `git submodule update --init --recursive`。优先在项目配置、模板覆盖、CSS 和 JS 中修改，不直接修改主题子模块。

## 部署

生产分支为 `main`。Cloudflare Pages 在仓库根目录运行 `hugo --minify`，输出目录为 `public`；建议设置 `HUGO_VERSION=0.158.0`，并在克隆时获取主题子模块。DNS 和 Cloudflare 后台设置以实际状态为准。
