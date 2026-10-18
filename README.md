# 疯狂阿北 · 科技与商业知识库

网站地址：https://fuckai001.com/

技术栈：Hugo + GitHub + Cloudflare Pages。直接使用 Relearn 官方主题的布局、字体、颜色和交互。
主题子模块固定在 Relearn 8.3.0 提交 `57a5af8154477e659fb1a408f42a83ab22c10324`，升级需单独验证。

## 页面与功能

- 采用官方文档站的主题配色列表，默认自动跟随系统切换 Relearn 浅色／深色。
- 使用主题原生的侧栏、折叠箭头、面包屑、文章目录、搜索、打印和上一篇／下一篇。
- 侧栏底部提供主题切换、阅读历史清理和官方署名。
- 仅头像、站名和副标题使用本站品牌；自定义 CSS 仅用于品牌标识排版。
- 首页提供阅读入口，“知识目录”和“大模型LLM”保持顶层并列。
- 现有文章路径保持不变，大模型专栏九篇文章按 weight 排序。
- 栏目通过主题原生 children 短代码列出子文章，不覆盖主题内容布局。
- 公式、字体、搜索索引和脚本从本站加载。
- 原主题示例继续隐藏，不加入菜单、搜索和站点地图；旧地址保留中文提示。

## 本地运行

建议使用 Hugo Extended 0.158.0；主题最低要求为 0.141.0。

```sh
git clone --recurse-submodules https://github.com/abeixu/my-DigitalTech-site.git
cd my-DigitalTech-site
hugo server
```

已有仓库更新后：

```sh
git submodule update --init --recursive
hugo --minify --panicOnWarning
```

## 新增文章

科技文章放在 `content/docs/technology/`，商业文章放在 `content/docs/business/`，大模型文章放在 `content/llm/`。
目录的 `_index.md` 用于建立多级栏目，`weight` 越小越靠前。

```yaml
---
title: "文章标题"
weight: 10
---
```

正文从二级标题开始，页面标题由主题生成。支持 `$...$`、`\(...\)`、`$$...$$` 和 `\[...\]` 公式。

## 项目配置

- `hugo.yaml`：站名、输出格式和主题功能参数。
- `content/_index.md`：首页内容。
- `layouts/partials/logo.html`、`assets/css/custom.css`：本站品牌标识。
- `layouts/partials/content.html`：隐藏旧示例正文的兼容提示。
- `i18n/zh-CN.toml`：中文翻译。

不要直接修改主题子模块。页面布局和交互由主题原文件维护。

## 部署

- 生产分支：`main`
- 构建命令：`hugo --minify`
- 输出目录：`public`
- 建议环境变量：`HUGO_VERSION=0.158.0`

Cloudflare Pages 克隆时需要获取主题子模块。无需改动 DNS。
