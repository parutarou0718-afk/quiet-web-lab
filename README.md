# Quiet Web Lab

Quiet Web Lab is a static Astro hub that hosts two browser-first products in one Cloudflare Pages-ready repository:

- **Mini Games**: starting with `/games/link-match/`, a playable Link Match Puzzle with reusable TypeScript game logic.
- **AI Image Prompt Atlas**: prompt recipes, prompt categories, a localStorage prompt cart, a React island prompt builder, and LoRA learning pages.

The project is static by default. It does not require a database, login system, backend server, or paid service.

## Local Development

This workspace includes a local Node runtime under `.tools/node-v20.19.4-win-x64`. New terminal windows should recognize `node` and `npm` because the user PATH has been updated. If an older terminal does not, run:

```powershell
$env:PATH=(Join-Path (Get-Location) '.tools\node-v20.19.4-win-x64') + ';' + $env:PATH
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Build output is generated in `dist/`:

```powershell
npm run build
```

## Cloudflare Pages

Use these settings:

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 20.19 or newer

## Main Routes

- `/`: main hub landing page
- `/games/link-match/`: Link Match Puzzle
- `/recipes/`: AI image prompt recipe library
- `/builder/`: prompt builder
- `/guides/`: prompt writing guides
- `/lora/`: LoRA learning pages
- `/about/`, `/privacy/`, `/terms/`, `/disclaimer/`, `/contact/`
- `/sitemap.xml`, `/robots.txt`

## Project Structure

- `src/games/link-match/`: game rules, board generation, pathfinding, hints, and shuffle logic.
- `src/components/LinkMatchGame.astro`: game UI wrapper.
- `src/data/recipes.ts`: prompt recipe data, full prompts, fragments, variations, mistakes, and related recipes.
- `src/data/categories.ts`: category metadata for category landing pages.
- `src/data/articles.ts`: guide and LoRA article indexes.
- `src/lib/promptCart.ts`: shared Prompt Cart and recipe types.
- `src/lib/promptCompose.ts`: positive, negative, and parameter composition helpers.
- `src/lib/promptConflict.ts`: conflict and duplicate warning rules.
- `src/components/PromptBuilder.tsx`: React island builder UI.
- `src/components/PromptCartDrawer.astro`: site-wide prompt cart drawer.
- `src/config/site.ts`: site name, URL, analytics, and AdSense configuration.

## Adding A Mini Game

1. Create a folder under `src/games/your-game/`.
2. Keep reusable game logic in TypeScript modules.
3. Add a UI component in `src/components/`.
4. Add a route under `src/pages/games/your-game/index.astro`.
5. Add the route to `src/pages/sitemap.xml.ts`.
6. Link it from the main hub or a future games index page.

## Adding Prompt Content

Add a new seed object in `src/data/recipes.ts` with title, slug, category, tags, subject, pose, action, clothing, scene, camera, lighting, mood, style, and short description. The helper builds the full prompt, breakdown fragments, variations, negative prompt, and parameters.

Guides are indexed in `src/data/articles.ts`, with matching Astro pages under `src/pages/guides/` or `src/pages/lora/`.

## AdSense And Analytics

Configure provider IDs in `src/config/site.ts`:

- `adsenseClientId`
- `adsenseSlotId`
- `analyticsId`
- `analyticsEnabled`

IDs are empty by default. Placeholder ad components are present, but live ad code is not included.

## SEO Checklist

- Update `siteUrl` in `src/config/site.ts`.
- Replace placeholder recipe images with licensed or original assets.
- Run `npm run build`.
- Confirm `dist/sitemap.xml` includes the main hub, game pages, recipes, guides, LoRA pages, categories, and base pages.
