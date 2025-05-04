import { Element, ElementKind, ElementType } from "@/cms/lib/types/blocks";
import { ElementItem } from "./ElementItem";

interface ElementListProps {
  content?: Record<string, any>;
  config?: Record<string, string>;

  updateContent?: (type: ElementType, value: any, kind: ElementKind) => void;
  updateConfig?: (type: ElementType, value: string, kind: ElementKind) => void;
  removeContent?: (type: ElementType, kind: ElementKind) => void;
  removeConfig?: (type: ElementType, kind: ElementKind) => void;
}

export function ElementList({
  updateContent,
  updateConfig,
  removeContent,
  removeConfig,
  content,
  config,
}: ElementListProps) {
  const sections = [
    {
      kind: "content" as ElementKind,
      data: content || {},
      onChange: updateContent,
      onRemove: removeContent,
      getProps: (value: any) => ({ component: value as Element }),
    },
    {
      kind: "config" as ElementKind,
      data: config || {},
      onChange: updateConfig,
      onRemove: removeConfig,
      getProps: (value: any) => ({ value }),
    }
  ];

  return (
    <>
      {sections.map(section => 
        Object.keys(section.data).length > 0 && (
          <>
            {Object.entries(section.data).map(([type, value]) => (
              <ElementItem
                mode="edit"
                key={`${section.kind}-${type}`}
                type={type as ElementType}
                kind={section.kind}
                onChange={section.onChange}
                onRemove={section.onRemove}
                {...section.getProps(value)}
              />
            ))}
          </>
        )
      )}
    </>
  );
}