import { BlockComponent } from "@/lib/types/blocks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps {
  component: Partial<BlockComponent>;
}

export function RenderButton({ component }: ButtonProps) {
  return (
    <Button
      variant={component.variant || "default"}
      size={component.size || "default"}
      className={cn("w-fit", component.className)}
    >
      {component.text || "Button"}
    </Button>
  );
}