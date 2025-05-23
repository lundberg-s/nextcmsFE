import { Render } from ".";

type RenderElementMap = {
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
  title: Render.Title,
  description: Render.Description,
  button: Render.Button,
  input: Render.Input,
  separator: Render.Separator,
  card: Render.Card,
  carousel: Render.Carousel,
  image: Render.Image,
  text: Render.Text,
  features: Render.Features,
} as const;

interface RenderContentItemProps<T extends keyof typeof CONTENT_LIST> {
  type: T;
  value?: RenderElementMap[T];
  kind: ElementKind;
}

export function RenderContentItem<T extends keyof typeof CONTENT_LIST>({
  type,
  value: data,
}: RenderContentItemProps<T>) {
  const resolvedData = data ?? ({} as RenderElementMap[T]);

  const ContentItem = CONTENT_LIST[type] as React.ComponentType<{
    data: RenderElementMap[T];
  }>;


  return <ContentItem data={resolvedData} />;
}
