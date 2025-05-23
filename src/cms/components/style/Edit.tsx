import SidebarItemCard from "@/cms/components/wrappers/SidebarItemCard";
import { Edit } from ".";
import { WaveOverlay } from "./WaveOverlay";
interface EditstyleItemProps {
  type: StyleType;
  value?: string;
  kind: ElementKind;
  onChange: (type: StyleType, value: string, kind: ElementKind) => void;
  onRemove: (type: ElementType, kind: ElementKind) => void;
}

const STYLE_LIST = {
  backgroundColor: Edit.BackgroundColor,
  backgroundImage: Edit.BackgroundImage,
  textColor: Edit.TextColor,
  layout: Edit.ContainerLayout,
  height: Edit.Height,
  waveOverlay: WaveOverlay,
  backgroundOverlay: Edit.BackgroundOverlay,
} as const;

export function EditstyleItem({
  type,
  value,
  kind,
  onChange,
  onRemove,
}: Omit<EditstyleItemProps, "type"> & {
  type: keyof typeof STYLE_LIST;
}) {
  const handlePropChange = (value: string) => {
    onChange(type, value, kind);
  };

  const StyleItem = STYLE_LIST[type];

  if (!StyleItem) {
    return null;
  }

  return (
    <SidebarItemCard
      onRemove={() => onRemove(type, kind)}
      type={type}
      kind={kind}
    >
      <StyleItem value={value} onChange={handlePropChange} />
    </SidebarItemCard>
  );
}
