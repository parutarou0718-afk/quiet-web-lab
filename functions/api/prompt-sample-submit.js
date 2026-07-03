const allowedCategories = new Set(["subject", "pose", "action", "clothing", "scene", "camera", "lighting", "mood", "style", "quality", "negative", "parameters"]);

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

function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeBase64Text(value) {
  const binary = atob(value || "");
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function githubRequest(url, token, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github+json",
      "User-Agent": "smartpromptapp-prompt-admin",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {})
    }
  });
}

async function readGithubJson(apiBase, branch, token) {
  const response = await githubRequest(`${apiBase}?ref=${encodeURIComponent(branch)}`, token);
  if (response.status === 404) return { sha: undefined, data: [] };
  if (!response.ok) throw new Error(`Could not read existing prompt samples: ${await response.text()}`);
  const json = await response.json();
  const text = decodeBase64Text(json.content || "");
  return { sha: json.sha, data: JSON.parse(text || "[]") };
}

async function saveGithubFile(apiBase, branch, token, message, content, sha) {
  const response = await githubRequest(apiBase, token, {
    method: "PUT",
    body: JSON.stringify({ message, content, branch, ...(sha ? { sha } : {}) })
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

async function readGithubSha(apiBase, branch, token) {
  const response = await githubRequest(`${apiBase}?ref=${encodeURIComponent(branch)}`, token);
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error(`Could not read existing file: ${await response.text()}`);
  const json = await response.json();
  return json.sha;
}

function validateSample(input) {
  const id = slugify(input.id || input.labelEn || input.labelZh || input.labelJa);
  const category = String(input.category || "");
  if (!id) throw new Error("Missing sample id.");
  if (!allowedCategories.has(category)) throw new Error("Invalid category.");

  const sample = {
    id,
    category,
    label: {
      en: String(input.labelEn || "").trim(),
      zh: String(input.labelZh || "").trim(),
      ja: String(input.labelJa || "").trim()
    },
    prompt: String(input.prompt || "").trim()
  };

  if (!sample.label.en && !sample.label.zh && !sample.label.ja) throw new Error("Missing card label.");
  if (!sample.prompt) throw new Error("Missing English prompt.");
  if (input.imagePath) sample.image = String(input.imagePath).trim();
  return sample;
}

export async function onRequestPost({ request, env }) {
  try {
    const input = await request.json();
    const adminPassword = String(input.adminPassword || request.headers.get("x-admin-password") || "");

    if (!env.ADMIN_PASSWORD || adminPassword !== env.ADMIN_PASSWORD) {
      return jsonResponse({ ok: false, message: "Admin password is incorrect." }, 401);
    }
    if (!env.GITHUB_TOKEN) {
      return jsonResponse({ ok: false, message: "GITHUB_TOKEN is not configured." }, 500);
    }

    const owner = env.GITHUB_OWNER || "parutarou0718-afk";
    const repo = env.GITHUB_REPO || "quiet-web-lab";
    const branch = env.GITHUB_BRANCH || "main";
    const sample = validateSample(input.sample || input);
    const repoApi = `https://api.github.com/repos/${owner}/${repo}/contents`;

    if (input.imageBase64 && input.imageName) {
      const extension = String(input.imageName).split(".").pop()?.toLowerCase() || "png";
      if (!["png", "jpg", "jpeg", "webp"].includes(extension)) {
        throw new Error("Image must be PNG, JPG, or WebP.");
      }
      const imagePath = `public/images/prompt-samples/${sample.id}.${extension}`;
      const imageApi = `${repoApi}/${encodeURIComponent(imagePath).replace(/%2F/g, "/")}`;
      const imageSha = await readGithubSha(imageApi, branch, env.GITHUB_TOKEN);
      sample.image = `/images/prompt-samples/${sample.id}.${extension}`;
      await saveGithubFile(imageApi, branch, env.GITHUB_TOKEN, `Upload prompt sample image: ${sample.id}`, String(input.imageBase64), imageSha);
    }

    const dataPath = "src/data/promptSamples/custom.json";
    const dataApi = `${repoApi}/${encodeURIComponent(dataPath).replace(/%2F/g, "/")}`;
    const existing = await readGithubJson(dataApi, branch, env.GITHUB_TOKEN);
    const samples = Array.isArray(existing.data) ? existing.data : [];
    const nextSamples = [sample, ...samples.filter((item) => item.id !== sample.id)];
    const saved = await saveGithubFile(
      dataApi,
      branch,
      env.GITHUB_TOKEN,
      `Publish prompt sample: ${sample.id}`,
      encodeBase64(`${JSON.stringify(nextSamples, null, 2)}\n`),
      existing.sha
    );

    return jsonResponse({
      ok: true,
      message: "Prompt sample submitted to GitHub.",
      path: dataPath,
      url: saved.content?.html_url,
      sample
    });
  } catch (error) {
    return jsonResponse({ ok: false, message: error instanceof Error ? error.message : "Prompt sample publish failed." }, 400);
  }
}
