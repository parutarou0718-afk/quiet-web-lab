---
title: "Adventurer Backpack Gear Layout"
description: "A prop-layout recipe that helps describe objects, spacing, and camera clarity. Use this recipe as a modular prompt lesson with reusable fragments for safe AI image generation."
shortDescription: "A prop-layout recipe that helps describe objects, spacing, and camera clarity."
coverImage: "/images/recipes/example-07.webp"
category: "style"
tags: ["props", "gear", "layout"]
positivePrompt: |
  flat lay of a fictional adventurer backpack and safe travel gear, organized grid layout from above, items arranged for visual inspection, folded cloak, gloves, soft scarf, sturdy belt pouch, wood table with map, compass, sketchbook, water flask, top-down orthographic view, full object visibility, bright diffuse studio light, prepared, practical, inviting, clean inventory illustration, readable item design, clean composition, coherent anatomy, detailed materials, balanced colors, polished illustration
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
      flat lay of a fictional adventurer backpack and safe travel gear
  - category: "pose"
    label: "Pose"
    text: |
      organized grid layout from above
  - category: "action"
    label: "Action"
    text: |
      items arranged for visual inspection
  - category: "clothing"
    label: "Clothing and materials"
    text: |
      folded cloak, gloves, soft scarf, sturdy belt pouch
  - category: "scene"
    label: "Scene"
    text: |
      wood table with map, compass, sketchbook, water flask
  - category: "camera"
    label: "Camera angle"
    text: |
      top-down orthographic view, full object visibility
  - category: "lighting"
    label: "Lighting"
    text: |
      bright diffuse studio light
  - category: "mood"
    label: "Mood"
    text: |
      prepared, practical, inviting
  - category: "style"
    label: "Style direction"
    text: |
      clean inventory illustration, readable item design
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
