import { BlockComponent } from "@/lib/types/blocks";

interface RenderDescriptionProps {
  component: Partial<BlockComponent>;
}

export function RenderDescription({ component }: RenderDescriptionProps) {
  return (
    <p className="text-sm text-muted-foreground">
      {component.content || component.placeholder || "Description text"}
    </p>
  );
}