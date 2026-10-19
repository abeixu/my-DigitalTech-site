# Crazy abei · 科技与商业知识库

网站地址：https://fuckai001.com/

技术栈：Hugo + GitHub + Cloudflare Pages。使用 Relearn 官方主题，定制标题区和目录区的配色与排版。
主题子模块固定在 Relearn 8.3.0 提交 `57a5af8154477e659fb1a408f42a83ab22c10324`，升级需单独验证。

## 页面与功能

- 网站底色取自参考图的淡蓝紫色 #CECFFD；标题区、目录区统一使用该底色与黑色文字，文章区上、右、下方各有 10px 同色窄边。文章区保留 Relearn 配色模式。
- 选中项背景 #EFEEEA 铺满整行，悬停项背景 #F4F3EF，选中底色始终保留；子文章同样处理。
- 顶部右侧显示“商业问题 / 科技 / 组织和人”：科技为当前栏目，可返回现有内容首页；另两项为灰色禁用文字，不提供链接。
- 原侧栏不再重复显示标题和副标题，目录与文章区都位于顶部导航下方；顶部在阅读文章时保持可见。
- 文章区不显示顶部路径和工具栏；手机端使用与 PC 相同的桌面布局，不增加独立目录按钮。
- 侧栏宽 275px，顶部导航区高 80px、跨越目录区和文章区；目录标题保持单行，条目间距增加 1pt。
- 子文章相对父目录标题缩进一个汉字（16px），缩进仅作用于文字，选中和悬停底色仍铺满整行。
- 展开目录最后一项下方不保留主题额外留白，与下一目录之间沿用收起时的 1pt 行间距。
- 目录文字整体向右内移 3.5pt，箭头另向右移动 2pt、大小 10px，箭头与文字额外间距为 3.5pt；顶层栏目字号 16px，子文章字号保持主题默认值。
- 关闭主题原生已读标记，不显示文章右侧对勾。
- 所有页面的浏览器标签标题固定为“Crazy abei”，图标使用原来的 Relearn 图标；文章区标题保持各文章原名。标签文字的对齐由浏览器控制。
- 搜索框、索引和搜索页通过主题原生参数关闭，并对全部页面级联关闭搜索依赖。
- 目录初次访问默认全部收起，直接进入文章页也一样；沿用原生复选框折叠，通过 sessionStorage 按目录 ID 独立记住手动状态，跳转、刷新和前进后退不会重置其他目录。
- 侧栏头尾的空菜单、分隔线、主题选择、历史按钮和署名不显示。
- 站名字标为“Crazy abei”：以开放授权的 Archivo Black 绘制矢量轮廓，匹配参考图的紧凑粗体风格，使用 #0053E2 蓝色与右侧 #FFC220 黄色六束 Spark。字体为近似匹配，不使用仅限沃尔玛及授权供应商使用的 Everyday Sans 字体。字标与副标题在顶部左侧横向排列，以竖线分隔；副标题保留微软雅黑优先的字体栈。
- 字标素材来源：Archivo Black 字体（https://github.com/google/fonts/tree/main/ofl/archivoblack，SIL OFL）；黄色 Spark（https://brandcenter.walmart.com/content/dam/brand/assets/all-spark.zip）。
- 副标题：盯紧商业问题，关注科技、组织和人。字号 13px、保持单行；自定义 CSS 用于标题区与目录区的配色及排版。
- 首页提供阅读入口，“知识目录”和“大模型LLM”保持顶层并列。
- 现有文章路径保持不变，大模型专栏九篇文章按 weight 排序。
- 栏目通过主题原生 children 短代码列出子文章，不覆盖主题内容布局。
- 公式、字体和主题脚本从本站加载。
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
