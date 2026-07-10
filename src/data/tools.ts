export type SiteTool = {
  title: string;
  slug: string;
  description: string;
  category: 'Text Tools' | 'Image Tools' | 'Document Tools' | 'Automation Tools';
  status: 'Active' | 'Available' | 'Coming Soon';
  url: string;
  tags: string[];
  useCases: string[];
};

export const siteTools: SiteTool[] = [
  {
    title: 'Research Prompt Assistant',
    slug: 'research-prompt-assistant',
    description: 'Turn rough research ideas into structured AI prompts for thesis planning, research questions, methodology, and proposal refinement.',
    category: 'Text Tools',
    status: 'Active',
    url: '/tools/research-prompt-assistant/',
    tags: ['research', 'planning', 'text'],
    useCases: ['Thesis planning', 'Research questions', 'Methodology suggestions']
  },
  {
    title: 'Email Prompt Builder',
    slug: 'email-prompt-builder',
    description: 'Turn rough email situations into structured AI prompts for drafting, rewriting, tone adjustment, and multilingual email versions.',
    category: 'Text Tools',
    status: 'Active',
    url: '/tools/email-prompt-builder/',
    tags: ['email', 'writing', 'business'],
    useCases: ['Client replies', 'Professor emails', 'Polite rewrites']
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
    title: 'Document Watch Assistant',
    slug: 'document-watch-assistant',
    description: 'A logistics desktop automation prototype that watches AN, DO, and DO-less files, groups ticket status by HBL or MBL, and reminds operators what still needs review.',
    category: 'Document Tools',
    status: 'Active',
    url: '/tools/document-watch-assistant/',
    tags: ['logistics', 'documents', 'monitoring'],
    useCases: ['AN and DO monitoring', 'HBL/MBL status grouping', 'Manual review queues']
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

export const featuredTools = siteTools.filter((tool) => ['research-prompt-assistant', 'email-prompt-builder', 'document-watch-assistant', 'prompt-builder', 'prompt-recipe-library', 'image-prompt-fragment-library', 'n8n-workflow-templates'].includes(tool.slug));





