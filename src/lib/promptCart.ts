export type PromptCategory =
  | "subject"
  | "pose"
  | "action"
  | "clothing"
  | "scene"
  | "camera"
  | "lighting"
  | "mood"
  | "style"
  | "quality"
  | "negative"
  | "parameters";

export type PromptFragment = {
  id: string;
  category: PromptCategory;
  label: string;
  text: string;
  image?: string;
  labelI18n?: Partial<Record<"en" | "zh" | "ja", string>>;
  sourceRecipeSlug?: string;
  sourceRecipeTitle?: string;
  weight?: number;
  tags?: string[];
};

export type PromptRecipe = {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  image: string;
  shortDescription: string;
  description: string;
  positivePrompt: string;
  negativePrompt: string;
  modelNotes: string;
  parameters: string;
  breakdown: PromptFragment[];
  variations: PromptFragment[];
  commonMistakes: string[];
  suitableUses: string[];
  relatedRecipes: string[];
};
