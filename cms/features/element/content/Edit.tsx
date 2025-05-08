import SidebarItemCard from "@/cms/components/wrappers/SidebarItemCard";
import { Edit } from ".";

interface EditContentItemProps {
  type: ElementType;
  component: Partial<Element>;
  kind: ElementKind;
  onChange: (
    type: ElementType,
    component: Partial<Element>,
    kind: ElementKind
  ) => void;
  onRemove: (type: ElementType, kind: ElementKind) => void;
}

const CONTENT_LIST = {
  title: Edit.Title,
  description: Edit.Description,
  button: Edit.Button,
  input: Edit.Input,
  separator: Edit.Separator,
  card: Edit.Card,
  carousel: Edit.Carousel,
  image: Edit.Image,
} as const;

export function EditContentItem({
  type,
  component: data,
  kind,
  onChange,
  onRemove,
}: Omit<EditContentItemProps, "type"> & { type: keyof typeof CONTENT_LIST }) {
  const handleValueChange = (key: string, value: string | string[]) => {
    onChange(type, { ...data, [key]: value }, kind);
  };

  const ContentItem = CONTENT_LIST[type];

  if (!ContentItem) {
    return null;
  }

  return (
    <SidebarItemCard
      onRemove={() => onRemove(type, kind)}
      type={type}
      kind={kind}
    >
      <ContentItem data={data} onChange={handleValueChange} />
    </SidebarItemCard>
  );
}
