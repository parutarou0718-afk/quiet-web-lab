export const categories = [
  { slug: "pose", label: "Pose", description: "Body position, gesture, balance, and readable character silhouettes." },
  { slug: "action", label: "Action", description: "Clear movement verbs, activity cues, and scene momentum." },
  { slug: "clothing", label: "Clothing", description: "Outfits, materials, accessories, layers, and design notes." },
  { slug: "scene", label: "Scene", description: "Places, props, environmental context, and background density." },
  { slug: "camera", label: "Camera", description: "Framing, lens feel, angle, depth of field, and composition." },
  { slug: "lighting", label: "Lighting", description: "Light direction, softness, color, contrast, and time of day." },
  { slug: "mood", label: "Mood", description: "Emotional tone, pacing, atmosphere, and viewer impression." },
  { slug: "style", label: "Style", description: "Medium, rendering style, finish, and art direction." },
  { slug: "lora", label: "LoRA", description: "Dataset, captions, training settings, testing, and safe model notes." }
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
