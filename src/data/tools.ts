export type SiteTool = {
  title: string;
  slug: string;
  description: string;
  category: 'Text Tools' | 'Image Tools' | 'Document Tools' | 'Automation Tools';
  status: 'Available' | 'Coming Soon';
  url: string;
  tags: string[];
  useCases: string[];
};

export const siteTools: SiteTool[] = [
  {
    title: 'Research Prompt Assistant',
    slug: 'research-prompt-assistant',
    description: 'A planned helper for turning rough research questions into structured AI prompts and outline tasks.',
    category: 'Text Tools',
    status: 'Coming Soon',
    url: '/contact/',
    tags: ['research', 'planning', 'text'],
    useCases: ['Research planning', 'Outline generation', 'Question refinement']
  },
  {
    title: 'Email Prompt Builder',
    slug: 'email-prompt-builder',
    description: 'A planned prompt helper for drafting, rewriting, and adapting emails for different audiences.',
    category: 'Text Tools',
    status: 'Coming Soon',
    url: '/contact/',
    tags: ['email', 'writing', 'business'],
    useCases: ['Client replies', 'Polite rewrites', 'Follow-up templates']
  },
  {
    title: 'Writing Improvement Prompt',
    slug: 'writing-improvement-prompt',
    description: 'A planned text workflow for improving clarity, tone, structure, and reader fit without keyword stuffing.',
    category: 'Text Tools',
    status: 'Coming Soon',
    url: '/contact/',
    tags: ['writing', 'editing', 'clarity'],
    useCases: ['Article polish', 'Tone adjustment', 'Structure review']
  },
  {
    title: 'Prompt Builder',
    slug: 'prompt-builder',
    description: 'Build reusable AI image prompts from visual fragments and detect conflicts before copying.',
    category: 'Image Tools',
    status: 'Available',
    url: '/builder/',
    tags: ['image', 'prompt', 'builder'],
    useCases: ['Image prompt assembly', 'Conflict checks', 'Reusable fragments']
  },
  {
    title: 'Prompt Recipe Library',
    slug: 'prompt-recipe-library',
    description: 'Learn prompt structures through examples, breakdowns, variations, and reusable fragments.',
    category: 'Image Tools',
    status: 'Available',
    url: '/recipes/',
    tags: ['recipes', 'prompt', 'learning'],
    useCases: ['Prompt study', 'Variation planning', 'Reusable examples']
  },
  {
    title: 'Image Prompt Fragment Library',
    slug: 'image-prompt-fragment-library',
    description: 'A planned visual library for choosing prompt fragments by sample image, category, and output intent.',
    category: 'Image Tools',
    status: 'Coming Soon',
    url: '/builder/',
    tags: ['fragments', 'image', 'library'],
    useCases: ['Scene fragments', 'Pose selection', 'Style references']
  },
  {
    title: 'PDF to Excel OCR Workflow',
    slug: 'pdf-to-excel-ocr-workflow',
    description: 'A planned workflow for extracting structured rows from PDF documents into spreadsheet-ready outputs.',
    category: 'Document Tools',
    status: 'Coming Soon',
    url: '/workflows/',
    tags: ['PDF', 'OCR', 'Excel'],
    useCases: ['Invoice extraction', 'Logistics documents', 'Spreadsheet exports']
  },
  {
    title: 'Screenshot Explanation Workflow',
    slug: 'screenshot-explanation-workflow',
    description: 'A planned workflow for turning screenshots into structured notes, issue explanations, and next-step checklists.',
    category: 'Document Tools',
    status: 'Coming Soon',
    url: '/workflows/',
    tags: ['screenshots', 'analysis', 'notes'],
    useCases: ['UI explanation', 'Error notes', 'Visual summaries']
  },
  {
    title: 'n8n Workflow Templates',
    slug: 'n8n-workflow-templates',
    description: 'A planned collection of automation templates for connecting AI tasks with notifications, files, and publishing steps.',
    category: 'Automation Tools',
    status: 'Coming Soon',
    url: '/workflows/',
    tags: ['n8n', 'automation', 'templates'],
    useCases: ['Task pipelines', 'Notifications', 'Content operations']
  },
  {
    title: 'AI Content Pipeline',
    slug: 'ai-content-pipeline',
    description: 'A planned system for batching content ideas, drafts, reviews, publishing tasks, and update schedules.',
    category: 'Automation Tools',
    status: 'Coming Soon',
    url: '/workflows/',
    tags: ['content', 'publishing', 'automation'],
    useCases: ['Blog operations', 'Scheduled updates', 'Editorial workflows']
  }
];

export const featuredTools = siteTools.filter((tool) => ['prompt-builder', 'prompt-recipe-library', 'image-prompt-fragment-library', 'n8n-workflow-templates'].includes(tool.slug));
