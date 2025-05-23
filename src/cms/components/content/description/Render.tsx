

interface RenderDescriptionProps {
  data: DescriptionElement;
}

export function RenderDescription({ data }: RenderDescriptionProps) {
  return (
    <p className="text-sm text-muted-foreground">
      {data.description || "Description text"}
    </p>
  );
}