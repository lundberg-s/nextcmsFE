import { BlockComponent } from "@/lib/types/blocks";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import SettingsWrapper from "@/components/wrappers/SettingsWrapper";

interface InputProps {
  component: Partial<BlockComponent>;
}

export function EditInput({ component }: InputProps) {
  return (
    <SettingsWrapper>
       <Label>Inputfield</Label>
      <Input
        type={component.type || "text"}
        placeholder={component.placeholder || "Input placeholder"}
        className={cn("max-w-sm", component.className)}
      />
    </SettingsWrapper>
  );
}