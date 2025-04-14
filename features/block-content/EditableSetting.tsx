import { ComponentKind, ComponentType } from "@/lib/types/blocks";
import { CMS } from "../../components/factories";
import FactoryWrapper from "../../components/wrappers/FactoryWrapper";

interface SettingsItemProps {
  type: ComponentType;
  value: string;
  kind: ComponentKind;
  onChange: (type: ComponentType, value: string, kind: ComponentKind) => void;
  onRemove: (type: ComponentType, kind: ComponentKind) => void;
}

const SETTING_LIST = {
  backgroundColor: CMS.BackgroundColor,
  backgroundImage: CMS.BackgroundImage,
  textColor: CMS.TextColor,
  layout: CMS.ContainerLayout,
} as const;

export function SettingsItem({
  type,
  value,
  kind,
  onChange,
  onRemove,
}: Omit<SettingsItemProps, "type"> & { type: keyof typeof SETTING_LIST }) {
  const handlePropChange = (value: string) => {
    onChange(type, value, kind);
  };

  const EditorComponent = SETTING_LIST[type];

  return (
    <FactoryWrapper 
      onRemove={() => onRemove(type, kind)} 
      type={type} 
      kind={kind}
    >
      {EditorComponent ? (
        <EditorComponent 
          value={value} 
          onChange={handlePropChange} 
        />
      ) : null}
    </FactoryWrapper>
  );
}