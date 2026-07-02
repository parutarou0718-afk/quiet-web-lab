import type { PromptCategory, PromptFragment, PromptRecipe } from "@/lib/promptCart";

type RecipeSeed = {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  subject: string;
  pose: string;
  action: string;
  clothing: string;
  scene: string;
  camera: string;
  lighting: string;
  mood: string;
  style: string;
  shortDescription: string;
};

const qualityText = "clean composition, coherent anatomy, detailed materials, balanced colors, polished illustration";
const negativeText = "low quality, blurry, extra fingers, deformed hands, unreadable details, harsh artifacts, watermark, text overlay";
const parametersText = "aspect ratio: 4:5\nsteps: 28\nCFG scale: 6.5\nsampler: DPM++ 2M";

const seeds: RecipeSeed[] = [
  {
    title: "Dynamic Samurai Training Pose",
    slug: "dynamic-samurai-training-pose",
    category: "pose",
    tags: ["pose", "training", "character"],
    subject: "young sword student practicing in a quiet dojo, original all-ages character",
    pose: "dynamic training stance, one foot forward, balanced sword practice posture",
    action: "holding a wooden practice sword with controlled motion",
    clothing: "simple dark keikogi, hakama pants, tied waist belt",
    scene: "wooden dojo floor, tidy practice space, paper screen background",
    camera: "three-quarter full body view, eye level camera, readable silhouette",
    lighting: "soft window light from the left, gentle interior shadows",
    mood: "focused calm mood, disciplined and respectful",
    style: "anime-inspired clean illustration, crisp linework",
    shortDescription: "A clear character-pose recipe for practicing action stance prompts without unsafe or graphic content."
  },
  {
    title: "Traveler in a Rainy Old Street",
    slug: "traveler-rainy-old-street",
    category: "scene",
    tags: ["rain", "street", "travel"],
    subject: "friendly traveler with a small shoulder bag, original character",
    pose: "standing under an umbrella, relaxed posture",
    action: "looking down the street after a gentle rain",
    clothing: "waterproof coat, simple scarf, practical boots",
    scene: "old stone street, lanterns, puddles, cozy shop windows",
    camera: "medium wide shot, leading lines through the street",
    lighting: "soft reflected lantern light, overcast rainy evening",
    mood: "quiet curiosity, peaceful travel journal feeling",
    style: "cinematic storybook illustration, natural colors",
    shortDescription: "A safe rainy-street scene focused on atmosphere, camera framing, and environmental detail."
  },
  {
    title: "Cozy Study Room Character Scene",
    slug: "cozy-study-room-character-scene",
    category: "lighting",
    tags: ["interior", "study", "cozy"],
    subject: "student reading beside a desk, original all-ages character",
    pose: "sitting upright in a comfortable chair",
    action: "turning a page in a notebook",
    clothing: "soft cardigan, casual shirt, simple trousers",
    scene: "small study room, bookshelves, desk lamp, tidy notes",
    camera: "medium shot from doorway, slight high angle",
    lighting: "warm desk lamp, soft window fill light",
    mood: "cozy, thoughtful, gentle concentration",
    style: "warm digital painting with clean readable forms",
    shortDescription: "A lighting-first indoor recipe for a calm study scene with practical prompt fragments."
  },
  {
    title: "Fantasy Herbalist Outfit Design",
    slug: "fantasy-herbalist-outfit-design",
    category: "clothing",
    tags: ["outfit", "fantasy", "design"],
    subject: "kind fantasy herbalist, original character design",
    pose: "front view standing pose, arms relaxed",
    action: "holding a small bundle of labeled herbs",
    clothing: "layered linen tunic, herb satchel, apron pockets, simple cloak",
    scene: "plain workshop backdrop with drying plants",
    camera: "full body character design view, neutral angle",
    lighting: "soft natural window lighting",
    mood: "helpful, grounded, gentle craft mood",
    style: "character concept art, clear material notes",
    shortDescription: "An outfit-focused recipe that teaches materials, accessories, and readable character design."
  },
  {
    title: "Detective Walking Through Neon Alley",
    slug: "detective-neon-alley",
    category: "camera",
    tags: ["detective", "neon", "cinematic"],
    subject: "thoughtful detective in a fictional city, original character",
    pose: "walking forward with steady posture",
    action: "checking a small notebook while moving",
    clothing: "long coat, simple hat, messenger bag",
    scene: "rainy neon alley, signs reflected in pavement, no real brands",
    camera: "low angle medium shot, shallow depth of field",
    lighting: "blue and pink neon reflections, soft rain haze",
    mood: "mysterious but non-violent investigation mood",
    style: "cinematic digital illustration, clean noir color contrast",
    shortDescription: "A camera and lighting recipe for dramatic city scenes without crime-scene imagery."
  },
  {
    title: "Traditional Tea House Interior",
    slug: "traditional-tea-house-interior",
    category: "scene",
    tags: ["interior", "tea", "architecture"],
    subject: "quiet tea house interior with no people",
    pose: "balanced room layout with central table",
    action: "steam rising gently from a teapot",
    clothing: "woven cushions, ceramic cups, folded cloth details",
    scene: "wood beams, tatami-like mats, garden view, clean shelves",
    camera: "wide interior shot, straight verticals",
    lighting: "morning sunlight through paper screens",
    mood: "serene, welcoming, uncluttered",
    style: "architectural concept art, refined texture study",
    shortDescription: "A people-free environment recipe for interiors, props, materials, and calm composition."
  },
  {
    title: "Adventurer Backpack Gear Layout",
    slug: "adventurer-backpack-gear-layout",
    category: "style",
    tags: ["props", "gear", "layout"],
    subject: "flat lay of a fictional adventurer backpack and safe travel gear",
    pose: "organized grid layout from above",
    action: "items arranged for visual inspection",
    clothing: "folded cloak, gloves, soft scarf, sturdy belt pouch",
    scene: "wood table with map, compass, sketchbook, water flask",
    camera: "top-down orthographic view, full object visibility",
    lighting: "bright diffuse studio light",
    mood: "prepared, practical, inviting",
    style: "clean inventory illustration, readable item design",
    shortDescription: "A prop-layout recipe that helps describe objects, spacing, and camera clarity."
  },
  {
    title: "Calm Portrait with Soft Window Light",
    slug: "calm-portrait-soft-window-light",
    category: "lighting",
    tags: ["portrait", "soft light", "mood"],
    subject: "original character portrait with friendly expression",
    pose: "front view portrait, relaxed shoulders",
    action: "gazing slightly past the camera",
    clothing: "simple sweater, small pendant, neat hairstyle",
    scene: "minimal indoor background with a curtain edge",
    camera: "close-up portrait, 85mm lens feel",
    lighting: "soft natural window lighting, gentle catchlights",
    mood: "calm mood, approachable and reflective",
    style: "semi-realistic illustration, subtle skin shading",
    shortDescription: "A portrait recipe for soft lighting, camera notes, and restrained quality tags."
  },
  {
    title: "Marketplace Crowd Scene",
    slug: "marketplace-crowd-scene",
    category: "scene",
    tags: ["crowd", "market", "environment"],
    subject: "busy fantasy marketplace with original background characters",
    pose: "many small readable silhouettes, no single celebrity likeness",
    action: "vendors arranging fruit, shoppers walking, banners moving",
    clothing: "varied modest travel clothing, aprons, cloaks, hats",
    scene: "crowded marketplace, stalls, baskets, fabric awnings",
    camera: "wide shot from slightly elevated angle",
    lighting: "bright daytime, soft shadows under awnings",
    mood: "lively, friendly, colorful community feeling",
    style: "detailed environment illustration, organized crowd composition",
    shortDescription: "A crowd-safe scene recipe that keeps characters generic and the composition readable."
  },
  {
    title: "Character Turnaround Sheet",
    slug: "character-turnaround-sheet",
    category: "character-design",
    tags: ["turnaround", "reference", "design"],
    subject: "original explorer character turnaround sheet",
    pose: "front view, side view, back view, neutral standing pose",
    action: "showing consistent outfit details across views",
    clothing: "short jacket, utility belt, boots, small backpack",
    scene: "plain light background with subtle floor line",
    camera: "orthographic character reference view",
    lighting: "even studio lighting, no dramatic shadows",
    mood: "clear, practical, production-ready",
    style: "model sheet illustration, clean linework and flat color",
    shortDescription: "A reference-sheet recipe for consistent design, neutral posing, and useful production notes."
  },
  {
    title: "Isometric Fantasy Workshop",
    slug: "isometric-fantasy-workshop",
    category: "style",
    tags: ["isometric", "workshop", "props"],
    subject: "small fantasy craft workshop interior",
    pose: "isometric room view with open wall",
    action: "tools and materials placed on benches",
    clothing: "folded work apron, gloves, fabric rolls",
    scene: "wooden shelves, jars, workbench, tiny safe tools",
    camera: "isometric camera, clean cutaway composition",
    lighting: "warm overhead lanterns plus window light",
    mood: "inventive, cozy, organized",
    style: "stylized isometric game asset illustration",
    shortDescription: "An isometric environment recipe for game-like rooms, prop grouping, and readable scale."
  },
  {
    title: "Cinematic Forest Encounter",
    slug: "cinematic-forest-encounter",
    category: "mood",
    tags: ["forest", "cinematic", "encounter"],
    subject: "young adventurer noticing a glowing forest marker, original character",
    pose: "kneeling near a mossy stone, cautious but calm",
    action: "reaching toward a harmless glowing symbol",
    clothing: "travel cloak, simple tunic, small satchel",
    scene: "ancient forest path, moss, ferns, shafts of light",
    camera: "wide shot with character in foreground and path behind",
    lighting: "dappled sunlight, soft green ambient light",
    mood: "wonder, discovery, gentle suspense",
    style: "cinematic fantasy illustration, painterly natural detail",
    shortDescription: "A mood-driven forest scene that emphasizes discovery over danger."
  }
];

function fragment(seed: RecipeSeed, category: PromptCategory, label: string, text: string): PromptFragment {
  return {
    id: `${seed.slug}-${category}`,
    category,
    label,
    text,
    sourceRecipeSlug: seed.slug,
    sourceRecipeTitle: seed.title,
    tags: [category, ...seed.tags.slice(0, 2)]
  };
}

function buildRecipe(seed: RecipeSeed, index: number): PromptRecipe {
  const breakdown = [
    fragment(seed, "subject", "Subject", seed.subject),
    fragment(seed, "pose", "Pose", seed.pose),
    fragment(seed, "action", "Action", seed.action),
    fragment(seed, "clothing", "Clothing and materials", seed.clothing),
    fragment(seed, "scene", "Scene", seed.scene),
    fragment(seed, "camera", "Camera angle", seed.camera),
    fragment(seed, "lighting", "Lighting", seed.lighting),
    fragment(seed, "mood", "Mood", seed.mood),
    fragment(seed, "style", "Style direction", seed.style),
    fragment(seed, "quality", "Quality tags", qualityText),
    fragment(seed, "negative", "Negative prompt", negativeText),
    fragment(seed, "parameters", "Starter parameters", parametersText)
  ];

  const positivePrompt = breakdown
    .filter((item) => !["negative", "parameters"].includes(item.category))
    .map((item) => item.text)
    .join(", ");

  return {
    ...seed,
    image: `/images/recipes/example-${String(index + 1).padStart(2, "0")}.webp`,
    description: `${seed.shortDescription} Use this recipe as a modular prompt lesson: start with the subject, add one readable pose, then layer clothing, scene, camera, lighting, mood, and style. The goal is a prompt that can be edited safely without relying on real people, mature themes, violent details, or copied intellectual property. Each fragment is intentionally short enough to reuse in the Prompt Builder, but specific enough to teach why that detail matters. When adapting it, replace the subject and scene first, keep only one strong camera direction, and avoid stacking too many quality tags. This makes the final prompt easier to test, revise, and compare across models.`,
    positivePrompt,
    negativePrompt: negativeText,
    modelNotes:
      "Works best as an all-ages illustration prompt. Keep character names fictional, avoid brand names, and revise one prompt group at a time.",
    parameters: parametersText,
    breakdown,
    variations: [
      fragment(seed, "lighting", "Variation: golden hour", "golden hour rim light, warm edge highlights, soft long shadows"),
      fragment(seed, "style", "Variation: watercolor", "watercolor illustration, textured paper grain, gentle color washes"),
      fragment(seed, "camera", "Variation: wider framing", "wide shot, more background context, subject placed on rule-of-thirds line")
    ],
    commonMistakes: [
      "Combining close-up and full body framing in the same prompt.",
      "Adding many style directions that fight for visual priority.",
      "Using vague words such as beautiful without concrete visual detail."
    ],
    suitableUses: ["Prompt practice", "Character or scene ideation", "Builder fragment library", "Safe tutorial examples"],
    relatedRecipes: seeds.filter((other) => other.slug !== seed.slug).slice(0, 3).map((other) => other.slug)
  };
}

export const recipes: PromptRecipe[] = seeds.map(buildRecipe);

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getRecipesByCategory(category: string) {
  return recipes.filter((recipe) => recipe.category === category || recipe.tags.includes(category));
}
