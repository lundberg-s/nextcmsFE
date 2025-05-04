import { Element, ElementKind, ElementType } from "@/cms/lib/types/blocks";
import { EditContentItem } from "./content/Edit";
import { EditConfigItem } from "./config/Edit";
import { PreviewContentItem } from "./content/Preview";
import { PreviewConfigItem } from "./config/Preview";
import { RenderContentItem } from "./content/Render";

interface ElementItemProps {
  type: ElementType;
  kind: ElementKind;

  mode: "edit" | "preview" | "render";
  
  component?: Partial<Element>;
  value?: string;
  onChange?: (type: ElementType, valueOrComponent: any, kind: ElementKind) => void;
  onRemove?: (type: ElementType, kind: ElementKind) => void;
  
  isSelected?: boolean;
  onSelect?: (type: ElementType) => void;
}

const ELEMENT_ITEMS = {
  edit: {
    content: EditContentItem,
    config: EditConfigItem
  },
  preview: {
    content: PreviewContentItem,
    config: PreviewConfigItem,
  },
  render: {
    content: RenderContentItem,
    config: () => null
  }
};

export function ElementItem(props: ElementItemProps) {
  const { mode, kind } = props;

  const Item = ELEMENT_ITEMS[mode]?.[kind] as React.ComponentType<any> | null;

  return Item ? <Item {...props} /> : null;
}