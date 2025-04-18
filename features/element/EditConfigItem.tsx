import { ElementKind, ElementType } from "@/lib/types/blocks";
import SidebarItemCard from "../../components/wrappers/SidebarItemCard";
import { Edit } from "./config";
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
}: Omit<EditConfigItemProps, "type"> & { type: keyof typeof CONFIGURATIONS_LIST }) {
  const handlePropChange = (value: string) => {
    onChange(type, value, kind);
  };

  const Config = CONFIGURATIONS_LIST[type];

  return (
    <SidebarItemCard 
      onRemove={() => onRemove(type, kind)} 
      type={type} 
      kind={kind}
    >
      {Config ? (
        <Config 
          value={value} 
          onChange={handlePropChange} 
        />
      ) : null}
    </SidebarItemCard>
  );
}