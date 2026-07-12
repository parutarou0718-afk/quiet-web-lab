# Smart Prompt App

Smart Prompt App 是一个基于 Astro + TypeScript 的静态优先网站，用来展示 AI implementation / prompt systems / automation workflows / lightweight tools。网站部署在 Cloudflare Pages，公开页面保持静态优先，内容后台使用 Keystatic 管理 `src/content/` 和 `public/images/` 中的文件。

## 本地运行

如果使用项目自带 Node：

```powershell
.tools\node-v20.19.4-win-x64\npm.cmd install
.tools\node-v20.19.4-win-x64\npm.cmd run dev
```

如果电脑已经安装 Node 20：

```powershell
npm install
npm run dev
```

本地网站：

```text
http://127.0.0.1:4321/
```

内容后台：

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

## Cloudflare Pages 部署设置

推荐设置：

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 20 或更高

当前项目使用 `@astrojs/cloudflare` 和 `output: "static"`。普通公开页面仍然预渲染，`/keystatic/` 和 `/api/keystatic/` 由 Cloudflare Pages Functions 处理，用于在线内容后台。

## 在线 Keystatic 后台

后台地址：

```text
https://smartpromptapp.com/keystatic/
```

当前 Keystatic 使用 GitHub storage，内容会提交到：

```text
parutarou0718-afk/quiet-web-lab
```

### 需要创建 GitHub OAuth App

在 GitHub 打开：Settings -> Developer settings -> OAuth Apps -> New OAuth App。

填写建议：

- Application name: `Smart Prompt App Keystatic`
- Homepage URL: `https://smartpromptapp.com`
- Authorization callback URL: `https://smartpromptapp.com/api/keystatic/github/oauth/callback`

创建后复制 Client ID 和 Client Secret。

### Cloudflare Pages 环境变量

在 Cloudflare Pages 项目里打开 Settings -> Environment variables，添加：

```text
KEYSTATIC_GITHUB_CLIENT_ID=你的 GitHub OAuth Client ID
KEYSTATIC_GITHUB_CLIENT_SECRET=你的 GitHub OAuth Client Secret
KEYSTATIC_SECRET=一串随机长密码
```

`KEYSTATIC_SECRET` 可以自己写一串足够长的随机字符，例如 32 位以上。不要提交到 GitHub。

添加变量后，重新部署一次 Cloudflare Pages。

如果 Cloudflare 日志明确提示缺少 `SESSION` KV binding，再创建一个名为 `SESSION` 的 KV 绑定；没有报错时可以先不处理。

## 内容后台能管理什么

Keystatic 管理以下内容：

```text
src/content/articles/
src/content/guides/
src/content/recipes/
src/content/workflows/
src/content/products/
src/content/case-studies/
src/content/services/
src/content/tools/
src/content/site/home.json
```

后台里对应中文分组：

- 日常内容：文章 / 新闻、指南文章
- 提示词与工具：提示词配方、工具
- 业务页面：工作流方案、产品、演示案例、服务
- 站点设置：首页展示设置

## 图片位置

通用封面图：

```text
public/images/covers/
```

Recipe 图片：

```text
public/images/recipes/
```

正文图片：

```text
public/images/content/
```

在 Keystatic 里上传图片后，它会保存到这些目录。公开页面使用 `/images/...` 路径读取图片。

## 新增文章

1. 打开 `/keystatic/`。
2. 进入“文章 / 新闻”或“指南文章”。
3. 新建条目，填写标题、SEO 描述、封面图、日期、作者、分类、标签和正文。
4. 保存并提交到 GitHub。
5. GitHub 更新后，Cloudflare Pages 会自动重新部署。

文章页面地址一般是：

```text
/articles/your-slug/
/guides/your-slug/
```

## 新增 Prompt Recipe

1. 打开后台的“提示词配方”。
2. 填写标题、描述、短描述、封面图、分类和标签。
3. 填写正向提示词、负向提示词、参数、模型建议。
4. 在“提示词拆分片段”里添加可复用片段。
5. 保存并提交。

页面地址：

```text
/recipes/your-slug/
```

## 新增 Workflow / Product / Case Study / Service / Tool

分别进入后台中的：

- 工作流方案
- 产品
- 演示案例
- 服务
- 工具

填写对应字段后保存。演示案例请保持 demo 声明，不要写成真实客户案例。

页面地址一般是：

```text
/workflows/your-slug/
/products/your-slug/
/case-studies/your-slug/
/services/your-slug/
/tools/your-slug/
```

## SEO

每个内容页会从内容字段生成：

- title
- description
- canonical
- Open Graph image

站点域名配置在：

```text
src/config/site.ts
```

当前正式域名：

```text
https://smartpromptapp.com
```

## 合规边界

网站内容保持全年龄、AdSense 友好：

- 不发布成人或擦边内容。
- 不发布血腥暴力内容。
- 不做真实人物仿冒、人脸复刻或名人仿冒。
- 不复刻侵权 IP 角色。
- Demo case studies 必须明确说明是演示案例。

## 常用 Git 更新流程

```powershell
git status
git add .
git commit -m "Update site content"
git push origin main
```

推送到 GitHub 后，Cloudflare Pages 会自动执行 `npm run build` 并发布。


