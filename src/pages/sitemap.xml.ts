import { categories } from "@/data/categories";
import { guides, loraGuides } from "@/data/articles";
import { publishedNews } from "@/data/news";
import { recipes } from "@/data/recipes";
import { canonicalUrl } from "@/config/site";

const pages = [
  "/",
  "/zh/",
  "/ja/",
  "/models/",
  "/zh/models/",
  "/ja/models/",
  "/builder/",
  "/zh/builder/",
  "/ja/builder/",
  "/news/",
  "/zh/news/",
  "/ja/news/",
  "/recipes/",
  "/guides/",
  "/lora/",
  "/about/",
  "/privacy/",
  "/contact/",
  "/terms/",
  "/disclaimer/",
  ...recipes.map((recipe) => `/recipes/${recipe.slug}/`),
  ...publishedNews.map((post) => `/news/${post.slug}/`),
  ...categories.map((category) => `/categories/${category.slug}/`),
  ...guides.map(([slug]) => `/guides/${slug}/`),
  ...loraGuides.map(([slug]) => `/lora/${slug}/`)
];

export function GET(): Response {
  const urls = pages
    .map(
      (page) => `
  <url>
    <loc>${canonicalUrl(page)}</loc>
  </url>`
    )
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
