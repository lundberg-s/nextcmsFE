export type BlockType =
  | "hero"
  | "features"
  | "testimonials"
  | "cta"
  | "content";

export interface Block {
  id: string;
  type: BlockType;
  content: {
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
  settings?: {
    backgroundColor?: string;
    backgroundImage?: string;
    textColor?: string;
    layout?: "left" | "right" | "center";
  };
  pageId: string;
}

export interface BlockComponent {
  id: string;
  type: ComponentType;
  kind: ComponentKind;
  value: string;
  title?: string;
  description?: string;
  subtitle?: string;
  button_text: string;
  button_variant: string;
  input_text: string;
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
}

export type ComponentKind = "setting" | "component";

export type ComponentType =
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
  | "textColor";
