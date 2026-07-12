import { collection, config, fields, singleton } from "@keystatic/core";

const coverImage = fields.image({
  label: "封面图",
  directory: "public/images/covers",
  publicPath: "/images/covers"
});

const recipeImage = fields.image({
  label: "配方封面图",
  directory: "public/images/recipes",
  publicPath: "/images/recipes"
});

const bodyField = fields.mdx({
  label: "正文内容",
  extension: "md",
  options: {
    image: {
      directory: "public/images/content",
      publicPath: "/images/content"
    }
  }
});

const textList = (label: string) =>
  fields.array(fields.text({ label: "条目" }), {
    label,
    itemLabel: (props) => props.value || "条目"
  });

const tagsField = fields.array(fields.text({ label: "标签" }), {
  label: "标签",
  itemLabel: (props) => props.value || "标签"
});

const commonArticleFields = {
  description: fields.text({ label: "SEO 描述 / 页面摘要", multiline: true }),
  coverImage,
  date: fields.date({ label: "发布日期" }),
  updatedDate: fields.date({ label: "更新日期" }),
  author: fields.text({ label: "作者", defaultValue: "Quiet Web Lab" }),
  category: fields.text({ label: "分类" }),
  tags: tagsField,
  body: bodyField
};

const collectionPath = (name: string) => `src/content/${name}/*`;

const titleField = fields.slug({ name: { label: "标题（会自动生成网址 slug）" } });

export default config({
  storage: {
    kind: "local"
  },
  ui: {
    brand: { name: "Smart Prompt App 内容后台" }
  },
  collections: {
    articles: collection({
      label: "文章 / 新闻",
      slugField: "title",
      path: collectionPath("articles"),
      format: { contentField: "body" },
      schema: {
        title: titleField,
        ...commonArticleFields
      }
    }),
    guides: collection({
      label: "指南文章",
      slugField: "title",
      path: collectionPath("guides"),
      format: { contentField: "body" },
      schema: {
        title: titleField,
        ...commonArticleFields
      }
    }),
    recipes: collection({
      label: "提示词配方",
      slugField: "title",
      path: collectionPath("recipes"),
      format: { contentField: "body" },
      schema: {
        title: titleField,
        description: fields.text({ label: "SEO 描述 / 页面摘要", multiline: true }),
        shortDescription: fields.text({ label: "卡片短描述", multiline: true }),
        coverImage: recipeImage,
        category: fields.text({ label: "分类" }),
        tags: tagsField,
        positivePrompt: fields.text({ label: "正向提示词（英文，给模型复制用）", multiline: true }),
        negativePrompt: fields.text({ label: "负向提示词（英文，给模型复制用）", multiline: true }),
        parameters: fields.text({ label: "生成参数（尺寸、步数、CFG、采样器等）", multiline: true }),
        modelNotes: fields.text({ label: "模型使用建议", multiline: true }),
        breakdownFragments: fields.array(
          fields.object({
            category: fields.select({
              label: "片段分类",
              options: [
                { label: "主体 / 人物", value: "subject" },
                { label: "姿势", value: "pose" },
                { label: "动作", value: "action" },
                { label: "服装", value: "clothing" },
                { label: "场景", value: "scene" },
                { label: "镜头", value: "camera" },
                { label: "光照", value: "lighting" },
                { label: "氛围", value: "mood" },
                { label: "风格", value: "style" },
                { label: "质量标签", value: "quality" },
                { label: "负向提示词", value: "negative" },
                { label: "参数", value: "parameters" }
              ],
              defaultValue: "subject"
            }),
            label: fields.text({ label: "片段名称（给人看的名字）" }),
            text: fields.text({ label: "英文提示词片段（给模型复制用）", multiline: true })
          }),
          {
            label: "提示词拆分片段",
            itemLabel: (props) => props.fields.label.value || "提示词片段"
          }
        ),
        variations: fields.array(
          fields.object({
            category: fields.text({ label: "变体分类" }),
            label: fields.text({ label: "变体名称" }),
            text: fields.text({ label: "变体提示词（英文）", multiline: true })
          }),
          {
            label: "提示词变体",
            itemLabel: (props) => props.fields.label.value || "变体"
          }
        ),
        commonMistakes: textList("常见问题 / 容易翻车的点"),
        suitableUses: textList("适合用途"),
        relatedRecipes: fields.array(fields.text({ label: "相关配方 slug" }), {
          label: "相关配方",
          itemLabel: (props) => props.value || "配方 slug"
        }),
        body: bodyField
      }
    }),
    workflows: collection({
      label: "工作流方案",
      slugField: "title",
      path: collectionPath("workflows"),
      format: { contentField: "body" },
      schema: {
        title: titleField,
        description: fields.text({ label: "SEO 描述 / 页面摘要", multiline: true }),
        coverImage,
        problem: fields.text({ label: "要解决的问题", multiline: true }),
        solution: fields.text({ label: "解决方案", multiline: true }),
        toolsInvolved: textList("用到的工具"),
        output: fields.text({ label: "最终产出", multiline: true }),
        businessUse: fields.text({ label: "商业用途 / 适用场景", multiline: true }),
        status: fields.select({
          label: "状态",
          options: [
            { label: "草稿", value: "draft" },
            { label: "演示", value: "demo" },
            { label: "已发布", value: "published" }
          ],
          defaultValue: "demo"
        }),
        body: bodyField
      }
    }),
    products: collection({
      label: "产品",
      slugField: "title",
      path: collectionPath("products"),
      format: { contentField: "body" },
      schema: {
        title: titleField,
        description: fields.text({ label: "SEO 描述 / 页面摘要", multiline: true }),
        coverImage,
        productType: fields.text({ label: "产品类型" }),
        pricePlaceholder: fields.text({ label: "价格占位 / 价格说明" }),
        status: fields.select({
          label: "状态",
          options: [
            { label: "规划中", value: "planning" },
            { label: "预览版", value: "preview" },
            { label: "可购买 / 可使用", value: "available" }
          ],
          defaultValue: "preview"
        }),
        includedItems: textList("包含内容"),
        targetUsers: textList("适合人群"),
        callToAction: fields.text({ label: "行动按钮文案" }),
        body: bodyField
      }
    }),
    caseStudies: collection({
      label: "演示案例",
      slugField: "title",
      path: collectionPath("case-studies"),
      format: { contentField: "body" },
      schema: {
        title: titleField,
        description: fields.text({ label: "SEO 描述 / 页面摘要", multiline: true }),
        coverImage,
        status: fields.select({
          label: "状态",
          options: [
            { label: "演示", value: "demo" },
            { label: "草稿", value: "draft" },
            { label: "已发布", value: "published" }
          ],
          defaultValue: "demo"
        }),
        context: fields.text({ label: "背景说明", multiline: true }),
        problem: fields.text({ label: "问题", multiline: true }),
        workflow: fields.text({ label: "使用的工作流", multiline: true }),
        tools: textList("工具"),
        output: fields.text({ label: "产出", multiline: true }),
        businessValue: fields.text({ label: "商业价值", multiline: true }),
        disclaimer: fields.text({ label: "演示案例声明（说明不是真实客户案例）", multiline: true }),
        body: bodyField
      }
    }),
    services: collection({
      label: "服务",
      slugField: "title",
      path: collectionPath("services"),
      format: { contentField: "body" },
      schema: {
        title: titleField,
        description: fields.text({ label: "SEO 描述 / 页面摘要", multiline: true }),
        icon: fields.text({ label: "图标文字 / 图标名称" }),
        targetUsers: textList("目标用户"),
        deliverables: textList("交付内容"),
        exampleScenarios: textList("示例场景"),
        body: bodyField
      }
    }),
    tools: collection({
      label: "工具",
      slugField: "title",
      path: collectionPath("tools"),
      format: { contentField: "body" },
      schema: {
        title: titleField,
        description: fields.text({ label: "SEO 描述 / 页面摘要", multiline: true }),
        coverImage,
        status: fields.select({
          label: "状态",
          options: [
            { label: "已上线", value: "live" },
            { label: "测试版", value: "beta" },
            { label: "计划中", value: "planned" }
          ],
          defaultValue: "live"
        }),
        toolUrl: fields.url({ label: "工具链接" }),
        category: fields.text({ label: "分类" }),
        targetUsers: textList("目标用户"),
        monetizationModel: fields.text({ label: "变现方式 / 商业模式" }),
        body: bodyField
      }
    })
  },
  singletons: {
    home: singleton({
      label: "首页展示设置",
      path: "src/content/site/home",
      format: "json",
      schema: {
        featuredTools: textList("首页展示的工具 slug"),
        featuredServices: textList("首页展示的服务 slug"),
        featuredWorkflows: textList("首页展示的工作流 slug"),
        featuredProducts: textList("首页展示的产品 slug"),
        featuredCaseStudies: textList("首页展示的演示案例 slug")
      }
    })
  }
});
