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
    style: {
      background?: BackgroundStyleElement;
      overlay?: OverlayStyleElement;
      size?: SizeStyleElement;
      text?: TextStyleElement;
    };
  }
}

export {}; 