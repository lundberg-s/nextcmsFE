import { Element } from "@/lib/types/blocks";

interface RenderDescriptionProps {
  data: Partial<Element>;
}

export function RenderDescription({ data }: RenderDescriptionProps) {
  return (
    <p className="text-sm text-muted-foreground">
      {data.content || data.placeholder || "Description text"}
    </p>
  );
}