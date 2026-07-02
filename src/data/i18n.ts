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
  "/recipes/": { en: "/recipes/", zh: "/recipes/", ja: "/recipes/" },
  "/models/": { en: "/models/", zh: "/zh/models/", ja: "/ja/models/" },
  "/news/": { en: "/news/", zh: "/zh/news/", ja: "/ja/news/" },
  "/guides/": { en: "/guides/", zh: "/guides/", ja: "/guides/" },
  "/lora/": { en: "/lora/", zh: "/lora/", ja: "/lora/" },
  "/admin/news/": { en: "/admin/news/", zh: "/zh/admin/news/", ja: "/ja/admin/news/" }
} as const;

export type RouteKey = keyof typeof pathMap;

export function localizedPath(route: RouteKey, locale: Locale): string {
  return pathMap[route][locale];
}

export function routeAlternates(route: RouteKey): Record<Locale, string> {
  return pathMap[route];
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
      "Quiet Web Lab is focused on AI image prompt workflows: a local prompt builder, reusable prompt recipes, model comparison notes, LoRA learning pages, and production checklists for ComfyUI sample images.",
    builderCta: "Open Prompt Builder",
    modelCta: "View Model Comparisons",
    recipes: "prompt recipes",
    models: "local models compared",
    static: "Cloudflare ready",
    local: "no login or backend",
    promptBuilder: "Prompt Builder",
    promptBuilderTitle: "Assemble prompts without losing the pieces.",
    promptBuilderBody:
      "Pick subject, pose, camera, lighting, style, quality, negative prompts, and parameters. The basket highlights likely conflicts while still letting users copy the final text.",
    promptBuilderButton: "Build a prompt",
    modelGuide: "Model Guide",
    modelGuideTitle: "Compare local checkpoints with the same prompts.",
    modelGuideBody:
      "See anime, 2.5D, and realistic checkpoints side by side across character, Eastern outfit, interior, night street, and portrait prompts.",
    modelGuideButton: "Compare models",
    startHere: "Start Here",
    startLead: "Fast entry points for prompt writing, generation planning, and model choice.",
    latestRecipes: "Latest Prompt Recipes",
    latestRecipesLead: "A sample of the current AI Image Prompt Atlas content.",
    latestUpdates: "Latest Updates",
    latestUpdatesLead: "Short notes from prompt tests, model comparisons, and image generation batches.",
    categories: "Popular Categories",
    categoriesLead: "Jump into the prompt area you want to improve first."
  },
  zh: {
    title: "AI 生图提示词库和构建器",
    h1: "用可复用片段、样图和模型笔记，组合更干净的 AI 生图提示词。",
    lead:
      "Quiet Web Lab 专注于 AI 生图工作流：本地提示词构建器、可复用提示词配方、模型对比、LoRA 学习页，以及 ComfyUI 样图生产清单。",
    builderCta: "打开提示词构建器",
    modelCta: "查看模型对比",
    recipes: "提示词配方",
    models: "本地模型对比",
    static: "可部署 Cloudflare",
    local: "无需登录或后端",
    promptBuilder: "提示词构建器",
    promptBuilderTitle: "把提示词拆成片段，再稳稳组合起来。",
    promptBuilderBody: "选择主体、姿势、镜头、光线、风格、质量词、负向词和参数。提示词篮子会标出可能冲突，但仍然允许复制。",
    promptBuilderButton: "开始组合",
    modelGuide: "模型指南",
    modelGuideTitle: "用同一组提示词对比本地模型。",
    modelGuideBody: "并排查看动漫、2.5D、写实模型在角色、东方服饰、室内、雨夜街道和肖像提示词上的差异。",
    modelGuideButton: "对比模型",
    startHere: "从这里开始",
    startLead: "提示词写作、出图计划和模型选择的快速入口。",
    latestRecipes: "最新提示词配方",
    latestRecipesLead: "当前 AI Image Prompt Atlas 的部分内容样例。",
    latestUpdates: "最新更新",
    latestUpdatesLead: "提示词测试、模型对比和生图批次的简短记录。",
    categories: "热门分类",
    categoriesLead: "先进入你最想改进的提示词区域。"
  },
  ja: {
    title: "AI画像プロンプト集とビルダー",
    h1: "再利用できる断片、作例、モデルメモから、扱いやすいAI画像プロンプトを組み立てます。",
    lead:
      "Quiet Web Lab はAI画像生成ワークフローのための静的サイトです。プロンプトビルダー、レシピ、モデル比較、LoRAメモ、ComfyUI用の作例チェックリストをまとめます。",
    builderCta: "プロンプトビルダーを開く",
    modelCta: "モデル比較を見る",
    recipes: "プロンプトレシピ",
    models: "ローカルモデル比較",
    static: "Cloudflare 対応",
    local: "ログイン・バックエンド不要",
    promptBuilder: "プロンプトビルダー",
    promptBuilderTitle: "プロンプトを部品ごとに選び、迷子にせず組み立てます。",
    promptBuilderBody: "主体、ポーズ、カメラ、光、スタイル、品質タグ、ネガティブ、パラメータを選択できます。衝突候補は表示しますが、コピーは止めません。",
    promptBuilderButton: "組み立てる",
    modelGuide: "モデルガイド",
    modelGuideTitle: "同じプロンプトでローカルモデルを比較します。",
    modelGuideBody: "アニメ、2.5D、写実系モデルを、人物、東洋風衣装、室内、雨の夜道、ポートレートで並べて確認できます。",
    modelGuideButton: "モデルを比較",
    startHere: "はじめに",
    startLead: "プロンプト作成、生成計画、モデル選びの入口です。",
    latestRecipes: "新着プロンプトレシピ",
    latestRecipesLead: "現在の AI Image Prompt Atlas のサンプルです。",
    latestUpdates: "最新更新",
    latestUpdatesLead: "プロンプト実験、モデル比較、生成バッチの短い記録です。",
    categories: "人気カテゴリ",
    categoriesLead: "まず改善したいプロンプト領域へ移動します。"
  }
} as const;

export const builderCopy = {
  en: {
    title: "Prompt Builder",
    description: "Combine saved fragments, detect prompt conflicts, and copy positive prompts, negative prompts, and parameters.",
    heading: "Choose pose, scene, camera, and model direction from a reusable prompt library.",
    lead:
      "Pick fragments from the library. The output panel builds Positive / Negative / Parameters and marks possible conflicts while still allowing copy.",
    howTitle: "How to use the Builder",
    p1:
      "Add fragments from the library, then review the generated prompt. A strong prompt usually follows this order: subject, pose or action, clothing, scene, camera angle, lighting, mood, style direction, and quality tags.",
    p2:
      "The cart is saved in localStorage, so your fragments remain available after refreshing the page. Conflict checks are suggestions, not rules."
  },
  zh: {
    title: "提示词构建器",
    description: "组合提示词片段，检查冲突，并复制正向提示词、负向提示词和参数。",
    heading: "从可复用提示词库里选择姿势、场景、镜头和模型方向。",
    lead: "从片段库中选择内容，右侧会生成 Positive / Negative / Parameters。冲突会被标红提醒，但不会阻止复制。",
    howTitle: "如何使用构建器",
    p1: "从片段库添加内容，然后检查生成结果。一个稳定的提示词通常按主体、姿势或动作、服装、场景、镜头、光线、氛围、风格和质量词来组织。",
    p2: "提示词篮子保存在浏览器本地存储中，刷新后仍会保留。冲突检查只是建议，不是规则。"
  },
  ja: {
    title: "プロンプトビルダー",
    description: "プロンプト断片を組み合わせ、衝突候補を確認し、Positive / Negative / Parameters をコピーできます。",
    heading: "再利用できるライブラリから、ポーズ、場面、カメラ、モデル方向を選びます。",
    lead: "ライブラリから断片を選ぶと、Positive / Negative / Parameters が生成されます。衝突候補は表示しますが、コピーは止めません。",
    howTitle: "ビルダーの使い方",
    p1: "ライブラリから断片を追加し、生成されたプロンプトを確認します。安定したプロンプトは、主体、ポーズまたは動作、服装、場面、カメラ、光、雰囲気、スタイル、品質タグの順に整理すると扱いやすくなります。",
    p2: "カートはブラウザの localStorage に保存されるため、更新後も残ります。衝突チェックはルールではなく、確認用のヒントです。"
  }
} as const;

export const modelPageCopy = {
  en: {
    title: "Local Model Comparison Guide",
    description: "Side-by-side AI image model comparisons using the same ComfyUI prompts and seeds.",
    h1: "Four local checkpoints compared with the same five prompts.",
    lead:
      "These samples compare an anime baseline, a 2.5D anime model, and two realism-oriented checkpoints. Each row uses the same prompt group and the same picked image number.",
    notes: "Model Notes",
    notesLead: "Use these as practical recommendations for your RTX 3080 ComfyUI workflow.",
    results: "Side-by-Side Results",
    resultsLead: "Rows are prompt groups. Columns are models. Images are copied from the local ComfyUI comparison run.",
    quick: "Quick Recommendation"
  },
  zh: {
    title: "本地模型对比指南",
    description: "使用同一组 ComfyUI 提示词和种子，对比本地 AI 生图模型。",
    h1: "用同五组提示词对比四个本地 checkpoint。",
    lead: "这些样图对比动漫基准、2.5D 动漫模型和两个偏写实模型。每一行都使用同一组提示词和同一张挑选图，方便看模型本身的差异。",
    notes: "模型笔记",
    notesLead: "这些是给 RTX 3080 ComfyUI 工作流的实用建议。",
    results: "并排结果",
    resultsLead: "行是提示词组，列是模型。图片来自本地 ComfyUI 模型对比批次。",
    quick: "快速推荐"
  },
  ja: {
    title: "ローカルモデル比較ガイド",
    description: "同じ ComfyUI プロンプトとシードで、AI画像モデルを横並び比較します。",
    h1: "4つのローカル checkpoint を同じ5種類のプロンプトで比較します。",
    lead: "アニメ基準、2.5Dアニメ、写実寄りモデルを並べて確認します。各行は同じプロンプトグループと同じ採用番号を使います。",
    notes: "モデルメモ",
    notesLead: "RTX 3080 の ComfyUI ワークフロー向けの実用メモです。",
    results: "横並び結果",
    resultsLead: "行はプロンプト、列はモデルです。画像はローカル ComfyUI の比較出力から選んでいます。",
    quick: "クイック推薦"
  }
} as const;

export const newsPageCopy = {
  en: {
    title: "AI Image Generation News and Updates",
    description: "Daily notes about AI image generation prompts, model tests, ComfyUI workflows, and prompt library updates.",
    eyebrow: "News",
    h1: "Daily AI image generation notes, tests, and prompt updates.",
    lead: "Short practical updates about prompt experiments, model comparisons, ComfyUI sample batches, and changes to the prompt library."
  },
  zh: {
    title: "AI 生图新闻和更新",
    description: "关于 AI 生图提示词、模型测试、ComfyUI 工作流和提示词库更新的日常记录。",
    eyebrow: "新闻",
    h1: "AI 生图测试、模型对比和提示词更新记录。",
    lead: "这里放提示词实验、模型对比、ComfyUI 样图批次和提示词库更新的简短记录。"
  },
  ja: {
    title: "AI画像生成ニュースと更新",
    description: "AI画像プロンプト、モデルテスト、ComfyUI ワークフロー、プロンプト集の更新メモです。",
    eyebrow: "ニュース",
    h1: "AI画像生成のテスト、モデル比較、プロンプト更新メモ。",
    lead: "プロンプト実験、モデル比較、ComfyUI作例バッチ、プロンプトライブラリ更新の短い記録です。"
  }
} as const;
