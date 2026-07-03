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
  "/zh/recipes/",
  "/ja/recipes/",
  "/guides/",
  "/zh/guides/",
  "/ja/guides/",
  "/lora/",
  "/zh/lora/",
  "/ja/lora/",
  "/about/",
  "/zh/about/",
  "/ja/about/",
  "/privacy/",
  "/zh/privacy/",
  "/ja/privacy/",
  "/contact/",
  "/zh/contact/",
  "/ja/contact/",
  "/terms/",
  "/zh/terms/",
  "/ja/terms/",
  "/disclaimer/",
  "/zh/disclaimer/",
  "/ja/disclaimer/",
  ...recipes.map((recipe) => `/recipes/${recipe.slug}/`),
  ...recipes.map((recipe) => `/zh/recipes/${recipe.slug}/`),
  ...recipes.map((recipe) => `/ja/recipes/${recipe.slug}/`),
  ...publishedNews.map((post) => `/news/${post.slug}/`),
  ...publishedNews.map((post) => `/zh/news/${post.slug}/`),
  ...publishedNews.map((post) => `/ja/news/${post.slug}/`),
  ...categories.map((category) => `/categories/${category.slug}/`),
  ...guides.map(([slug]) => `/guides/${slug}/`),
  ...guides.map(([slug]) => `/zh/guides/${slug}/`),
  ...guides.map(([slug]) => `/ja/guides/${slug}/`),
  ...loraGuides.map(([slug]) => `/lora/${slug}/`),
  ...loraGuides.map(([slug]) => `/zh/lora/${slug}/`),
  ...loraGuides.map(([slug]) => `/ja/lora/${slug}/`)
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
