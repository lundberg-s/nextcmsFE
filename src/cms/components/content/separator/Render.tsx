
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/cms/lib/utils";

interface SeparatorProps {
  data: Partial<Element>;
}

export function RenderSeparator({ data }: SeparatorProps) {
  return (
    <Separator
      orientation={data.orientation || "horizontal"}
      className={cn(
        data.orientation === "vertical" ? "h-full" : "w-full",
        data.className
      )}
    />
  );
}