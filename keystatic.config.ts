import { collection, config, fields, singleton } from "@keystatic/core";

const coverImage = fields.image({
  label: "Cover image",
  directory: "public/images/covers",
  publicPath: "/images/covers"
});

const recipeImage = fields.image({
  label: "Recipe cover image",
  directory: "public/images/recipes",
  publicPath: "/images/recipes"
});

const bodyField = fields.mdx({
  label: "Body",
  extension: "md",
  options: {
    image: {
      directory: "public/images/content",
      publicPath: "/images/content"
    }
  }
});

const textList = (label: string) =>
  fields.array(fields.text({ label: "Item" }), {
    label,
    itemLabel: (props) => props.value || "Item"
  });

const commonArticleFields = {
  description: fields.text({ label: "SEO description", multiline: true }),
  coverImage,
  date: fields.date({ label: "Publish date" }),
  updatedDate: fields.date({ label: "Updated date" }),
  author: fields.text({ label: "Author", defaultValue: "Quiet Web Lab" }),
  category: fields.text({ label: "Category" }),
  tags: fields.array(fields.text({ label: "Tag" }), {
    label: "Tags",
    itemLabel: (props) => props.value || "Tag"
  }),
  body: bodyField
};

const collectionPath = (name: string) => `src/content/${name}/*`;

export default config({
  storage: {
    kind: "local"
  },
  ui: {
    brand: { name: "Smart Prompt App CMS" }
  },
  collections: {
    articles: collection({
      label: "Articles / Blog",
      slugField: "title",
      path: collectionPath("articles"),
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        ...commonArticleFields
      }
    }),
    guides: collection({
      label: "Guides",
      slugField: "title",
      path: collectionPath("guides"),
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        ...commonArticleFields
      }
    }),
    recipes: collection({
      label: "Prompt Recipes",
      slugField: "title",
      path: collectionPath("recipes"),
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "SEO description", multiline: true }),
        shortDescription: fields.text({ label: "Short card description", multiline: true }),
        coverImage: recipeImage,
        category: fields.text({ label: "Category" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag"
        }),
        positivePrompt: fields.text({ label: "Positive prompt", multiline: true }),
        negativePrompt: fields.text({ label: "Negative prompt", multiline: true }),
        parameters: fields.text({ label: "Parameters", multiline: true }),
        modelNotes: fields.text({ label: "Model notes", multiline: true }),
        breakdownFragments: fields.array(
          fields.object({
            category: fields.select({
              label: "Fragment category",
              options: [
                { label: "Subject", value: "subject" },
                { label: "Pose", value: "pose" },
                { label: "Action", value: "action" },
                { label: "Clothing", value: "clothing" },
                { label: "Scene", value: "scene" },
                { label: "Camera", value: "camera" },
                { label: "Lighting", value: "lighting" },
                { label: "Mood", value: "mood" },
                { label: "Style", value: "style" },
                { label: "Quality", value: "quality" },
                { label: "Negative", value: "negative" },
                { label: "Parameters", value: "parameters" }
              ],
              defaultValue: "subject"
            }),
            label: fields.text({ label: "Fragment label" }),
            text: fields.text({ label: "English prompt fragment", multiline: true })
          }),
          {
            label: "Prompt breakdown fragments",
            itemLabel: (props) => props.fields.label.value || "Fragment"
          }
        ),
        variations: fields.array(
          fields.object({
            category: fields.text({ label: "Variation category" }),
            label: fields.text({ label: "Variation label" }),
            text: fields.text({ label: "Variation prompt", multiline: true })
          }),
          {
            label: "Variations",
            itemLabel: (props) => props.fields.label.value || "Variation"
          }
        ),
        commonMistakes: textList("Common mistakes"),
        suitableUses: textList("Suitable uses"),
        relatedRecipes: fields.array(fields.text({ label: "Related recipe slug" }), {
          label: "Related recipes",
          itemLabel: (props) => props.value || "Recipe slug"
        }),
        body: bodyField
      }
    }),
    workflows: collection({
      label: "Workflows",
      slugField: "title",
      path: collectionPath("workflows"),
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "SEO description", multiline: true }),
        coverImage,
        problem: fields.text({ label: "Problem", multiline: true }),
        solution: fields.text({ label: "Solution", multiline: true }),
        toolsInvolved: textList("Tools involved"),
        output: fields.text({ label: "Output", multiline: true }),
        businessUse: fields.text({ label: "Business use", multiline: true }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Demo", value: "demo" },
            { label: "Published", value: "published" }
          ],
          defaultValue: "demo"
        }),
        body: bodyField
      }
    }),
    products: collection({
      label: "Products",
      slugField: "title",
      path: collectionPath("products"),
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "SEO description", multiline: true }),
        coverImage,
        productType: fields.text({ label: "Product type" }),
        pricePlaceholder: fields.text({ label: "Price placeholder" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Planning", value: "planning" },
            { label: "Preview", value: "preview" },
            { label: "Available", value: "available" }
          ],
          defaultValue: "preview"
        }),
        includedItems: textList("Included items"),
        targetUsers: textList("Target users"),
        callToAction: fields.text({ label: "Call to action" }),
        body: bodyField
      }
    }),
    caseStudies: collection({
      label: "Demo Case Studies",
      slugField: "title",
      path: collectionPath("case-studies"),
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "SEO description", multiline: true }),
        coverImage,
        status: fields.select({
          label: "Status",
          options: [
            { label: "Demo", value: "demo" },
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" }
          ],
          defaultValue: "demo"
        }),
        context: fields.text({ label: "Context", multiline: true }),
        problem: fields.text({ label: "Problem", multiline: true }),
        workflow: fields.text({ label: "Workflow", multiline: true }),
        tools: textList("Tools"),
        output: fields.text({ label: "Output", multiline: true }),
        businessValue: fields.text({ label: "Business value", multiline: true }),
        disclaimer: fields.text({ label: "Demo disclaimer", multiline: true }),
        body: bodyField
      }
    }),
    services: collection({
      label: "Services",
      slugField: "title",
      path: collectionPath("services"),
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "SEO description", multiline: true }),
        icon: fields.text({ label: "Icon label" }),
        targetUsers: textList("Target users"),
        deliverables: textList("Deliverables"),
        exampleScenarios: textList("Example scenarios"),
        body: bodyField
      }
    }),
    tools: collection({
      label: "Tools",
      slugField: "title",
      path: collectionPath("tools"),
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "SEO description", multiline: true }),
        coverImage,
        status: fields.select({
          label: "Status",
          options: [
            { label: "Live", value: "live" },
            { label: "Beta", value: "beta" },
            { label: "Planned", value: "planned" }
          ],
          defaultValue: "live"
        }),
        toolUrl: fields.url({ label: "Tool URL" }),
        category: fields.text({ label: "Category" }),
        targetUsers: textList("Target users"),
        monetizationModel: fields.text({ label: "Monetization model" }),
        body: bodyField
      }
    })
  },
  singletons: {
    home: singleton({
      label: "Homepage featured sections",
      path: "src/content/site/home",
      format: "json",
      schema: {
        featuredTools: textList("Featured tool slugs"),
        featuredServices: textList("Featured service slugs"),
        featuredWorkflows: textList("Featured workflow slugs"),
        featuredProducts: textList("Featured product slugs"),
        featuredCaseStudies: textList("Featured demo case study slugs")
      }
    })
  }
});
