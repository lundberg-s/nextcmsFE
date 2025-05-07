import { Render } from ".";

interface RenderContentItemProps {
  type: ElementType;
  component: Partial<Element>;
  kind: ElementKind;
}

const CONTENT_LIST = {
  title: Render.Title,
  button: Render.Button,
  input: Render.Input,
  desc: Render.Description,
  separator: Render.Separator,
  card: Render.Card,
  carousel: Render.Carousel,
} as const;

export function RenderContentItem({
  type,
  component: data,
}: Omit<RenderContentItemProps, "type"> & { type: keyof typeof CONTENT_LIST | string }) {

  const ContentItem = CONTENT_LIST[type as keyof typeof CONTENT_LIST];

  if (!ContentItem) {
    return null;
  }

  return <ContentItem data={data} />;
}