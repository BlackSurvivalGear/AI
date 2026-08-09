export const aiSystems = [
  {
    id: 'gpt',
    name: 'GPT',
    provider: 'OpenAI',
    category: 'General Intelligence',
    description: 'General-purpose reasoning, creation, coding and analysis.',
    website: 'https://chatgpt.com/',
    apiAvailable: true,
    capabilities: ['reasoning', 'coding', 'writing', 'vision', 'analysis']
  },
  {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    category: 'Reasoning & Analysis',
    description: 'Deep reasoning, long-context analysis, documents and coding.',
    website: 'https://claude.ai/',
    apiAvailable: true,
    capabilities: ['reasoning', 'coding', 'documents', 'writing', 'analysis']
  },
  {
    id: 'gemini',
    name: 'Gemini',
    provider: 'Google',
    category: 'Multimodal Intelligence',
    description: 'Multimodal reasoning, research and productivity across Google services.',
    website: 'https://gemini.google.com/',
    apiAvailable: true,
    capabilities: ['reasoning', 'research', 'vision', 'documents', 'analysis']
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    provider: 'Perplexity AI',
    category: 'Research & Discovery',
    description: 'Web-grounded research, discovery and source-backed answers.',
    website: 'https://www.perplexity.ai/',
    apiAvailable: true,
    capabilities: ['research', 'web', 'analysis', 'writing']
  },
  {
    id: 'grok',
    name: 'Grok',
    provider: 'xAI',
    category: 'Real-time Information',
    description: 'General reasoning with a focus on current information and conversation.',
    website: 'https://grok.com/',
    apiAvailable: true,
    capabilities: ['reasoning', 'research', 'writing', 'analysis']
  }
];

export const aiCategories = [
  { id: 'research', name: 'Research', description: 'Find, investigate and understand information.' },
  { id: 'create', name: 'Create', description: 'Writing, images, video, audio and design.' },
  { id: 'build', name: 'Build', description: 'Coding, software and technical work.' },
  { id: 'analyse', name: 'Analyse', description: 'Documents, data and complex problems.' }
];
