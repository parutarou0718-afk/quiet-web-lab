# Smart Prompt App

Smart Prompt App 是一个基于 Astro + TypeScript + 原生 CSS 的静态站，用来展示 AI implementation solution provider 的主站内容、Prompt Builder、Prompt Recipes、Guides、LoRA 学习页、工作流、产品、服务和 demo case studies。

站点不使用数据库，不需要登录，不需要后端服务。内容通过 Git-based CMS 写入 Markdown / JSON 文件，再提交到 GitHub，由 Cloudflare Pages 自动构建发布。

## 本地运行

如果使用项目内置 Node：

```powershell
.tools\node-v20.19.4-win-x64\npm.cmd install
.tools\node-v20.19.4-win-x64\npm.cmd run dev
```

如果电脑已经安装 Node 20：

```powershell
npm install
npm run dev
```

本地站点：

```text
http://127.0.0.1:4321/
```

Keystatic 内容后台：

```text
http://127.0.0.1:4321/keystatic/
```

## 构建

```powershell
npm run build
```

输出目录：

```text
dist
```

当前本地验证结果：`npm install` 通过，`npm run build` 通过。

## Cloudflare Pages 部署

推荐设置：

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 20 或以上

域名和站点配置在：

```text
src/config/site.ts
```

当前 `siteUrl` 使用：

```text
https://smartpromptapp.com
```

## 内容后台方案

当前使用 Keystatic。

后台配置文件：

```text
keystatic.config.ts
```

Astro 内容集合配置：

```text
src/content/config.ts
```

Keystatic 当前以本地编辑模式运行：打开本地开发服务器后进入 `/keystatic/`，新增或编辑内容会写入 `src/content/` 和 `public/images/`。改完后提交 GitHub，Cloudflare Pages 会自动重新部署。

## 内容存储位置

文章：

```text
src/content/articles/
```

Guides：

```text
src/content/guides/
```

Prompt Recipes：

```text
src/content/recipes/
```

Workflows：

```text
src/content/workflows/
```

Products：

```text
src/content/products/
```

Demo Case Studies：

```text
src/content/case-studies/
```

Services：

```text
src/content/services/
```

Tools：

```text
src/content/tools/
```

首页 featured 配置：

```text
src/content/site/home.json
```

## 图片存储位置

通用封面图：

```text
public/images/covers/
```

Recipe 图片：

```text
public/images/recipes/
```

正文内图片：

```text
public/images/content/
```

在 Keystatic 中选择或上传图片时，会写入这些目录。页面里保存的是 `/images/...` 这种公开访问路径。

## 如何新增文章

1. 运行 `npm run dev`。
2. 打开 `http://127.0.0.1:4321/keystatic/`。
3. 进入 `Articles / Blog`。
4. 点击新增。
5. 填写 title、description、coverImage、date、author、category、tags 和 body。
6. 保存后运行 `npm run build` 检查。
7. 提交并推送到 GitHub。

文章页面会生成在：

```text
/articles/your-slug/
```

## 如何新增 Prompt Recipe

1. 进入 Keystatic 的 `Prompt Recipes`。
2. 填写 title、SEO description、short card description、category、tags。
3. 填写 positivePrompt、negativePrompt、parameters、modelNotes。
4. 在 `Prompt breakdown fragments` 中添加可拆分的提示词片段。
5. 在 `Variations` 中添加变体提示词。
6. 填写 commonMistakes、suitableUses、relatedRecipes。
7. 保存后运行 `npm run build`。

Recipe 页面会生成在：

```text
/recipes/your-slug/
```

## 如何新增 Workflow / Product / Case Study

在 Keystatic 中分别进入：

- `Workflows`
- `Products`
- `Demo Case Studies`

按字段填写即可。Demo case studies 必须保持 demo 表述，不要写成真实客户案例。

对应页面：

```text
/workflows/your-slug/
/products/your-slug/
/case-studies/your-slug/
```

## 如何新增 Service / Tool

在 Keystatic 中分别进入：

- `Services`
- `Tools`

Services 用来写服务介绍、交付物和适用场景。Tools 用来写站内工具或外部工具入口。

对应页面：

```text
/services/your-slug/
/tools/your-slug/
```

## SEO

每个内容页会从内容字段自动生成：

- title
- description
- canonical
- Open Graph image

`sitemap.xml` 会包含 CMS 生成的 articles、guides、recipes、tools、services、workflows、products 和 case studies 页面。

## 合规内容规则

全站内容应保持全年龄、AdSense 友好：

- 不写成人、色情、擦边内容。
- 不写血腥暴力内容。
- 不做真实人物仿冒或人脸复刻。
- 不做名人、影视、动漫等侵权 IP 复刻。
- Demo case studies 必须明确是 demo。

## 多语言说明

当前保留 English / 中文 / 日本語 的语言按钮和基础路由。完整中文、日文镜像站建议后续单独实施，避免现在破坏主站结构。

## Git 更新流程

```powershell
git status
git add .
git commit -m "Update site content"
git push origin main
```

推送到 GitHub 后，Cloudflare Pages 会按 `npm run build` 自动部署。
