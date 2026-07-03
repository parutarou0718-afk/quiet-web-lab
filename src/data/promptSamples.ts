import customSamples from "@/data/promptSamples/custom.json";
import type { Locale } from "@/data/i18n";
import type { PromptCategory, PromptFragment } from "@/lib/promptCart";

export type PromptSampleInput = {
  id: string;
  category: PromptCategory;
  label: Partial<Record<Locale, string>>;
  prompt: string;
  image?: string;
  negative?: string;
  parameters?: string;
};

export const customPromptSamples = (customSamples as PromptSampleInput[])
  .filter((sample) => sample.id && sample.category && sample.prompt)
  .map<PromptFragment>((sample) => ({
    id: `custom-${sample.id}`,
    category: sample.category,
    label: sample.label.en || sample.label.zh || sample.label.ja || sample.id,
    labelI18n: sample.label,
    text: sample.prompt,
    image: sample.image,
    sourceRecipeTitle: "Custom Prompt Sample",
    tags: ["custom", sample.category]
  }));
