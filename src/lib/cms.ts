import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import type { PromptCategory, PromptFragment, PromptRecipe } from "@/lib/promptCart";

export type CmsCollectionName = "articles" | "guides" | "workflows" | "products" | "case-studies" | "services" | "tools";

function byTitle<T extends { data: { title: string } }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.data.title.localeCompare(b.data.title));
}

function byDate<T extends { data: { date?: Date } }>(items: T[]): T[] {
  return [...items].sort((a, b) => Number(b.data.date ?? 0) - Number(a.data.date ?? 0));
}

function fragmentFromEntry(recipe: CollectionEntry<"recipes">, fragment: CollectionEntry<"recipes">["data"]["breakdownFragments"][number], index: number): PromptFragment {
  return {
    id: `${recipe.slug}-${fragment.category}-${index}`,
    category: fragment.category as PromptCategory,
    label: fragment.label,
    text: fragment.text,
    sourceRecipeSlug: recipe.slug,
    sourceRecipeTitle: recipe.data.title,
    tags: [fragment.category, ...recipe.data.tags.slice(0, 2)]
  };
}

export function recipeEntryToPromptRecipe(entry: CollectionEntry<"recipes">): PromptRecipe {
  return {
    title: entry.data.title,
    slug: entry.slug,
    category: entry.data.category,
    tags: entry.data.tags,
    image: entry.data.coverImage ?? "/images/recipes/example-01.webp",
    shortDescription: entry.data.shortDescription,
    description: entry.data.description,
    positivePrompt: entry.data.positivePrompt,
    negativePrompt: entry.data.negativePrompt,
    modelNotes: entry.data.modelNotes,
    parameters: entry.data.parameters,
    breakdown: entry.data.breakdownFragments.map((fragment, index) => fragmentFromEntry(entry, fragment, index)),
    variations: entry.data.variations.map((fragment, index) => fragmentFromEntry(entry, fragment, index)),
    commonMistakes: entry.data.commonMistakes,
    suitableUses: entry.data.suitableUses,
    relatedRecipes: entry.data.relatedRecipes
  };
}

export async function getCmsRecipes(): Promise<PromptRecipe[]> {
  const entries = await getCollection("recipes");
  return byTitle(entries).map(recipeEntryToPromptRecipe);
}

export async function getCmsRecipe(slug: string): Promise<PromptRecipe | undefined> {
  const recipes = await getCmsRecipes();
  return recipes.find((recipe) => recipe.slug === slug);
}

export async function getCmsGuides() {
  return byDate(await getCollection("guides"));
}

export async function getCmsArticles() {
  return byDate(await getCollection("articles"));
}

export async function getCmsWorkflows() {
  return byTitle(await getCollection("workflows"));
}

export async function getCmsProducts() {
  return byTitle(await getCollection("products"));
}

export async function getCmsCaseStudies() {
  return byTitle(await getCollection("case-studies"));
}

export async function getCmsServices() {
  return byTitle(await getCollection("services"));
}

export async function getCmsTools() {
  return byTitle(await getCollection("tools"));
}

