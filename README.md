# Smart Prompt App

这是一个基于 Astro + TypeScript + 原生 CSS 的静态 AI 生图提示词网站。当前包含提示词构建器、提示词配方、模型对比、新闻栏目、LoRA 指南、新闻后台和提示词样图后台。

项目可以部署到 Cloudflare Pages。构建命令是 `npm run build`，输出目录是 `dist`。

## 本地运行

如果项目自带 Node 工具包，优先使用：

```powershell
.tools\node-v20.19.4-win-x64\npm.cmd install
.tools\node-v20.19.4-win-x64\npm.cmd run dev
```

如果电脑已经安装 Node：

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

站点名称、域名、Analytics、AdSense 配置在：

```text
src/config/site.ts
```

## 后台入口

新闻后台：

```text
/admin/news/
```

提示词样图后台：

```text
/admin/prompts/
```

提示词样图后台可以上传样图、选择分类、填写中日英卡片名，并保存英文提示词片段。保存后会写入 GitHub，Cloudflare Pages 自动重新构建，构建器会读取这些新增卡片。

## 开启后台发布

在 Cloudflare Pages 项目里配置环境变量：

- `ADMIN_PASSWORD`: 你自己设置的后台发布密码
- `GITHUB_TOKEN`: GitHub fine-grained token
- `GITHUB_OWNER`: `parutarou0718-afk`
- `GITHUB_REPO`: `quiet-web-lab`
- `GITHUB_BRANCH`: `main`

GitHub token 建议权限：

- Repository access: 只选择 `quiet-web-lab`
- Contents: Read and write
- Metadata: Read-only

配置位置：

```text
Cloudflare Pages 项目 > Settings > Environment variables
```

## 新闻定时发布

新闻文章支持 `publishDate`。如果发布日期是未来日期，构建时会自动隐藏，日期到了以后重新构建就会显示。

每天自动触发构建的 GitHub Actions 文件在：

```text
.github/workflows/daily-pages-build.yml
```

如果要启用自动刷新，需要在 GitHub Actions Secret 里配置：

```text
CF_PAGES_DEPLOY_HOOK
```

这个值来自 Cloudflare Pages 的 Deploy Hook。

## 新增提示词样图

最简单的方法：

1. 打开 `/admin/prompts/`
2. 选择分类，例如 Pose、Scene、Lighting、Character、Camera、Outfit
3. 填写英文名、中文名、日文名
4. 填写英文提示词片段
5. 上传样图
6. 输入后台密码并发布

发布后数据会保存到：

```text
src/data/promptSamples/custom.json
```

图片会保存到：

```text
public/images/prompt-samples/
```

## 新增新闻

最简单的方法：

1. 打开 `/admin/news/`
2. 填写标题、摘要、正文、发布日期和封面图路径
3. 输入后台密码并发布

新闻数据会保存到：

```text
src/data/newsPosts/
```

## 新增页面或栏目

推荐结构：

```text
src/pages/
src/components/
src/data/
public/images/
```

如果新增公开页面，记得补充：

- 页面 `title`
- 页面 `description`
- canonical 路径
- 三语路径映射，位置在 `src/data/i18n.ts`

## 多语言

当前基础页面支持：

- English: `/`
- 中文: `/zh/`
- 日本語: `/ja/`

界面语言和路径映射主要在：

```text
src/data/i18n.ts
```

提示词构建器里，页面按钮和卡片名会跟随语言切换，但最终复制给模型的提示词保持英文。

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

默认不会填真实广告代码，也默认关闭 Analytics。

## Git 更新流程

```powershell
git status
git add .
git commit -m "Update site"
git push origin main
```

## 新目录

为了节省 C 盘空间，项目将复制到：

```text
E:\website\quiet-web-lab
```

确认 E 盘版本可以正常运行以后，再手动清理 C 盘旧目录会更稳。
