import { EditContentItem } from "@/cms/components/content/Edit";
import { EditstyleItem } from "@/cms/components/style/Edit";
import { PreviewContentItem } from "@/cms/components/content/Preview";
import { PreviewstyleItem } from "@/cms/components/style/Preview";
import { RenderContentItem } from "@/cms/components/content/Render";
import React from "react";

type Mode = "edit" | "preview" | "render";

type BaseElementItemProps = {
  mode: "edit" | "preview" | "render";
  onChange: (type: ElementType, value: any, kind: ElementKind) => void;
  onRemove: (type: ElementType, kind: ElementKind) => void;
  isSelected?: boolean;
  onSelect?: (type: ElementType) => void;
  label?: string;
  description?: string;
};

type ContentElementItemProps = BaseElementItemProps & {
  type: ContentType;
  kind: "content";
  value?: ContentElement;
};

type StyleElementItemProps = BaseElementItemProps & {
  type: StyleType;
  kind: "style";
  value?: string;
  title?: string;
};

type ElementItemProps = ContentElementItemProps | StyleElementItemProps;

const EmptyComponent: React.FC = () => <></>;


export function ElementItem(props: ElementItemProps) {
  const {
    kind,
    mode,
    type,
    label,
    description,
    value,
    onChange,
    onRemove,
    isSelected,
    onSelect,
  } = props;

  if (kind === "content") {
    const Component =
      mode === "edit"
        ? EditContentItem
        : mode === "preview"
        ? PreviewContentItem
        : RenderContentItem;

    return (
      <Component
        kind="content"
        type={type}
        value={value} // ContentElement
        onChange={onChange}
        onRemove={onRemove}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  }

  if (kind === "style") {
    const Component =
      mode === "edit"
        ? EditstyleItem
        : mode === "preview"
        ? PreviewstyleItem
        : EmptyComponent;

    return (
      <Component
        kind="style"
        type={type}
        label={label}
        description={description}
        value={value} // string
        onChange={onChange}
        onRemove={onRemove}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  }

  return null;
}
