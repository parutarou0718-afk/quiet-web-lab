# Needed Image List and ComfyUI Prompts

This file lists the next images that are most useful for the AI prompt site. Use the same negative prompt for all first-pass generations unless a prompt says otherwise.

## Shared Settings

- Checkpoint: `meinamix_v5Final` for the main anime sample set
- Size: `512x768` or `640x960` for character images
- Size: `768x512` or `960x640` for scene images
- Steps: `24`
- CFG: `6.5`
- Sampler: `DPM++ 2M Karras`
- Seed: fixed inside each comparison group
- Hires fix: off for first pass
- LoRA: none for public sample consistency

## Shared Negative Prompt

```text
low quality, blurry, worst quality, lowres, bad anatomy, bad hands, extra fingers, missing fingers, fused fingers, deformed hands, mutated fingers, extra arms, extra legs, duplicated limbs, long neck, broken legs, cropped head, cut off feet, out of frame, watermark, text, logo, signature, jpeg artifacts, messy composition, multiple girls, crowd, duplicate character
```

## Priority List

1. Eastern culture character samples
2. Same-prompt model comparison samples
3. Clean style samples without fake text
4. Pose/camera/action samples for the prompt basket

## A. Eastern Culture Character Samples

Generate 2 images for each prompt. Pick the cleaner one.

### A01 Mahjong Table

```text
masterpiece, best quality, anime illustration, one young woman sitting at a mahjong table, traditional Chinese mahjong tiles arranged neatly, warm indoor lantern light, calm focused expression, modest elegant outfit, detailed hands, clean composition, soft shadows, no text
```

### A02 Tea Ceremony

```text
masterpiece, best quality, anime illustration, one young woman preparing tea in a quiet tatami room, Japanese tea ceremony setting, ceramic tea bowl, bamboo whisk, shoji screen, warm afternoon sunlight, graceful posture, detailed hands, clean composition, no text
```

### A03 Hanfu Garden

```text
masterpiece, best quality, anime illustration, one young woman wearing elegant hanfu in a classical Chinese garden, moon gate, stone path, bamboo and plum blossoms, flowing sleeves, peaceful expression, refined colors, full body, clean background, no text
```

### A04 Yukata Summer Festival

```text
masterpiece, best quality, anime illustration, one young woman wearing a yukata at a summer festival, paper lanterns, festival stalls softly blurred in background, holding a small fan, evening glow, full body, cheerful but natural expression, no text
```

### A05 Qipao Street Portrait

```text
masterpiece, best quality, anime illustration, one young woman wearing a modern elegant qipao, old Shanghai inspired street, warm shop lights, tasteful pose, full body, clean composition, detailed fabric pattern, no text, no logo
```

### A06 Calligraphy Desk

```text
masterpiece, best quality, anime illustration, one young woman practicing calligraphy at a wooden desk, brush, ink stone, rice paper, quiet study room, traditional East Asian interior, focused expression, detailed hands, no readable text, clean composition
```

### A07 Shrine Steps

```text
masterpiece, best quality, anime illustration, one young woman standing near shrine steps, torii gate in background, autumn leaves, soft morning light, modest casual clothing with traditional accessory, full body, clean composition, no text
```

### A08 Lantern Festival

```text
masterpiece, best quality, anime illustration, one young woman walking under red lanterns at night, traditional street, warm lantern glow, soft reflections, elegant pose, full body, cinematic lighting, clean composition, no text
```

### A09 Ink Painting Room

```text
masterpiece, best quality, anime illustration, one young woman in a quiet room with hanging ink paintings, wooden furniture, ceramic vase, bamboo shadow, soft light, half body portrait, calm mature mood, no text, clean composition
```

## B. Same-Prompt Model Comparison Samples

Use the exact same positive prompt, negative prompt, size, seed, steps, sampler, and CFG for every checkpoint in the group. Run these on:

- `meinamix_v5Final`
- `DarkSushiMix-2.25D`
- `majicmixRealistic_v7`
- `japaneseStyleRealistic_v20`
- Optional only if patient: `Illustrious-XL-v1.0`

### B01 Character Baseline

```text
masterpiece, best quality, one young woman standing in a sunlit classroom, cardigan, pleated skirt, natural pose, full body, soft anime lighting, clean composition, detailed face, detailed hands, no text
```

### B02 Eastern Culture Baseline

```text
masterpiece, best quality, one young woman wearing hanfu in a classical garden, moon gate, bamboo, warm sunlight, full body, elegant pose, clean composition, detailed fabric, no text
```

### B03 Interior Scene Baseline

```text
masterpiece, best quality, cozy East Asian study room, wooden desk, bookshelves, window sunlight, tea cup, organized objects, warm atmosphere, no people, clean composition, no text
```

### B04 Night Street Baseline

```text
masterpiece, best quality, rainy narrow East Asian street at night, lanterns and shop lights, wet pavement reflections, cinematic composition, no people, no readable text, clean scene
```

### B05 Portrait Baseline

```text
masterpiece, best quality, close-up portrait of one young woman, soft window light, gentle expression, clean background, detailed eyes, detailed hair, tasteful anime style, no text
```

## C. Clean Style Samples

These replace the messy poster/ink experiments. Generate 2 each.

### C01 Clean Ink Wash

```text
masterpiece, best quality, clean anime character illustration with ink wash background, one young woman in simple hanfu, bamboo and mist, elegant brush texture, minimal composition, no calligraphy, no text, no logo
```

### C02 Watercolor

```text
masterpiece, best quality, soft watercolor anime illustration, one young woman holding a paper umbrella, light rain, traditional street, gentle pastel colors, clean composition, no text, no logo
```

### C03 Cel Shading

```text
masterpiece, best quality, clean cel shaded anime illustration, one young woman in yukata, summer festival lanterns, crisp line art, balanced colors, full body, no text, no logo
```

### C04 Editorial Poster Without Text

```text
masterpiece, best quality, anime editorial poster composition, one young woman in elegant qipao, red lanterns and geometric background shapes, strong silhouette, clean negative space, no text, no letters, no logo
```

## D. Prompt Basket Utility Samples

These are useful because users will choose pose, camera, lighting, and scene fragments.

### D01 Standing Pose

```text
masterpiece, best quality, one young woman standing naturally, full body, plain clean background, relaxed arms, visible hands, neutral expression, anime style, no text
```

### D02 Walking Pose

```text
masterpiece, best quality, one young woman walking forward on a quiet street, full body, natural stride, visible shoes, visible hands, anime style, clean composition, no text
```

### D03 Sitting Pose

```text
masterpiece, best quality, one young woman sitting at a wooden desk, reading a book, detailed hands, cozy room, soft window light, clean composition, no text
```

### D04 Over Shoulder

```text
masterpiece, best quality, one young woman looking back over her shoulder, half body, soft window light, clean classroom background, detailed face, detailed hair, no text
```

### D05 Low Angle

```text
masterpiece, best quality, one young woman standing under lanterns, low angle camera, dramatic but tasteful composition, full body, warm lighting, clean background, no text
```

### D06 Close-Up Portrait

```text
masterpiece, best quality, close-up anime portrait of one young woman, soft natural expression, warm indoor light, detailed eyes, clean background, no text
```

## What Is Still Missing After This

- Mahjong and tea ceremony images with clean, believable hands
- A clean hanfu/qipao/yukata set that does not look like the same person every time
- Model comparison images using the same seed and prompt
- Clean style examples without fake letters
- More horizontal scene images for page headers and article cards
