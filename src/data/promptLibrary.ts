import type { PromptCategory, PromptFragment } from "@/lib/promptCart";

export type LibraryGroup = {
  category: PromptCategory;
  title: string;
  description: string;
  sampleBrief: string;
  fragments: PromptFragment[];
};

export type ModelRecommendation = {
  id: string;
  name: string;
  type: "checkpoint" | "lora" | "upscaler" | "vae";
  bestFor: string[];
  promptStyle: string;
  sampleImage: string;
  comfyNotes: string;
};

const builderImageById: Record<string, string> = {
  "original-girl": "/images/builder/original-girl.webp",
  "traveler": "/images/builder/traveler.webp",
  "tea-room": "/images/builder/tea-room.webp",
  "fantasy-worker": "/images/builder/fantasy-worker.webp",
  "standing": "/images/builder/standing.webp",
  "walking": "/images/builder/walking.webp",
  "sitting": "/images/builder/sitting.webp",
  "kneeling": "/images/builder/kneeling.webp",
  "turn-back": "/images/builder/turn-back.webp",
  "dynamic-stance": "/images/builder/dynamic-stance.webp",
  "waving": "/images/builder/waving.webp",
  "umbrella": "/images/builder/umbrella.webp",
  "reading": "/images/builder/reading.webp",
  "packing": "/images/builder/packing.webp",
  "tea": "/images/builder/tea.webp",
  "practice-sword": "/images/builder/practice-sword.webp",
  "casual-cardigan": "/images/builder/casual-cardigan.webp",
  "keikogi": "/images/builder/keikogi.webp",
  "traveler-cloak": "/images/builder/traveler-cloak.webp",
  "herbalist": "/images/builder/herbalist.webp",
  "detective-coat": "/images/builder/detective-coat.webp",
  "festival": "/images/builder/festival.webp",
  "tea-house": "/images/builder/tea-house.webp",
  "rainy-street": "/images/builder/rainy-street.webp",
  "study-room": "/images/builder/study-room.webp",
  "forest-path": "/images/builder/forest-path.webp",
  "workshop": "/images/builder/workshop.webp",
  "market": "/images/builder/market.webp",
  "full-body": "/images/builder/full-body.webp",
  "medium-shot": "/images/builder/medium-shot.webp",
  "close-up": "/images/builder/close-up.webp",
  "low-angle": "/images/builder/low-angle.webp",
  "high-angle": "/images/builder/high-angle.webp",
  "isometric": "/images/builder/isometric.webp",
  "window": "/images/builder/window.webp",
  "golden-hour": "/images/builder/golden-hour.webp",
  "neon": "/images/builder/neon.webp",
  "desk-lamp": "/images/builder/desk-lamp.webp",
  "overcast": "/images/builder/overcast.webp",
  "studio": "/images/builder/studio.webp",
  "anime-clean": "/images/builder/anime-clean.webp",
  "semi-real": "/images/builder/semi-real.webp",
  "storybook": "/images/builder/storybook.webp",
  "watercolor": "/images/builder/watercolor.webp",
  "concept-art": "/images/builder/concept-art.webp",
  "isometric-game": "/images/builder/isometric-game.webp",
  "clean": "/images/builder/quality-clean.webp",
  "polished": "/images/builder/quality-polished.webp",
  "readable": "/images/builder/quality-readable.webp",
  "general": "/images/builder/negative-general.webp",
  "composition": "/images/builder/negative-composition.webp",
  "style-noise": "/images/builder/negative-style-noise.webp",
  "sdxl-default": "/images/builder/parameters-sdxl.webp",
  "landscape": "/images/builder/parameters-landscape.webp",
  "sheet": "/images/builder/parameters-sheet.webp"
};
function item(category: PromptCategory, id: string, label: string, text: string, tags: string[] = []): PromptFragment {
  return {
    id: `library-${category}-${id}`,
    category,
    label,
    text,
    sourceRecipeTitle: "Prompt Library",
    image: builderImageById[id],
    tags: [category, ...tags]
  };
}

export const libraryGroups: LibraryGroup[] = [
  {
    category: "subject",
    title: "Subject / Character Base",
    description: "Choose who or what the image is mainly about before adding pose, scene, and style.",
    sampleBrief: "Character bases, object scenes, and no-person interiors that anchor the rest of the prompt.",
    fragments: [
      item("subject", "original-girl", "Original anime girl", "original anime girl, youthful character, friendly expression, all-ages design", ["character"]),
      item("subject", "traveler", "Traveler character", "original traveler character, small shoulder bag, curious expression, all-ages design", ["character"]),
      item("subject", "tea-room", "Tea room interior", "quiet traditional tea room interior, no people, ceramic cups and wood details", ["environment"]),
      item("subject", "fantasy-worker", "Fantasy craft worker", "kind fantasy craft worker, original character design, practical accessories", ["character"])
    ]
  },
  {
    category: "pose",
    title: "Pose Library",
    description: "Core body poses such as standing, walking, sitting, kneeling, looking back, and dynamic stance.",
    sampleBrief: "Body-position prompts that control how the character is placed in the image.",
    fragments: [
      item("pose", "standing", "Standing", "standing pose, relaxed shoulders, full body visible, balanced silhouette", ["standing"]),
      item("pose", "walking", "Walking", "walking forward, natural stride, arms relaxed, readable full body pose", ["walking"]),
      item("pose", "sitting", "Sitting", "sitting upright in a chair, hands resting naturally, readable seated posture", ["sitting"]),
      item("pose", "kneeling", "Kneeling", "kneeling pose, one knee on the ground, calm balanced posture", ["kneeling"]),
      item("pose", "turn-back", "Looking back", "looking back over shoulder, three-quarter body twist, elegant silhouette", ["turning"]),
      item("pose", "dynamic-stance", "Dynamic stance", "dynamic training stance, one foot forward, strong line of action, stable balance", ["action"])
    ]
  },
  {
    category: "action",
    title: "Action Library",
    description: "Actions describe what the subject is doing, not only how the body is posed.",
    sampleBrief: "Gesture and activity prompts such as waving, holding an umbrella, reading, packing, serving tea, and practice sword.",
    fragments: [
      item("action", "waving", "Waving", "waving gently toward the viewer, friendly gesture, relaxed body language"),
      item("action", "umbrella", "Holding umbrella", "holding an umbrella after rain, looking down the street"),
      item("action", "reading", "Reading", "turning a page in a notebook, focused but calm"),
      item("action", "packing", "Packing gear", "arranging travel gear on a table, careful hands, organized layout"),
      item("action", "tea", "Serving tea", "pouring tea into a ceramic cup, gentle steam rising"),
      item("action", "practice-sword", "Practice sword", "holding a wooden practice sword with controlled motion, non-violent training")
    ]
  },
  {
    category: "clothing",
    title: "Clothing / Outfit",
    description: "Outfit fragments define clothing shape, material, and cultural direction.",
    sampleBrief: "Casual, training, traveler, herbalist, long coat, and festival outfit directions.",
    fragments: [
      item("clothing", "casual-cardigan", "Casual cardigan", "soft cardigan, casual shirt, simple trousers, neat hairstyle"),
      item("clothing", "keikogi", "Training outfit", "simple dark keikogi, hakama pants, tied waist belt"),
      item("clothing", "traveler-cloak", "Traveler cloak", "travel cloak, simple tunic, small satchel, sturdy boots"),
      item("clothing", "herbalist", "Herbalist outfit", "layered linen tunic, herb satchel, apron pockets, simple cloak"),
      item("clothing", "detective-coat", "Long coat", "long coat, simple hat, messenger bag, practical boots"),
      item("clothing", "festival", "Festival outfit", "modest festival outfit, patterned sash, small hair ornament, soft fabric folds")
    ]
  },
  {
    category: "scene",
    title: "Scene / Background",
    description: "Scene fragments set the environment around the subject.",
    sampleBrief: "Tea houses, rainy streets, study rooms, forest paths, fantasy workshops, and marketplaces.",
    fragments: [
      item("scene", "tea-house", "Traditional tea house", "traditional tea house interior, wood beams, paper screens, ceramic teapot"),
      item("scene", "rainy-street", "Rainy old street", "old stone street, lanterns, puddles, cozy shop windows, after rain"),
      item("scene", "study-room", "Study room", "small cozy study room, bookshelves, desk lamp, tidy notes"),
      item("scene", "forest-path", "Forest path", "ancient forest path, moss, ferns, soft shafts of light"),
      item("scene", "workshop", "Fantasy workshop", "small fantasy craft workshop, wooden shelves, jars, workbench"),
      item("scene", "market", "Marketplace", "busy friendly marketplace, stalls, baskets, fabric awnings, organized crowd")
    ]
  },
  {
    category: "camera",
    title: "Camera / Composition",
    description: "Camera fragments control framing, distance, and viewing angle.",
    sampleBrief: "Full body, medium shot, close-up, low angle, high angle, and isometric views.",
    fragments: [
      item("camera", "full-body", "Full body", "full body view, head to toe visible, readable silhouette", ["full body"]),
      item("camera", "medium-shot", "Medium shot", "medium shot, character from waist up, clear facial expression"),
      item("camera", "close-up", "Close-up", "close-up portrait, 85mm lens feel, soft background", ["close-up"]),
      item("camera", "low-angle", "Low angle", "low angle medium shot, dramatic but readable perspective", ["low angle"]),
      item("camera", "high-angle", "High angle", "slight high angle, looking down gently at the subject", ["high angle"]),
      item("camera", "isometric", "Isometric", "isometric camera, clean cutaway composition, game asset view")
    ]
  },
  {
    category: "lighting",
    title: "Lighting",
    description: "Lighting fragments shape the mood, contrast, and material readability.",
    sampleBrief: "Window light, golden hour, neon reflections, desk lamp, overcast, and studio light.",
    fragments: [
      item("lighting", "window", "Soft window light", "soft natural window lighting, gentle catchlights, soft shadows"),
      item("lighting", "golden-hour", "Golden hour", "golden hour rim light, warm edge highlights, long soft shadows"),
      item("lighting", "neon", "Neon reflections", "blue and pink neon reflections, soft rain haze, cinematic contrast"),
      item("lighting", "desk-lamp", "Desk lamp", "warm desk lamp, soft window fill light, cozy interior shadows"),
      item("lighting", "overcast", "Overcast", "overcast diffuse light, low contrast, gentle color transitions"),
      item("lighting", "studio", "Studio light", "bright diffuse studio light, even illumination, clean material detail")
    ]
  },
  {
    category: "style",
    title: "Style Direction",
    description: "Style fragments decide the illustration language and finish.",
    sampleBrief: "Clean anime, semi-realistic, storybook, watercolor, concept art, and isometric game asset styles.",
    fragments: [
      item("style", "anime-clean", "Clean anime", "anime-inspired clean illustration, crisp linework, polished color"),
      item("style", "semi-real", "Semi realistic", "semi-realistic illustration, subtle skin shading, natural materials"),
      item("style", "storybook", "Storybook", "cinematic storybook illustration, natural colors, gentle detail"),
      item("style", "watercolor", "Watercolor", "watercolor illustration, textured paper grain, gentle color washes"),
      item("style", "concept-art", "Concept art", "character concept art, clear material notes, production-ready design"),
      item("style", "isometric-game", "Isometric game asset", "stylized isometric game asset illustration, readable scale"),
    ]
  },
  {
    category: "quality",
    title: "Quality Tags",
    description: "Quality tags should support clarity without becoming a long pile of weak words.",
    sampleBrief: "Clean composition, polished illustration, and readable design helpers.",
    fragments: [
      item("quality", "clean", "Clean composition", "clean composition, coherent anatomy, detailed materials, balanced colors"),
      item("quality", "polished", "Polished illustration", "polished illustration, sharp focus, refined edges, clear visual hierarchy"),
      item("quality", "readable", "Readable design", "readable silhouette, uncluttered background, consistent proportions")
    ]
  },
  {
    category: "negative",
    title: "Negative Prompt",
    description: "Negative fragments reduce common model problems.",
    sampleBrief: "General negative prompts for a ComfyUI workflow.",
    fragments: [
      item("negative", "general", "General negative", "low quality, blurry, extra fingers, deformed hands, unreadable details, watermark, text overlay"),
      item("negative", "composition", "Composition negative", "cropped head, cut off feet, messy composition, duplicated limbs, bad perspective"),
      item("negative", "style-noise", "Style noise negative", "over-sharpened, jpeg artifacts, noisy texture, muddy colors")
    ]
  },
  {
    category: "parameters",
    title: "ComfyUI Parameters",
    description: "Base parameters that can be copied into workflow notes.",
    sampleBrief: "Practical default parameters for image generation tests.",
    fragments: [
      item("parameters", "sdxl-default", "SDXL default", "aspect ratio: 4:5\nsteps: 28\nCFG scale: 6.5\nsampler: DPM++ 2M Karras\nseed: random"),
      item("parameters", "landscape", "Landscape", "aspect ratio: 16:9\nsteps: 30\nCFG scale: 6\nsampler: DPM++ 2M Karras\nseed: random"),
      item("parameters", "sheet", "Reference sheet", "aspect ratio: 3:2\nsteps: 32\nCFG scale: 6.5\nsampler: DPM++ 2M Karras\nseed: fixed for comparison")
    ]
  }
];

export const modelRecommendations: ModelRecommendation[] = [
  {
    id: "meinamix-v5",
    name: "meinamix_v5Final",
    type: "checkpoint",
    bestFor: ["main anime sample library", "pose cards", "outfit examples", "clean character prompts"],
    promptStyle: "Use Danbooru-style short tags plus plain English structure. Good first choice for standing/walking/sitting pose cards.",
    sampleImage: "/images/model-comparison/b01-meinahentai.png",
    comfyNotes: "Recommended for RTX 3080 first pass: 512x768 or 640x960, 20-28 steps, CFG 6-7, optional hires fix 1.4x after the base image looks stable."
  },
  {
    id: "dark-sushi-mix",
    name: "DarkSushiMix-2.25D",
    type: "checkpoint",
    bestFor: ["2.5D anime look", "lighting comparison", "stylized portraits", "model comparison cards"],
    promptStyle: "Works well with anime character tags, lighting words, and camera framing. Keep realism tags moderate.",
    sampleImage: "/images/model-comparison/b04-darksushi.png",
    comfyNotes: "Good second comparison model on 3080. Use same prompt and seed as meinamix to show users the style difference."
  },
  {
    id: "majicmix-realistic",
    name: "majicmixRealistic_v7",
    type: "checkpoint",
    bestFor: ["realistic portrait comparison", "camera tests", "lighting tests", "semi-photo examples"],
    promptStyle: "Use natural language prompts, explicit camera/lens/lighting, and fewer anime tags.",
    sampleImage: "/images/model-comparison/b05-majicmixrealistic.png",
    comfyNotes: "Use for model recommendation samples rather than the main anime prompt library. Watch hands and face consistency at full body distance."
  },
  {
    id: "japanese-style-realistic",
    name: "japaneseStyleRealistic_v20",
    type: "checkpoint",
    bestFor: ["Japanese realistic style", "soft portrait samples", "realistic clothing materials", "model comparison cards"],
    promptStyle: "Use natural language with Japanese street/interior styling notes. Avoid piling anime-only tags.",
    sampleImage: "/images/model-comparison/b02-japaneseStyleRealistic-v20.png",
    comfyNotes: "Use as a realism-side comparison model. Keep resolution moderate on 3080 and compare against majicmixRealistic."
  },
  {
    id: "illustrious-xl",
    name: "Illustrious-XL-v1.0",
    type: "checkpoint",
    bestFor: ["optional XL quality tests", "high detail anime examples", "later premium sample cards"],
    promptStyle: "Use XL-friendly prompts with clear subject, pose, style, and quality. Avoid using it for every first-pass sample.",
    sampleImage: "/images/model-comparison/b02-meinahentai.png",
    comfyNotes: "RTX 3080 can try it, but it is heavier. Start around 832x1216 or 768x1024, fp16, no heavy hires fix. Use only after the SD1.5 library direction is settled."
  },
  {
    id: "qwen-image-edit",
    name: "Qwen-Image-Edit-2511-Lightning-4steps",
    type: "checkpoint",
    bestFor: ["image editing", "variation cleanup", "turning approved samples into refined variants"],
    promptStyle: "Treat as an edit/refine tool rather than the main prompt library generator.",
    sampleImage: "/images/model-comparison/b03-majicmixrealistic.png",
    comfyNotes: "Use after you already have a base image. It is useful for edit workflows, not for the first pose/camera/style comparison grid."
  },
  {
    id: "sdpose-wholebody",
    name: "sdpose_wholebody_fp16",
    type: "lora",
    bestFor: ["pose control", "whole-body reference guidance", "standing/walking/sitting consistency"],
    promptStyle: "Use alongside OpenPose / pose reference workflows when you want the exact body pose to stay stable.",
    sampleImage: "/images/model-comparison/b01-meinahentai.png",
    comfyNotes: "Do not treat this as the main checkpoint. Use it as a pose-control helper after choosing a checkpoint such as meinamix_v5Final."
  }
];

export const comfyShotList = libraryGroups
  .filter((group) => group.sampleBrief)
  .map((group) => ({
    category: group.category,
    title: group.title,
    sampleBrief: group.sampleBrief,
    count: group.fragments.length,
    fragmentLabels: group.fragments.map((fragment) => fragment.label)
  }));

export const allLibraryFragments = libraryGroups.flatMap((group) => group.fragments);




