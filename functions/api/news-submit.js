const allowedCategories = new Set(["Generation Notes", "Model Test", "Prompt Update", "Workflow"]);

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function cleanLines(value) {
  return Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : [];
}

function cleanLinks(value) {
  return Array.isArray(value)
    ? value
        .map((item) => ({ label: String(item?.label || "").trim(), href: String(item?.href || "").trim() }))
        .filter((item) => item.label && item.href)
    : [];
}

function validatePost(input) {
  const slug = slugify(input.slug || input.title);
  const category = allowedCategories.has(input.category) ? input.category : "Generation Notes";
  const post = {
    slug,
    title: String(input.title || "").trim(),
    date: String(input.date || "").slice(0, 10),
    category,
    description: String(input.description || "").trim(),
    heroImage: String(input.heroImage || "").trim(),
    takeaways: cleanLines(input.takeaways),
    body: cleanLines(input.body),
    relatedLinks: cleanLinks(input.relatedLinks)
  };

  const publishDate = String(input.publishDate || "").slice(0, 10);
  if (publishDate && publishDate !== post.date) post.publishDate = publishDate;
  if (!post.heroImage) delete post.heroImage;

  if (!post.slug) throw new Error("缺少 slug。");
  if (!post.title) throw new Error("缺少标题。");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) throw new Error("日期格式不正确。");
  if (!post.description) throw new Error("缺少摘要。");
  if (!post.body.length) throw new Error("正文至少要写一段。");
  return post;
}

function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function githubRequest(url, token, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github+json",
      "User-Agent": "smartpromptapp-news-admin",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {})
    }
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const input = await request.json();
    const adminPassword = String(input.adminPassword || request.headers.get("x-admin-password") || "");

    if (!env.ADMIN_PASSWORD || adminPassword !== env.ADMIN_PASSWORD) {
      return jsonResponse({ ok: false, message: "后台密码不正确。" }, 401);
    }

    if (!env.GITHUB_TOKEN) {
      return jsonResponse({ ok: false, message: "还没有配置 GITHUB_TOKEN。" }, 500);
    }

    const owner = env.GITHUB_OWNER || "parutarou0718-afk";
    const repo = env.GITHUB_REPO || "quiet-web-lab";
    const branch = env.GITHUB_BRANCH || "main";
    const post = validatePost(input.post || input);
    const path = `src/data/newsPosts/${post.slug}.json`;
    const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`;

    let sha;
    const existing = await githubRequest(`${apiBase}?ref=${encodeURIComponent(branch)}`, env.GITHUB_TOKEN);
    if (existing.ok) {
      const existingJson = await existing.json();
      sha = existingJson.sha;
    } else if (existing.status !== 404) {
      const errorText = await existing.text();
      return jsonResponse({ ok: false, message: `检查旧文件失败：${errorText}` }, 502);
    }

    const content = `${JSON.stringify(post, null, 2)}\n`;
    const save = await githubRequest(apiBase, env.GITHUB_TOKEN, {
      method: "PUT",
      body: JSON.stringify({
        message: `Publish news: ${post.title}`,
        content: encodeBase64(content),
        branch,
        sha
      })
    });

    if (!save.ok) {
      const errorText = await save.text();
      return jsonResponse({ ok: false, message: `GitHub 保存失败：${errorText}` }, 502);
    }

    const result = await save.json();
    return jsonResponse({
      ok: true,
      message: "新闻已提交到 GitHub，Cloudflare 会自动重新部署。",
      path,
      url: result.content?.html_url
    });
  } catch (error) {
    return jsonResponse({ ok: false, message: error instanceof Error ? error.message : "发布失败。" }, 400);
  }
}
