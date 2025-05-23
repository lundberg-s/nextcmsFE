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
    content: ContentElement;
    style?: {
      backgroundColor?: string;
      backgroundImage?: string;
      textColor?: string;
      layout?: "left" | "right" | "center";
      height?: number;
      waveOverlay?: number;
      backgroundOverlay?: boolean;
    };
  }
}

export {}; 