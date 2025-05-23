declare global {
  
  type ContentType =
    | "title"
    | "description"
    | "button"
    | "input"
    | "separator"
    | "card"
    | "carousel"
    | "image"
    | "text"
    | "features";
  
  type ContentElement =
    | TitleElement
    | TextElement
    | DescriptionElement
    | InputElement
    | ImageElement
    | CarouselElement
    | SeparatorElement
    | CardElement
    | ButtonElement;

  interface BaseContentElement {
    kind: "content";
    position: "left" | "top" | "bottom" | "right";
  }

  interface TitleElement extends BaseContentElement {
    type: "title";
    title: string;
    titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }

  interface TextElement extends BaseContentElement {
    type: "text";
    title?: string;
    titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    description?: string;
    opacity?: number;
    cta1?: { label: string; link: string };
    cta2?: { label: string; link: string };
  }

  interface DescriptionElement extends BaseContentElement {
    type: "description";
    description: string;
  }

  interface SubtitleElement extends BaseContentElement {
    type: "desc";
    subtitle: string;
  }

  // Input Elements
  interface InputElement extends BaseContentElement {
    type: "input";
    input?: string;
    placeholder?: string;
    input_text: string;
  }

  interface TextareaElement extends BaseContentElement {
    type: "textarea";
    textarea: string;
    placeholder?: string;
  }

  // Visual Elements
  interface ImageElement extends BaseContentElement {
    type: "image";
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  }

  interface CarouselElement extends BaseContentElement {
    type: "carousel";
    urls: string[];
  }

  // UI Elements
  interface SeparatorElement extends BaseContentElement {
    type: "separator";
    separator: string;
    orientation?: "horizontal" | "vertical";
  }

  interface BadgeElement extends BaseContentElement {
    type: "badge";
    badge: string;
  }

  interface CardElement extends BaseContentElement {
    type: "card";
    title: string;
    subtitle: string;
    description: string;
    image: string;
  }

  interface ButtonElement extends BaseContentElement {
    type: "button";
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
    cta1?: { label: string; link: string };
    cta2?: { label: string; link: string };
  }

  interface FeaturesElement extends BaseContentElement {
    type: "features";
    features: FeatureItem[];
    highlighted?: number;
  }
}

export {}; 