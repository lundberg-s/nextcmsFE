declare global {
  type BlockType =
    | "hero"
    | "features"
    | "testimonials"
    | "cta"
    | "content"
    | null;

  interface Block {
    id: string;
    type: BlockType;
    order: number;
    page: string;
    content: {
      items?: any;
      title?: string;
      subtitle?: string;
      description?: string;
      button?: string;
      input?: string;
      textarea?: string;
      separator?: string;
      desc?: string;
      badge?: string;
      card?: {
        title: string;
        subtitle: string;
        description: string;
        image: string;
      };
      layout?: string;
    };
    config?: {
      backgroundColor?: string;
      backgroundImage?: string;
      textColor?: string;
      layout?: "left" | "right" | "center";
    };
  }
}

export {}; 