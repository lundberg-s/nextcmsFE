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
  return (
    <>
      {content && Object.keys(content).length > 0 && (
        <>
          {Object.entries(content).map(([type, value]) => (
            <ElementItem
              mode="edit"
              key={`content-${type}`}
              type={type as ElementType}
              component={value as Element}
              kind="content"
              onChange={updateContent}
              onRemove={removeContent}
            />
          ))}
        </>
      )}

      {config && Object.keys(config).length > 0 && (
        <>
          {Object.entries(config).map(([type, value]: [string, string]) => (
            <ElementItem
              mode="edit"
              key={`config-${type}`}
              type={type as ElementType}
              value={value}
              kind="config"
              onChange={updateConfig}
              onRemove={removeConfig}
            />
          ))}
        </>
      )}
    </>
  );
}
