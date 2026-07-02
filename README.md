# Smart Prompt App

这是一个基于 Astro + TypeScript + 原生 CSS 的静态 AI 生图提示词网站。当前包含提示词构建器、配方库、模型对比、新闻栏目、LoRA 指南和一个轻量新闻后台。

网站可以部署到 Cloudflare Pages。构建命令是 `npm run build`，输出目录是 `dist`。

## 本地运行

如果使用项目自带的 Node：

```powershell
.tools\node-v20.19.4-win-x64\npm.cmd install
.tools\node-v20.19.4-win-x64\npm.cmd run dev
```

如果电脑已经装好 Node：

```powershell
npm install
npm run dev
```

本地预览地址通常是：

```text
http://127.0.0.1:4321/
```

## 构建

```powershell
npm run build
```

输出目录：

```text
dist
```

## Cloudflare Pages 部署

推荐设置：

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20.19`

正式域名在这里配置：

```text
src/config/site.ts
```

## 新闻后台

后台地址：

```text
/admin/news/
```

后台能做的事情：

- 写新闻标题、摘要、正文和要点
- 设置发布日期
- 填封面图片路径
- 保存本机草稿
- 发布到 GitHub
- 触发 Cloudflare Pages 自动重新部署

新闻文件会保存到：

```text
src/data/newsPosts/
```

每篇新闻是一个独立 JSON 文件，比较容易维护。

### 开启后台发布

后台发布需要在 Cloudflare Pages 里配置环境变量：

- `ADMIN_PASSWORD`: 你自己设置的后台发布密码
- `GITHUB_TOKEN`: GitHub fine-grained token，需要允许写入这个仓库内容
- `GITHUB_OWNER`: `parutarou0718-afk`
- `GITHUB_REPO`: `quiet-web-lab`
- `GITHUB_BRANCH`: `main`

配置位置：

```text
Cloudflare Pages 项目 > Settings > Environment variables
```

`GITHUB_TOKEN` 建议使用 fine-grained token，只给当前仓库权限：

- Repository access: 只选择 `quiet-web-lab`
- Contents: Read and write
- Metadata: Read-only

配置完成并重新部署后，在 `/admin/news/` 填好文章和后台密码，点击“发布到网站”即可。

## 定时发布

新闻支持 `publishDate`。

如果文章发布日期是未来日期，构建时会先隐藏。到了发布日期之后，只要 Cloudflare 再构建一次，文章就会显示。

仓库里已经预留 GitHub Actions：

```text
.github/workflows/daily-pages-build.yml
```

如果想每天自动刷新一次，需要在 GitHub Actions secret 里配置：

```text
CF_PAGES_DEPLOY_HOOK
```

这个值来自 Cloudflare Pages 的 Deploy Hook。

## 新增图片素材

推荐把公开图片放在：

```text
public/images/
```

文章封面路径示例：

```text
/images/model-comparison/b04-meinahentai.png
```

注意：`public` 目录里的文件，网站引用时不需要写 `public`。

## 主要页面

- `/`: 首页
- `/builder/`: 提示词构建器
- `/recipes/`: 提示词配方库
- `/models/`: 本地模型对比
- `/news/`: 新闻列表
- `/admin/news/`: 新闻后台，默认 noindex
- `/guides/`: 提示词指南
- `/lora/`: LoRA 指南
- `/about/`: 关于本站
- `/privacy/`: 隐私政策
- `/contact/`: 联系方式
- `/sitemap.xml`: 站点地图
- `/robots.txt`: 搜索引擎规则

## 多语言

目前基础功能页已逐步支持：

- English: `/`
- 中文: `/zh/`
- 日本語: `/ja/`

翻译配置主要在：

```text
src/data/i18n.ts
```

新闻内容可以自行用 AI 翻译后再添加，后台目前以英文新闻内容为主。

## AdSense 和 Google Analytics

配置文件：

```text
src/config/site.ts
```

可配置项：

- `adsenseClientId`
- `adsenseSlotId`
- `analyticsId`
- `analyticsEnabled`

默认都是关闭或空值，不会加载真实广告代码。

## 新增小游戏或工具页

建议结构：

```text
src/pages/your-page/
src/components/YourComponent.astro
src/data/yourData.ts
```

如果以后要把小游戏拆成单独网站，可以继续复用当前页面结构、SEO 配置和广告位组件。

## 常用 Git 更新流程

```powershell
git status
git add .
git commit -m "Update site"
git push origin main
```
