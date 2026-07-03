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
  "/builder/": { en: "/builder/", zh: "/zh/builder/", ja: "/ja/builder/" },
  "/recipes/": { en: "/recipes/", zh: "/zh/recipes/", ja: "/ja/recipes/" },
  "/models/": { en: "/models/", zh: "/zh/models/", ja: "/ja/models/" },
  "/news/": { en: "/news/", zh: "/zh/news/", ja: "/ja/news/" },
  "/guides/": { en: "/guides/", zh: "/zh/guides/", ja: "/ja/guides/" },
  "/lora/": { en: "/lora/", zh: "/zh/lora/", ja: "/ja/lora/" },
  "/admin/news/": { en: "/admin/news/", zh: "/zh/admin/news/", ja: "/ja/admin/news/" },
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

export function localizedSlugPath(baseRoute: "/news/" | "/guides/" | "/lora/" | "/recipes/", slug: string, locale: Locale): string {
  const base = localizedPath(baseRoute, locale);
  return `${base}${slug}/`;
}

export function localizeInternalHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  const normalized = href.endsWith("/") ? href : `${href}/`;
  if (normalized in pathMap) return localizedPath(normalized as RouteKey, locale);

  for (const baseRoute of ["/news/", "/guides/", "/lora/", "/recipes/"] as const) {
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

export const navLabels: Record<Locale, Record<"home" | "builder" | "recipes" | "models" | "news" | "guides" | "lora", string>> = {
  en: {
    home: "Home",
    builder: "Builder",
    recipes: "Recipes",
    models: "Models",
    news: "News",
    guides: "Guides",
    lora: "LoRA"
  },
  zh: {
    home: "首页",
    builder: "构建器",
    recipes: "配方",
    models: "模型",
    news: "新闻",
    guides: "指南",
    lora: "LoRA"
  },
  ja: {
    home: "ホーム",
    builder: "ビルダー",
    recipes: "レシピ",
    models: "モデル",
    news: "ニュース",
    guides: "ガイド",
    lora: "LoRA"
  }
};

export const navRoutes = [
  { key: "home", route: "/" },
  { key: "builder", route: "/builder/" },
  { key: "recipes", route: "/recipes/" },
  { key: "models", route: "/models/" },
  { key: "news", route: "/news/" },
  { key: "guides", route: "/guides/" },
  { key: "lora", route: "/lora/" }
] as const;

export const homeCopy = {
  en: {
    title: "AI Image Prompt Library and Builder",
    h1: "Build cleaner AI image prompts from reusable fragments, examples, and model notes.",
    lead:
      "Smart Prompt App is a practical prompt workspace for AI image generation: a reusable prompt builder, recipe library, model comparison notes, LoRA learning pages, and production checklists for ComfyUI samples.",
    builderCta: "Open Prompt Builder",
    modelCta: "View Model Comparisons",
    recipes: "prompt recipes",
    models: "local models compared",
    static: "Cloudflare ready",
    local: "no login for readers",
    promptBuilder: "Prompt Builder",
    promptBuilderTitle: "Assemble prompts without losing the pieces.",
    promptBuilderBody:
      "Pick subject, pose, camera, lighting, style, quality, negative prompts, and parameters. The basket highlights likely conflicts while still letting users copy the final English prompt.",
    promptBuilderButton: "Build a prompt",
    modelGuide: "Model Guide",
    modelGuideTitle: "Compare local checkpoints with the same prompts.",
    modelGuideBody:
      "See anime, 2.5D, and realistic checkpoints side by side across character, Eastern outfit, interior, night street, and portrait prompts.",
    modelGuideButton: "Compare models",
    startHere: "Start Here",
    startLead: "Fast entry points for prompt writing, generation planning, and model choice.",
    latestRecipes: "Latest Prompt Recipes",
    latestRecipesLead: "A sample of the current prompt atlas content.",
    latestUpdates: "Latest Updates",
    latestUpdatesLead: "Short notes from prompt tests, model comparisons, and image generation batches.",
    categories: "Popular Categories",
    categoriesLead: "Jump into the prompt area you want to improve first."
  },
  zh: {
    title: "AI 图片提示词库与构建器",
    h1: "用可复用片段、样图和模型笔记，组合更清晰的 AI 图片提示词。",
    lead:
      "Smart Prompt App 是一个面向 AI 生图工作流的实用站点：包含提示词构建器、提示词配方库、模型对比记录、LoRA 学习页，以及为 ComfyUI 样图准备的制作清单。",
    builderCta: "打开提示词构建器",
    modelCta: "查看模型对比",
    recipes: "提示词配方",
    models: "本地模型对比",
    static: "可部署到 Cloudflare",
    local: "浏览无需登录",
    promptBuilder: "提示词构建器",
    promptBuilderTitle: "把提示词拆成片段，再稳定组合起来。",
    promptBuilderBody:
      "选择主体、姿势、镜头、光线、风格、质量词、负向词和参数。提示词篮子会标出可能冲突的片段，但最终仍允许复制英文提示词。",
    promptBuilderButton: "开始构建",
    modelGuide: "模型指南",
    modelGuideTitle: "用同一套提示词对比本地 checkpoint。",
    modelGuideBody: "并排查看动漫、2.5D 和写实模型在角色、东方服装、室内、夜街和肖像提示词上的区别。",
    modelGuideButton: "对比模型",
    startHere: "从这里开始",
    startLead: "快速进入提示词写作、生图规划和模型选择。",
    latestRecipes: "最新提示词配方",
    latestRecipesLead: "当前提示词图谱中的一部分实用内容。",
    latestUpdates: "最新更新",
    latestUpdatesLead: "记录提示词测试、模型对比和生图批次的短文章。",
    categories: "热门分类",
    categoriesLead: "先进入你最想改善的提示词领域。"
  },
  ja: {
    title: "AI画像プロンプトライブラリとビルダー",
    h1: "再利用できる断片、サンプル、モデルメモから、より整理された AI 画像プロンプトを作れます。",
    lead:
      "Smart Prompt App は AI 画像生成向けの実用ワークスペースです。プロンプトビルダー、レシピ集、モデル比較メモ、LoRA 学習ページ、ComfyUI サンプル制作チェックリストをまとめています。",
    builderCta: "プロンプトビルダーを開く",
    modelCta: "モデル比較を見る",
    recipes: "プロンプトレシピ",
    models: "ローカルモデル比較",
    static: "Cloudflare 対応",
    local: "閲覧はログイン不要",
    promptBuilder: "プロンプトビルダー",
    promptBuilderTitle: "断片を選び、迷わず組み立てる。",
    promptBuilderBody:
      "主体、ポーズ、カメラ、光、スタイル、品質タグ、ネガティブ、パラメータを選べます。矛盾しそうな要素は表示しつつ、最終的な英語プロンプトはコピーできます。",
    promptBuilderButton: "作成する",
    modelGuide: "モデルガイド",
    modelGuideTitle: "同じプロンプトでローカル checkpoint を比較します。",
    modelGuideBody: "アニメ、2.5D、写実系モデルを、人物、東アジア風衣装、室内、夜の街、ポートレートで比較します。",
    modelGuideButton: "モデルを比較",
    startHere: "はじめに",
    startLead: "プロンプト作成、生成計画、モデル選びへの入口です。",
    latestRecipes: "新着プロンプトレシピ",
    latestRecipesLead: "現在のプロンプト集から一部を紹介します。",
    latestUpdates: "最新更新",
    latestUpdatesLead: "プロンプトテスト、モデル比較、画像生成バッチの短い記録です。",
    categories: "人気カテゴリ",
    categoriesLead: "まず改善したいプロンプト領域へ移動します。"
  }
} as const;

export const builderCopy = {
  en: {
    title: "Prompt Builder",
    description: "Combine saved fragments, detect prompt conflicts, and copy positive prompts, negative prompts, and parameters.",
    howTitle: "How to use the Builder",
    p1:
      "Add fragments from the library, then review the generated prompt. A strong prompt usually follows this order: subject, pose or action, clothing, scene, camera angle, lighting, mood, style direction, and quality tags.",
    p2:
      "The visible interface follows your selected language, but the final copyable prompt stays in English because most image models respond better to English prompt fragments."
  },
  zh: {
    title: "提示词构建器",
    description: "组合保存的提示词片段，检查可能冲突，并复制正向、负向和参数。",
    howTitle: "如何使用构建器",
    p1: "从片段库中添加内容，然后检查生成的提示词。稳定的提示词通常按照主体、姿势或动作、服装、场景、镜头、光线、氛围、风格方向和质量标签的顺序组织。",
    p2: "页面界面会跟随你选择的语言，但最终可复制的提示词保持英文，因为大多数生图模型对英文提示词更稳定。"
  },
  ja: {
    title: "プロンプトビルダー",
    description: "保存した断片を組み合わせ、衝突を確認し、ポジティブ、ネガティブ、パラメータをコピーできます。",
    howTitle: "ビルダーの使い方",
    p1: "ライブラリから断片を追加し、生成されたプロンプトを確認します。安定したプロンプトは、主体、ポーズや動作、服装、場面、カメラ、光、雰囲気、スタイル、品質タグの順に整理すると扱いやすくなります。",
    p2: "画面表示は選択した言語に合わせますが、コピーする最終プロンプトは、多くの画像モデルで扱いやすい英語のままにしています。"
  }
} as const;

export const modelPageCopy = {
  en: {
    title: "Local Model Comparison Guide",
    description: "Side-by-side AI image model comparisons using the same ComfyUI prompts and seeds.",
    eyebrow: "Model Guide",
    h1: "Four local checkpoints compared with the same five prompts.",
    lead:
      "These samples compare an anime baseline, a 2.5D anime model, and two realism-oriented checkpoints. Each row uses the same prompt group and the same picked image number.",
    builder: "Open Builder",
    recipes: "Browse Recipes",
    notes: "Model Notes",
    notesLead: "Use these as practical recommendations for your RTX 3080 ComfyUI workflow.",
    bestFor: "Best For",
    results: "Side-by-Side Results",
    resultsLead: "Rows are prompt groups. Columns are models. Images are copied from the local ComfyUI comparison run.",
    prompt: "Prompt",
    quick: "Quick Recommendation"
  },
  zh: {
    title: "本地模型对比指南",
    description: "使用同一套 ComfyUI 提示词和 seed，并排对比 AI 生图模型效果。",
    eyebrow: "模型指南",
    h1: "用同五组提示词对比四个本地 checkpoint。",
    lead: "这些样图对比了一个动漫基线模型、一个 2.5D 动漫模型，以及两个偏写实的 checkpoint。每一行都使用同一组提示词和同一个筛选编号。",
    builder: "打开构建器",
    recipes: "浏览配方",
    notes: "模型笔记",
    notesLead: "这些建议适合你的 RTX 3080 ComfyUI 工作流。",
    bestFor: "最适合",
    results: "并排结果",
    resultsLead: "每一行是提示词组，每一列是模型。图片来自本地 ComfyUI 对比批次。",
    prompt: "提示词",
    quick: "快速建议"
  },
  ja: {
    title: "ローカルモデル比較ガイド",
    description: "同じ ComfyUI プロンプトと seed を使って、AI 画像モデルを横並びで比較します。",
    eyebrow: "モデルガイド",
    h1: "4 つのローカル checkpoint を同じ 5 種類のプロンプトで比較します。",
    lead: "アニメ基準、2.5D アニメ、写実寄りの checkpoint を比較しています。各行は同じプロンプト群と同じ採用番号を使っています。",
    builder: "ビルダーを開く",
    recipes: "レシピを見る",
    notes: "モデルメモ",
    notesLead: "RTX 3080 の ComfyUI ワークフロー向けの実用メモです。",
    bestFor: "おすすめ用途",
    results: "横並び結果",
    resultsLead: "行はプロンプト群、列はモデルです。画像はローカル ComfyUI の比較出力から選んでいます。",
    prompt: "プロンプト",
    quick: "クイック推奨"
  }
} as const;

export const newsPageCopy = {
  en: {
    title: "AI Image Generation News and Updates",
    description: "Daily notes about AI image generation prompts, model tests, ComfyUI workflows, and prompt library updates.",
    eyebrow: "News",
    h1: "Daily AI image generation notes, tests, and prompt updates.",
    lead: "Short practical updates about prompt experiments, model comparisons, ComfyUI sample batches, and changes to the prompt library.",
    takeaways: "Key Takeaways",
    related: "Related",
    continue: "Continue exploring this workflow area."
  },
  zh: {
    title: "AI 生图新闻与更新",
    description: "记录 AI 生图提示词、模型测试、ComfyUI 工作流和提示词库更新。",
    eyebrow: "新闻",
    h1: "AI 生图测试、模型对比和提示词更新记录。",
    lead: "这里发布提示词实验、模型对比、ComfyUI 样图批次和提示词库变化的短文章。",
    takeaways: "要点",
    related: "相关链接",
    continue: "继续查看这个工作流领域。"
  },
  ja: {
    title: "AI 画像生成ニュースと更新",
    description: "AI 画像生成プロンプト、モデルテスト、ComfyUI ワークフロー、プロンプトライブラリ更新の記録です。",
    eyebrow: "ニュース",
    h1: "AI 画像生成テスト、モデル比較、プロンプト更新の記録。",
    lead: "プロンプト実験、モデル比較、ComfyUI サンプル、プロンプトライブラリ変更の短い記事を掲載します。",
    takeaways: "要点",
    related: "関連リンク",
    continue: "このワークフロー領域をさらに見る。"
  }
} as const;
