import { BlockComponent, ComponentKind, ComponentType } from "@/lib/types/blocks";
import { CMS } from ".";
import FactoryWrapper from "../wrappers/FactoryWrapper";

interface ComponentFactoryProps {
  type: ComponentType;
  component: Partial<BlockComponent>;
  kind: ComponentKind;
  onChange: (
    type: ComponentType,
    component: Partial<BlockComponent>,
    kind: ComponentKind
  ) => void;
  onRemove: (type: ComponentType, kind: ComponentKind) => void;
}

export function ComponentFactory({
  type,
  component,
  kind,
  onChange,
  onRemove,
}: ComponentFactoryProps) {
  const handleComponentChange = (key: string, value: string | string[]) => {
    onChange(type, { ...component, [key]: value }, kind);
  };

  const renderProps = () => {
    switch (type) {
      case "title":
        return <CMS.Title component={component} onChange={handleComponentChange} />;
      case "description":
        return <CMS.Description component={component} onChange={handleComponentChange} />;
      case "button":
        return <CMS.Button component={component} onChange={handleComponentChange} />;
      case "input":
        return <CMS.Input component={component} onChange={handleComponentChange} />;
      case "separator":
        return <CMS.Separator component={component} onChange={handleComponentChange} />;
      case "card":
        return <CMS.Card component={component} onChange={handleComponentChange} />;
      case "carousel":
        return <CMS.Carousel component={component} onChange={handleComponentChange} />;
      default:
        return null;
    }
  };

  return (
    <FactoryWrapper onRemove={() => onRemove(type, kind)} type={type} kind={kind}>
      {renderProps()}
    </FactoryWrapper>
  );
}