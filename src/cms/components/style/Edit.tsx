import SidebarItemCard from "@/cms/components/sidebar/SidebarItemCard";
import { Edit } from ".";

type StyleTypeKey = keyof typeof STYLE_LIST;

type StyleElementMap = {
  background: BackgroundStyleElement;
  overlay: OverlayStyleElement;
  size: SizeStyleElement;
  text: TextStyleElement;
}

interface EditStyleItemProps <T extends StyleTypeKey>{
  type: T;
  value?: StyleElementMap[T]
  kind: ElementKind;
  onChange: (type: StyleType, value: StyleElementMap[T], kind: ElementKind) => void;
  onRemove: (type: ElementType, kind: ElementKind) => void;
}

const STYLE_LIST = {
  background: Edit.Background,
  overlay: Edit.Overlay,
  size: Edit.Size,
  text: Edit.Text,
} as const;

export function EditStyleItem<T extends keyof typeof STYLE_LIST>({
  type,
  value: data,
  kind,
  onChange,
  onRemove,
}: EditStyleItemProps<T>) {
  const resolvedData = data ?? ({} as StyleElementMap[T]);

  if (!type) {
    console.error("Type is undefined");
    return null;
  }
  
  const handleDataChange = (
    key: keyof StyleElementMap[T],
    value: any
  ) => {
    onChange(type, { ...resolvedData, [key]: value } as StyleElementMap[T], kind);
  };

  const StyleItem = STYLE_LIST[type] as React.ComponentType<{
    data: StyleElementMap[T];
    onChange: (key: keyof StyleElementMap[T], value: any) => void;
  }>;

  if (!StyleItem) {
    return null;
  }

  return (
    <SidebarItemCard
      onRemove={() => onRemove(type, kind)}
      type={type}
      kind={kind}
    >
      <StyleItem
        data={resolvedData}
        onChange={handleDataChange}
      />
    </SidebarItemCard>
  );
}
