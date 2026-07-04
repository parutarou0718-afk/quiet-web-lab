import { getCollection } from "astro:content";
import { categories } from "@/data/categories";
import { loraGuides } from "@/data/articles";
import { publishedNews } from "@/data/news";
import { canonicalUrl } from "@/config/site";

const staticPages = [
  "/",
  "/zh/",
  "/ja/",
  "/tools/",
  "/services/",
  "/workflows/",
  "/products/",
  "/case-studies/",
  "/models/",
  "/zh/models/",
  "/ja/models/",
  "/builder/",
  "/zh/builder/",
  "/ja/builder/",
  "/news/",
  "/articles/",
  "/zh/articles/",
  "/ja/articles/",
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
  "/ja/disclaimer/"
];

async function cmsPages(): Promise<string[]> {
  const [recipes, guides, articles, tools, services, workflows, products, caseStudies] = await Promise.all([
    getCollection("recipes"),
    getCollection("guides"),
    getCollection("articles"),
    getCollection("tools"),
    getCollection("services"),
    getCollection("workflows"),
    getCollection("products"),
    getCollection("case-studies")
  ]);

  return [
    ...recipes.map((entry) => `/recipes/${entry.slug}/`),
    ...recipes.map((entry) => `/zh/recipes/${entry.slug}/`),
    ...recipes.map((entry) => `/ja/recipes/${entry.slug}/`),
    ...guides.map((entry) => `/guides/${entry.slug}/`),
    ...guides.map((entry) => `/zh/guides/${entry.slug}/`),
    ...guides.map((entry) => `/ja/guides/${entry.slug}/`),
    ...articles.map((entry) => `/articles/${entry.slug}/`),
    ...tools.map((entry) => `/tools/${entry.slug}/`),
    ...services.map((entry) => `/services/${entry.slug}/`),
    ...workflows.map((entry) => `/workflows/${entry.slug}/`),
    ...products.map((entry) => `/products/${entry.slug}/`),
    ...caseStudies.map((entry) => `/case-studies/${entry.slug}/`)
  ];
}

export async function GET(): Promise<Response> {
  const pages = [
    ...staticPages,
    ...(await cmsPages()),
    ...publishedNews.map((post) => `/news/${post.slug}/`),
    ...publishedNews.map((post) => `/zh/news/${post.slug}/`),
    ...publishedNews.map((post) => `/ja/news/${post.slug}/`),
    ...categories.map((category) => `/categories/${category.slug}/`),
    ...loraGuides.map(([slug]) => `/lora/${slug}/`),
    ...loraGuides.map(([slug]) => `/zh/lora/${slug}/`),
    ...loraGuides.map(([slug]) => `/ja/lora/${slug}/`)
  ];

  const urls = [...new Set(pages)]
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



