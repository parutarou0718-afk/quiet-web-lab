import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/data/i18n";
import { builderCopy } from "@/data/i18n";
import { libraryGroups, modelRecommendations } from "@/data/promptLibrary";
import type { PromptFragment } from "@/lib/promptCart";

type CartItem = PromptFragment & { editedText?: string };
type ConflictHit = { terms: [string, string]; message: string };
type LocalText = Record<Locale, string>;
type FragmentUi = {
  label: LocalText;
  description: LocalText;
};
type GroupUi = {
  title: LocalText;
  description: LocalText;
  summary: LocalText;
  fragments: Record<string, FragmentUi>;
};

const cartKey = "prompt-atlas-cart";
const order = ["subject", "pose", "action", "clothing", "scene", "camera", "lighting", "mood", "style", "quality"];
const allGroups = [...order, "negative", "parameters"];
const singleFocus = new Set(["pose", "camera", "lighting", "style", "mood"]);
const conflictPairs: [string, string][] = [
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

const ui = {
  en: {
    items: "items",
    add: "Add",
    remove: "Remove",
    clear: "Clear",
    promptChecks: "Prompt Checks",
    positive: "Positive Prompt",
    negative: "Negative Prompt",
    parameters: "Parameters",
    copyPositive: "Copy Positive",
    copyNegative: "Copy Negative",
    copyParameters: "Copy Parameters",
    copyAll: "Copy All",
    basket: "Selected Fragment Basket",
    modelSlots: "Model Recommendation Slots",
    modelSlotsLead: "Model notes for choosing checkpoints before copying the prompt into ComfyUI.",
    emptyPrompt: "Select fragments to generate a prompt.",
    source: "Prompt Library",
    groupNoteLabel: "This set includes",
    multiple: (category: string) => `${category} has multiple selected fragments. Keep one main direction unless you need a deliberate blend.`,
    conflict: (a: string, b: string) => `${a} and ${b} may conflict, but copying is still allowed.`,
    tooLong: "The prompt is getting long. Consider removing weaker fragments.",
    ok: "No obvious conflicts right now."
  },
  zh: {
    items: "项",
    add: "添加",
    remove: "移除",
    clear: "清空",
    promptChecks: "提示词检查",
    positive: "正向提示词",
    negative: "负向提示词",
    parameters: "参数",
    copyPositive: "复制正向",
    copyNegative: "复制负向",
    copyParameters: "复制参数",
    copyAll: "全部复制",
    basket: "已选片段篮子",
    modelSlots: "模型推荐入口",
    modelSlotsLead: "在复制到 ComfyUI 之前，用这些说明判断该选哪个 checkpoint。",
    emptyPrompt: "选择片段后会生成提示词。",
    source: "提示词库",
    groupNoteLabel: "这个套组包含",
    multiple: (category: string) => `${category} 选择了多个片段，建议保留一个主方向，除非你有意混合。`,
    conflict: (a: string, b: string) => `${a} 和 ${b} 可能互相冲突，但仍然允许复制。`,
    tooLong: "提示词已经偏长，可以删掉弱片段。",
    ok: "目前没有明显冲突。"
  },
  ja: {
    items: "項目",
    add: "追加",
    remove: "削除",
    clear: "クリア",
    promptChecks: "プロンプト確認",
    positive: "Positive Prompt",
    negative: "Negative Prompt",
    parameters: "Parameters",
    copyPositive: "Positive をコピー",
    copyNegative: "Negative をコピー",
    copyParameters: "Parameters をコピー",
    copyAll: "すべてコピー",
    basket: "選択中の断片",
    modelSlots: "モデル推薦",
    modelSlotsLead: "ComfyUI にコピーする前に、どの checkpoint を使うか判断するためのメモです。",
    emptyPrompt: "断片を選ぶとプロンプトが生成されます。",
    source: "プロンプトライブラリ",
    groupNoteLabel: "このセットに含まれるもの",
    multiple: (category: string) => `${category} が複数選択されています。意図的に混ぜる場合以外は、主方向を1つにしてください。`,
    conflict: (a: string, b: string) => `${a} と ${b} は衝突する可能性がありますが、コピーは可能です。`,
    tooLong: "プロンプトが長くなっています。弱い断片を外すことを検討してください。",
    ok: "今のところ明確な衝突はありません。"
  }
} as const;

const categoryNames: Record<string, LocalText> = {
  subject: { en: "subject", zh: "主体", ja: "主体" },
  pose: { en: "pose", zh: "姿势", ja: "ポーズ" },
  action: { en: "action", zh: "动作", ja: "動作" },
  clothing: { en: "clothing", zh: "服装", ja: "服装" },
  scene: { en: "scene", zh: "场景", ja: "場面" },
  camera: { en: "camera", zh: "镜头", ja: "カメラ" },
  lighting: { en: "lighting", zh: "光线", ja: "光" },
  mood: { en: "mood", zh: "氛围", ja: "雰囲気" },
  style: { en: "style", zh: "风格", ja: "スタイル" },
  quality: { en: "quality", zh: "质量词", ja: "品質タグ" },
  negative: { en: "negative", zh: "负向词", ja: "ネガティブ" },
  parameters: { en: "parameters", zh: "参数", ja: "パラメータ" }
};

const groupUi: Record<string, GroupUi> = {
  subject: {
    title: { en: "Subject / Character Base", zh: "主体 / 角色基础", ja: "主体 / キャラクター基礎" },
    description: {
      en: "Choose who or what the image is mainly about before adding pose, scene, and style.",
      zh: "先决定画面里是谁或是什么，再继续叠加姿势、场景和风格。",
      ja: "ポーズ、場面、スタイルを足す前に、画像の主役を決めます。"
    },
    summary: {
      en: "character bases, object scenes, and no-person interiors that anchor the rest of the prompt.",
      zh: "角色基底、物件场景和无人室内，用来固定整条提示词的主体。",
      ja: "人物ベース、物のある場面、人物なしの室内など、プロンプト全体の軸になる要素です。"
    },
    fragments: {
      "library-subject-original-girl": {
        label: { en: "Original anime girl", zh: "原创动漫少女", ja: "オリジナルアニメ少女" },
        description: { en: "A friendly all-ages character base for general examples.", zh: "适合通用样例的友好全年龄角色基底。", ja: "汎用例に使いやすい全年齢向けの人物ベースです。" }
      },
      "library-subject-traveler": {
        label: { en: "Traveler character", zh: "旅行者角色", ja: "旅人キャラクター" },
        description: { en: "A curious traveler with small accessories and a readable silhouette.", zh: "带小配件、轮廓清晰的好奇旅行者。", ja: "小物を持ち、シルエットが読みやすい旅人です。" }
      },
      "library-subject-tea-room": {
        label: { en: "Tea room interior", zh: "茶室室内", ja: "茶室の室内" },
        description: { en: "A quiet no-person interior for testing objects and atmosphere.", zh: "用于测试物件和氛围的安静无人室内。", ja: "物や雰囲気を確認するための静かな無人室内です。" }
      },
      "library-subject-fantasy-worker": {
        label: { en: "Fantasy craft worker", zh: "幻想工匠角色", ja: "ファンタジー職人" },
        description: { en: "A practical original character for craft, shop, and workshop prompts.", zh: "适合工坊、商店和手作主题的实用原创角色。", ja: "工房や店、手仕事のプロンプトに使いやすい人物です。" }
      }
    }
  },
  pose: {
    title: { en: "Pose Library", zh: "姿势库", ja: "ポーズライブラリ" },
    description: {
      en: "Core body poses such as standing, walking, sitting, kneeling, looking back, and dynamic stance.",
      zh: "包含站立、行走、坐姿、跪姿、回头和动态站姿等核心身体姿势。",
      ja: "立ち、歩き、座り、膝つき、振り返り、動きのある構えなどの基本ポーズです。"
    },
    summary: {
      en: "body-position prompts that control how the character is placed in the image.",
      zh: "控制角色在画面中如何站、坐、移动或转身的身体位置提示词。",
      ja: "人物が画面の中でどう立つ、座る、動く、振り返るかを決める断片です。"
    },
    fragments: {
      "library-pose-standing": {
        label: { en: "Standing", zh: "站立", ja: "立ち姿" },
        description: { en: "A relaxed full-body standing pose with a balanced silhouette.", zh: "放松的全身站姿，轮廓稳定清楚。", ja: "全身が見える、安定したリラックス立ち姿です。" }
      },
      "library-pose-walking": {
        label: { en: "Walking", zh: "行走", ja: "歩く" },
        description: { en: "Natural forward movement with readable arms and stride.", zh: "自然向前行走，手臂和步伐容易读懂。", ja: "腕と歩幅が読みやすい自然な前進ポーズです。" }
      },
      "library-pose-sitting": {
        label: { en: "Sitting", zh: "坐姿", ja: "座る" },
        description: { en: "An upright seated posture with calm hand placement.", zh: "端正坐姿，手部放置自然。", ja: "手の位置が自然な、落ち着いた座り姿です。" }
      },
      "library-pose-kneeling": {
        label: { en: "Kneeling", zh: "跪姿", ja: "膝つき" },
        description: { en: "One-knee kneeling pose with a stable body balance.", zh: "单膝跪地，身体平衡稳定。", ja: "片膝をついた、バランスのよいポーズです。" }
      },
      "library-pose-turn-back": {
        label: { en: "Looking back", zh: "回头", ja: "振り返り" },
        description: { en: "A three-quarter body twist with an elegant over-shoulder look.", zh: "三分之四身体扭转，优雅地回头看。", ja: "肩越しに振り返る、三四分の身体ひねりです。" }
      },
      "library-pose-dynamic-stance": {
        label: { en: "Dynamic stance", zh: "动态站姿", ja: "動きのある構え" },
        description: { en: "A stronger action-ready stance with one foot forward.", zh: "一脚向前、适合动作感画面的稳定站姿。", ja: "片足を前に出した、動きに入る前の構えです。" }
      }
    }
  },
  action: {
    title: { en: "Action Library", zh: "动作库", ja: "動作ライブラリ" },
    description: {
      en: "Actions describe what the subject is doing, not only how the body is posed.",
      zh: "动作片段说明角色正在做什么，而不只是身体摆成什么样。",
      ja: "体の形だけでなく、人物が何をしているかを指定します。"
    },
    summary: {
      en: "gesture and activity prompts such as waving, holding an umbrella, reading, packing, serving tea, and practice sword.",
      zh: "挥手、拿伞、阅读、整理装备、端茶、练习木刀等动作提示词。",
      ja: "手を振る、傘を持つ、読む、荷物を整える、お茶を注ぐ、木刀練習などの動作です。"
    },
    fragments: {}
  },
  clothing: {
    title: { en: "Clothing / Outfit", zh: "服装 / 穿搭", ja: "服装 / 衣装" },
    description: {
      en: "Outfit fragments define clothing shape, material, and cultural direction.",
      zh: "服装片段决定衣服形状、材质和文化方向。",
      ja: "衣装の形、素材、雰囲気の方向性を決めます。"
    },
    summary: {
      en: "casual, training, traveler, herbalist, long coat, and festival outfit directions.",
      zh: "日常、练习服、旅行者、草药师、长外套和节日服装方向。",
      ja: "日常服、稽古着、旅人、薬草師、ロングコート、祭り衣装の方向です。"
    },
    fragments: {}
  },
  scene: {
    title: { en: "Scene / Background", zh: "场景 / 背景", ja: "場面 / 背景" },
    description: {
      en: "Scene fragments set the environment around the subject.",
      zh: "场景片段决定主体周围的环境。",
      ja: "主体の周囲にある環境を指定します。"
    },
    summary: {
      en: "tea houses, rainy streets, study rooms, forest paths, fantasy workshops, and marketplaces.",
      zh: "茶室、雨街、书房、森林小路、幻想工坊和市集等环境。",
      ja: "茶室、雨の通り、書斎、森の小道、ファンタジー工房、市場などです。"
    },
    fragments: {}
  },
  camera: {
    title: { en: "Camera / Composition", zh: "镜头 / 构图", ja: "カメラ / 構図" },
    description: {
      en: "Camera fragments control framing, distance, and viewing angle.",
      zh: "镜头片段控制取景范围、距离和观看角度。",
      ja: "フレーミング、距離、見る角度を指定します。"
    },
    summary: {
      en: "full body, medium shot, close-up, low angle, high angle, and isometric views.",
      zh: "全身、半身、近景、低角度、高角度和等距视角。",
      ja: "全身、ミディアム、クローズアップ、ローアングル、ハイアングル、アイソメ視点です。"
    },
    fragments: {}
  },
  lighting: {
    title: { en: "Lighting", zh: "光线", ja: "ライティング" },
    description: {
      en: "Lighting fragments shape the mood, contrast, and material readability.",
      zh: "光线片段影响氛围、明暗对比和材质可读性。",
      ja: "雰囲気、コントラスト、素材の見え方を整えます。"
    },
    summary: {
      en: "window light, golden hour, neon reflections, desk lamp, overcast, and studio light.",
      zh: "窗光、金色时刻、霓虹反射、桌灯、阴天漫射和棚拍柔光。",
      ja: "窓光、ゴールデンアワー、ネオン反射、デスクライト、曇天、スタジオ光です。"
    },
    fragments: {}
  },
  style: {
    title: { en: "Style Direction", zh: "风格方向", ja: "スタイル方向" },
    description: {
      en: "Style fragments decide the illustration language and finish.",
      zh: "风格片段决定画面的绘制语言和完成感。",
      ja: "絵柄や仕上げの方向を決めます。"
    },
    summary: {
      en: "clean anime, semi-realistic, storybook, watercolor, concept art, and isometric game asset styles.",
      zh: "干净动漫、半写实、故事书、水彩、概念设计和等距游戏资产风格。",
      ja: "クリーンアニメ、半写実、絵本調、水彩、コンセプトアート、アイソメゲーム素材です。"
    },
    fragments: {}
  },
  quality: {
    title: { en: "Quality Tags", zh: "质量词", ja: "品質タグ" },
    description: {
      en: "Quality tags should support clarity without becoming a long pile of weak words.",
      zh: "质量词用于提升清晰度，不建议无限堆叠。",
      ja: "品質タグは明瞭さを補助しますが、長く積みすぎない方が安定します。"
    },
    summary: {
      en: "clean composition, polished illustration, and readable design helpers.",
      zh: "干净构图、精修插画和可读设计等辅助词。",
      ja: "きれいな構図、磨かれたイラスト、読みやすいデザインを補助します。"
    },
    fragments: {}
  },
  negative: {
    title: { en: "Negative Prompt", zh: "负向提示词", ja: "ネガティブプロンプト" },
    description: {
      en: "Negative fragments reduce common artifacts such as bad hands, cropping, watermarks, and noisy texture.",
      zh: "负向片段用于减少坏手、裁切、水印、噪点质感等常见问题。",
      ja: "手の崩れ、切れ、透かし、ノイズ質感などを減らすための断片です。"
    },
    summary: {
      en: "general quality, composition, and style-noise negative prompts.",
      zh: "通用质量、构图和风格噪点类负向词。",
      ja: "一般品質、構図、スタイルノイズ向けのネガティブです。"
    },
    fragments: {}
  },
  parameters: {
    title: { en: "ComfyUI Parameters", zh: "ComfyUI 参数", ja: "ComfyUI パラメータ" },
    description: {
      en: "Parameter fragments are workflow notes for aspect ratio, steps, CFG, sampler, and seed behavior.",
      zh: "参数片段记录画幅、步数、CFG、采样器和 seed 行为。",
      ja: "比率、steps、CFG、sampler、seed の扱いをメモします。"
    },
    summary: {
      en: "default SDXL, landscape, and reference sheet parameter presets.",
      zh: "默认 SDXL、横图和参考表参数预设。",
      ja: "SDXL標準、横長、参照シート用の設定です。"
    },
    fragments: {}
  }
};

const fragmentFallbacks: Record<string, FragmentUi> = {
  "library-action-waving": {
    label: { en: "Waving", zh: "挥手", ja: "手を振る" },
    description: { en: "A friendly gesture toward the viewer.", zh: "面向观众的友好手势。", ja: "見る人に向けた親しみやすいジェスチャーです。" }
  },
  "library-action-umbrella": {
    label: { en: "Holding umbrella", zh: "拿伞", ja: "傘を持つ" },
    description: { en: "A calm rain-scene action with a clear prop.", zh: "适合雨景的安静动作，主体道具清楚。", ja: "雨の場面に合う、道具が明確な動作です。" }
  },
  "library-action-reading": {
    label: { en: "Reading", zh: "阅读", ja: "読む" },
    description: { en: "A focused notebook or book interaction.", zh: "专注阅读或翻页的动作。", ja: "ノートや本に集中する動作です。" }
  },
  "library-action-packing": {
    label: { en: "Packing gear", zh: "整理装备", ja: "荷物を整える" },
    description: { en: "A table-based action for organized object layouts.", zh: "适合桌面物件布局的整理动作。", ja: "机上の物を整理する場面に向いた動作です。" }
  },
  "library-action-tea": {
    label: { en: "Serving tea", zh: "端茶 / 倒茶", ja: "お茶を注ぐ" },
    description: { en: "A gentle tea-serving motion with steam and ceramic detail.", zh: "柔和的倒茶动作，适合蒸汽和陶瓷细节。", ja: "湯気や陶器の表現に向いた、穏やかなお茶の動作です。" }
  },
  "library-action-practice-sword": {
    label: { en: "Practice sword", zh: "木刀练习", ja: "木刀練習" },
    description: { en: "Controlled non-violent training motion.", zh: "克制的非暴力训练动作。", ja: "暴力表現ではない、制御された練習動作です。" }
  },
  "library-clothing-casual-cardigan": {
    label: { en: "Casual cardigan", zh: "日常开衫", ja: "日常カーディガン" },
    description: { en: "Soft everyday clothing for calm character examples.", zh: "柔和的日常服装，适合安静角色样例。", ja: "落ち着いた人物例に使いやすい日常服です。" }
  },
  "library-clothing-keikogi": {
    label: { en: "Training outfit", zh: "和风练习服", ja: "稽古着" },
    description: { en: "A simple training outfit with hakama-like structure.", zh: "简洁训练服，带袴裤结构感。", ja: "袴に近い構造を持つシンプルな稽古着です。" }
  },
  "library-clothing-traveler-cloak": {
    label: { en: "Traveler cloak", zh: "旅行斗篷", ja: "旅人のマント" },
    description: { en: "Practical travel clothing with cloak, satchel, and boots.", zh: "带斗篷、挎包和靴子的实用旅行装。", ja: "マント、鞄、ブーツを含む実用的な旅装です。" }
  },
  "library-clothing-herbalist": {
    label: { en: "Herbalist outfit", zh: "草药师服装", ja: "薬草師の服" },
    description: { en: "Layered linen and apron pockets for craft or fantasy scenes.", zh: "亚麻层次和围裙口袋，适合手作或幻想场景。", ja: "リネンの重ね着とエプロンポケットがある衣装です。" }
  },
  "library-clothing-detective-coat": {
    label: { en: "Long coat", zh: "长外套", ja: "ロングコート" },
    description: { en: "A practical long coat direction for detective or street scenes.", zh: "适合侦探感或街景的实用长外套方向。", ja: "探偵風や街の場面に合う実用的なロングコートです。" }
  },
  "library-clothing-festival": {
    label: { en: "Festival outfit", zh: "节日服装", ja: "祭り衣装" },
    description: { en: "A modest festive outfit with patterned fabric details.", zh: "带图案布料细节的克制节日服装。", ja: "柄のある布地を使った控えめな祭り衣装です。" }
  },
  "library-scene-tea-house": {
    label: { en: "Traditional tea house", zh: "传统茶室", ja: "伝統的な茶室" },
    description: { en: "Wood beams, paper screens, ceramics, and quiet interior atmosphere.", zh: "木梁、纸门、陶瓷器和安静室内氛围。", ja: "木の梁、障子、陶器、静かな室内の雰囲気です。" }
  },
  "library-scene-rainy-street": {
    label: { en: "Rainy old street", zh: "雨后旧街", ja: "雨の古い通り" },
    description: { en: "Lanterns, puddles, shop windows, and after-rain atmosphere.", zh: "灯笼、水洼、店铺橱窗和雨后氛围。", ja: "提灯、水たまり、店の窓、雨上がりの雰囲気です。" }
  },
  "library-scene-study-room": {
    label: { en: "Study room", zh: "书房", ja: "書斎" },
    description: { en: "Bookshelves, desk lamp, notes, and a tidy cozy room.", zh: "书架、台灯、笔记和整洁舒适的小房间。", ja: "本棚、デスクライト、メモ、整った小さな部屋です。" }
  },
  "library-scene-forest-path": {
    label: { en: "Forest path", zh: "森林小路", ja: "森の小道" },
    description: { en: "Moss, ferns, old trees, and soft light beams.", zh: "苔藓、蕨类、古树和柔和光束。", ja: "苔、シダ、古い木、柔らかな光の筋です。" }
  },
  "library-scene-workshop": {
    label: { en: "Fantasy workshop", zh: "幻想工坊", ja: "ファンタジー工房" },
    description: { en: "Shelves, jars, workbench, and handmade object details.", zh: "架子、罐子、工作台和手作物件细节。", ja: "棚、瓶、作業台、手作り道具の細部です。" }
  },
  "library-scene-market": {
    label: { en: "Marketplace", zh: "市集", ja: "市場" },
    description: { en: "Friendly stalls, baskets, awnings, and an organized crowd.", zh: "友好的摊位、篮子、布棚和有秩序的人群。", ja: "屋台、籠、布の日よけ、整理された人混みです。" }
  },
  "library-camera-full-body": {
    label: { en: "Full body", zh: "全身", ja: "全身" },
    description: { en: "Head-to-toe framing for readable pose and outfit.", zh: "从头到脚入镜，适合看姿势和服装。", ja: "頭から足元まで入れる、ポーズと衣装確認向けの構図です。" }
  },
  "library-camera-medium-shot": {
    label: { en: "Medium shot", zh: "半身", ja: "ミディアムショット" },
    description: { en: "Waist-up framing with clear expression and upper-body detail.", zh: "腰部以上构图，表情和上半身细节清楚。", ja: "腰上構図で表情と上半身の情報が読みやすいです。" }
  },
  "library-camera-close-up": {
    label: { en: "Close-up", zh: "近景肖像", ja: "クローズアップ" },
    description: { en: "Portrait framing with soft background and face focus.", zh: "肖像取景，背景柔和，重点在面部。", ja: "背景を柔らかくし、顔に注目するポートレート構図です。" }
  },
  "library-camera-low-angle": {
    label: { en: "Low angle", zh: "低角度", ja: "ローアングル" },
    description: { en: "A slightly dramatic view from below.", zh: "从下往上的轻微戏剧化视角。", ja: "下から見上げる、少しドラマチックな視点です。" }
  },
  "library-camera-high-angle": {
    label: { en: "High angle", zh: "高角度", ja: "ハイアングル" },
    description: { en: "A gentle look-down angle for softer composition.", zh: "轻微俯视，让构图更柔和。", ja: "上から少し見下ろす、柔らかい構図です。" }
  },
  "library-camera-isometric": {
    label: { en: "Isometric", zh: "等距视角", ja: "アイソメ視点" },
    description: { en: "Game-asset-like view with clean spatial structure.", zh: "类似游戏资产的视角，空间结构清楚。", ja: "ゲーム素材のように空間構造が読みやすい視点です。" }
  },
  "library-lighting-window": {
    label: { en: "Soft window light", zh: "柔和窗光", ja: "柔らかな窓光" },
    description: { en: "Natural window light with gentle shadows and catchlights.", zh: "自然窗光，阴影和眼神光柔和。", ja: "自然な窓光、柔らかい影とキャッチライトです。" }
  },
  "library-lighting-golden-hour": {
    label: { en: "Golden hour", zh: "金色时刻", ja: "ゴールデンアワー" },
    description: { en: "Warm rim light and long soft shadows.", zh: "温暖轮廓光和长而柔和的阴影。", ja: "暖かいリムライトと長く柔らかな影です。" }
  },
  "library-lighting-neon": {
    label: { en: "Neon reflections", zh: "霓虹反射", ja: "ネオン反射" },
    description: { en: "Blue-pink reflected light with rainy cinematic contrast.", zh: "蓝粉反射光，适合雨夜电影感对比。", ja: "雨の映画的な青桃色の反射光です。" }
  },
  "library-lighting-desk-lamp": {
    label: { en: "Desk lamp", zh: "桌灯", ja: "デスクライト" },
    description: { en: "Warm indoor lamp light for cozy desk scenes.", zh: "温暖室内台灯光，适合舒适桌面场景。", ja: "机まわりの落ち着いた室内光です。" }
  },
  "library-lighting-overcast": {
    label: { en: "Overcast", zh: "阴天漫射光", ja: "曇天光" },
    description: { en: "Diffuse low-contrast light with gentle color transitions.", zh: "低对比漫射光，颜色过渡柔和。", ja: "低コントラストで色の移り変わりが柔らかい光です。" }
  },
  "library-lighting-studio": {
    label: { en: "Studio light", zh: "棚拍柔光", ja: "スタジオ光" },
    description: { en: "Even bright light for clean material and product-like detail.", zh: "均匀明亮的光，适合干净材质和产品感细节。", ja: "素材や細部を明るく均一に見せる光です。" }
  },
  "library-style-anime-clean": {
    label: { en: "Clean anime", zh: "干净动漫", ja: "クリーンアニメ" },
    description: { en: "Crisp linework and polished color for anime-style samples.", zh: "线条清晰、色彩精修的动漫样例风格。", ja: "線が明瞭で色が整ったアニメ調です。" }
  },
  "library-style-semi-real": {
    label: { en: "Semi realistic", zh: "半写实", ja: "半写実" },
    description: { en: "Natural material and skin shading without going fully photographic.", zh: "更自然的材质和皮肤阴影，但不完全照片化。", ja: "写真寄りすぎない自然な素材と肌の陰影です。" }
  },
  "library-style-storybook": {
    label: { en: "Storybook", zh: "故事书插画", ja: "絵本風" },
    description: { en: "Gentle cinematic illustration for narrative scenes.", zh: "柔和的故事感插画，适合叙事场景。", ja: "物語の場面に合う、やさしい映画的イラストです。" }
  },
  "library-style-watercolor": {
    label: { en: "Watercolor", zh: "水彩", ja: "水彩" },
    description: { en: "Paper texture and soft color washes.", zh: "纸张纹理和柔和色彩晕染。", ja: "紙の質感と柔らかな色のにじみです。" }
  },
  "library-style-concept-art": {
    label: { en: "Concept art", zh: "概念设计", ja: "コンセプトアート" },
    description: { en: "Clear production-style design with material notes.", zh: "偏生产设计的清晰方案和材质说明感。", ja: "素材の意図が読みやすい制作向けデザインです。" }
  },
  "library-style-isometric-game": {
    label: { en: "Isometric game asset", zh: "等距游戏资产", ja: "アイソメゲーム素材" },
    description: { en: "Readable stylized asset style for tool or game examples.", zh: "适合工具或游戏样例的可读风格化资产。", ja: "ツールやゲーム例に使いやすい読みやすい素材風です。" }
  },
  "library-quality-clean": {
    label: { en: "Clean composition", zh: "干净构图", ja: "きれいな構図" },
    description: { en: "Improves composition, anatomy coherence, and material balance.", zh: "提升构图、结构一致性和材质平衡。", ja: "構図、形のまとまり、素材バランスを補助します。" }
  },
  "library-quality-polished": {
    label: { en: "Polished illustration", zh: "精修插画", ja: "磨かれたイラスト" },
    description: { en: "Adds sharp focus, refined edges, and clearer visual hierarchy.", zh: "强调清晰焦点、精致边缘和层次关系。", ja: "焦点、輪郭、視線誘導を整える補助です。" }
  },
  "library-quality-readable": {
    label: { en: "Readable design", zh: "可读设计", ja: "読みやすいデザイン" },
    description: { en: "Keeps silhouette, background, and proportions easy to read.", zh: "让轮廓、背景和比例更容易读懂。", ja: "シルエット、背景、比率を読みやすくします。" }
  },
  "library-negative-general": {
    label: { en: "General negative", zh: "通用负向词", ja: "汎用ネガティブ" },
    description: { en: "Reduces low quality, blur, bad hands, watermark, and unwanted text.", zh: "减少低质量、模糊、坏手、水印和多余文字。", ja: "低品質、ぼけ、手の崩れ、透かし、不要な文字を減らします。" }
  },
  "library-negative-composition": {
    label: { en: "Composition negative", zh: "构图负向词", ja: "構図ネガティブ" },
    description: { en: "Reduces awkward crops, duplicated limbs, and bad perspective.", zh: "减少裁切错误、重复肢体和透视问题。", ja: "切れ、重複した手足、悪いパースを減らします。" }
  },
  "library-negative-style-noise": {
    label: { en: "Style noise negative", zh: "风格噪点负向词", ja: "スタイルノイズ対策" },
    description: { en: "Reduces oversharpening, artifacts, noisy texture, and muddy colors.", zh: "减少过锐、压缩痕迹、噪点纹理和脏色。", ja: "過剰なシャープ、ノイズ、濁った色を減らします。" }
  },
  "library-parameters-sdxl-default": {
    label: { en: "SDXL default", zh: "SDXL 默认参数", ja: "SDXL標準" },
    description: { en: "A balanced portrait-oriented setup for SDXL tests.", zh: "适合 SDXL 测试的竖图均衡参数。", ja: "SDXLテスト向けの縦長バランス設定です。" }
  },
  "library-parameters-landscape": {
    label: { en: "Landscape", zh: "横图参数", ja: "横長" },
    description: { en: "A wider setup for environment and scene prompts.", zh: "适合环境和场景提示词的宽画幅参数。", ja: "環境や場面プロンプト向けの横長設定です。" }
  },
  "library-parameters-sheet": {
    label: { en: "Reference sheet", zh: "参考表参数", ja: "参照シート" },
    description: { en: "A fixed-seed setup for comparison sheets.", zh: "适合对比表和参考图的固定 seed 参数。", ja: "比較シート向けの fixed seed 設定です。" }
  }
};

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

function groupText(group: { category: string; title: string; description: string; sampleBrief: string }, locale: Locale) {
  const meta = groupUi[group.category];
  return {
    title: meta?.title[locale] ?? group.title,
    description: meta?.description[locale] ?? group.description,
    summary: meta?.summary[locale] ?? group.sampleBrief
  };
}

function fragmentText(fragment: PromptFragment, locale: Locale) {
  const meta = groupUi[fragment.category]?.fragments[fragment.id] ?? fragmentFallbacks[fragment.id];
  return {
    label: meta?.label[locale] ?? fragment.label,
    description: meta?.description[locale] ?? fragment.text
  };
}

function categoryText(category: string, locale: Locale) {
  return categoryNames[category]?.[locale] ?? category;
}

function buildPositive(items: CartItem[]) {
  return order
    .flatMap((category) => items.filter((item) => item.category === category))
    .map(textOf)
    .filter(Boolean)
    .join(", ");
}

function findConflictHits(items: CartItem[], locale: Locale): ConflictHit[] {
  const positive = buildPositive(items).toLowerCase();
  return conflictPairs
    .filter(([a, b]) => positive.includes(a) && positive.includes(b))
    .map(([a, b]) => ({
      terms: [a, b],
      message: ui[locale].conflict(a, b)
    }));
}

function buildWarnings(items: CartItem[], conflictHits: ConflictHit[], locale: Locale) {
  const warnings: { type: "danger" | "warning" | "ok"; text: string }[] = [];
  for (const category of singleFocus) {
    if (items.filter((item) => item.category === category).length > 1) {
      warnings.push({ type: "warning", text: ui[locale].multiple(categoryText(category, locale)) });
    }
  }
  for (const hit of conflictHits) warnings.push({ type: "danger", text: hit.message });
  if (buildPositive(items).length > 900) warnings.push({ type: "warning", text: ui[locale].tooLong });
  if (!warnings.length) warnings.push({ type: "ok", text: ui[locale].ok });
  return warnings;
}

function highlightConflicts(text: string, hits: ConflictHit[]) {
  if (!hits.length || !text) return text;
  const terms = hits.flatMap((hit) => hit.terms).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(pattern).map((part, index) =>
    terms.some((term) => term.toLowerCase() === part.toLowerCase()) ? (
      <mark className="conflict-mark" key={`${part}-${index}`}>{part}</mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
}

type PromptBuilderProps = {
  locale?: Locale;
};

export default function PromptBuilder({ locale = "en" }: PromptBuilderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("pose");
  const copyText = builderCopy[locale];

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
  const conflictHits = useMemo(() => findConflictHits(items, locale), [items, locale]);
  const warnings = useMemo(() => buildWarnings(items, conflictHits, locale), [items, conflictHits, locale]);
  const activeGroup = libraryGroups.find((group) => group.category === activeCategory) ?? libraryGroups[1];
  const activeGroupText = groupText(activeGroup, locale);
  const activeCategoryName = categoryText(activeGroup.category, locale);

  const addFragment = (fragment: PromptFragment) => {
    const exists = items.some((item) => item.id === fragment.id);
    const next = exists ? items.filter((item) => item.id !== fragment.id) : [...items, fragment];
    setItems(next);
    writeCart(next);
  };

  const clearCart = () => {
    setItems([]);
    writeCart([]);
  };

  const updateItem = (id: string, editedText: string) => {
    const next = items.map((item) => (item.id === id ? { ...item, editedText } : item));
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
    <section className="builder-workspace">
      <div className="section-heading">
        <p className="eyebrow">AI Image Prompt Generator</p>
        <h1>{copyText.heading}</h1>
        <p className="lead">{copyText.lead}</p>
      </div>

      <div className="builder-generator">
        <aside className="library-sidebar">
          {libraryGroups.map((group) => {
            const text = groupText(group, locale);
            return (
              <button
                className={group.category === activeCategory ? "is-active" : ""}
                type="button"
                key={group.category}
                onClick={() => setActiveCategory(group.category)}
              >
                <span>{text.title}</span>
                <small>{group.fragments.length} {ui[locale].items}</small>
              </button>
            );
          })}
        </aside>

        <section className="library-panel">
          <div className="section-heading">
            <p className="eyebrow">{activeCategoryName}</p>
            <h2>{activeGroupText.title}</h2>
            <p className="muted">{activeGroupText.description}</p>
            <p className="sample-brief">{ui[locale].groupNoteLabel}: {activeGroupText.summary}</p>
          </div>
          <div className="library-fragment-grid">
            {activeGroup.fragments.map((fragment) => {
              const selected = items.some((item) => item.id === fragment.id);
              const text = fragmentText(fragment, locale);
              return (
                <article className={selected ? "library-fragment is-selected" : "library-fragment"} key={fragment.id}>
                  <div>
                    <strong>{text.label}</strong>
                    <p>{text.description}</p>
                  </div>
                  <button type="button" onClick={() => addFragment(fragment)}>
                    {selected ? ui[locale].remove : ui[locale].add}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="builder-output">
          <section className="warning-panel">
            <div className="prompt-output-head">
              <h2>{ui[locale].promptChecks}</h2>
              <button type="button" onClick={clearCart}>{ui[locale].clear}</button>
            </div>
            <ul>{warnings.map((warning) => <li className={`check-${warning.type}`} key={warning.text}>{warning.text}</li>)}</ul>
          </section>
          <section className="prompt-output">
            <h2>{ui[locale].positive}</h2>
            <div className="prompt-preview">{highlightConflicts(positive || ui[locale].emptyPrompt, conflictHits)}</div>
            <textarea rows={7} value={positive} readOnly />
            <button className="button secondary" type="button" onClick={() => copy(positive)}>{ui[locale].copyPositive}</button>
          </section>
          <section className="prompt-output">
            <h2>{ui[locale].negative}</h2>
            <textarea rows={4} value={negative} readOnly />
            <button className="button secondary" type="button" onClick={() => copy(negative)}>{ui[locale].copyNegative}</button>
          </section>
          <section className="prompt-output">
            <h2>{ui[locale].parameters}</h2>
            <textarea rows={5} value={parameters} readOnly />
            <button className="button secondary" type="button" onClick={() => copy(parameters)}>{ui[locale].copyParameters}</button>
            <button className="button secondary" type="button" onClick={() => copy(`Positive Prompt:\n${positive}\n\nNegative Prompt:\n${negative}\n\nParameters:\n${parameters}`)}>{ui[locale].copyAll}</button>
          </section>
        </aside>
      </div>

      <section className="content-section">
        <div className="section-heading">
          <h2>{ui[locale].modelSlots}</h2>
          <p className="muted">{ui[locale].modelSlotsLead}</p>
        </div>
        <div className="model-grid">
          {modelRecommendations.map((model) => (
            <article className="model-card" key={model.id}>
              <img className="model-thumb" src={model.sampleImage} alt={`${model.name} sample cover`} loading="lazy" />
              <span className="category-badge">{model.type}</span>
              <h3>{model.name}</h3>
              <p>{model.bestFor.join(" / ")}</p>
              <small>{model.promptStyle}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="builder-groups">
        <h2>{ui[locale].basket}</h2>
        {allGroups.map((category) => {
          const group = items.filter((item) => item.category === category);
          if (!group.length) return null;
          return (
            <section className="builder-group" id={`builder-${category}`} key={category}>
              <h3>{categoryText(category, locale)}</h3>
              {group.map((item) => (
                <article className="builder-fragment" key={item.id}>
                  <strong>{fragmentText(item, locale).label}</strong>
                  <span>{ui[locale].source}</span>
                  <textarea rows={3} value={textOf(item)} onChange={(event) => updateItem(item.id, event.currentTarget.value)} />
                  <button type="button" onClick={() => removeItem(item.id)}>{ui[locale].remove}</button>
                </article>
              ))}
            </section>
          );
        })}
      </section>
    </section>
  );
}
