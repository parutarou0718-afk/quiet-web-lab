import type { PromptFragment } from "@/lib/promptCart";

const positiveOrder = ["subject", "pose", "action", "clothing", "scene", "camera", "lighting", "mood", "style", "quality"];

export function composePositivePrompt(fragments: PromptFragment[]): string {
  return positiveOrder
    .flatMap((category) => fragments.filter((fragment) => fragment.category === category))
    .map((fragment) => fragment.text.trim())
    .filter(Boolean)
    .join(", ");
}

export function composeNegativePrompt(fragments: PromptFragment[]): string {
  return fragments
    .filter((fragment) => fragment.category === "negative")
    .map((fragment) => fragment.text.trim())
    .filter(Boolean)
    .join(", ");
}

export function composeParameters(fragments: PromptFragment[]): string {
  return fragments
    .filter((fragment) => fragment.category === "parameters")
    .map((fragment) => fragment.text.trim())
    .filter(Boolean)
    .join("\n");
}
