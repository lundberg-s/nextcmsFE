import SidebarItemCard from "@/cms/components/wrappers/SidebarItemCard";
import { Edit } from ".";

interface EditContentItemProps<T extends keyof typeof CONTENT_LIST> {
  type: T;
  value?: ContentElementMap[T];
  kind: ElementKind;
  onChange: (
    type: T,
    value: ContentElementMap[T],
    kind: ElementKind
  ) => void;
  onRemove: (type: T, kind: ElementKind) => void;
}

type ContentElementMap = {
  title: TitleElement;
  description: DescriptionElement;
  button: ButtonElement;
  input: InputElement;
  separator: SeparatorElement;
  card: CardElement;
  carousel: CarouselElement;
  image: ImageElement;
  text: TextElement;
  features: FeaturesElement;
};

const CONTENT_LIST = {
  title: Edit.Title,
  description: Edit.Description,
  button: Edit.Button,
  input: Edit.Input,
  separator: Edit.Separator,
  card: Edit.Card,
  carousel: Edit.Carousel,
  image: Edit.Image,
  text: Edit.Text,
  features: Edit.Features,
} as const;

export function EditContentItem<T extends keyof typeof CONTENT_LIST>({
  type,
  value: data,
  kind,
  onChange,
  onRemove,
}: EditContentItemProps<T>) {
  const resolvedData = data ?? ({} as ContentElementMap[T]);

if (!type) {
    console.error("Type is undefined");
    return null; // Prevent rendering if type is undefined
  }

  const handleValueChange = (
    key: keyof ContentElementMap[T],
    value: any
  ) => {
    onChange(type, { ...resolvedData, [key]: value } as ContentElementMap[T], kind);
  };

  const ContentItem = CONTENT_LIST[type] as React.ComponentType<{
    data: ContentElementMap[T];
    onChange: (
      key: keyof ContentElementMap[T],
      value: any
    ) => void;
  }>;

  if (!CONTENT_LIST[type]) {
    console.error(`Invalid type: ${type}`);
    return null; // Prevent rendering if type is invalid
  }

  return (
    <SidebarItemCard
      onRemove={() => onRemove(type, kind)}
      type={type}
      kind={kind}
    >
      <ContentItem
        data={data ?? ({} as ContentElementMap[T])} // Provide an empty object if `data` is undefined
        onChange={handleValueChange}
      />
    </SidebarItemCard>
  );
}