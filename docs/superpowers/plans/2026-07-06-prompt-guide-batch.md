# Prompt Guide Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add ten English prompt guide articles with local cover assets to the existing Astro guides collection.

**Architecture:** The site already uses Astro content collections for guides. This plan only adds Markdown entries and WebP cover assets; existing pages automatically render the new entries and include them in the sitemap.

**Tech Stack:** Astro 5, TypeScript, Astro content collections, Markdown, static WebP assets.

## Global Constraints

- Do not delete existing content.
- Do not modify existing builder, recipes, lora, tools, or guide page behavior.
- Use local assets instead of remote image URLs.
- Verify with `npm run build`.

---

### Task 1: Add Guide Cover Assets

**Files:**
- Create: `public/images/covers/guide-lighting-prompts.webp`
- Create: `public/images/covers/guide-background-scenes.webp`
- Create: `public/images/covers/guide-color-palettes.webp`
- Create: `public/images/covers/guide-props-objects.webp`
- Create: `public/images/covers/guide-character-consistency.webp`
- Create: `public/images/covers/guide-product-image-prompts.webp`
- Create: `public/images/covers/guide-overloaded-prompts.webp`
- Create: `public/images/covers/guide-texture-materials.webp`
- Create: `public/images/covers/guide-interior-spaces.webp`
- Create: `public/images/covers/guide-seasonal-prompts.webp`

**Interfaces:**
- Produces: local cover paths referenced by the guide frontmatter.

- [x] Generate the ten cover images with the built-in image generation tool.
- [x] Copy the generated images into `public/images/covers/`.
- [x] Convert the project copies to WebP.
- [x] Remove temporary PNG copies from the project.

### Task 2: Add Guide Markdown Entries

**Files:**
- Create: `src/content/guides/how-to-describe-lighting-in-ai-image-prompts.md`
- Create: `src/content/guides/how-to-build-clear-backgrounds-and-scenes.md`
- Create: `src/content/guides/how-to-use-color-palettes-in-ai-image-prompts.md`
- Create: `src/content/guides/how-to-describe-props-and-small-objects.md`
- Create: `src/content/guides/how-to-keep-character-prompts-consistent.md`
- Create: `src/content/guides/how-to-write-product-image-prompts.md`
- Create: `src/content/guides/how-to-fix-overloaded-ai-image-prompts.md`
- Create: `src/content/guides/how-to-describe-texture-and-materials.md`
- Create: `src/content/guides/how-to-write-prompts-for-interior-spaces.md`
- Create: `src/content/guides/how-to-write-seasonal-ai-image-prompts.md`

**Interfaces:**
- Consumes: the existing `guides` collection schema in `src/content/config.ts`.
- Produces: ten new guide routes under `/guides/[slug]/`.

- [ ] Add each guide with the supplied title, slug, category, meta description, excerpt-like opening copy, body, tags, and local cover image.
- [ ] Use `date: 2026-07-06` and `updatedDate: 2026-07-06`.
- [ ] Keep `category: "Prompt Guide"` and `author: "Quiet Web Lab"`.

### Task 3: Verify Static Build

**Files:**
- No source edits expected.

**Interfaces:**
- Consumes: all new content and assets.
- Produces: a fresh Astro build result.

- [ ] Run `npm run build`.
- [ ] Confirm the command exits with code 0.
- [ ] Inspect git status for the final changed file list.
