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

const newsModules = import.meta.glob("./newsPosts/*.json", { eager: true, import: "default" }) as Record<string, NewsPost>;

export const newsPosts: NewsPost[] = Object.values(newsModules).sort((a, b) => {
  const bDate = b.publishDate ?? b.date;
  const aDate = a.publishDate ?? a.date;
  return bDate.localeCompare(aDate);
});

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
