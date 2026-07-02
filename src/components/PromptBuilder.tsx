import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/data/i18n";
import { builderCopy } from "@/data/i18n";
import { libraryGroups, modelRecommendations } from "@/data/promptLibrary";
import type { PromptFragment } from "@/lib/promptCart";

type CartItem = PromptFragment & { editedText?: string };
type ConflictHit = { terms: [string, string]; message: string };

const cartKey = "prompt-atlas-cart";
const order = ["subject", "pose", "action", "clothing", "scene", "camera", "lighting", "mood", "style", "quality"];
const allGroups = [...order, "negative", "parameters"];
const singleFocus = new Set(["pose", "camera", "lighting", "style", "mood"]);
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
  ["minimalist background", "crowded marketplace"],
  ["realistic photo", "watercolor illustration"],
  ["front view", "back view"],
  ["profile view", "front view"],
  ["calm mood", "intense action"],
  ["indoor scene", "outdoor landscape"]
];

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

function buildPositive(items: CartItem[]) {
  return order
    .flatMap((category) => items.filter((item) => item.category === category))
    .map(textOf)
    .filter(Boolean)
    .join(", ");
}

function findConflictHits(items: CartItem[]): ConflictHit[] {
  const positive = buildPositive(items).toLowerCase();
  return conflictPairs
    .filter(([a, b]) => positive.includes(a) && positive.includes(b))
    .map(([a, b]) => ({
      terms: [a, b],
      message: `${a} 和 ${b} 可能互相打架，但仍然允许复制。`
    }));
}

function buildWarnings(items: CartItem[], conflictHits: ConflictHit[]) {
  const warnings: { type: "danger" | "warning" | "ok"; text: string }[] = [];
  for (const category of singleFocus) {
    if (items.filter((item) => item.category === category).length > 1) {
      warnings.push({ type: "warning", text: `${category} 选择了多个片段，建议保留一个主方向。` });
    }
  }
  for (const hit of conflictHits) warnings.push({ type: "danger", text: hit.message });
  if (buildPositive(items).length > 900) warnings.push({ type: "warning", text: "提示词已经偏长，可以删掉弱片段。" });
  if (!warnings.length) warnings.push({ type: "ok", text: "目前没有明显冲突。" });
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
  const [activeCategory, setActiveCategory] = useState<string>("pose");
  const copyText = builderCopy[locale];

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
  const conflictHits = useMemo(() => findConflictHits(items), [items]);
  const warnings = useMemo(() => buildWarnings(items, conflictHits), [items, conflictHits]);
  const activeGroup = libraryGroups.find((group) => group.category === activeCategory) ?? libraryGroups[1];

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

  const copy = (text: string) => navigator.clipboard?.writeText(text);

  return (
    <section className="builder-workspace">
      <div className="section-heading">
        <p className="eyebrow">AI Image Prompt Generator</p>
        <h1>{copyText.heading}</h1>
        <p className="lead">{copyText.lead}</p>
      </div>

      <div className="builder-generator">
        <aside className="library-sidebar">
          {libraryGroups.map((group) => (
            <button
              className={group.category === activeCategory ? "is-active" : ""}
              type="button"
              key={group.category}
              onClick={() => setActiveCategory(group.category)}
            >
              <span>{group.title}</span>
              <small>{group.fragments.length} items</small>
            </button>
          ))}
        </aside>

        <section className="library-panel">
          <div className="section-heading">
            <p className="eyebrow">{activeGroup.category}</p>
            <h2>{activeGroup.title}</h2>
            <p className="muted">{activeGroup.description}</p>
            <p className="sample-brief">Comfy 出图任务：{activeGroup.sampleBrief}</p>
          </div>
          <div className="library-fragment-grid">
            {activeGroup.fragments.map((fragment) => {
              const selected = items.some((item) => item.id === fragment.id);
              return (
                <article className={selected ? "library-fragment is-selected" : "library-fragment"} key={fragment.id}>
                  <div>
                    <strong>{fragment.label}</strong>
                    <p>{fragment.text}</p>
                  </div>
                  <button type="button" onClick={() => addFragment(fragment)}>
                    {selected ? "Remove" : "Add"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="builder-output">
          <section className="warning-panel">
            <div className="prompt-output-head">
              <h2>Prompt Checks</h2>
              <button type="button" onClick={clearCart}>Clear</button>
            </div>
            <ul>{warnings.map((warning) => <li className={`check-${warning.type}`} key={warning.text}>{warning.text}</li>)}</ul>
          </section>
          <section className="prompt-output">
            <h2>Positive Prompt</h2>
            <div className="prompt-preview">{highlightConflicts(positive || "Select fragments to generate a prompt.", conflictHits)}</div>
            <textarea rows={7} value={positive} readOnly />
            <button className="button secondary" type="button" onClick={() => copy(positive)}>Copy Positive</button>
          </section>
          <section className="prompt-output">
            <h2>Negative Prompt</h2>
            <textarea rows={4} value={negative} readOnly />
            <button className="button secondary" type="button" onClick={() => copy(negative)}>Copy Negative</button>
          </section>
          <section className="prompt-output">
            <h2>Parameters</h2>
            <textarea rows={5} value={parameters} readOnly />
            <button className="button secondary" type="button" onClick={() => copy(parameters)}>Copy Parameters</button>
            <button className="button secondary" type="button" onClick={() => copy(`Positive Prompt:\n${positive}\n\nNegative Prompt:\n${negative}\n\nParameters:\n${parameters}`)}>Copy All</button>
          </section>
        </aside>
      </div>

      <section className="content-section">
        <div className="section-heading">
              <h2>Model Recommendation Slots</h2>
          <p className="muted">这些先作为模型统合推荐页的入口。你把样图给我后，我会替换占位图并补真实说明。</p>
        </div>
        <div className="model-grid">
          {modelRecommendations.map((model) => (
            <article className="model-card" key={model.id}>
              <div className="model-thumb" />
              <span className="category-badge">{model.type}</span>
              <h3>{model.name}</h3>
              <p>{model.bestFor.join(" / ")}</p>
              <small>{model.promptStyle}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="builder-groups">
        <h2>Selected Fragment Basket</h2>
        {allGroups.map((category) => {
          const group = items.filter((item) => item.category === category);
          if (!group.length) return null;
          return (
            <section className="builder-group" id={`builder-${category}`} key={category}>
              <h3>{category}</h3>
              {group.map((item) => (
                <article className="builder-fragment" key={item.id}>
                  <strong>{item.label}</strong>
                  <span>{item.sourceRecipeTitle || "Manual fragment"}</span>
                  <textarea rows={3} value={textOf(item)} onChange={(event) => updateItem(item.id, event.currentTarget.value)} />
                  <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
                </article>
              ))}
            </section>
          );
        })}
      </section>
    </section>
  );
}
