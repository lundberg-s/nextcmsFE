import { ComponentKind, ComponentType, BlockComponent } from "@/types/blocks";
import { CMS } from ".";
import FactoryWrapper from "../wrappers/FactoryWrapper";

interface SettingsFactoryProps {
  type: ComponentType;
  value: string;
  kind: ComponentKind;
  onChange: (type: ComponentType, value: string, kind: ComponentKind) => void;
  onRemove: (type: ComponentType, kind: ComponentKind) => void;
}

export function SettingsFactory({
  type,
  value,
  kind,
  onChange,
  onRemove,
}: SettingsFactoryProps) {
  const handlePropChange = (value: string) => {
    onChange(type, value, kind);
  };

  const renderProps = () => {
    switch (type) {
      case "backgroundColor":
        return <CMS.BackgroundColor value={value} onChange={handlePropChange} />;
      case "backgroundImage":
        return <CMS.BackgroundImage value={value} onChange={handlePropChange} />;
      case "textColor":
        return <CMS.TextColor value={value} onChange={handlePropChange} />;
      case "layout":
        return <CMS.ContainerLayout value={value} onChange={handlePropChange} />;
      default:
        return null;
    }
  };

  return (
    <FactoryWrapper onRemove={onRemove} type={type} kind={kind}>
      {renderProps()}
    </FactoryWrapper>
  );
}
