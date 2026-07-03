import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/data/i18n";
import { builderCopy } from "@/data/i18n";
import { libraryGroups } from "@/data/promptLibrary";
import type { PromptCategory, PromptFragment } from "@/lib/promptCart";

type CartItem = PromptFragment & { editedText?: string };
type LocalText = Record<Locale, string>;
type ConflictHit = { terms: [string, string]; message: string };

const cartKey = "prompt-atlas-cart";
const positiveOrder: PromptCategory[] = ["subject", "pose", "action", "clothing", "scene", "camera", "lighting", "mood", "style", "quality"];
const requiredCategories: PromptCategory[] = ["subject", "pose", "scene", "camera", "lighting"];
const singleFocus = new Set<PromptCategory>(["pose", "camera", "lighting", "style"]);
const conflictPairs: [string, string][] = [
  ["standing", "sitting"],
  ["standing", "kneeling"],
  ["walking", "sitting"],
  ["close-up", "full body"],
  ["low angle", "high angle"],
  ["neon reflections", "overcast diffuse light"],
  ["watercolor illustration", "semi-realistic illustration"]
];

const galleryImages = [
  "/images/model-comparison/b01-meinahentai.png",
  "/images/model-comparison/b02-meinahentai.png",
  "/images/model-comparison/b03-meinahentai.png",
  "/images/model-comparison/b04-meinahentai.png",
  "/images/model-comparison/b05-meinahentai.png",
  "/images/model-comparison/b01-darksushi.png",
  "/images/model-comparison/b02-darksushi.png",
  "/images/model-comparison/b03-darksushi.png",
  "/images/model-comparison/b04-darksushi.png",
  "/images/model-comparison/b05-darksushi.png"
];

const ui = {
  en: {
    eyebrow: "Prompt Builder",
    all: "All",
    selected: "selected",
    add: "Add",
    remove: "Remove",
    clear: "Clear",
    copy: "Copy",
    copyAll: "Copy All",
    positive: "Positive Prompt",
    negative: "Negative Prompt",
    parameters: "Parameters",
    checks: "Checks",
    empty: "Choose sample cards above. English prompt fragments will appear here.",
    frameNote: "This frame stays steady while the sample view changes above.",
    missing: (name: string) => `Missing ${name}. Add one card from that category for a more complete prompt.`,
    multiple: (name: string) => `${name} has multiple cards selected. Keep one main direction unless you want a deliberate blend.`,
    conflict: (a: string, b: string) => `${a} and ${b} may conflict, but copying is still allowed.`,
    ok: "The prompt looks usable. You can still refine details before copying."
  },
  zh: {
    eyebrow: "提示词构建器",
    all: "全部",
    selected: "已选",
    add: "加入",
    remove: "移除",
    clear: "清空",
    copy: "复制",
    copyAll: "全部复制",
    positive: "正向提示词",
    negative: "负向提示词",
    parameters: "参数",
    checks: "提醒",
    empty: "从上面的样图卡片里选择，英语提示词片段会自动出现在这里。",
    frameNote: "上面的样图会变化，但这个输出框会一直固定在这里。",
    missing: (name: string) => `还缺少${name}。加一个这个类别的卡片，提示词会更完整。`,
    multiple: (name: string) => `${name}选了多个片段。除非你想故意混合，否则建议保留一个主方向。`,
    conflict: (a: string, b: string) => `${a} 和 ${b} 可能冲突，但仍然允许复制。`,
    ok: "这组提示词已经可以使用，你也可以继续微调细节。"
  },
  ja: {
    eyebrow: "プロンプトビルダー",
    all: "すべて",
    selected: "選択中",
    add: "追加",
    remove: "削除",
    clear: "クリア",
    copy: "コピー",
    copyAll: "すべてコピー",
    positive: "ポジティブプロンプト",
    negative: "ネガティブプロンプト",
    parameters: "パラメータ",
    checks: "注意",
    empty: "上のサンプルカードを選ぶと、英語のプロンプト断片がここに入ります。",
    frameNote: "上のサンプル表示は変わりますが、この出力フレームは固定されたままです。",
    missing: (name: string) => `${name} が未選択です。このカテゴリから一つ追加すると、プロンプトがまとまります。`,
    multiple: (name: string) => `${name} が複数選択されています。意図的に混ぜる場合以外は一つに絞るのがおすすめです。`,
    conflict: (a: string, b: string) => `${a} と ${b} は衝突する可能性がありますが、コピーはできます。`,
    ok: "このプロンプトは使える状態です。必要なら細部を調整してください。"
  }
} as const;

const categoryNames: Record<PromptCategory, LocalText> = {
  subject: { en: "Character", zh: "人物", ja: "人物" },
  pose: { en: "Pose", zh: "姿势", ja: "ポーズ" },
  action: { en: "Action", zh: "动作", ja: "動作" },
  clothing: { en: "Outfit", zh: "服装", ja: "服装" },
  scene: { en: "Scene", zh: "场景", ja: "シーン" },
  camera: { en: "Camera", zh: "镜头", ja: "カメラ" },
  lighting: { en: "Lighting", zh: "光照", ja: "光" },
  mood: { en: "Mood", zh: "氛围", ja: "雰囲気" },
  style: { en: "Style", zh: "风格", ja: "スタイル" },
  quality: { en: "Quality", zh: "质量", ja: "品質" },
  negative: { en: "Negative", zh: "负向", ja: "ネガティブ" },
  parameters: { en: "Params", zh: "参数", ja: "設定" }
};

const groupDescriptions: Record<string, LocalText> = {
  subject: {
    en: "Pick the main person, object, or no-person interior first.",
    zh: "先确定画面里的主要人物、物件或无人室内。",
    ja: "まず人物、物、無人室内など主役を決めます。"
  },
  pose: {
    en: "Choose one readable body position for the sample.",
    zh: "选择一个清楚的身体姿势。",
    ja: "読み取りやすい身体ポーズを一つ選びます。"
  },
  action: {
    en: "Add what the subject is doing.",
    zh: "补充主体正在做的事情。",
    ja: "主体が何をしているかを加えます。"
  },
  clothing: {
    en: "Define clothes, material, and cultural direction.",
    zh: "定义服装、材质和文化方向。",
    ja: "服装、素材、雰囲気を決めます。"
  },
  scene: {
    en: "Place the subject in a clear environment.",
    zh: "把主体放进一个清楚的环境里。",
    ja: "主体をわかりやすい環境に置きます。"
  },
  camera: {
    en: "Control distance, framing, and viewing angle.",
    zh: "控制距离、构图和视角。",
    ja: "距離、構図、視点を調整します。"
  },
  lighting: {
    en: "Set light direction, contrast, and mood.",
    zh: "设置光线方向、明暗和氛围。",
    ja: "光の方向、コントラスト、雰囲気を決めます。"
  },
  style: {
    en: "Choose the visual finish.",
    zh: "选择画面的完成风格。",
    ja: "仕上がりのスタイルを選びます。"
  },
  quality: {
    en: "Add clarity and polish.",
    zh: "补充清晰度和精修感。",
    ja: "明瞭さと仕上げを補います。"
  },
  negative: {
    en: "Reduce common output problems.",
    zh: "减少常见出图问题。",
    ja: "よくある出力問題を減らします。"
  },
  parameters: {
    en: "Copy workflow settings.",
    zh: "复制工作流参数。",
    ja: "ワークフロー設定をコピーします。"
  }
};

const fragmentNames: Record<string, LocalText> = {
  "library-subject-original-girl": { en: "Original anime girl", zh: "原创动漫女孩", ja: "オリジナルアニメ少女" },
  "library-subject-traveler": { en: "Traveler character", zh: "旅人角色", ja: "旅人キャラクター" },
  "library-subject-tea-room": { en: "Tea room interior", zh: "茶室室内", ja: "茶室の室内" },
  "library-subject-fantasy-worker": { en: "Fantasy craft worker", zh: "幻想工匠", ja: "ファンタジー職人" },
  "library-pose-standing": { en: "Standing", zh: "站立", ja: "立ち姿" },
  "library-pose-walking": { en: "Walking", zh: "行走", ja: "歩き" },
  "library-pose-sitting": { en: "Sitting", zh: "坐姿", ja: "座り" },
  "library-pose-kneeling": { en: "Kneeling", zh: "跪姿", ja: "膝つき" },
  "library-pose-turn-back": { en: "Looking back", zh: "回头", ja: "振り返り" },
  "library-pose-dynamic-stance": { en: "Dynamic stance", zh: "动态站姿", ja: "動きのある構え" },
  "library-action-waving": { en: "Waving", zh: "挥手", ja: "手を振る" },
  "library-action-umbrella": { en: "Holding umbrella", zh: "撑伞", ja: "傘を持つ" },
  "library-action-reading": { en: "Reading", zh: "阅读", ja: "読む" },
  "library-action-packing": { en: "Packing gear", zh: "整理装备", ja: "装備を整理" },
  "library-action-tea": { en: "Serving tea", zh: "倒茶", ja: "お茶を注ぐ" },
  "library-action-practice-sword": { en: "Practice sword", zh: "练习木刀", ja: "木刀練習" },
  "library-clothing-casual-cardigan": { en: "Casual cardigan", zh: "日常开衫", ja: "日常カーディガン" },
  "library-clothing-keikogi": { en: "Training outfit", zh: "练习服", ja: "稽古着" },
  "library-clothing-traveler-cloak": { en: "Traveler cloak", zh: "旅人斗篷", ja: "旅人のマント" },
  "library-clothing-herbalist": { en: "Herbalist outfit", zh: "药草师服装", ja: "薬草師の服" },
  "library-clothing-detective-coat": { en: "Long coat", zh: "长外套", ja: "ロングコート" },
  "library-clothing-festival": { en: "Festival outfit", zh: "祭典服装", ja: "祭り衣装" },
  "library-scene-tea-house": { en: "Traditional tea house", zh: "传统茶室", ja: "伝統的な茶室" },
  "library-scene-rainy-street": { en: "Rainy old street", zh: "雨后老街", ja: "雨の古い通り" },
  "library-scene-study-room": { en: "Study room", zh: "书房", ja: "書斎" },
  "library-scene-forest-path": { en: "Forest path", zh: "森林小路", ja: "森の小道" },
  "library-scene-workshop": { en: "Fantasy workshop", zh: "幻想工坊", ja: "幻想工房" },
  "library-scene-market": { en: "Marketplace", zh: "市集", ja: "市場" },
  "library-camera-full-body": { en: "Full body", zh: "全身", ja: "全身" },
  "library-camera-medium-shot": { en: "Medium shot", zh: "中景", ja: "ミディアム" },
  "library-camera-close-up": { en: "Close-up", zh: "特写", ja: "クローズアップ" },
  "library-camera-low-angle": { en: "Low angle", zh: "低角度", ja: "ローアングル" },
  "library-camera-high-angle": { en: "High angle", zh: "高角度", ja: "ハイアングル" },
  "library-camera-isometric": { en: "Isometric", zh: "等距视角", ja: "アイソメ" },
  "library-lighting-window": { en: "Soft window light", zh: "柔和窗光", ja: "柔らかい窓光" },
  "library-lighting-golden-hour": { en: "Golden hour", zh: "金色时刻", ja: "ゴールデンアワー" },
  "library-lighting-neon": { en: "Neon reflections", zh: "霓虹反射", ja: "ネオン反射" },
  "library-lighting-desk-lamp": { en: "Desk lamp", zh: "台灯", ja: "デスクライト" },
  "library-lighting-overcast": { en: "Overcast", zh: "阴天柔光", ja: "曇天光" },
  "library-lighting-studio": { en: "Studio light", zh: "棚拍光", ja: "スタジオ光" },
  "library-style-anime-clean": { en: "Clean anime", zh: "干净动漫", ja: "クリーンアニメ" },
  "library-style-semi-real": { en: "Semi realistic", zh: "半写实", ja: "半写実" },
  "library-style-storybook": { en: "Storybook", zh: "绘本感", ja: "絵本風" },
  "library-style-watercolor": { en: "Watercolor", zh: "水彩", ja: "水彩" },
  "library-style-concept-art": { en: "Concept art", zh: "概念设计", ja: "コンセプトアート" },
  "library-style-isometric-game": { en: "Isometric game asset", zh: "等距游戏素材", ja: "アイソメゲーム素材" },
  "library-quality-clean": { en: "Clean composition", zh: "清晰构图", ja: "明瞭な構図" },
  "library-quality-polished": { en: "Polished illustration", zh: "精修插画", ja: "磨かれたイラスト" },
  "library-quality-readable": { en: "Readable design", zh: "可读设计", ja: "読みやすいデザイン" },
  "library-negative-general": { en: "General negative", zh: "通用负向", ja: "汎用ネガティブ" },
  "library-negative-composition": { en: "Composition negative", zh: "构图负向", ja: "構図ネガティブ" },
  "library-negative-style-noise": { en: "Style noise negative", zh: "风格噪点负向", ja: "スタイルノイズ対策" },
  "library-parameters-sdxl-default": { en: "SDXL default", zh: "SDXL 默认", ja: "SDXL 標準" },
  "library-parameters-landscape": { en: "Landscape", zh: "横图参数", ja: "横長設定" },
  "library-parameters-sheet": { en: "Reference sheet", zh: "参考表参数", ja: "参照シート設定" }
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

function fragmentText(fragment: PromptFragment, locale: Locale) {
  return fragmentNames[fragment.id]?.[locale] ?? (locale === "en" ? fragment.label : `${categoryText(fragment.category, locale)}: ${fragment.label}`);
}

function buildPositive(items: CartItem[]) {
  return positiveOrder
    .flatMap((category) => items.filter((item) => item.category === category))
    .map(textOf)
    .filter(Boolean)
    .join(", ");
}

function buildNegative(items: CartItem[]) {
  return items.filter((item) => item.category === "negative").map(textOf).filter(Boolean).join(", ");
}

function buildParameters(items: CartItem[]) {
  return items.filter((item) => item.category === "parameters").map(textOf).filter(Boolean).join("\n");
}

function findConflicts(items: CartItem[], locale: Locale): ConflictHit[] {
  const prompt = buildPositive(items).toLowerCase();
  return conflictPairs
    .filter(([a, b]) => prompt.includes(a) && prompt.includes(b))
    .map(([a, b]) => ({ terms: [a, b], message: ui[locale].conflict(a, b) }));
}

function buildWarnings(items: CartItem[], conflictHits: ConflictHit[], locale: Locale) {
  const messages: { type: "danger" | "warning" | "ok"; text: string }[] = [];
  for (const category of requiredCategories) {
    if (!items.some((item) => item.category === category)) {
      messages.push({ type: "warning", text: ui[locale].missing(categoryText(category, locale)) });
    }
  }
  for (const category of singleFocus) {
    if (items.filter((item) => item.category === category).length > 1) {
      messages.push({ type: "warning", text: ui[locale].multiple(categoryText(category, locale)) });
    }
  }
  for (const hit of conflictHits) messages.push({ type: "danger", text: hit.message });
  if (!messages.length) messages.push({ type: "ok", text: ui[locale].ok });
  return messages;
}

function highlight(text: string, hits: ConflictHit[]) {
  if (!text || !hits.length) return text;
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
  const pageCopy = builderCopy[locale];
  const t = ui[locale];
  const visibleGroups = libraryGroups.filter((group) => group.fragments.length > 0);
  const [items, setItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<PromptCategory>("pose");
  const [activeFragmentId, setActiveFragmentId] = useState<string>("all");

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

  const activeGroup = visibleGroups.find((group) => group.category === activeCategory) ?? visibleGroups[0];
  const visibleFragments = activeFragmentId === "all" ? activeGroup.fragments : activeGroup.fragments.filter((fragment) => fragment.id === activeFragmentId);
  const selectedByCategory = items.filter((item) => item.category === activeCategory).length;
  const positive = useMemo(() => buildPositive(items), [items]);
  const negative = useMemo(() => buildNegative(items), [items]);
  const parameters = useMemo(() => buildParameters(items), [items]);
  const conflictHits = useMemo(() => findConflicts(items, locale), [items, locale]);
  const warnings = useMemo(() => buildWarnings(items, conflictHits, locale), [items, conflictHits, locale]);

  const changeCategory = (category: PromptCategory) => {
    setActiveCategory(category);
    setActiveFragmentId("all");
  };

  const toggleFragment = (fragment: PromptFragment) => {
    const exists = items.some((item) => item.id === fragment.id);
    const next = exists ? items.filter((item) => item.id !== fragment.id) : [...items, fragment];
    setItems(next);
    writeCart(next);
  };

  const clearCart = () => {
    setItems([]);
    writeCart([]);
  };

  const copyToClipboard = (text: string) => navigator.clipboard?.writeText(text);

  return (
    <section className="builder-workspace builder-workspace--visual">
      <div className="section-heading">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{pageCopy.title}</h1>
        <p className="lead">{pageCopy.description}</p>
      </div>

      <div className="visual-builder">
        <nav className="builder-category-tabs" aria-label="Prompt categories">
          {visibleGroups.map((group) => (
            <button
              className={group.category === activeCategory ? "is-active" : ""}
              type="button"
              key={group.category}
              onClick={() => changeCategory(group.category)}
            >
              <span>{categoryText(group.category, locale)}</span>
              <small>{group.fragments.length}</small>
            </button>
          ))}
        </nav>

        <nav className="builder-sub-tabs" aria-label="Prompt subcategories">
          <button className={activeFragmentId === "all" ? "is-active" : ""} type="button" onClick={() => setActiveFragmentId("all")}>
            {t.all}
          </button>
          {activeGroup.fragments.map((fragment) => (
            <button
              className={fragment.id === activeFragmentId ? "is-active" : ""}
              type="button"
              key={fragment.id}
              onClick={() => setActiveFragmentId(fragment.id)}
            >
              {fragmentText(fragment, locale)}
            </button>
          ))}
        </nav>

        <section className="builder-sample-stage">
          <div className="builder-stage-head">
            <div>
              <p className="eyebrow">{categoryText(activeCategory, locale)}</p>
              <h2>{categoryText(activeCategory, locale)}</h2>
              <p className="muted">{groupDescriptions[activeCategory]?.[locale] ?? activeGroup.description}</p>
            </div>
            <span>{selectedByCategory} {t.selected}</span>
          </div>

          <div className="builder-sample-grid">
            {visibleFragments.map((fragment, index) => {
              const selected = items.some((item) => item.id === fragment.id);
              const image = galleryImages[(index + visibleGroups.findIndex((group) => group.category === activeCategory) * 2) % galleryImages.length];
              return (
                <button
                  className={selected ? "sample-choice is-selected" : "sample-choice"}
                  type="button"
                  key={fragment.id}
                  onClick={() => toggleFragment(fragment)}
                >
                  <img src={image} alt="" loading="lazy" />
                  <span>{fragmentText(fragment, locale)}</span>
                  <small>{selected ? t.remove : t.add}</small>
                </button>
              );
            })}
          </div>
        </section>

        <section className="prompt-frame" aria-live="polite">
          <div className="prompt-frame-head">
            <div>
              <p className="eyebrow">{t.frameNote}</p>
              <h2>{t.positive}</h2>
            </div>
            <div className="prompt-frame-actions">
              <button type="button" onClick={clearCart}>{t.clear}</button>
              <button type="button" onClick={() => copyToClipboard(positive)}>{t.copy}</button>
              <button type="button" onClick={() => copyToClipboard(`Positive Prompt:\n${positive}\n\nNegative Prompt:\n${negative}\n\nParameters:\n${parameters}`)}>{t.copyAll}</button>
            </div>
          </div>

          <div className="prompt-frame-grid">
            <div className="prompt-window">
              <h3>{t.positive}</h3>
              <div className="prompt-preview">{highlight(positive || t.empty, conflictHits)}</div>
            </div>
            <div className="prompt-window">
              <h3>{t.negative}</h3>
              <textarea rows={3} value={negative} readOnly />
            </div>
            <div className="prompt-window">
              <h3>{t.parameters}</h3>
              <textarea rows={3} value={parameters} readOnly />
            </div>
            <aside className="prompt-window prompt-window--checks">
              <h3>{t.checks}</h3>
              <ul>{warnings.map((warning) => <li className={`check-${warning.type}`} key={warning.text}>{warning.text}</li>)}</ul>
            </aside>
          </div>
        </section>
      </div>
    </section>
  );
}
