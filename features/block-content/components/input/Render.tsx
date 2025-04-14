import SettingsWrapper from "@/components/wrappers/SettingsWrapper";
import { BlockComponent } from "@/lib/types/blocks";
import { Label } from "@/components/ui/label";
import { Input as InputField } from "@/components/ui/input";

interface RenderInputComponentProps {
  component: Partial<BlockComponent>;
}

export function RenderInput({ component }: RenderInputComponentProps) {
  return (
    <SettingsWrapper>
      <Label>Placeholder</Label>
      <InputField
        value={component.placeholder || ""}
        placeholder="Enter placeholder text"
      />
    </SettingsWrapper>
  );
}
