export const locales = ["en", "zh", "ja"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ja: "日本語"
};

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語"
};

const pathMap = {
  "/": { en: "/", zh: "/zh/", ja: "/ja/" },
  "/tools/": { en: "/tools/", zh: "/zh/tools/", ja: "/ja/tools/" },
  "/builder/": { en: "/builder/", zh: "/zh/builder/", ja: "/ja/builder/" },
  "/recipes/": { en: "/recipes/", zh: "/zh/recipes/", ja: "/ja/recipes/" },
  "/models/": { en: "/models/", zh: "/zh/models/", ja: "/ja/models/" },
  "/news/": { en: "/news/", zh: "/zh/news/", ja: "/ja/news/" },
  "/articles/": { en: "/articles/", zh: "/zh/articles/", ja: "/ja/articles/" },
  "/guides/": { en: "/guides/", zh: "/zh/guides/", ja: "/ja/guides/" },
  "/lora/": { en: "/lora/", zh: "/zh/lora/", ja: "/ja/lora/" },
  "/services/": { en: "/services/", zh: "/zh/services/", ja: "/ja/services/" },
  "/workflows/": { en: "/workflows/", zh: "/zh/workflows/", ja: "/ja/workflows/" },
  "/products/": { en: "/products/", zh: "/zh/products/", ja: "/ja/products/" },
  "/case-studies/": { en: "/case-studies/", zh: "/zh/case-studies/", ja: "/ja/case-studies/" },
  "/admin/news/": { en: "/admin/news/", zh: "/zh/admin/news/", ja: "/ja/admin/news/" },
  "/admin/prompts/": { en: "/admin/prompts/", zh: "/zh/admin/prompts/", ja: "/ja/admin/prompts/" },
  "/about/": { en: "/about/", zh: "/zh/about/", ja: "/ja/about/" },
  "/privacy/": { en: "/privacy/", zh: "/zh/privacy/", ja: "/ja/privacy/" },
  "/terms/": { en: "/terms/", zh: "/zh/terms/", ja: "/ja/terms/" },
  "/disclaimer/": { en: "/disclaimer/", zh: "/zh/disclaimer/", ja: "/ja/disclaimer/" },
  "/contact/": { en: "/contact/", zh: "/zh/contact/", ja: "/ja/contact/" }
} as const;

export type RouteKey = keyof typeof pathMap;

export function localizedPath(route: RouteKey, locale: Locale): string {
  return pathMap[route][locale];
}

export function routeAlternates(route: RouteKey): Record<Locale, string> {
  return pathMap[route];
}

type SlugBaseRoute = "/news/" | "/articles/" | "/guides/" | "/lora/" | "/recipes/" | "/tools/" | "/services/" | "/workflows/" | "/products/" | "/case-studies/";

export function localizedSlugPath(baseRoute: SlugBaseRoute, slug: string, locale: Locale): string {
  const base = localizedPath(baseRoute, locale);
  return `${base}${slug}/`;
}

export function localizeInternalHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  const normalized = href.endsWith("/") ? href : `${href}/`;
  if (normalized in pathMap) return localizedPath(normalized as RouteKey, locale);

  for (const baseRoute of ["/news/", "/articles/", "/guides/", "/lora/", "/recipes/", "/tools/", "/services/", "/workflows/", "/products/", "/case-studies/"] as const) {
    if (normalized.startsWith(baseRoute) && normalized.length > baseRoute.length) {
      const slug = normalized.slice(baseRoute.length).replace(/\/$/, "");
      return localizedSlugPath(baseRoute, slug, locale);
    }
  }

  return href;
}

export function detectLocale(pathname: string): Locale {
  if (pathname.startsWith("/zh/") || pathname === "/zh") return "zh";
  if (pathname.startsWith("/ja/") || pathname === "/ja") return "ja";
  return "en";
}

export function routeFromPath(pathname: string): RouteKey {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  for (const [route, localized] of Object.entries(pathMap)) {
    if (Object.values(localized).includes(normalized as never)) return route as RouteKey;
  }
  return "/";
}

export const navLabels: Record<Locale, Record<"tools" | "recipes" | "guides" | "lora" | "services" | "workflows" | "products" | "contact", string>> = {
  en: { tools: "Tools", recipes: "Recipes", guides: "Guides", lora: "LoRA", services: "Services", workflows: "Workflows", products: "Products", contact: "Contact" },
  zh: { tools: "工具", recipes: "配方", guides: "指南", lora: "LoRA", services: "服务", workflows: "工作流", products: "产品", contact: "联系" },
  ja: { tools: "ツール", recipes: "レシピ", guides: "ガイド", lora: "LoRA", services: "サービス", workflows: "ワークフロー", products: "製品", contact: "連絡" }
};

export const navRoutes = [
  { key: "tools", route: "/tools/" },
  { key: "recipes", route: "/recipes/" },
  { key: "guides", route: "/guides/" },
  { key: "lora", route: "/lora/" },
  { key: "services", route: "/services/" },
  { key: "workflows", route: "/workflows/" },
  { key: "products", route: "/products/" },
  { key: "contact", route: "/contact/" }
] as const;

const enHome = {
  title: "AI Image Prompt Library and Builder",
  h1: "Build cleaner AI image prompts from reusable fragments, examples, and model notes.",
  lead: "Smart Prompt App is a practical prompt workspace for AI image generation: a reusable prompt builder, recipe library, model comparison notes, LoRA learning pages, and production checklists for ComfyUI samples.",
  builderCta: "Open Prompt Builder",
  modelCta: "View Model Comparisons",
  recipes: "prompt recipes",
  models: "local models compared",
  static: "Cloudflare ready",
  local: "no login for readers",
  promptBuilder: "Prompt Builder",
  promptBuilderTitle: "Assemble prompts without losing the pieces.",
  promptBuilderBody: "Pick subject, pose, camera, lighting, style, quality, negative prompts, and parameters. The basket highlights likely conflicts while still letting users copy the final English prompt.",
  promptBuilderButton: "Build a prompt",
  modelGuide: "Model Guide",
  modelGuideTitle: "Compare local checkpoints with the same prompts.",
  modelGuideBody: "See anime, 2.5D, and realistic checkpoints side by side across character, Eastern outfit, interior, night street, and portrait prompts.",
  modelGuideButton: "Compare models",
  startHere: "Start Here",
  startLead: "Fast entry points for prompt writing, generation planning, and model choice.",
  latestRecipes: "Latest Prompt Recipes",
  latestRecipesLead: "A sample of the current prompt atlas content.",
  latestUpdates: "Latest Updates",
  latestUpdatesLead: "Short notes from prompt tests, model comparisons, and image generation batches.",
  categories: "Popular Categories",
  categoriesLead: "Jump into the prompt area you want to improve first."
};

export const homeCopy = { en: enHome, zh: enHome, ja: enHome } as const;

const enBuilder = {
  title: "Prompt Builder",
  description: "Combine saved fragments, detect prompt conflicts, and copy positive prompts, negative prompts, and parameters.",
  howTitle: "How to use the Builder",
  p1: "Add fragments from the library, then review the generated prompt. A strong prompt usually follows this order: subject, pose or action, clothing, scene, camera angle, lighting, mood, style direction, and quality tags.",
  p2: "The visible interface follows your selected language, but the final copyable prompt stays in English because most image models respond better to English prompt fragments."
};

export const builderCopy = { en: enBuilder, zh: enBuilder, ja: enBuilder } as const;

const enModel = {
  title: "Local Model Comparison Guide",
  description: "Side-by-side AI image model comparisons using the same ComfyUI prompts and seeds.",
  eyebrow: "Model Guide",
  h1: "Four local checkpoints compared with the same five prompts.",
  lead: "These samples compare an anime baseline, a 2.5D anime model, and two realism-oriented checkpoints. Each row uses the same prompt group and the same picked image number.",
  builder: "Open Builder",
  recipes: "Browse Recipes",
  notes: "Model Notes",
  notesLead: "Use these as practical recommendations for your RTX 3080 ComfyUI workflow.",
  bestFor: "Best For",
  results: "Side-by-Side Results",
  resultsLead: "Rows are prompt groups. Columns are models. Images are copied from the local ComfyUI comparison run.",
  prompt: "Prompt",
  quick: "Quick Recommendation"
};

export const modelPageCopy = { en: enModel, zh: enModel, ja: enModel } as const;

const enNews = {
  title: "AI Image Generation News and Updates",
  description: "Daily notes about AI image generation prompts, model tests, ComfyUI workflows, and prompt library updates.",
  eyebrow: "News",
  h1: "Daily AI image generation notes, tests, and prompt updates.",
  lead: "Short practical updates about prompt experiments, model comparisons, ComfyUI sample batches, and changes to the prompt library.",
  takeaways: "Key Takeaways",
  related: "Related",
  continue: "Continue exploring this workflow area."
};

export const newsPageCopy = { en: enNews, zh: enNews, ja: enNews } as const;
