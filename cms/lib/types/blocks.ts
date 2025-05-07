export type BlockType =
  | "hero"
  | "features"
  | "testimonials"
  | "cta"
  | "content"
  | null;

export interface Block {
  id: string;
  type: BlockType;
  drag_index: number;
  pageId: string;
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

export type ElementKind = "config" | "content";

export type ElementType =
  | "title"
  | "description"
  | "button"
  | "input"
  | "textarea"
  | "separator"
  | "desc"
  | "badge"
  | "card"
  | "layout"
  | "backgroundColor"
  | "backgroundImage"
  | "textColor"
  | "carousel";

export interface Element {
  id: string;
  type: ElementType;
  kind: ElementKind;
  position: "left" | "top" | "bottom" | "right";
  value: string;
  title?: string;
  description?: string;
  subtitle?: string;
  button_text: string;
  button_variant: string;
  variant: "default" | "secondary" | "ghost" | "link" | "destructive" | "defaultLeft" | "defaultRight";
  size: "default" | "sm" | "lg" | "icon";
  text: string;
  input_text: string;
  input?: string;
  textarea?: string;
  orientation?: "horizontal" | "vertical";
  separator?: string;
  placeholder?: string;
  content?: string;
  className?: string;
  desc?: string;
  badge?: string;
  card?: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };

  layout?: string;
}

