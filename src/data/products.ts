export type ProductTemplate = {
  title: string;
  slug: string;
  description: string;
  category: string;
  status: 'Waitlist' | 'Planning' | 'Preview';
  url: string;
  tags: string[];
  useCases: string[];
  includedItems: string[];
  targetUsers: string[];
};

export const productTemplates: ProductTemplate[] = [
  { title: 'Prompt Packs', slug: 'prompt-packs', description: 'Reusable prompt packs for image production, writing workflows, review tasks, and structured planning.', category: 'Prompt Products', status: 'Planning', url: '/contact/', tags: ['prompts', 'templates'], useCases: ['Image prompts', 'Writing prompts'], includedItems: ['Prompt fragments', 'Usage notes', 'Quality checklist'], targetUsers: ['Creators', 'AI image users', 'Writers'] },
  { title: 'Research Prompt Templates', slug: 'research-prompt-templates', description: 'Structured prompts for research questions, literature planning, notes, outlines, and draft reviews.', category: 'Research Templates', status: 'Planning', url: '/contact/', tags: ['research', 'writing'], useCases: ['Research planning', 'Outline drafting'], includedItems: ['Question prompts', 'Outline prompts', 'Review checklist'], targetUsers: ['Students', 'Researchers', 'Writers'] },
  { title: 'AI Workflow Checklists', slug: 'ai-workflow-checklists', description: 'Checklists for turning AI tasks into repeatable processes with inputs, outputs, review, and publishing steps.', category: 'Workflow Products', status: 'Preview', url: '/workflows/', tags: ['checklists', 'workflow'], useCases: ['Workflow design', 'Quality review'], includedItems: ['Workflow checklist', 'Input-output map', 'Review rules'], targetUsers: ['Small teams', 'Creators', 'Solo operators'] },
  { title: 'LoRA Captioning Starter Kit', slug: 'lora-captioning-starter-kit', description: 'A safe starter kit for original LoRA dataset planning, caption structure, and non-adult training notes.', category: 'Image Products', status: 'Planning', url: '/lora/', tags: ['LoRA', 'captioning'], useCases: ['Caption planning', 'Dataset cleanup'], includedItems: ['Caption template', 'Dataset checklist', 'Testing notes'], targetUsers: ['ComfyUI users', 'AI image creators', 'Learners'] },
  { title: 'Static AI Tool Website Template', slug: 'static-ai-tool-website-template', description: 'A lightweight Astro template for publishing tools, guides, recipes, workflows, and static content hubs.', category: 'Website Templates', status: 'Waitlist', url: '/contact/', tags: ['Astro', 'static site'], useCases: ['Tool hub', 'Guide site'], includedItems: ['Page structure', 'SEO basics', 'Content model'], targetUsers: ['Creators', 'Small teams', 'Indie builders'] },
  { title: 'n8n Workflow Template Pack', slug: 'n8n-workflow-template-pack', description: 'A planned pack of automation workflow templates for content, notifications, document handling, and AI review tasks.', category: 'Automation Templates', status: 'Waitlist', url: '/contact/', tags: ['n8n', 'automation'], useCases: ['Content queue', 'Inquiry triage'], includedItems: ['Workflow plan', 'Prompt nodes', 'Testing checklist'], targetUsers: ['Small teams', 'Operations users', 'Site owners'] }
];
