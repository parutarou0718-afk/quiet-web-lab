export type ModelId = "meinahentai" | "darksushi" | "majicmixrealistic" | "japaneseStyleRealistic-v20";

export type ComparisonPromptId = "b01" | "b02" | "b03" | "b04" | "b05";

export type ModelInfo = {
  id: ModelId;
  name: string;
  label: string;
  tone: string;
  bestFor: string;
};

export type ComparisonPrompt = {
  id: ComparisonPromptId;
  title: string;
  description: string;
  seedPick: string;
};

export const comparisonModels: ModelInfo[] = [
  {
    id: "meinahentai",
    name: "meinamix_v5Final",
    label: "Anime baseline",
    tone: "Clean anime color, readable faces, strong character-card output.",
    bestFor: "Prompt basket samples, pose cards, outfit examples, anime-first galleries."
  },
  {
    id: "darksushi",
    name: "DarkSushiMix-2.25D",
    label: "2.5D anime",
    tone: "Sharper contrast and a slightly richer illustrated look than the baseline.",
    bestFor: "Stylized portraits, dramatic lighting, anime images with a little more depth."
  },
  {
    id: "majicmixrealistic",
    name: "majicmixRealistic_v7",
    label: "Realistic",
    tone: "Soft photo-real direction with natural faces and calmer colors.",
    bestFor: "Portrait tests, camera language, realism-side comparisons."
  },
  {
    id: "japaneseStyleRealistic-v20",
    name: "japaneseStyleRealistic_v20",
    label: "Japanese realistic",
    tone: "Polished realistic portrait look with gentle lighting and fashion detail.",
    bestFor: "Soft portrait samples, realistic clothing, Japanese street and indoor scenes."
  }
];

export const comparisonPrompts: ComparisonPrompt[] = [
  {
    id: "b01",
    title: "Classroom Character",
    description: "One person in a sunlit classroom. Useful for testing face style, clothing, hands, and full-body framing.",
    seedPick: "#12"
  },
  {
    id: "b02",
    title: "Eastern Culture Outfit",
    description: "Hanfu-inspired garden scene. Useful for comparing fabric, ornament detail, and cultural atmosphere.",
    seedPick: "#16"
  },
  {
    id: "b03",
    title: "Warm Study Room",
    description: "No-person interior. Useful for scene composition, window light, shelves, furniture, and object coherence.",
    seedPick: "#20"
  },
  {
    id: "b04",
    title: "Rainy Lantern Street",
    description: "Night street scene. Useful for lighting, reflections, depth, signage handling, and cinematic mood.",
    seedPick: "#12"
  },
  {
    id: "b05",
    title: "Window Light Portrait",
    description: "Close portrait. Useful for comparing eye detail, skin rendering, hair, and overall model personality.",
    seedPick: "#14"
  }
];

export function comparisonImage(promptId: ComparisonPromptId, modelId: ModelId): string {
  return `/images/model-comparison/${promptId}-${modelId}.png`;
}
