import type { Locale } from "@/data/i18n";
import type { PromptCategory, PromptFragment, PromptRecipe } from "@/lib/promptCart";

export const recipePageCopy = {
  en: {
    title: "Prompt Recipes",
    description: "Browse all-ages AI image prompt recipes with reusable fragments and full prompt breakdowns.",
    eyebrow: "Recipe Library",
    h1: "Prompt recipes for scenes, characters, camera, lighting, and style.",
    lead:
      "Every recipe includes a positive prompt, negative prompt, parameters, variation fragments, common mistakes, and cart-ready breakdown cards.",
    addFull: "Add full recipe to cart",
    positive: "Positive Prompt",
    negative: "Negative Prompt",
    parameters: "Parameters",
    modelNotes: "Model Notes",
    suitableUses: "Suitable Uses",
    breakdown: "Prompt Breakdown",
    breakdownLead: "Add only the fragments you need, then refine them in the Builder.",
    variations: "Variations",
    commonMistakes: "Common Mistakes",
    related: "Related Recipes",
    bestFor: "Best For",
    copy: "Copy",
    addToCart: "Add to cart",
    source: "Source",
    noRecipes: "No dedicated recipes yet. Use the recipe library to collect fragments for this category.",
    detailIntro:
      "Use this recipe as a modular prompt lesson. Start with the subject, add one readable pose, then layer clothing, scene, camera, lighting, mood, and style. The prompt fragments stay in English so they can be copied directly into most image models."
  },
  zh: {
    title: "提示词配方",
    description: "浏览全年龄 AI 图片提示词配方，每个配方都包含可复用片段和完整拆解。",
    eyebrow: "配方库",
    h1: "面向场景、角色、镜头、光线和风格的提示词配方。",
    lead: "每个配方都包含正向提示词、负向提示词、参数、变体片段、常见错误和可加入提示词篮子的拆解卡片。",
    addFull: "加入完整配方",
    positive: "正向提示词",
    negative: "负向提示词",
    parameters: "参数",
    modelNotes: "模型笔记",
    suitableUses: "适合用途",
    breakdown: "提示词拆解",
    breakdownLead: "只添加你需要的片段，然后在构建器里继续整理。",
    variations: "变体片段",
    commonMistakes: "常见错误",
    related: "相关配方",
    bestFor: "最适合",
    copy: "复制",
    addToCart: "加入篮子",
    source: "来源",
    noRecipes: "这个分类暂时还没有专门配方，可以先从配方库收集相关片段。",
    detailIntro:
      "你可以把这个配方当成模块化提示词教程：先确定主体，加入一个清晰的姿势，再叠加服装、场景、镜头、光线、氛围和风格。可复制给模型的提示词片段保持英文。"
  },
  ja: {
    title: "プロンプトレシピ",
    description: "再利用できる断片と詳しい分解付きの、全年齢向け AI 画像プロンプトレシピを閲覧できます。",
    eyebrow: "レシピ集",
    h1: "場面、人物、カメラ、光、スタイルのためのプロンプトレシピ。",
    lead: "各レシピには、ポジティブ、ネガティブ、パラメータ、バリエーション、よくある失敗、カートに追加できる分解カードが含まれます。",
    addFull: "レシピ全体を追加",
    positive: "ポジティブプロンプト",
    negative: "ネガティブプロンプト",
    parameters: "パラメータ",
    modelNotes: "モデルメモ",
    suitableUses: "向いている用途",
    breakdown: "プロンプト分解",
    breakdownLead: "必要な断片だけを追加し、ビルダーでさらに調整できます。",
    variations: "バリエーション",
    commonMistakes: "よくある失敗",
    related: "関連レシピ",
    bestFor: "おすすめ用途",
    copy: "コピー",
    addToCart: "追加",
    source: "出典",
    noRecipes: "このカテゴリ専用のレシピはまだありません。まずはレシピ集から関連する断片を集めてください。",
    detailIntro:
      "このレシピは、モジュール式プロンプトの見本として使えます。主体を決め、読み取りやすいポーズを一つ加え、服装、場面、カメラ、光、雰囲気、スタイルを重ねます。モデルにコピーする断片は英語のままです。"
  }
} as const;

const categoryLabels: Record<Locale, Partial<Record<PromptCategory | string, string>>> = {
  en: {
    subject: "Subject",
    pose: "Pose",
    action: "Action",
    clothing: "Clothing",
    scene: "Scene",
    camera: "Camera",
    lighting: "Lighting",
    mood: "Mood",
    style: "Style",
    quality: "Quality",
    negative: "Negative",
    parameters: "Parameters",
    "character-design": "Character Design"
  },
  zh: {
    subject: "主体",
    pose: "姿势",
    action: "动作",
    clothing: "服装",
    scene: "场景",
    camera: "镜头",
    lighting: "光线",
    mood: "氛围",
    style: "风格",
    quality: "质量词",
    negative: "负向",
    parameters: "参数",
    "character-design": "角色设计"
  },
  ja: {
    subject: "主体",
    pose: "ポーズ",
    action: "動作",
    clothing: "服装",
    scene: "シーン",
    camera: "カメラ",
    lighting: "光",
    mood: "雰囲気",
    style: "スタイル",
    quality: "品質タグ",
    negative: "ネガティブ",
    parameters: "パラメータ",
    "character-design": "キャラクターデザイン"
  }
};

const fixedText: Record<Locale, Record<string, string>> = {
  en: {
    modelNotes:
      "Works best as an all-ages illustration prompt. Keep character names fictional, avoid brand names, and revise one prompt group at a time.",
    mistakeClose: "Combining close-up and full body framing in the same prompt.",
    mistakeStyle: "Adding many style directions that fight for visual priority.",
    mistakeVague: "Using vague words such as beautiful without concrete visual detail.",
    usePractice: "Prompt practice",
    useIdeation: "Character or scene ideation",
    useBuilder: "Builder fragment library",
    useTutorial: "Safe tutorial examples"
  },
  zh: {
    modelNotes: "适合作为全年龄插画提示词使用。角色名称保持原创，避免品牌名，并且一次只调整一组提示词。",
    mistakeClose: "在同一个提示词里同时要求特写和全身构图。",
    mistakeStyle: "加入太多互相抢画面的风格方向。",
    mistakeVague: "只写 beautiful 这类泛词，却缺少具体视觉细节。",
    usePractice: "提示词练习",
    useIdeation: "角色或场景构思",
    useBuilder: "构建器片段库",
    useTutorial: "安全教程示例"
  },
  ja: {
    modelNotes: "全年齢向けのイラストプロンプトとして使いやすい内容です。人物名は架空にし、ブランド名を避け、一度に一つのプロンプト群だけを調整してください。",
    mistakeClose: "同じプロンプト内で、クローズアップと全身構図を同時に要求してしまう。",
    mistakeStyle: "多すぎるスタイル方向を重ね、画面の優先順位がぶつかってしまう。",
    mistakeVague: "beautiful のような抽象語だけを使い、具体的な視覚情報が不足する。",
    usePractice: "プロンプト練習",
    useIdeation: "人物やシーンのアイデア出し",
    useBuilder: "ビルダー用の断片ライブラリ",
    useTutorial: "安全なチュートリアル例"
  }
};

const titlePrefix: Record<Locale, string> = {
  en: "",
  zh: "",
  ja: ""
};

export function recipePath(recipe: PromptRecipe, locale: Locale): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}/recipes/${recipe.slug}/`;
}

export function categoryLabel(category: string, locale: Locale): string {
  return categoryLabels[locale][category] ?? categoryLabels.en[category] ?? category;
}

export function recipeTitle(recipe: PromptRecipe, locale: Locale): string {
  return `${titlePrefix[locale]}${recipe.title}`;
}

export function recipeShortDescription(recipe: PromptRecipe, locale: Locale): string {
  if (locale === "zh") return `提示词配方：${recipe.shortDescription}`;
  if (locale === "ja") return `プロンプトレシピ: ${recipe.shortDescription}`;
  return recipe.shortDescription;
}

export function fragmentLabel(fragment: PromptFragment, locale: Locale): string {
  if (locale === "en") return fragment.label;
  return categoryLabel(fragment.category, locale);
}

export function localizedRecipe(recipe: PromptRecipe, locale: Locale): PromptRecipe {
  const copy = fixedText[locale];
  return {
    ...recipe,
    title: recipeTitle(recipe, locale),
    category: categoryLabel(recipe.category, locale),
    shortDescription: recipeShortDescription(recipe, locale),
    description: recipePageCopy[locale].detailIntro,
    modelNotes: copy.modelNotes,
    commonMistakes: [copy.mistakeClose, copy.mistakeStyle, copy.mistakeVague],
    suitableUses: [copy.usePractice, copy.useIdeation, copy.useBuilder, copy.useTutorial]
  };
}
