import SettingsWrapper from "@/components/wrappers/SettingsWrapper";
import { BlockComponent } from "@/types/blocks";
import { Label } from "@/components/ui/label";
import { Input as InputField } from "@/components/ui/input";

interface InputComponentProps {
  component: Partial<BlockComponent>;
  onChange: (field: string, value: string) => void;
}

export function Input({ component, onChange }: InputComponentProps) {
  return (
    <SettingsWrapper>
      <Label>Placeholder</Label>
      <InputField
        value={component.placeholder || ""}
        onChange={(e) => onChange("placeholder", e.target.value)}
        placeholder="Enter placeholder text"
      />
    </SettingsWrapper>
  );
}
