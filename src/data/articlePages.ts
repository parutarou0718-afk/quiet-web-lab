import type { Locale } from "@/data/i18n";

export type ArticleTuple = readonly [string, string, string];

export const guidePageCopy = {
  en: {
    title: "Prompt Writing Guides",
    description: "Practical AI image prompt writing guides for structure, poses, clothing, camera, negative prompts, and iteration.",
    eyebrow: "Guides",
    h1: "Learn prompt writing one visual decision at a time.",
    lead: "These guides explain prompt structure in plain English and connect directly to the recipe builder workflow.",
    bodyLead: "This guide is part of the prompt writing reference library.",
    back: "Back to guides"
  },
  zh: {
    title: "提示词写作指南",
    description: "关于提示词结构、姿势、服装、镜头、负向词和迭代方法的实用指南。",
    eyebrow: "指南",
    h1: "一次学会一个视觉决策，慢慢写出更清晰的提示词。",
    lead: "这些指南用简单方式解释提示词结构，并和构建器、配方库的工作流连接起来。",
    bodyLead: "这篇文章属于提示词写作参考库。",
    back: "返回指南"
  },
  ja: {
    title: "プロンプト作成ガイド",
    description: "構造、ポーズ、衣装、カメラ、ネガティブ、反復方法を扱うAI画像プロンプトガイドです。",
    eyebrow: "ガイド",
    h1: "視覚的な判断を一つずつ学び、プロンプトを整理します。",
    lead: "これらのガイドは、プロンプト構造をわかりやすく説明し、ビルダーやレシピの流れにつなげます。",
    bodyLead: "この記事はプロンプト作成リファレンスの一部です。",
    back: "ガイドへ戻る"
  }
} as const;

export const loraPageCopy = {
  en: {
    title: "LoRA Guide",
    description: "All-ages introductory LoRA training guides covering datasets, captions, settings, mistakes, and safe testing.",
    eyebrow: "LoRA Basics",
    h1: "Learn LoRA concepts with safe, lawful, original-content workflows.",
    lead: "These pages explain LoRA ideas for education. They avoid real-person imitation, private identity use, mature content, and copied IP workflows.",
    bodyLead: "This page is part of the LoRA learning reference.",
    back: "Back to LoRA guide"
  },
  zh: {
    title: "LoRA 指南",
    description: "适合入门的 LoRA 学习内容，覆盖数据集、标注、参数、常见错误和安全测试。",
    eyebrow: "LoRA 基础",
    h1: "用安全、合法、原创内容工作流学习 LoRA。",
    lead: "这些页面用于理解 LoRA，不鼓励真人模仿、私人身份使用、成人内容或复制 IP 的训练流程。",
    bodyLead: "这篇文章属于 LoRA 学习参考库。",
    back: "返回 LoRA 指南"
  },
  ja: {
    title: "LoRA ガイド",
    description: "データセット、キャプション、設定、失敗例、安全なテストを扱うLoRA入門ガイドです。",
    eyebrow: "LoRA 基礎",
    h1: "安全で合法的なオリジナル内容の流れで LoRA を学びます。",
    lead: "これらのページは教育目的の LoRA メモです。実在人物の模倣、私的な身元利用、成人向け内容、コピーIPの学習は扱いません。",
    bodyLead: "この記事は LoRA 学習リファレンスの一部です。",
    back: "LoRA ガイドへ戻る"
  }
} as const;

const guideTranslations: Record<Locale, Record<string, { title: string; summary: string }>> = {
  en: {},
  zh: {
    "ai-coding-agent-token-workflow-guide": { title: "AI 编码 Agent Token 工作流指南", summary: "面向真实开发的指南：先固定产品行为，再考虑办公电脑上的性能限制，最后把可复用的工程规则沉淀成 Codex Skill。" },
    "how-to-write-better-prompts": { title: "如何写出更好的 AI 生图提示词", summary: "从具体主体开始，再加入一个清楚动作、一个场景、一个镜头和一个光线方向。" },
    "prompt-structure": { title: "提示词结构：主体、动作、服装、场景、镜头、光线", summary: "稳定的图像提示词通常从主体走向环境，再补充镜头、光线和风格。" },
    "pose-prompts": { title: "如何清楚描述姿势", summary: "使用站立、坐姿、行走、转身、回头等简单身体语言，并避免互相冲突的姿势。" },
    "clothing-prompts": { title: "如何描述服装和材质", summary: "服装提示词最好写清层次、材质、版型、颜色和实用配饰。" },
    "camera-angles": { title: "如何在 AI 图像里使用镜头角度", summary: "近景、全身、低角度、高角度和三分之四视角会把画面带向不同方向。" },
    "negative-prompts": { title: "常见负向提示词说明", summary: "负向提示词是清理工具，不是万能修复层。适量使用更稳定。" },
    "prompt-iteration-workflow": { title: "提示词迭代工作流", summary: "每次测试只改变一个重要部分，先保存主体和场景，再比较姿势、镜头和光线。" }
  },
  ja: {
    "ai-coding-agent-token-workflow-guide": { title: "AI コーディング Agent のトークン運用ガイド", summary: "実際の開発に向けたガイドです。製品の挙動、オフィス PC で動く性能条件、再利用できる開発ルールを整理します。" },
    "how-to-write-better-prompts": { title: "よりよいAI画像プロンプトの書き方", summary: "具体的な主体から始め、動作、場面、カメラ、光を一つずつ足します。" },
    "prompt-structure": { title: "プロンプト構造：主体、動作、衣装、場面、カメラ、光", summary: "安定したプロンプトは、主体から周囲の文脈へ順に広げると扱いやすくなります。" },
    "pose-prompts": { title: "ポーズをわかりやすく書く方法", summary: "立つ、座る、歩く、振り返るなど、単純な身体表現を使います。" },
    "clothing-prompts": { title: "衣装と素材の書き方", summary: "衣装はレイヤー、素材、形、色、実用的な小物を入れると安定します。" },
    "camera-angles": { title: "AI画像でカメラ角度を使う方法", summary: "クローズアップ、全身、ローアングル、ハイアングルなどは構図を大きく変えます。" },
    "negative-prompts": { title: "よく使うネガティブプロンプト", summary: "ネガティブは修正用の補助であり、長く積みすぎると逆に不安定になります。" },
    "prompt-iteration-workflow": { title: "プロンプト反復ワークフロー", summary: "一度に変える要素を一つにし、ポーズ、カメラ、光を比較します。" }
  }
};

const loraTranslations: Record<Locale, Record<string, { title: string; summary: string }>> = {
  en: {},
  zh: {
    "what-is-lora": { title: "什么是 LoRA 模型？", summary: "LoRA 是一个小型附加模型，用来让图像模型学习一个聚焦概念、风格、物件类别或原创角色设计。" },
    "dataset-preparation": { title: "LoRA 训练数据集准备", summary: "可用的数据集应该一致、干净，并且有使用权限。" },
    captioning: { title: "LoRA 图片标注方法", summary: "标注应该描述图中可见内容，不要过度堆叠每张图。" },
    "training-settings": { title: "基础训练参数说明", summary: "学习率、步数、重复次数、分辨率和网络规模要逐步调整。" },
    "common-mistakes": { title: "常见 LoRA 训练错误", summary: "常见问题包括数据太少、重复图、标注不清、概念混杂和过拟合。" },
    "testing-lora": { title: "如何安全测试 LoRA", summary: "用中性提示词、不同镜头和安全场景测试 LoRA 是否真正响应触发词。" }
  },
  ja: {
    "what-is-lora": { title: "LoRAモデルとは？", summary: "LoRA は、画像モデルに特定の概念、スタイル、物体、オリジナルデザインを学ばせる小さな追加モデルです。" },
    "dataset-preparation": { title: "LoRA学習用データセット準備", summary: "よいデータセットは一貫性があり、きれいで、使用権限が明確です。" },
    captioning: { title: "LoRA画像のキャプション作成", summary: "キャプションは見えている内容を説明し、各画像に詰め込みすぎないようにします。" },
    "training-settings": { title: "基本的な学習設定", summary: "学習率、steps、repeats、解像度、ネットワークサイズは段階的に調整します。" },
    "common-mistakes": { title: "LoRA学習でよくある失敗", summary: "少なすぎるデータ、重複画像、不明確なキャプション、概念の混在、過学習に注意します。" },
    "testing-lora": { title: "LoRAを安全にテストする方法", summary: "中立的なプロンプト、異なるカメラ、安心できる場面で反応を確認します。" }
  }
};

export function localizeArticle(article: ArticleTuple, locale: Locale, kind: "guide" | "lora") {
  const [slug, title, summary] = article;
  const table = kind === "guide" ? guideTranslations : loraTranslations;
  return {
    slug,
    title: table[locale][slug]?.title ?? title,
    summary: table[locale][slug]?.summary ?? summary
  };
}
