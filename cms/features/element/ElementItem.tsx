import { Element, ElementKind, ElementType } from "@/cms/lib/types/blocks";
import { EditContentItem } from "./content/Edit";
import { EditConfigItem } from "./config/Edit";
import { PreviewContentItem } from "./content/Preview";
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
    content: (props: ElementItemProps) => {
      const { type, kind, component, onChange, onRemove } = props;
      return component && onChange && onRemove ? (
        <EditContentItem
          type={type as any}
          component={component}
          kind={kind}
          onChange={onChange}
          onRemove={onRemove}
        />
      ) : null;
    },
    config: (props: ElementItemProps) => {
      const { type, kind, value, onChange, onRemove } = props;
      return value !== undefined && onChange && onRemove ? (
        <EditConfigItem
          type={type as any}
          value={value}
          kind={kind}
          onChange={onChange}
          onRemove={onRemove}
        />
      ) : null;
    }
  },
  preview: {
    content: (props: ElementItemProps) => {
      const { type, kind, isSelected, onSelect } = props;
      return isSelected !== undefined && onSelect ? (
        <PreviewContentItem
          type={type}
          kind={kind}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      ) : null;
    },
    config: (props: ElementItemProps) => {
      const { type, kind, isSelected, onSelect } = props;
      return isSelected !== undefined && onSelect ? (
        <PreviewContentItem
          type={type}
          kind={kind}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      ) : null;
    }
  },
  render: {
    content: (props: ElementItemProps) => {
      const { type, component, kind } = props;
      return component ? (
        <RenderContentItem
          type={type}
          component={component}
          kind={kind}
        />
      ) : null;
    },
    config: () => null
  }
};

export function ElementItem(props: ElementItemProps) {
  const { mode, kind } = props;

  const Item = ELEMENT_ITEMS[mode]?.[kind];
  
  return Item ? Item(props) : null;
}