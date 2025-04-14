import { BlockComponent, ComponentKind, ComponentType } from "@/lib/types/blocks";
import { CMS } from "../../components/factories";
import FactoryWrapper from "../../components/wrappers/FactoryWrapper";
import { Edit } from "./components";

interface EditableComponentProps {
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
  title: Edit.Title,
  description: Edit.Description,
  button: Edit.Button,
  input: Edit.Input,
  separator: Edit.Separator,
  card: Edit.Card,
  carousel: Edit.Carousel,
} as const;

export function EditableComponent({
  type,
  component,
  kind,
  onChange,
  onRemove,
}: Omit<EditableComponentProps, "type"> & { type: keyof typeof COMPONENT_MAP }) {
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