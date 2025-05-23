declare global {

  type ElementKind = "style" | "content";

  type ElementType = StyleType | ContentType;

  type ElementPair = ContentElement | StyleElement
}

export {}; /*  */