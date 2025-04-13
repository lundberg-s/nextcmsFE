import { BlockComponent, ComponentKind, ComponentType } from "@/lib/types/blocks";
import { CMS } from "../../components/factories";
import FactoryWrapper from "../../components/wrappers/FactoryWrapper";

interface ComponentItemProps {
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

const COMPONENT_MAP = {
  title: CMS.Title,
  description: CMS.Description,
  button: CMS.Button,
  input: CMS.Input,
  separator: CMS.Separator,
  card: CMS.Card,
  carousel: CMS.Carousel,
} as const;

const SETTING_MAP = {
  backgroundColor: CMS.BackgroundColor,
  backgroundImage: CMS.BackgroundImage,
  textColor: CMS.TextColor,
  layout: CMS.ContainerLayout,
} as const;

export function ComponentItem({
  type,
  component,
  kind,
  onChange,
  onRemove,
}: Omit<ComponentItemProps, "type"> & { type: keyof typeof COMPONENT_MAP }) {
  const handleComponentChange = (key: string, value: string | string[]) => {
    onChange(type, { ...component, [key]: value }, kind);
  };

  const EditorComponent = COMPONENT_MAP[type];

  return (
    <FactoryWrapper 
      onRemove={() => onRemove(type, kind)} 
      type={type} 
      kind={kind}
    >
      {EditorComponent ? (
        <EditorComponent 
          component={component} 
          onChange={handleComponentChange} 
        />
      ) : null}
    </FactoryWrapper>
  );
}