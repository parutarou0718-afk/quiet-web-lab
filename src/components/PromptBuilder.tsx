import { useEffect, useMemo, useState } from "react";
import type { PromptFragment } from "@/lib/promptCart";

type CartItem = PromptFragment & { editedText?: string };

const cartKey = "prompt-atlas-cart";
const order = ["subject", "pose", "action", "clothing", "scene", "camera", "lighting", "mood", "style", "quality"];
const allGroups = [...order, "negative", "parameters"];
const singleFocus = new Set(["pose", "camera", "lighting", "style", "mood"]);
const conflicts = [
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

function buildWarnings(items: CartItem[]) {
  const warnings: string[] = [];
  const positive = buildPositive(items).toLowerCase();
  for (const category of singleFocus) {
    if (items.filter((item) => item.category === category).length > 1) {
      warnings.push(`Multiple ${category} fragments selected. Consider keeping only one main ${category}.`);
    }
  }
  for (const [a, b] of conflicts) {
    if (positive.includes(a) && positive.includes(b)) {
      warnings.push(`Conflict detected: ${a} and ${b} may fight each other. Choose one direction.`);
    }
  }
  if (positive.length > 900) warnings.push("Your prompt is getting long. Consider removing weaker fragments.");
  if (items.filter((item) => item.category === "quality").length > 8) warnings.push("Too many quality tags may reduce prompt clarity.");
  return warnings.length ? warnings : ["No major conflicts detected."];
}

export default function PromptBuilder() {
  const [items, setItems] = useState<CartItem[]>([]);

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
  const warnings = useMemo(() => buildWarnings(items), [items]);

  const updateItem = (id: string, editedText: string) => {
    const next = items.map((item) => (item.id === id ? { ...item, editedText } : item));
    setItems(next);
    writeCart(next);
  };
  const resetItem = (id: string) => {
    const next = items.map((item) => (item.id === id ? { ...item, editedText: item.text } : item));
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
    <section className="builder-shell">
      <div className="builder-left">
        <div className="section-heading">
          <p className="eyebrow">Prompt Recipe Builder</p>
          <h1>Assemble a clean prompt from reusable fragments.</h1>
          <p className="lead">
            The builder reads your Prompt Cart, groups fragments by category, checks common conflicts, and generates positive prompt, negative prompt, and parameters.
          </p>
        </div>
        <div className="builder-groups">
          {allGroups.map((category) => {
            const group = items.filter((item) => item.category === category);
            return (
              <section className="builder-group" id={`builder-${category}`} key={category}>
                <h2>{category}</h2>
                {group.length ? (
                  group.map((item) => (
                    <article className="builder-fragment" key={item.id}>
                      <strong>{item.label}</strong>
                      <span>{item.sourceRecipeTitle || "Manual fragment"}</span>
                      <textarea rows={3} value={textOf(item)} onChange={(event) => updateItem(item.id, event.currentTarget.value)} />
                      <div>
                        <button type="button" onClick={() => resetItem(item.id)}>Reset</button>
                        <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="muted">No {category} fragments yet.</p>
                )}
              </section>
            );
          })}
        </div>
      </div>
      <aside className="builder-output">
        <section className="warning-panel">
          <h2>Prompt Checks</h2>
          <ul>{warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>
        </section>
        <section className="prompt-output">
          <h2>Positive Prompt</h2>
          <textarea id="positivePrompt" rows={8} value={positive} readOnly />
          <button className="button secondary" type="button" onClick={() => copy(positive)}>Copy Positive Prompt</button>
        </section>
        <section className="prompt-output">
          <h2>Negative Prompt</h2>
          <textarea id="negativePrompt" rows={5} value={negative} readOnly />
          <button className="button secondary" type="button" onClick={() => copy(negative)}>Copy Negative Prompt</button>
        </section>
        <section className="prompt-output">
          <h2>Parameters</h2>
          <textarea id="parametersPrompt" rows={5} value={parameters} readOnly />
          <button className="button secondary" type="button" onClick={() => copy(parameters)}>Copy Parameters</button>
          <button className="button secondary" type="button" onClick={() => copy(`Positive Prompt:\n${positive}\n\nNegative Prompt:\n${negative}\n\nParameters:\n${parameters}`)}>Copy All</button>
        </section>
      </aside>
    </section>
  );
}
