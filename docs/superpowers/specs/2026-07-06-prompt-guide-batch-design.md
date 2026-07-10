# Prompt Guide Batch Design

## Goal

Add ten English prompt-writing guides to the existing Astro content collection at `src/content/guides/`, with article-specific local cover images and no changes to the existing builder, recipes, tools, or guide routing.

## Approach

Each guide is a Markdown content entry using the existing `guides` collection schema: `title`, `description`, `coverImage`, `date`, `updatedDate`, `author`, `category`, and `tags`.

The existing `/guides/` index and `/guides/[slug]/` detail page already read from the content collection, so no route or component changes are required. The sitemap generator also reads the collection, so new guide URLs are included automatically.

## Visual Assets

Openmontage is not available in the current Codex tool/plugin environment. To avoid external image licensing, hotlinking, and deployment stability issues, the covers are generated locally, converted to WebP, and stored under `public/images/covers/`.

## Constraints

- Do not delete or alter existing content.
- Do not modify `/builder/`, `/recipes/`, `/guides/` routing, `/lora/`, or the two existing tool pages.
- Keep the site deployable on Cloudflare Pages.
- Run `npm run build` after the content batch is added.
