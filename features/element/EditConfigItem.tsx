import { ComponentKind, ComponentType } from "@/lib/types/blocks";
import FactoryWrapper from "../../components/wrappers/FactoryWrapper";
import { Edit } from "./config";
interface EditSettingItemProps {
  type: ComponentType;
  value: string;
  kind: ComponentKind;
  onChange: (type: ComponentType, value: string, kind: ComponentKind) => void;
  onRemove: (type: ComponentType, kind: ComponentKind) => void;
}

const CONFIGURATIONS_LIST = {
  backgroundColor: Edit.BackgroundColor,
  backgroundImage: Edit.BackgroundImage,
  textColor: Edit.TextColor,
  layout: Edit.ContainerLayout,
} as const;

export function EditSettingItem({
  type,
  value,
  kind,
  onChange,
  onRemove,
}: Omit<EditSettingItemProps, "type"> & { type: keyof typeof CONFIGURATIONS_LIST }) {
  const handlePropChange = (value: string) => {
    onChange(type, value, kind);
  };

  const Config = CONFIGURATIONS_LIST[type];

  return (
    <FactoryWrapper 
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
    </FactoryWrapper>
  );
}