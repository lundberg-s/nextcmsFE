export type BlockType = 'hero' | 'features' | 'testimonials' | 'cta' | 'content';

export interface Block {
  id: string;
  type: BlockType;
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    cta?: {
      text: string;
      link: string;
    };
    items?: Array<{
      id: string;
      title: string;
      description: string;
      image?: string;
    }>;
  };
  settings?: {
    backgroundColor?: string;
    backgroundImage?: string;
    textColor?: string;
    layout?: 'left' | 'right' | 'center';
  };
  pageId: string;
}

export interface BlockComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
}

export type ComponentType = 
  | "button"
  | "input"
  | "textarea"
  | "separator"
  | "badge"
  | "card";