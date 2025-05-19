type ElementKind = "config" | "content";

type ElementType =
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
  | "height"
  | "carousel"
  | "image"
  | "text";

  interface Element {
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
    variant:
      | "default"
      | "secondary"
      | "ghost"
      | "link"
      | "destructive"
      | "defaultLeft"
      | "defaultRight";
    size: "default" | "sm" | "lg" | "icon";
    text: string;
    input_text: string;
    input?: string;
    textarea?: string;
    orientation?: "horizontal" | "vertical";
    separator?: string;
    placeholder?: string;
    content?: string;
    urls?: string[];
    className?: string;
    desc?: string;
    badge?: string;
    width?: number;
    height?: number;
    src?: string;
    alt?: string;
    titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    cta1?: { label: string; link: string };
    cta2?: { label: string; link: string };
    card?: {
      title: string;
      subtitle: string;
      description: string;
      image: string;
    };
    layout?: string;
  }