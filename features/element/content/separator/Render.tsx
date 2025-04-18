import { Element } from "@/lib/types/blocks";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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