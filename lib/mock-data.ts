import { Block } from '@/types/blocks';

export const mockBlocks: Block[] = [
  {
    id: '1',
    type: 'hero',
    content: {
      title: 'Welcome to Our Platform',
      description: 'Build beautiful websites with our block-based CMS',
      cta: {
        text: 'Get Started',
        link: '#features', // Changed to anchor link to features section
      },
    },
    settings: {
      backgroundColor: 'bg-gradient-to-r from-blue-500 to-purple-600',
      textColor: 'text-white',
    },
    pageId: '0',
  },
  {
    id: '2',
    type: 'features',
    content: {
      title: 'Key Features',
      items: [
        {
          id: 'f1',
          title: 'Block-Based Editor',
          description: 'Create your website using pre-built blocks',
        },
        {
          id: 'f2',
          title: 'Real-time Preview',
          description: 'See changes as you make them',
        },
        {
          id: 'f3',
          title: 'Responsive Design',
          description: 'Looks great on all devices',
        },
      ],
    },
    pageId: '0',
  },
];
