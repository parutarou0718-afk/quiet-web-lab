import { defineCollection, z } from "astro:content";

const stringArray = z.array(z.string()).default([]);
const promptFragment = z.object({
  category: z.enum(["subject", "pose", "action", "clothing", "scene", "camera", "lighting", "mood", "style", "quality", "negative", "parameters"]),
  label: z.string(),
  text: z.string()
});

const datedContent = {
  title: z.string(),
  description: z.string(),
  coverImage: z.string().optional(),
  date: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default("Quiet Web Lab"),
  category: z.string(),
  tags: stringArray
};

export const collections = {
  site: defineCollection({
    type: "data",
    schema: z.object({
      featuredTools: stringArray,
      featuredServices: stringArray,
      featuredWorkflows: stringArray,
      featuredProducts: stringArray,
      featuredCaseStudies: stringArray
    })
  }),
  articles: defineCollection({
    type: "content",
    schema: z.object(datedContent)
  }),
  guides: defineCollection({
    type: "content",
    schema: z.object(datedContent)
  }),
  recipes: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      shortDescription: z.string(),
      coverImage: z.string().optional(),
      category: z.string(),
      tags: stringArray,
      positivePrompt: z.string(),
      negativePrompt: z.string(),
      parameters: z.string(),
      modelNotes: z.string(),
      breakdownFragments: z.array(promptFragment).default([]),
      variations: z.array(promptFragment).default([]),
      commonMistakes: stringArray,
      suitableUses: stringArray,
      relatedRecipes: stringArray
    })
  }),
  workflows: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      coverImage: z.string().optional(),
      problem: z.string(),
      solution: z.string(),
      toolsInvolved: stringArray,
      output: z.string(),
      businessUse: z.string(),
      status: z.enum(["draft", "demo", "published"]).default("demo")
    })
  }),
  products: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      coverImage: z.string().optional(),
      productType: z.string(),
      pricePlaceholder: z.string(),
      status: z.enum(["planning", "preview", "available"]).default("preview"),
      includedItems: stringArray,
      targetUsers: stringArray,
      callToAction: z.string()
    })
  }),
  "case-studies": defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      coverImage: z.string().optional(),
      status: z.enum(["demo", "draft", "published"]).default("demo"),
      context: z.string(),
      problem: z.string(),
      workflow: z.string(),
      tools: stringArray,
      output: z.string(),
      businessValue: z.string(),
      disclaimer: z.string()
    })
  }),
  services: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      targetUsers: stringArray,
      deliverables: stringArray,
      exampleScenarios: stringArray
    })
  }),
  tools: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      coverImage: z.string().optional(),
      status: z.enum(["live", "beta", "planned"]).default("live"),
      toolUrl: z.string(),
      category: z.string(),
      targetUsers: stringArray,
      monetizationModel: z.string()
    })
  })
};


