
import { Button } from "@/cms/components/ui/button";
import { cn } from "@/cms/lib/utils";

interface ButtonProps {
  data: Partial<Element>;
}

export function RenderButton({ data }: ButtonProps) {
  return (
    <Button
      variant={data.variant || "default"}
      size={data.size || "default"}
      className={cn("w-fit", data.className)}
    >
      {data.text || "Button"}
    </Button>
  );
}