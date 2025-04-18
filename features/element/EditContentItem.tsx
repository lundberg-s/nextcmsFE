import { BlockComponent, ComponentKind, ComponentType } from "@/lib/types/blocks";
import FactoryWrapper from "../../components/wrappers/FactoryWrapper";
import { Edit } from "./content";

interface EditContentItemProps {
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

const CONTENT_LIST = {
  title: Edit.Title,
  description: Edit.Description,
  button: Edit.Button,
  input: Edit.Input,
  separator: Edit.Separator,
  card: Edit.Card,
  carousel: Edit.Carousel,
} as const;

export function EditContentItem({
  type,
  component,
  kind,
  onChange,
  onRemove,
}: Omit<EditContentItemProps, "type"> & { type: keyof typeof CONTENT_LIST }) {
  const handleValueChange = (key: string, value: string | string[]) => {
    onChange(type, { ...component, [key]: value }, kind);
  };

  const ContentItem = CONTENT_LIST[type];

  return (
    <FactoryWrapper 
      onRemove={() => onRemove(type, kind)} 
      type={type} 
      kind={kind}
    >
      {ContentItem ? (
        <ContentItem 
          component={component} 
          onChange={handleValueChange} 
        />
      ) : null}
    </FactoryWrapper>
  );
}