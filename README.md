# Quiet Web Lab

Quiet Web Lab 是一个基于 Astro + TypeScript 的静态 AI 生图提示词网站。当前主站专注于提示词库、提示词组合器、模型对比、新闻更新和 LoRA 学习内容。

项目默认是纯静态站点，不需要数据库、不需要登录、不需要后端，也不依赖付费服务。可以直接部署到 Cloudflare Pages。

## 主要功能

- **提示词配方库**：按场景、姿势、镜头、服装、光线和风格整理完整提示词。
- **提示词构建器**：用本地浏览器存储保存提示词篮子，并检查重复或冲突片段。
- **模型对比页**：用同一组 ComfyUI 提示词对比本地模型效果。
- **新闻/更新栏目**：用于每天发布生图记录、模型测试、提示词实验和网站更新。
- **LoRA 学习页**：记录数据集准备、打标、训练参数、测试和常见问题。
- **AdSense/Analytics 预留**：默认关闭，不填真实广告和统计代码。

## 本地运行

本项目已经带了一个本地 Node 运行环境：

```powershell
.tools\node-v20.19.4-win-x64\npm.cmd install
.tools\node-v20.19.4-win-x64\npm.cmd run dev
```

如果你的终端已经能直接识别 `node` 和 `npm`，也可以直接运行：

```powershell
npm install
npm run dev
```

本地开发地址通常是：

```text
http://127.0.0.1:4321/
```

## 构建

Cloudflare Pages 使用的构建命令是：

```powershell
npm run build
```

输出目录是：

```text
dist
```

如果本地普通 `npm run build` 被 Windows 权限或路径问题挡住，可以用项目内置 Node：

```powershell
.tools\node-v20.19.4-win-x64\npm.cmd run build
```

## Cloudflare Pages 部署

Cloudflare Pages 推荐设置：

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20.19` 或更新

部署前记得在 `src/config/site.ts` 里修改：

```ts
siteUrl: "https://你的真实域名"
```

## 主要路由

- `/`：首页
- `/builder/`：提示词构建器
- `/recipes/`：提示词配方库
- `/models/`：本地模型对比
- `/news/`：新闻和每日更新
- `/admin/news/`：本地新闻编辑后台，不进入 sitemap，默认 noindex
- `/guides/`：提示词写作指南
- `/lora/`：LoRA 学习内容
- `/about/`：关于本站
- `/privacy/`：隐私政策
- `/terms/`：使用条款
- `/disclaimer/`：免责声明
- `/contact/`：联系方式
- `/sitemap.xml`：站点地图
- `/robots.txt`：爬虫规则

## 项目结构

- `src/data/recipes.ts`：提示词配方数据。
- `src/data/categories.ts`：提示词分类数据。
- `src/data/articles.ts`：指南和 LoRA 文章索引。
- `src/data/promptLibrary.ts`：提示词构建器使用的片段库和模型推荐数据。
- `src/data/modelComparison.ts`：模型对比页的模型、提示词和图片路径。
- `src/data/news.ts`：新闻/更新文章数据。
- `src/lib/promptCart.ts`：提示词篮子类型和本地存储逻辑。
- `src/lib/promptCompose.ts`：正向、负向和参数提示词组合逻辑。
- `src/lib/promptConflict.ts`：提示词冲突和重复检查规则。
- `src/components/PromptBuilder.tsx`：React 提示词构建器。
- `src/components/PromptCartDrawer.astro`：全站提示词篮子抽屉。
- `src/config/site.ts`：站点名称、域名、统计和广告配置。
- `public/images/model-comparison/`：模型对比页使用的图片。

早期的连连看小游戏底层代码暂时还留在源码中，但当前主站不再生成小游戏页面。以后可以把小游戏单独拆成另一个仓库。

## 新增提示词配方

在 `src/data/recipes.ts` 中新增一条配方数据即可。

建议每条配方至少包含：

- 标题和 slug
- 分类和标签
- 主体、姿势、动作、服装
- 场景、镜头、光线、情绪、风格
- 简短介绍

配方系统会自动生成完整提示词、负向提示词、参数、拆分片段和常见错误说明。

## 新增新闻文章

推荐先打开本地新闻后台：

```text
http://127.0.0.1:4321/admin/news/
```

在后台里填写标题、slug、分类、日期、预约发布日期、摘要、正文、要点和相关链接。后台会把草稿保存在当前浏览器的本地存储里，并生成可以直接放进 `src/data/news.ts` 的新闻对象。

发布时，把后台生成的代码复制到 `src/data/news.ts` 的 `newsPosts` 数组顶部即可。

每篇文章需要：

- `slug`：URL 片段，例如 `rainy-lantern-street-test`
- `title`：标题
- `date`：文章日期，格式为 `YYYY-MM-DD`
- `publishDate`：可选，预约发布日期
- `category`：文章分类
- `description`：SEO 摘要
- `heroImage`：可选，放在 `public/` 下的图片路径
- `takeaways`：要点列表
- `body`：正文段落
- `relatedLinks`：相关文章或页面链接

示例：

```ts
{
  slug: "rainy-lantern-street-test",
  title: "Rainy Lantern Street Prompt Test",
  date: "2026-07-05",
  publishDate: "2026-07-05",
  category: "Generation Notes",
  description: "A short note about a rainy lantern street prompt test.",
  heroImage: "/images/model-comparison/b04-meinahentai.png",
  takeaways: ["Lantern reflections help the scene read clearly."],
  body: ["Write the update body here."],
  relatedLinks: [{ label: "Open Builder", href: "/builder/" }]
}
```

构建时，系统会自动生成：

- `/news/`
- `/news/[slug]/`
- 首页 Latest Updates
- sitemap 条目

## 预约发布

可以提前写好一周的新闻，然后给每篇设置不同的 `publishDate`。

未来日期的文章在构建时会自动隐藏，不会出现在首页、新闻列表、详情页或 sitemap 中。到了发布日期后，只要网站重新构建一次，文章就会自动发布。

项目里已经有 GitHub Actions 文件：

```text
.github/workflows/daily-pages-build.yml
```

它会每天日本时间 `09:10` 触发一次 Cloudflare Pages 重新构建。

启用方法：

1. 打开 Cloudflare Pages 项目。
2. 进入 `Settings > Builds & deployments > Deploy hooks`。
3. 创建一个 Deploy Hook。
4. 打开 GitHub 仓库设置。
5. 进入 `Secrets and variables > Actions`。
6. 新增仓库 secret：`CF_PAGES_DEPLOY_HOOK`。
7. 把 Cloudflare Deploy Hook URL 粘贴进去。

之后你就可以提前写文章，让网站每天自动放出一部分内容。

## AdSense 和 Google Analytics

配置文件在：

```text
src/config/site.ts
```

可配置项：

- `adsenseClientId`
- `adsenseSlotId`
- `analyticsId`
- `analyticsEnabled`

默认都是空值或关闭状态。页面里已经有广告位组件，但没有真实广告代码。

## SEO 检查清单

上线前建议检查：

- `src/config/site.ts` 里的 `siteUrl` 是否是真实域名。
- 每个页面是否有合适的 title、description 和 canonical。
- 新闻文章是否有稳定更新节奏。
- 图片是否是自己生成、自己拥有或有授权的素材。
- 运行 `npm run build`。
- 检查 `dist/sitemap.xml` 是否包含首页、配方、新闻、模型、指南、LoRA 和基础页面。

## GitHub 更新流程

常规流程：

```powershell
git status
git add .
git commit -m "Update prompt site"
git push origin main
```

如果只想提交网站正式文件，不要提交本地检查图。`image_review_sheets/` 已经加入 `.gitignore`。
