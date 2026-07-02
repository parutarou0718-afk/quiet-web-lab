import type { PromptFragment } from "@/lib/promptCart";
import { composeNegativePrompt, composeParameters, composePositivePrompt } from "@/lib/promptCompose";

const singleFocusCategories = new Set(["pose", "camera", "lighting", "style", "mood"]);
const conflictPairs = [
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

const repeatedNegativeTerms = ["bad hands", "low quality", "blurry", "extra fingers", "deformed"];
const parameterKeys = ["aspect ratio", "sampler", "seed", "cfg scale", "steps"];

export type PromptWarning = {
  level: "error" | "warning" | "note";
  message: string;
  category?: string;
};

export function checkPromptConflicts(fragments: PromptFragment[]): PromptWarning[] {
  const warnings: PromptWarning[] = [];
  const positive = composePositivePrompt(fragments).toLowerCase();
  const negative = composeNegativePrompt(fragments).toLowerCase();
  const parameters = composeParameters(fragments).toLowerCase();

  for (const category of singleFocusCategories) {
    const count = fragments.filter((fragment) => fragment.category === category).length;
    if (count > 1) {
      warnings.push({
        level: "warning",
        category,
        message: `Multiple ${category} fragments selected. Consider keeping only one main ${category}.`
      });
    }
  }

  const seenTexts = new Map<string, number>();
  for (const fragment of fragments) {
    const normalized = fragment.text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const shortKey = normalized.split(" ").slice(0, 4).join(" ");
    seenTexts.set(shortKey, (seenTexts.get(shortKey) ?? 0) + 1);
  }
  for (const [text, count] of seenTexts) {
    if (count > 1 && text.length > 8) {
      warnings.push({ level: "note", message: `Possible duplicate prompt terms detected: ${text}.` });
    }
  }

  for (const [a, b] of conflictPairs) {
    if (positive.includes(a) && positive.includes(b)) {
      warnings.push({ level: "error", message: `Conflict detected: ${a} and ${b} may fight each other. Choose one direction.` });
    }
  }

  if (positive.length > 900) {
    warnings.push({ level: "warning", message: "Your prompt is getting long. Consider removing weaker fragments." });
  }

  if (fragments.filter((fragment) => fragment.category === "quality").length > 8) {
    warnings.push({ level: "note", category: "quality", message: "Too many quality tags may reduce prompt clarity." });
  }

  for (const term of repeatedNegativeTerms) {
    if ((negative.match(new RegExp(term, "g")) ?? []).length > 1) {
      warnings.push({ level: "note", category: "negative", message: `Duplicate negative prompt term detected: ${term}.` });
    }
  }

  for (const key of parameterKeys) {
    if ((parameters.match(new RegExp(key, "g")) ?? []).length > 1) {
      warnings.push({ level: "warning", category: "parameters", message: `Multiple ${key} values detected in parameters.` });
    }
  }

  return warnings;
}
