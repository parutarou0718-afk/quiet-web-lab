# ComfyUI Sample Shot Prompts

This file is a production document for the prompt image library. Keep it in the repo. It can later feed the internal Image Lab page or be converted into structured data.

Use `meinamix_v5Final` first. Do not use a character LoRA for the public sample library. Keep the same seed, character, outfit, and background inside each comparison group. Change only the target variable.

## Shared Negative Prompt

Use this negative prompt for every sample unless a specific shot says otherwise.

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

## Shared Settings

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed inside each comparison group
hires fix: off for first pass
```

## Base Character

```text
1girl, original anime girl, youthful character, friendly expression, neat medium hair, soft cardigan, casual shirt, simple skirt, clean character design, full body, simple cozy study room background, anime-inspired clean illustration, crisp linework, polished color, coherent anatomy
```

## Pose Samples

### pose-standing.webp

Positive:

```text
1girl, original anime girl, standing pose, relaxed shoulders, arms naturally at sides, full body visible, balanced silhouette, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, eye level, anime-inspired clean illustration, crisp linework, polished color, coherent anatomy
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-pose
```

### pose-walking.webp

Positive:

```text
1girl, original anime girl, walking forward, natural stride, one foot stepping ahead, arms relaxed, full body visible, readable pose, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, eye level, anime-inspired clean illustration, crisp linework, polished color, coherent anatomy
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-pose
```

### pose-sitting.webp

Positive:

```text
1girl, original anime girl, sitting upright in a chair, hands resting naturally, readable seated posture, relaxed shoulders, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, eye level, anime-inspired clean illustration, crisp linework, polished color, coherent anatomy
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-pose
```

### pose-kneeling.webp

Positive:

```text
1girl, original anime girl, kneeling pose, one knee on the ground, calm balanced posture, hands relaxed, full body visible, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, eye level, anime-inspired clean illustration, crisp linework, polished color, coherent anatomy
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-pose
```

### pose-looking-back.webp

Positive:

```text
1girl, original anime girl, looking back over shoulder, three-quarter body twist, elegant silhouette, full body visible, relaxed posture, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, eye level, anime-inspired clean illustration, crisp linework, polished color, coherent anatomy
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-pose
```

### pose-dynamic-stance.webp

Positive:

```text
1girl, original anime girl, dynamic training stance, one foot forward, strong line of action, stable balance, arms raised in practice pose, full body visible, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, eye level, anime-inspired clean illustration, crisp linework, polished color, coherent anatomy
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-pose
```

## Camera Samples

### camera-full-body.webp

Positive:

```text
1girl, original anime girl, standing pose, full body view, head to toe visible, readable silhouette, centered composition, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-camera
```

### camera-medium-shot.webp

Positive:

```text
1girl, original anime girl, standing pose, medium shot, waist up, clear facial expression, relaxed shoulders, neat medium hair, soft cardigan, casual shirt, simple cozy study room background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-camera
```

### camera-close-up.webp

Positive:

```text
1girl, original anime girl, close-up portrait, 85mm lens feel, face and shoulders visible, soft background blur, friendly expression, neat medium hair, soft cardigan, simple cozy study room background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-camera
```

### camera-low-angle.webp

Positive:

```text
1girl, original anime girl, standing pose, low angle medium shot, dramatic but readable perspective, confident silhouette, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-camera
```

### camera-high-angle.webp

Positive:

```text
1girl, original anime girl, standing pose, slight high angle, looking down gently at the subject, readable body shape, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-camera
```

### camera-isometric.webp

Positive:

```text
small cozy study room, original anime girl standing inside the room, isometric camera, clean cutaway composition, readable scale, tidy bookshelves, desk lamp, soft cardigan, simple skirt, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, deformed body, bad anatomy, duplicated limbs, watermark, text, logo, jpeg artifacts, messy composition, warped room, broken perspective, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 768x768
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-camera
```

## Lighting Samples

### lighting-window.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, soft natural window lighting, gentle catchlights, soft shadows, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-lighting
```

### lighting-golden-hour.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, golden hour rim light, warm edge highlights, long soft shadows, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-lighting
```

### lighting-neon.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, blue and pink neon reflections, soft rain haze, cinematic contrast, neat medium hair, soft cardigan, casual shirt, simple skirt, quiet rainy street background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-lighting
```

### lighting-desk-lamp.webp

Positive:

```text
1girl, original anime girl, sitting upright at a desk, warm desk lamp, soft window fill light, cozy interior shadows, neat medium hair, soft cardigan, casual shirt, simple cozy study room background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-lighting
```

### lighting-overcast.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, overcast diffuse light, low contrast, gentle color transitions, neat medium hair, soft cardigan, casual shirt, simple skirt, quiet outdoor street background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-lighting
```

### lighting-studio.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, bright diffuse studio light, even illumination, clean material detail, plain light background, neat medium hair, soft cardigan, casual shirt, simple skirt, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-lighting
```

## Style Samples

### style-clean-anime.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, anime-inspired clean illustration, crisp linework, polished color, coherent anatomy
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-style
```

### style-semi-realistic.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, semi-realistic illustration, subtle skin shading, natural materials, balanced colors
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: DarkSushiMix-2.25D or meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-style
```

### style-storybook.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, cinematic storybook illustration, natural colors, gentle detail, warm atmosphere
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-style
```

### style-watercolor.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, neat medium hair, soft cardigan, casual shirt, simple skirt, simple cozy study room background, watercolor illustration, textured paper grain, gentle color washes, soft edges
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-style
```

### style-concept-art.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, neat medium hair, soft cardigan, casual shirt, simple skirt, plain background, character concept art, clear material notes, production-ready design, readable silhouette
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy composition, mutated fingers, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-style
```

### style-isometric-game.webp

Positive:

```text
small cozy study room with original anime girl, isometric camera, stylized isometric game asset illustration, readable scale, clean cutaway composition, tidy bookshelves, desk lamp, polished color
```

Negative:

```text
low quality, blurry, deformed body, bad anatomy, duplicated limbs, watermark, text, logo, jpeg artifacts, messy composition, warped room, broken perspective, poorly drawn face, poorly drawn hands
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 768x768
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-style
```

## Scene Samples

### scene-tea-house.webp

Positive:

```text
traditional tea house interior, no people, wood beams, paper screens, ceramic teapot, woven cushions, tidy shelves, morning sunlight, calm atmosphere, anime background illustration, clean composition, detailed materials, polished color
```

Negative:

```text
low quality, blurry, messy composition, broken perspective, warped architecture, floating objects, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 768x512 or 960x640
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-scene
```

### scene-rainy-street.webp

Positive:

```text
old stone street after rain, no people, lanterns, puddles, cozy shop windows, soft reflections, overcast evening, anime background illustration, clean composition, detailed materials, polished color
```

Negative:

```text
low quality, blurry, messy composition, broken perspective, warped architecture, floating objects, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 768x512 or 960x640
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-scene
```

### scene-study-room.webp

Positive:

```text
small cozy study room, no people, bookshelves, desk lamp, tidy notes, chair, curtain edge, warm desk light, anime background illustration, clean composition, detailed materials, polished color
```

Negative:

```text
low quality, blurry, messy composition, broken perspective, warped architecture, floating objects, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 768x512 or 960x640
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-scene
```

### scene-forest-path.webp

Positive:

```text
ancient forest path, no people, moss, ferns, soft shafts of light, quiet discovery mood, anime background illustration, clean composition, detailed natural materials, polished color
```

Negative:

```text
low quality, blurry, messy composition, broken perspective, warped trees, floating objects, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 768x512 or 960x640
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-scene
```

### scene-fantasy-workshop.webp

Positive:

```text
small fantasy craft workshop, no people, wooden shelves, jars, workbench, fabric rolls, tidy safe tools, warm lantern light, anime background illustration, clean composition, detailed materials, polished color
```

Negative:

```text
low quality, blurry, messy composition, broken perspective, warped architecture, floating objects, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 768x512 or 960x640
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-scene
```

### scene-marketplace.webp

Positive:

```text
friendly fantasy marketplace, background characters, stalls, baskets, fabric awnings, organized crowd, bright daytime, colorful community feeling, anime background illustration, clean composition, polished color
```

Negative:

```text
low quality, blurry, messy composition, broken perspective, warped architecture, floating objects, watermark, text, logo, jpeg artifacts, overexposed, underexposed, muddy colors, deformed crowd faces
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 768x512 or 960x640
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-scene
```

## Clothing Samples

### clothing-casual-cardigan.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, soft cardigan, casual shirt, simple skirt, neat hairstyle, plain light background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy clothing folds, broken outfit details
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-clothing
```

### clothing-keikogi.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, simple dark keikogi, hakama pants, tied waist belt, dojo-inspired plain background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy clothing folds, broken outfit details
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-clothing
```

### clothing-traveler-cloak.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, travel cloak, simple tunic, small satchel, sturdy boots, plain light background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy clothing folds, broken outfit details
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-clothing
```

### clothing-herbalist.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, layered linen tunic, herb satchel, apron pockets, simple cloak, plain light background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy clothing folds, broken outfit details
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-clothing
```

### clothing-long-coat.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, long coat, simple hat, messenger bag, practical boots, plain light background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy clothing folds, broken outfit details
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-clothing
```

### clothing-festival-outfit.webp

Positive:

```text
1girl, original anime girl, standing pose, full body visible, modest festival outfit, patterned sash, small hair ornament, soft fabric folds, plain light background, anime-inspired clean illustration, crisp linework, polished color
```

Negative:

```text
low quality, blurry, extra fingers, deformed hands, bad anatomy, bad hands, missing fingers, duplicated limbs, cropped head, cut off feet, watermark, text, logo, jpeg artifacts, messy clothing folds, broken outfit details
```

Settings:

```text
checkpoint: meinamix_v5Final
size: 512x768 or 640x960
steps: 24
cfg: 6.5
sampler: DPM++ 2M Karras
seed: fixed-clothing
```

