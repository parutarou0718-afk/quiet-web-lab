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

function item(category: PromptCategory, id: string, label: string, text: string, tags: string[] = []): PromptFragment {
  return {
    id: `library-${category}-${id}`,
    category,
    label,
    text,
    sourceRecipeTitle: "Prompt Library",
    tags: [category, ...tags]
  };
}

export const libraryGroups: LibraryGroup[] = [
  {
    category: "subject",
    title: "Subject / Character Base",
    description: "角色或画面主体，先决定画面里是谁或是什么。",
    sampleBrief: "同一角色基底做 3 张：少女冒险者、现代日常角色、无人场景静物。",
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
    description: "你说的站、走、坐、跪、回头等核心姿势。每个都适合做一张样图。",
    sampleBrief: "同一角色、同一服装、同一背景，分别出站立/行走/坐姿/跪姿/回头/动态训练。",
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
    description: "动作片段，比姿势更强调正在发生什么。",
    sampleBrief: "用同一角色分别生成：挥手、拿伞、翻书、整理背包、练习木刀、端茶。",
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
    description: "服装和材质。后面可以做专门的服装样图库。",
    sampleBrief: "同一站姿角色分别出：校服风、和风练习服、旅行斗篷、草药师围裙、赛博长外套、毛衣日常。",
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
    description: "场景库。你可以先做室内、街道、自然、工作室、茶室、市集这些基础图。",
    sampleBrief: "无人场景各一张：茶室、雨街、书房、森林、工坊、市集。",
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
    description: "镜头和构图，经常和姿势冲突，所以需要红色提示。",
    sampleBrief: "同一主体分别出：全身、半身、近景、俯视、仰视、等距。",
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
    description: "光线库，决定质感和氛围。先做几个通用样图就很有价值。",
    sampleBrief: "同一构图分别出：窗光、金色时刻、霓虹、桌灯、阴天、棚拍柔光。",
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
    description: "风格库。这里可以和模型推荐页联动。",
    sampleBrief: "同一提示词分别用：动漫插画、半写实、故事书、水彩、概念设计、等距游戏资产。",
    fragments: [
      item("style", "anime-clean", "Clean anime", "anime-inspired clean illustration, crisp linework, polished color"),
      item("style", "semi-real", "Semi realistic", "semi-realistic illustration, subtle skin shading, natural materials"),
      item("style", "storybook", "Storybook", "cinematic storybook illustration, natural colors, gentle detail"),
      item("style", "watercolor", "Watercolor", "watercolor illustration, textured paper grain, gentle color washes"),
      item("style", "concept-art", "Concept art", "character concept art, clear material notes, production-ready design"),
      item("style", "isometric-game", "Isometric game asset", "stylized isometric game asset illustration, readable scale")
    ]
  },
  {
    category: "quality",
    title: "Quality Tags",
    description: "质量词不要无限堆，保留 1-2 组就好。",
    sampleBrief: "不用单独出图，作为所有工作流默认质量词。",
    fragments: [
      item("quality", "clean", "Clean composition", "clean composition, coherent anatomy, detailed materials, balanced colors"),
      item("quality", "polished", "Polished illustration", "polished illustration, sharp focus, refined edges, clear visual hierarchy"),
      item("quality", "readable", "Readable design", "readable silhouette, uncluttered background, consistent proportions")
    ]
  },
  {
    category: "negative",
    title: "Negative Prompt",
    description: "负面词按模型调整，这里先放通用版本。",
    sampleBrief: "不用单独出图，作为 ComfyUI 工作流默认 negative。",
    fragments: [
      item("negative", "general", "General negative", "low quality, blurry, extra fingers, deformed hands, unreadable details, watermark, text overlay"),
      item("negative", "composition", "Composition negative", "cropped head, cut off feet, messy composition, duplicated limbs, bad perspective"),
      item("negative", "style-noise", "Style noise negative", "over-sharpened, jpeg artifacts, noisy texture, muddy colors")
    ]
  },
  {
    category: "parameters",
    title: "ComfyUI Parameters",
    description: "基础参数，可以直接复制到工作流备注里。",
    sampleBrief: "作为工作流默认参数。",
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
