import { EditContentItem } from "@/cms/components/content/Edit";
import { EditConfigItem } from "@/cms/components/config/Edit";
import { PreviewContentItem } from "@/cms/components/content/Preview";
import { PreviewConfigItem } from "@/cms/components/config/Preview";
import { RenderContentItem } from "@/cms/components/content/Render";

interface ElementItemProps {
  type: ElementType;
  kind: ElementKind;

  mode: "edit" | "preview" | "render";
  label?: string;
  description?: string;
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