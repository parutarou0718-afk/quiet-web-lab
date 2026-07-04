export type Capability = {
  title: string;
  slug: string;
  description: string;
  category: string;
  status: 'Available' | 'Planning' | 'Template';
  url: string;
  tags: string[];
  useCases: string[];
  cta: string;
};

export const capabilities: Capability[] = [
  { title: 'Text to Text', slug: 'text-to-text', description: 'Writing, rewriting, summarization, research planning, email drafting, academic idea structuring, and business document generation.', category: 'Language Workflows', status: 'Available', url: '/tools/', tags: ['writing', 'research', 'documents'], useCases: ['Research outlines', 'Email drafts', 'Business documents'], cta: 'View related tools' },
  { title: 'Text to Image', slug: 'text-to-image', description: 'Prompt recipes, image prompt builder, style references, scene design, character concepts, and reusable visual prompt fragments.', category: 'Image Production', status: 'Available', url: '/builder/', tags: ['prompts', 'images', 'ComfyUI'], useCases: ['Prompt fragments', 'Scene design', 'Character concepts'], cta: 'Open Prompt Builder' },
  { title: 'Image to Text', slug: 'image-to-text', description: 'Image description, visual analysis, OCR-assisted extraction, screenshot explanation, and structured notes from visual materials.', category: 'Visual Analysis', status: 'Planning', url: '/workflows/', tags: ['OCR', 'screenshots', 'notes'], useCases: ['Screenshot explanation', 'OCR notes', 'Visual summaries'], cta: 'View workflow' },
  { title: 'Image to Image', slug: 'image-to-image', description: 'Image variation planning, style transfer prompts, reference-based editing workflows, and visual production guides.', category: 'Visual Editing', status: 'Planning', url: '/workflows/', tags: ['editing', 'reference', 'style'], useCases: ['Variation planning', 'Style transfer', 'Reference edits'], cta: 'View workflow' },
  { title: 'Document Workflows', slug: 'document-workflows', description: 'PDF to Excel, invoice extraction, logistics document parsing, research note structuring, and spreadsheet-ready outputs.', category: 'Document Automation', status: 'Template', url: '/workflows/', tags: ['PDF', 'Excel', 'OCR'], useCases: ['PDF to spreadsheet', 'Invoice extraction', 'Logistics parsing'], cta: 'View workflow' },
  { title: 'Automation Workflows', slug: 'automation-workflows', description: 'n8n workflows, AI-assisted task pipelines, content generation systems, notification flows, and business process automation.', category: 'Automation', status: 'Template', url: '/workflows/', tags: ['n8n', 'pipeline', 'automation'], useCases: ['Content pipelines', 'Notification flows', 'Auto-reply systems'], cta: 'View workflow' }
];
