import SidebarItemCard from "@/cms/components/sidebar/SidebarItemCard";
import { Edit } from ".";
import { useState } from "react";
import styleDefaults from "@/cms/components/style/defaults.json";

const STYLE_LIST = {
  background: Edit.Background,
  overlay: Edit.Overlay,
  size: Edit.Size,
  text: Edit.Text,
} as const;

type StyleTypeKey = keyof typeof STYLE_LIST;

type StyleElementMap = {
  background: BackgroundStyleElement;
  overlay: OverlayStyleElement;
  size: SizeStyleElement;
  text: TextStyleElement;
};

interface EditStyleItemProps<T extends StyleTypeKey> {
  type: T;
  value?: StyleElementMap[T];
  kind: ElementKind;
  onChange: (type: StyleTypeKey, value: StyleElementMap[T], kind: ElementKind) => void;
  onRemove: (type: StyleTypeKey, kind: ElementKind) => void;
}

export function EditStyleItem<T extends StyleTypeKey>({
  type,
  value,
  kind,
  onChange,
  onRemove,
}: EditStyleItemProps<T>) {

  const initialData = value ?? ({} as Partial<StyleElementMap[T]>);
  const keys = styleDefaults[type]?.keys ?? [];

  const getActiveFields = <T extends object>(
    data: Partial<T>,
    keys: (keyof T)[]
  ): Record<string, boolean> => {
    return Object.fromEntries(
      keys
        .filter((key) => key !== "type")
        .map((key) => [key as string, Boolean(data[key])])
    );
  };

  const [visibleFields, setVisibleFields] = useState(() =>
    getActiveFields(initialData, keys as (keyof StyleElementMap[T])[])
  );

  const handleDataChange = (
    key: keyof StyleElementMap[T],
    newValue: any
  ) => {
    onChange(type, { ...initialData, [key]: newValue } as StyleElementMap[T], kind);
  };

  const StyleComponent = STYLE_LIST[type] as React.ComponentType<{
    data: StyleElementMap[T];
    onChange: (key: keyof StyleElementMap[T], value: any) => void;
    visibleFields: Record<string, boolean>;
  }>;

  if (!StyleComponent) {
    console.warn(`No component found for style type "${type}"`);
    return null;
  }

    if (!type) {
    console.error("Style type is undefined.");
    return null;
  }

  return (
    <SidebarItemCard
      onRemove={() => onRemove(type, kind)}
      type={type}
      kind={kind}
      visibleFields={visibleFields}
      setVisibleFields={setVisibleFields}
    >
      <StyleComponent
        data={initialData as StyleElementMap[T]}
        onChange={handleDataChange}
        visibleFields={visibleFields}
      />
    </SidebarItemCard>
  );
}
