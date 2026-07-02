export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  publishDate?: string;
  category: "Generation Notes" | "Model Test" | "Prompt Update" | "Workflow";
  description: string;
  heroImage?: string;
  takeaways: string[];
  body: string[];
  relatedLinks: { label: string; href: string }[];
};

export const newsPosts: NewsPost[] = [
  {
    slug: "eastern-culture-sample-set",
    title: "Building the First Eastern Culture Prompt Sample Set",
    date: "2026-07-02",
    category: "Generation Notes",
    description:
      "A production note about preparing mahjong, tea ceremony, yukata, qipao, shrine, calligraphy, and lantern street samples for the prompt library.",
    heroImage: "/images/model-comparison/b02-meinahentai.png",
    takeaways: [
      "Mahjong and tea ceremony samples are useful for testing hand quality and object coherence.",
      "Yukata, qipao, shrine, and lantern street images give the site a clearer East Asian visual direction.",
      "Public sample galleries should avoid fake text, overly cropped bodies, and repeated character faces."
    ],
    body: [
      "Today we prepared the first usable Eastern culture image sample batch for the prompt library. The goal was not to create a perfect art gallery, but to build practical examples that explain prompt fragments visually. A good sample image should make the prompt category obvious at a glance: mahjong table, tea ceremony, hanfu garden, yukata festival, qipao street portrait, calligraphy desk, shrine steps, lantern festival, or ink painting room.",
      "The most useful samples were the ones with clear scenes and restrained composition. Mahjong and calligraphy prompts can easily create unreadable symbols or awkward hands, so only the cleaner outputs should be used in public pages. Tea ceremony and shrine scenes were more stable because the model could lean on strong room, floor, and lighting patterns.",
      "This batch will support future prompt cards, category pages, and the builder interface. The next step is to connect selected images to individual prompt fragments so users can choose prompts by looking at real output examples instead of abstract text alone."
    ],
    relatedLinks: [
      { label: "Open Prompt Builder", href: "/builder/" },
      { label: "Browse Models", href: "/models/" }
    ]
  },
  {
    slug: "local-model-comparison-first-pass",
    title: "First Local Model Comparison: Anime, 2.5D, and Realistic Checkpoints",
    date: "2026-07-02",
    category: "Model Test",
    description:
      "A first pass comparing four local checkpoints with the same five prompt groups for classroom, hanfu, interior, rainy street, and portrait outputs.",
    heroImage: "/images/model-comparison/b05-japaneseStyleRealistic-v20.png",
    takeaways: [
      "The anime checkpoints are better for consistent prompt-library character cards.",
      "Realistic checkpoints are strongest in portrait and fashion-like samples.",
      "No-person scenes are the safest model comparison rows because composition is easier to judge."
    ],
    body: [
      "The first model comparison page now uses four local checkpoints with the same five prompt groups: a classroom character, an Eastern culture outfit, a warm study room, a rainy lantern street, and a window light portrait. Keeping the same prompt group and picked image number makes the comparison easier to read.",
      "The anime-oriented models are stronger when the site needs reusable character samples. They keep the illustrated style readable, and the outputs are easier to connect with prompt fragments. The realistic models show their advantage in portraits, camera language, skin rendering, and soft fashion lighting.",
      "For future updates, the comparison should grow slowly. A useful model page does not need every checkpoint or every seed. It needs enough stable examples for a visitor to decide which model fits their own prompt goal."
    ],
    relatedLinks: [
      { label: "View Model Comparison", href: "/models/" },
      { label: "Read Prompt Guides", href: "/guides/" }
    ]
  }
];

function buildDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isPublished(post: NewsPost, currentDate = buildDate()): boolean {
  return (post.publishDate ?? post.date) <= currentDate;
}

export const publishedNews = newsPosts.filter((post) => isPublished(post));

export const latestNews = [...publishedNews].sort((a, b) => {
  const bDate = b.publishDate ?? b.date;
  const aDate = a.publishDate ?? a.date;
  return bDate.localeCompare(aDate);
});
