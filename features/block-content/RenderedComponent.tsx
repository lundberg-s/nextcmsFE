import { BlockComponent, ComponentKind, ComponentType } from "@/lib/types/blocks";
import { Render } from "./components";

interface RenderedComponentProps {
  type: ComponentType;
  component: Partial<BlockComponent>;
  kind: ComponentKind;
}

const COMPONENT_MAP = {
  title: Render.Title,
  button: Render.Button,
  input: Render.Input,
  desc: Render.Description,
  separator: Render.Separator,
  card: Render.Card,
  carousel: Render.Carousel,
} as const;

export function RenderedComponent({
  type,
  component,
  kind,
}: Omit<RenderedComponentProps, "type"> & { type: keyof typeof COMPONENT_MAP | string }) {

  const RenderComponent = COMPONENT_MAP[type as keyof typeof COMPONENT_MAP];

  if (!RenderComponent) {
    return null;
  }

  return <RenderComponent component={component} />;
}