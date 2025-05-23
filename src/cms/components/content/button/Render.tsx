
import { Button } from "@/shared/ui/button";
import { cn } from "@/cms/lib/utils";

interface ButtonProps {
  data: ButtonElement;
}

export function RenderButton({ data }: ButtonProps) {
  return (
    <Button
      variant={data.variant || "default"}
      size={data.size || "default"}
    >
      {data.button_text || "Button"}
    </Button>
  );
}