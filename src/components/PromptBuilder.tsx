import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/data/i18n";
import { builderCopy } from "@/data/i18n";
import { libraryGroups, modelRecommendations } from "@/data/promptLibrary";
import type { PromptCategory, PromptFragment } from "@/lib/promptCart";

type CartItem = PromptFragment & { editedText?: string };
type ConflictHit = { terms: [string, string]; message: string };
type LocalText = Record<Locale, string>;

const cartKey = "prompt-atlas-cart";
const positiveOrder: PromptCategory[] = ["subject", "pose", "action", "clothing", "scene", "camera", "lighting", "mood", "style", "quality"];
const allGroups: PromptCategory[] = [...positiveOrder, "negative", "parameters"];
const singleFocus = new Set<PromptCategory>(["pose", "camera", "lighting", "style", "mood"]);
const conflictPairs: [string, string][] = [
  ["standing", "sitting"],
  ["standing", "kneeling"],
  ["sitting", "running"],
  ["walking", "running"],
  ["close-up", "full body"],
  ["wide shot", "close-up"],
  ["low angle", "high angle"],
  ["night scene", "bright daytime"],
  ["soft light", "harsh light"],
  ["realistic photo", "watercolor illustration"],
  ["front view", "back view"],
  ["calm mood", "intense action"]
];

const copy = {
  en: {
    eyebrow: "AI Image Prompt Generator",
    add: "Add",
    remove: "Remove",
    clear: "Clear",
    items: "items",
    checks: "Prompt Checks",
    positive: "Positive Prompt",
    negative: "Negative Prompt",
    parameters: "Parameters",
    copyPositive: "Copy Positive",
    copyNegative: "Copy Negative",
    copyParameters: "Copy Parameters",
    copyAll: "Copy All",
    empty: "Select fragments to generate a prompt.",
    basket: "Selected Fragment Basket",
    source: "Prompt Library",
    includes: "This set includes",
    models: "Model Recommendation Slots",
    modelsLead: "Model notes for choosing checkpoints before copying the prompt into ComfyUI.",
    multiple: (category: string) => `${category} has multiple selected fragments. Keep one main direction unless you need a deliberate blend.`,
    conflict: (a: string, b: string) => `${a} and ${b} may conflict, but copying is still allowed.`,
    tooLong: "The prompt is getting long. Consider removing weaker fragments.",
    ok: "No obvious conflicts right now."
  },
  zh: {
    eyebrow: "AI 图片提示词生成器",
    add: "添加",
    remove: "移除",
    clear: "清空",
    items: "项",
    checks: "提示词检查",
    positive: "正向提示词",
    negative: "负向提示词",
    parameters: "参数",
    copyPositive: "复制正向",
    copyNegative: "复制负向",
    copyParameters: "复制参数",
    copyAll: "全部复制",
    empty: "请选择片段来生成提示词。",
    basket: "已选提示词篮子",
    source: "提示词库",
    includes: "这个套组包含",
    models: "模型推荐位",
    modelsLead: "复制到 ComfyUI 前，可以先参考这些模型选择建议。",
    multiple: (category: string) => `${category} 选择了多个片段，建议保留一个主方向，除非你有意混合。`,
    conflict: (a: string, b: string) => `${a} 和 ${b} 可能互相冲突，但仍然允许复制。`,
    tooLong: "提示词已经偏长，可以考虑删掉较弱的片段。",
    ok: "目前没有明显冲突。"
  },
  ja: {
    eyebrow: "AI 画像プロンプト生成器",
    add: "追加",
    remove: "削除",
    clear: "クリア",
    items: "項目",
    checks: "プロンプト確認",
    positive: "ポジティブプロンプト",
    negative: "ネガティブプロンプト",
    parameters: "パラメータ",
    copyPositive: "ポジティブをコピー",
    copyNegative: "ネガティブをコピー",
    copyParameters: "パラメータをコピー",
    copyAll: "すべてコピー",
    empty: "断片を選ぶとプロンプトが生成されます。",
    basket: "選択中の断片バスケット",
    source: "プロンプトライブラリ",
    includes: "このセットに含まれるもの",
    models: "モデル推奨スロット",
    modelsLead: "ComfyUI にコピーする前に、checkpoint 選びの参考にできます。",
    multiple: (category: string) => `${category} が複数選択されています。意図的に混ぜる場合以外は、主方向を一つにしてください。`,
    conflict: (a: string, b: string) => `${a} と ${b} は衝突する可能性がありますが、コピーはできます。`,
    tooLong: "プロンプトが長くなっています。弱い断片を外すことを検討してください。",
    ok: "今のところ明確な衝突はありません。"
  }
} as const;

const categoryNames: Record<PromptCategory, LocalText> = {
  subject: { en: "Subject", zh: "主体", ja: "主体" },
  pose: { en: "Pose", zh: "姿势", ja: "ポーズ" },
  action: { en: "Action", zh: "动作", ja: "動作" },
  clothing: { en: "Clothing", zh: "服装", ja: "服装" },
  scene: { en: "Scene", zh: "场景", ja: "シーン" },
  camera: { en: "Camera", zh: "镜头", ja: "カメラ" },
  lighting: { en: "Lighting", zh: "光线", ja: "光" },
  mood: { en: "Mood", zh: "氛围", ja: "雰囲気" },
  style: { en: "Style", zh: "风格", ja: "スタイル" },
  quality: { en: "Quality", zh: "质量词", ja: "品質タグ" },
  negative: { en: "Negative", zh: "负向", ja: "ネガティブ" },
  parameters: { en: "Parameters", zh: "参数", ja: "パラメータ" }
};

const groupText: Record<string, { title: LocalText; description: LocalText; summary: LocalText }> = {
  subject: {
    title: { en: "Subject / Character Base", zh: "主体 / 角色基础", ja: "主体 / キャラクター基礎" },
    description: { en: "Choose who or what the image is about before adding pose, scene, and style.", zh: "先确定画面主要表现谁或什么，再叠加姿势、场景和风格。", ja: "ポーズ、場面、スタイルを加える前に、画像の主役を決めます。" },
    summary: { en: "Character bases, objects, and no-person interiors.", zh: "角色基础、物件场景和无人室内。", ja: "人物ベース、物のある場面、無人の室内。" }
  },
  pose: {
    title: { en: "Pose Library", zh: "姿势库", ja: "ポーズライブラリ" },
    description: { en: "Standing, walking, sitting, kneeling, looking back, and dynamic stance.", zh: "站、走、坐、跪、回头和动态站姿等核心姿势。", ja: "立ち、歩き、座り、膝つき、振り返り、動きのある構え。" },
    summary: { en: "Body-position prompts for one sample image at a time.", zh: "用于单张样图的身体位置提示词。", ja: "一枚のサンプル向けの身体位置プロンプト。" }
  },
  action: {
    title: { en: "Action Library", zh: "动作库", ja: "動作ライブラリ" },
    description: { en: "Actions describe what the subject is doing.", zh: "动作片段说明主体正在做什么。", ja: "主体が何をしているかを指定します。" },
    summary: { en: "Gestures and activities such as reading, serving tea, or packing gear.", zh: "挥手、撑伞、阅读、整理装备、倒茶等动作。", ja: "手を振る、傘を持つ、読む、お茶を注ぐなど。" }
  },
  clothing: {
    title: { en: "Clothing / Outfit", zh: "服装 / 穿搭", ja: "服装 / 衣装" },
    description: { en: "Define clothing shape, fabric, and cultural direction.", zh: "定义服装形状、材质和文化方向。", ja: "服の形、素材、雰囲気を決めます。" },
    summary: { en: "Casual, training, traveler, herbalist, coat, and festival outfits.", zh: "日常、练习服、旅人、药草师、长外套和祭典服装。", ja: "日常着、稽古着、旅人、薬草師、コート、祭り衣装。" }
  },
  scene: {
    title: { en: "Scene / Background", zh: "场景 / 背景", ja: "シーン / 背景" },
    description: { en: "Set the environment around the subject.", zh: "设置主体周围的环境。", ja: "主体の周囲にある環境を指定します。" },
    summary: { en: "Tea house, rainy street, study room, forest path, workshop, and market.", zh: "茶室、雨街、书房、森林小路、工坊和市集。", ja: "茶室、雨の通り、書斎、森の道、工房、市場。" }
  },
  camera: {
    title: { en: "Camera / Composition", zh: "镜头 / 构图", ja: "カメラ / 構図" },
    description: { en: "Control framing, distance, and viewing angle.", zh: "控制取景范围、距离和视角。", ja: "フレーミング、距離、視点を調整します。" },
    summary: { en: "Full body, medium shot, close-up, low angle, high angle, isometric.", zh: "全身、中景、特写、低角度、高角度和等距视角。", ja: "全身、ミディアム、クローズアップ、ロー、ハイ、アイソメ。" }
  },
  lighting: {
    title: { en: "Lighting", zh: "光线", ja: "光" },
    description: { en: "Shape mood, contrast, and material readability.", zh: "影响氛围、明暗对比和材质可读性。", ja: "雰囲気、コントラスト、素材の見え方を整えます。" },
    summary: { en: "Window light, golden hour, neon, desk lamp, overcast, studio light.", zh: "窗光、金色时刻、霓虹、台灯、阴天和棚拍光。", ja: "窓光、ゴールデンアワー、ネオン、デスクライト、曇天、スタジオ光。" }
  },
  style: {
    title: { en: "Style Direction", zh: "风格方向", ja: "スタイル方向" },
    description: { en: "Decide the illustration language and finish.", zh: "决定画面的绘制语言和完成感。", ja: "絵柄と仕上がりの方向を決めます。" },
    summary: { en: "Anime, semi-realistic, storybook, watercolor, concept art, isometric game asset.", zh: "动漫、半写实、绘本、水彩、概念设计和等距游戏素材。", ja: "アニメ、半写実、絵本、水彩、コンセプトアート、アイソメ素材。" }
  },
  quality: {
    title: { en: "Quality Tags", zh: "质量词", ja: "品質タグ" },
    description: { en: "Support clarity without piling up weak words.", zh: "帮助画面更清晰，不堆叠空泛词。", ja: "弱い語を積みすぎず、明瞭さを補助します。" },
    summary: { en: "Composition, polished finish, and readable design.", zh: "构图、精修感和可读设计。", ja: "構図、仕上げ、読み取りやすいデザイン。" }
  },
  negative: {
    title: { en: "Negative Prompt", zh: "负向提示词", ja: "ネガティブプロンプト" },
    description: { en: "Reduce common generation problems.", zh: "减少常见生图问题。", ja: "よくある生成問題を減らします。" },
    summary: { en: "General, composition, and style-noise negatives.", zh: "通用、构图和风格噪点负向词。", ja: "汎用、構図、スタイルノイズ対策。" }
  },
  parameters: {
    title: { en: "ComfyUI Parameters", zh: "ComfyUI 参数", ja: "ComfyUI パラメータ" },
    description: { en: "Base settings that can be copied into workflow notes.", zh: "可复制到工作流备注里的基础设置。", ja: "ワークフローメモへコピーできる基本設定です。" },
    summary: { en: "Aspect ratio, steps, CFG, sampler, and seed notes.", zh: "画幅、步数、CFG、采样器和 seed 备注。", ja: "比率、steps、CFG、sampler、seed メモ。" }
  }
};

const fragmentLabels: Record<string, LocalText> = {
  "library-subject-original-girl": { en: "Original anime girl", zh: "原创动漫女孩", ja: "オリジナルアニメ少女" },
  "library-subject-traveler": { en: "Traveler character", zh: "旅人角色", ja: "旅人キャラクター" },
  "library-subject-tea-room": { en: "Tea room interior", zh: "茶室室内", ja: "茶室の室内" },
  "library-subject-fantasy-worker": { en: "Fantasy craft worker", zh: "幻想工匠角色", ja: "ファンタジー職人" },
  "library-pose-standing": { en: "Standing", zh: "站立", ja: "立ち姿" },
  "library-pose-walking": { en: "Walking", zh: "行走", ja: "歩き" },
  "library-pose-sitting": { en: "Sitting", zh: "坐姿", ja: "座り" },
  "library-pose-kneeling": { en: "Kneeling", zh: "跪姿", ja: "膝つき" },
  "library-pose-turn-back": { en: "Looking back", zh: "回头", ja: "振り返り" },
  "library-pose-dynamic-stance": { en: "Dynamic stance", zh: "动态站姿", ja: "動きのある構え" }
};

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(cartKey) || "[]");
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(cartKey, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("prompt-cart-change", { detail: items }));
}

function textOf(item: CartItem) {
  return (item.editedText || item.text || "").trim();
}

function categoryText(category: PromptCategory, locale: Locale) {
  return categoryNames[category]?.[locale] ?? category;
}

function labelText(fragment: PromptFragment, locale: Locale) {
  return fragmentLabels[fragment.id]?.[locale] ?? (locale === "en" ? fragment.label : `${categoryText(fragment.category, locale)}: ${fragment.label}`);
}

function buildPositive(items: CartItem[]) {
  return positiveOrder
    .flatMap((category) => items.filter((item) => item.category === category))
    .map(textOf)
    .filter(Boolean)
    .join(", ");
}

function findConflictHits(items: CartItem[], locale: Locale): ConflictHit[] {
  const positive = buildPositive(items).toLowerCase();
  return conflictPairs
    .filter(([a, b]) => positive.includes(a) && positive.includes(b))
    .map(([a, b]) => ({ terms: [a, b], message: copy[locale].conflict(a, b) }));
}

function buildWarnings(items: CartItem[], conflictHits: ConflictHit[], locale: Locale) {
  const warnings: { type: "danger" | "warning" | "ok"; text: string }[] = [];
  for (const category of singleFocus) {
    if (items.filter((item) => item.category === category).length > 1) {
      warnings.push({ type: "warning", text: copy[locale].multiple(categoryText(category, locale)) });
    }
  }
  for (const hit of conflictHits) warnings.push({ type: "danger", text: hit.message });
  if (buildPositive(items).length > 900) warnings.push({ type: "warning", text: copy[locale].tooLong });
  if (!warnings.length) warnings.push({ type: "ok", text: copy[locale].ok });
  return warnings;
}

function highlightConflicts(text: string, hits: ConflictHit[]) {
  if (!hits.length || !text) return text;
  const terms = hits.flatMap((hit) => hit.terms).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(pattern).map((part, index) =>
    terms.some((term) => term.toLowerCase() === part.toLowerCase()) ? (
      <mark className="conflict-mark" key={`${part}-${index}`}>{part}</mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
}

type PromptBuilderProps = {
  locale?: Locale;
};

export default function PromptBuilder({ locale = "en" }: PromptBuilderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<PromptCategory>("pose");
  const pageCopy = builderCopy[locale];
  const ui = copy[locale];

  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    window.addEventListener("prompt-cart-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("prompt-cart-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const positive = useMemo(() => buildPositive(items), [items]);
  const negative = useMemo(() => items.filter((item) => item.category === "negative").map(textOf).filter(Boolean).join(", "), [items]);
  const parameters = useMemo(() => items.filter((item) => item.category === "parameters").map(textOf).filter(Boolean).join("\n"), [items]);
  const conflictHits = useMemo(() => findConflictHits(items, locale), [items, locale]);
  const warnings = useMemo(() => buildWarnings(items, conflictHits, locale), [items, conflictHits, locale]);
  const activeGroup = libraryGroups.find((group) => group.category === activeCategory) ?? libraryGroups[1];
  const activeGroupText = groupText[activeGroup.category] ?? {
    title: { en: activeGroup.title, zh: activeGroup.title, ja: activeGroup.title },
    description: { en: activeGroup.description, zh: activeGroup.description, ja: activeGroup.description },
    summary: { en: activeGroup.sampleBrief, zh: activeGroup.sampleBrief, ja: activeGroup.sampleBrief }
  };

  const addFragment = (fragment: PromptFragment) => {
    const exists = items.some((item) => item.id === fragment.id);
    const next = exists ? items.filter((item) => item.id !== fragment.id) : [...items, fragment];
    setItems(next);
    writeCart(next);
  };

  const clearCart = () => {
    setItems([]);
    writeCart([]);
  };

  const updateItem = (id: string, editedText: string) => {
    const next = items.map((item) => (item.id === id ? { ...item, editedText } : item));
    setItems(next);
    writeCart(next);
  };

  const removeItem = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    writeCart(next);
  };

  const copyToClipboard = (text: string) => navigator.clipboard?.writeText(text);

  return (
    <section className="builder-workspace">
      <div className="section-heading">
        <p className="eyebrow">{ui.eyebrow}</p>
        <h1>{pageCopy.title}</h1>
        <p className="lead">{pageCopy.description}</p>
      </div>

      <div className="builder-generator">
        <aside className="library-sidebar">
          {libraryGroups.map((group) => {
            const text = groupText[group.category];
            return (
              <button
                className={group.category === activeCategory ? "is-active" : ""}
                type="button"
                key={group.category}
                onClick={() => setActiveCategory(group.category)}
              >
                <span>{text?.title[locale] ?? group.title}</span>
                <small>{group.fragments.length} {ui.items}</small>
              </button>
            );
          })}
        </aside>

        <section className="library-panel">
          <div className="section-heading">
            <p className="eyebrow">{categoryText(activeGroup.category, locale)}</p>
            <h2>{activeGroupText.title[locale]}</h2>
            <p className="muted">{activeGroupText.description[locale]}</p>
            <p className="sample-brief">{ui.includes}: {activeGroupText.summary[locale]}</p>
          </div>
          <div className="library-fragment-grid">
            {activeGroup.fragments.map((fragment) => {
              const selected = items.some((item) => item.id === fragment.id);
              return (
                <article className={selected ? "library-fragment is-selected" : "library-fragment"} key={fragment.id}>
                  <div>
                    <strong>{labelText(fragment, locale)}</strong>
                    <p>{fragment.text}</p>
                  </div>
                  <button type="button" onClick={() => addFragment(fragment)}>
                    {selected ? ui.remove : ui.add}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="builder-output">
          <section className="warning-panel">
            <div className="prompt-output-head">
              <h2>{ui.checks}</h2>
              <button type="button" onClick={clearCart}>{ui.clear}</button>
            </div>
            <ul>{warnings.map((warning) => <li className={`check-${warning.type}`} key={warning.text}>{warning.text}</li>)}</ul>
          </section>
          <section className="prompt-output">
            <h2>{ui.positive}</h2>
            <div className="prompt-preview">{highlightConflicts(positive || ui.empty, conflictHits)}</div>
            <textarea rows={7} value={positive} readOnly />
            <button className="button secondary" type="button" onClick={() => copyToClipboard(positive)}>{ui.copyPositive}</button>
          </section>
          <section className="prompt-output">
            <h2>{ui.negative}</h2>
            <textarea rows={4} value={negative} readOnly />
            <button className="button secondary" type="button" onClick={() => copyToClipboard(negative)}>{ui.copyNegative}</button>
          </section>
          <section className="prompt-output">
            <h2>{ui.parameters}</h2>
            <textarea rows={5} value={parameters} readOnly />
            <button className="button secondary" type="button" onClick={() => copyToClipboard(parameters)}>{ui.copyParameters}</button>
            <button className="button secondary" type="button" onClick={() => copyToClipboard(`Positive Prompt:\n${positive}\n\nNegative Prompt:\n${negative}\n\nParameters:\n${parameters}`)}>{ui.copyAll}</button>
          </section>
        </aside>
      </div>

      <section className="content-section">
        <div className="section-heading">
          <h2>{ui.models}</h2>
          <p className="muted">{ui.modelsLead}</p>
        </div>
        <div className="model-grid">
          {modelRecommendations.map((model) => (
            <article className="model-card" key={model.id}>
              <img className="model-thumb" src={model.sampleImage} alt={`${model.name} sample cover`} loading="lazy" />
              <span className="category-badge">{model.type}</span>
              <h3>{model.name}</h3>
              <p>{model.bestFor.join(" / ")}</p>
              <small>{model.promptStyle}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="builder-groups">
        <h2>{ui.basket}</h2>
        {allGroups.map((category) => {
          const group = items.filter((item) => item.category === category);
          if (!group.length) return null;
          return (
            <section className="builder-group" id={`builder-${category}`} key={category}>
              <h3>{categoryText(category, locale)}</h3>
              {group.map((item) => (
                <article className="builder-fragment" key={item.id}>
                  <strong>{labelText(item, locale)}</strong>
                  <span>{ui.source}</span>
                  <textarea rows={3} value={textOf(item)} onChange={(event) => updateItem(item.id, event.currentTarget.value)} />
                  <button type="button" onClick={() => removeItem(item.id)}>{ui.remove}</button>
                </article>
              ))}
            </section>
          );
        })}
      </section>
    </section>
  );
}
