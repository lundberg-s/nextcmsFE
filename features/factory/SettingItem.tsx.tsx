import { ComponentKind, ComponentType } from "@/lib/types/blocks";
import { CMS } from "../../components/factories";
import FactoryWrapper from "../../components/wrappers/FactoryWrapper";

interface SettingsFactoryProps {
  type: ComponentType;
  value: string;
  kind: ComponentKind;
  onChange: (type: ComponentType, value: string, kind: ComponentKind) => void;
  onRemove: (type: ComponentType, kind: ComponentKind) => void;
}

const SETTING_MAP = {
  backgroundColor: CMS.BackgroundColor,
  backgroundImage: CMS.BackgroundImage,
  textColor: CMS.TextColor,
  layout: CMS.ContainerLayout,
} as const;

export function SettingsFactory({
  type,
  value,
  kind,
  onChange,
  onRemove,
}: Omit<SettingsFactoryProps, "type"> & { type: keyof typeof SETTING_MAP }) {
  const handlePropChange = (value: string) => {
    onChange(type, value, kind);
  };

  const EditorComponent = SETTING_MAP[type];

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