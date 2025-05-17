import SidebarItemCard from "@/cms/components/wrappers/SidebarItemCard";
import { Edit } from ".";
interface EditConfigItemProps {
  type: ElementType;
  value: string;
  kind: ElementKind;
  onChange: (type: ElementType, value: string, kind: ElementKind) => void;
  onRemove: (type: ElementType, kind: ElementKind) => void;
}

const CONFIGURATIONS_LIST = {
  backgroundColor: Edit.BackgroundColor,
  backgroundImage: Edit.BackgroundImage,
  textColor: Edit.TextColor,
  layout: Edit.ContainerLayout,
} as const;

export function EditConfigItem({
  type,
  value,
  kind,
  onChange,
  onRemove,
}: Omit<EditConfigItemProps, "type"> & {
  type: keyof typeof CONFIGURATIONS_LIST;
}) {
  const handlePropChange = (value: string) => {
    onChange(type, value, kind);
  };

  const ConfigItem = CONFIGURATIONS_LIST[type];

  if (!ConfigItem) {
    return null;
  }

  return (
    <SidebarItemCard
      onRemove={() => onRemove(type, kind)}
      type={type}
      kind={kind}
    >
      <ConfigItem value={value} onChange={handlePropChange} />
    </SidebarItemCard>
  );
}
