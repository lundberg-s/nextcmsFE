import { BlockComponent } from "@/lib/types/blocks";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputProps {
  component: Partial<BlockComponent>;
}

export function EditInput({ component }: InputProps) {
  return (
    <Input
      type={component.type || "text"}
      placeholder={component.placeholder || "Input placeholder"}
      className={cn("max-w-sm", component.className)}
    />
  );
}