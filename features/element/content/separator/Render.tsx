import { BlockComponent } from "@/lib/types/blocks";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SeparatorProps {
  component: Partial<BlockComponent>;
}

export function RenderSeparator({ component }: SeparatorProps) {
  return (
    <Separator
      orientation={component.orientation || "horizontal"}
      className={cn(
        component.orientation === "vertical" ? "h-full" : "w-full",
        component.className
      )}
    />
  );
}