---
title: "Marketplace Crowd Scene"
description: "A crowd-safe scene recipe that keeps characters generic and the composition readable. Use this recipe as a modular prompt lesson with reusable fragments for safe AI image generation."
shortDescription: "A crowd-safe scene recipe that keeps characters generic and the composition readable."
coverImage: "/images/recipes/example-09.webp"
category: "scene"
tags: ["crowd", "market", "environment"]
positivePrompt: |
  busy fantasy marketplace with original background characters, many small readable silhouettes, no single celebrity likeness, vendors arranging fruit, shoppers walking, banners moving, varied modest travel clothing, aprons, cloaks, hats, crowded marketplace, stalls, baskets, fabric awnings, wide shot from slightly elevated angle, bright daytime, soft shadows under awnings, lively, friendly, colorful community feeling, detailed environment illustration, organized crowd composition, clean composition, coherent anatomy, detailed materials, balanced colors, polished illustration
negativePrompt: |
  low quality, blurry, extra fingers, deformed hands, unreadable details, harsh artifacts, watermark, text overlay
parameters: |
  aspect ratio: 4:5
  steps: 28
  CFG scale: 6.5
  sampler: DPM++ 2M
modelNotes: "Works best as an all-ages illustration prompt. Keep character names fictional, avoid brand names, and revise one prompt group at a time."
breakdownFragments:
  - category: "subject"
    label: "Subject"
    text: |
      busy fantasy marketplace with original background characters
  - category: "pose"
    label: "Pose"
    text: |
      many small readable silhouettes, no single celebrity likeness
  - category: "action"
    label: "Action"
    text: |
      vendors arranging fruit, shoppers walking, banners moving
  - category: "clothing"
    label: "Clothing and materials"
    text: |
      varied modest travel clothing, aprons, cloaks, hats
  - category: "scene"
    label: "Scene"
    text: |
      crowded marketplace, stalls, baskets, fabric awnings
  - category: "camera"
    label: "Camera angle"
    text: |
      wide shot from slightly elevated angle
  - category: "lighting"
    label: "Lighting"
    text: |
      bright daytime, soft shadows under awnings
  - category: "mood"
    label: "Mood"
    text: |
      lively, friendly, colorful community feeling
  - category: "style"
    label: "Style direction"
    text: |
      detailed environment illustration, organized crowd composition
  - category: "quality"
    label: "Quality tags"
    text: |
      clean composition, coherent anatomy, detailed materials, balanced colors, polished illustration
  - category: "negative"
    label: "Negative prompt"
    text: |
      low quality, blurry, extra fingers, deformed hands, unreadable details, harsh artifacts, watermark, text overlay
  - category: "parameters"
    label: "Starter parameters"
    text: |
      aspect ratio: 4:5
      steps: 28
      CFG scale: 6.5
      sampler: DPM++ 2M
variations:
  - category: "lighting"
    label: "Variation: golden hour"
    text: |
      golden hour rim light, warm edge highlights, soft long shadows
  - category: "style"
    label: "Variation: watercolor"
    text: |
      watercolor illustration, textured paper grain, gentle color washes
  - category: "camera"
    label: "Variation: wider framing"
    text: |
      wide shot, more background context, subject placed on rule-of-thirds line
commonMistakes: ["Combining close-up and full body framing in the same prompt.", "Adding many style directions that fight for visual priority.", "Using vague words such as beautiful without concrete visual detail."]
suitableUses: ["Prompt practice", "Character or scene ideation", "Builder fragment library", "Safe tutorial examples"]
relatedRecipes: ["dynamic-samurai-training-pose", "traveler-rainy-old-street", "cozy-study-room-character-scene"]
---

Use this recipe as a modular prompt lesson. Start with the subject, add one readable pose, then layer clothing, scene, camera, lighting, mood, and style. The prompt fragments stay in English so they can be copied directly into most image models.
