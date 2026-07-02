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
    title: "提示词配方库",
    description: "浏览适合全年龄的 AI 生图提示词配方，包含可复用片段和完整拆解。",
    eyebrow: "配方库",
    h1: "用于人物、场景、镜头、光线和风格的提示词配方。",
    lead: "每个配方都包含正向提示词、负向提示词、参数、变体片段、常见错误和可加入提示词篮子的拆解卡片。",
    addFull: "加入完整配方",
    positive: "正向提示词",
    negative: "负向提示词",
    parameters: "参数",
    modelNotes: "模型提示",
    suitableUses: "适合用途",
    breakdown: "提示词拆解",
    breakdownLead: "只添加你需要的片段，然后到构建器里继续整理。",
    variations: "变体片段",
    commonMistakes: "常见错误",
    related: "相关配方",
    bestFor: "最适合",
    copy: "复制",
    addToCart: "加入篮子",
    source: "来源",
    noRecipes: "这个分类暂时没有专门配方。可以先从配方库里收集相关片段。",
    detailIntro:
      "你可以把这个配方当成一个模块化提示词范例：先确定主体，再加入一个清楚的姿势，然后叠加服装、场景、镜头、光线、氛围和风格。实际可复制的提示词仍保留英文，方便直接放进大多数生图模型。"
  },
  ja: {
    title: "プロンプトレシピ集",
    description: "全年齢向けのAI画像プロンプトレシピを、再利用しやすい断片と分解付きで閲覧できます。",
    eyebrow: "レシピ集",
    h1: "人物、シーン、カメラ、ライティング、スタイルのためのプロンプトレシピ。",
    lead: "各レシピには、ポジティブ、ネガティブ、パラメータ、バリエーション、よくある失敗、カートに追加できる分解カードが含まれます。",
    addFull: "レシピ全体を追加",
    positive: "ポジティブプロンプト",
    negative: "ネガティブプロンプト",
    parameters: "パラメータ",
    modelNotes: "モデルメモ",
    suitableUses: "向いている用途",
    breakdown: "プロンプト分解",
    breakdownLead: "必要な断片だけを追加し、Builderでさらに調整できます。",
    variations: "バリエーション",
    commonMistakes: "よくある失敗",
    related: "関連レシピ",
    bestFor: "おすすめ用途",
    copy: "コピー",
    addToCart: "追加",
    source: "出典",
    noRecipes: "このカテゴリ専用のレシピはまだありません。まずはレシピ集から関連する断片を集めてください。",
    detailIntro:
      "このレシピは、モジュール式プロンプトの見本として使えます。主体を決め、読み取りやすいポーズを一つ加え、服装、シーン、カメラ、光、雰囲気、スタイルを重ねます。実際にコピーするプロンプトは、多くの画像モデルで使いやすい英語のままです。"
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
    clothing: "衣装",
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

const recipeTranslations: Record<Locale, Record<string, { title: string; shortDescription: string }>> = {
  en: {},
  zh: {
    "dynamic-samurai-training-pose": {
      title: "动态剑道练习姿势",
      shortDescription: "用于练习动作站姿的清晰人物姿势配方，避开危险和血腥内容。"
    },
    "traveler-rainy-old-street": {
      title: "雨中古街旅人",
      shortDescription: "以氛围、镜头构图和环境细节为重点的安全雨街场景。"
    },
    "cozy-study-room-character-scene": {
      title: "温暖书房人物场景",
      shortDescription: "以室内光线为核心的安静书房配方，适合拆解灯光和空间。"
    },
    "fantasy-herbalist-outfit-design": {
      title: "幻想草药师服装设计",
      shortDescription: "用于学习材质、配饰和可读角色设计的服装配方。"
    },
    "detective-neon-alley": {
      title: "霓虹小巷侦探",
      shortDescription: "用于戏剧化城市画面的镜头与光线配方，不包含犯罪现场图像。"
    },
    "traditional-tea-house-interior": {
      title: "传统茶屋室内",
      shortDescription: "无人室内环境配方，重点是道具、材质和安静构图。"
    },
    "adventurer-backpack-gear-layout": {
      title: "冒险者背包道具陈列",
      shortDescription: "帮助描述物件、间距和俯视镜头清晰度的道具布局配方。"
    },
    "calm-portrait-soft-window-light": {
      title: "柔和窗光安静肖像",
      shortDescription: "用于柔和光线、镜头说明和克制质量词的肖像配方。"
    },
    "marketplace-crowd-scene": {
      title: "热闹市集人群场景",
      shortDescription: "保持角色泛化且构图清晰的人群安全场景配方。"
    },
    "character-turnaround-sheet": {
      title: "角色三视图设定表",
      shortDescription: "用于一致设计、中性姿势和制作备注的参考图配方。"
    },
    "isometric-fantasy-workshop": {
      title: "等距幻想工坊",
      shortDescription: "用于游戏感房间、道具分组和比例可读性的等距环境配方。"
    },
    "cinematic-forest-encounter": {
      title: "电影感森林发现场景",
      shortDescription: "强调发现感而不是危险感的氛围型森林场景配方。"
    }
  },
  ja: {
    "dynamic-samurai-training-pose": {
      title: "動きのある剣術練習ポーズ",
      shortDescription: "危険表現を避けながら、動きのある立ち姿を練習する人物ポーズレシピ。"
    },
    "traveler-rainy-old-street": {
      title: "雨の古い通りを歩く旅人",
      shortDescription: "雰囲気、カメラ構図、環境ディテールに集中した雨の街シーン。"
    },
    "cozy-study-room-character-scene": {
      title: "居心地のよい書斎の人物シーン",
      shortDescription: "室内ライティングと落ち着いた空間作りを学べる書斎レシピ。"
    },
    "fantasy-herbalist-outfit-design": {
      title: "ファンタジー薬草師の衣装デザイン",
      shortDescription: "素材、アクセサリ、読み取りやすいキャラクターデザインを学ぶ衣装レシピ。"
    },
    "detective-neon-alley": {
      title: "ネオン路地を歩く探偵",
      shortDescription: "犯罪現場の表現を避けた、ドラマチックな街のカメラと光のレシピ。"
    },
    "traditional-tea-house-interior": {
      title: "伝統的な茶屋の室内",
      shortDescription: "人物なしで、室内、道具、素材、静かな構図を扱う環境レシピ。"
    },
    "adventurer-backpack-gear-layout": {
      title: "冒険者バックパックの道具配置",
      shortDescription: "物、間隔、俯瞰カメラの見やすさを練習するプロップ配置レシピ。"
    },
    "calm-portrait-soft-window-light": {
      title: "柔らかな窓光の落ち着いたポートレート",
      shortDescription: "柔らかい光、カメラ指定、控えめな品質タグを扱うポートレートレシピ。"
    },
    "marketplace-crowd-scene": {
      title: "にぎやかな市場の群衆シーン",
      shortDescription: "人物を一般化しつつ、読みやすい構図にする群衆シーンのレシピ。"
    },
    "character-turnaround-sheet": {
      title: "キャラクター三面図シート",
      shortDescription: "一貫したデザイン、中立ポーズ、制作メモに向いた参照シートレシピ。"
    },
    "isometric-fantasy-workshop": {
      title: "アイソメトリックな幻想工房",
      shortDescription: "ゲーム風の部屋、道具のまとまり、読みやすい縮尺を扱う環境レシピ。"
    },
    "cinematic-forest-encounter": {
      title: "映画的な森での発見シーン",
      shortDescription: "危険よりも発見の雰囲気を重視した森のシーンレシピ。"
    }
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
    modelNotes: "最适合作为全年龄插画提示词使用。角色名保持原创，避免品牌名，并且一次只调整一组提示词。",
    mistakeClose: "在同一个提示词里同时要求特写和全身构图。",
    mistakeStyle: "堆太多风格方向，让画面优先级互相打架。",
    mistakeVague: "只写 beautiful 这类模糊词，却没有具体视觉细节。",
    usePractice: "提示词练习",
    useIdeation: "人物或场景构思",
    useBuilder: "构建器片段库",
    useTutorial: "安全教程示例"
  },
  ja: {
    modelNotes: "全年齢向けのイラストプロンプトとして使いやすい内容です。人物名は架空にし、ブランド名を避け、一度に一つのプロンプト群だけを調整してください。",
    mistakeClose: "同じプロンプト内で、アップと全身構図を同時に要求してしまう。",
    mistakeStyle: "多すぎるスタイル指定を重ね、画面の優先順位がぶつかってしまう。",
    mistakeVague: "beautiful のような曖昧な語だけを使い、具体的な視覚情報が足りない。",
    usePractice: "プロンプト練習",
    useIdeation: "人物やシーンのアイデア出し",
    useBuilder: "Builder用の断片ライブラリ",
    useTutorial: "安全なチュートリアル例"
  }
};

export function recipePath(recipe: PromptRecipe, locale: Locale): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}/recipes/${recipe.slug}/`;
}

export function categoryLabel(category: string, locale: Locale): string {
  return categoryLabels[locale][category] ?? categoryLabels.en[category] ?? category;
}

export function recipeTitle(recipe: PromptRecipe, locale: Locale): string {
  return recipeTranslations[locale][recipe.slug]?.title ?? recipe.title;
}

export function recipeShortDescription(recipe: PromptRecipe, locale: Locale): string {
  return recipeTranslations[locale][recipe.slug]?.shortDescription ?? recipe.shortDescription;
}

export function fragmentLabel(fragment: PromptFragment, locale: Locale): string {
  if (fragment.label.includes("golden hour")) return locale === "zh" ? "变体：黄金时刻" : locale === "ja" ? "バリエーション：ゴールデンアワー" : fragment.label;
  if (fragment.label.includes("watercolor")) return locale === "zh" ? "变体：水彩" : locale === "ja" ? "バリエーション：水彩" : fragment.label;
  if (fragment.label.includes("wider framing")) return locale === "zh" ? "变体：更宽构图" : locale === "ja" ? "バリエーション：広めの構図" : fragment.label;
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
