import { Select } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectItem } from "@/components/ui/select";
import SettingsWrapper from "@/components/wrappers/SettingsWrapper";
import { BlockComponent } from "@/lib/types/blocks";
import { Label } from "@/components/ui/label";

interface SeparatorComponentProps {
  component: Partial<BlockComponent>;
  onChange: (key: string, value: string) => void;
}

export function Separator({ component, onChange }: SeparatorComponentProps) {
  return (
    <SettingsWrapper>
      <Label>Orientation</Label>
      <Select
        value={component.orientation || "horizontal"}
        onValueChange={(value) => onChange("orientation", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select orientation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="horizontal">Horizontal</SelectItem>
          <SelectItem value="vertical">Vertical</SelectItem>
        </SelectContent>
      </Select>
    </SettingsWrapper>
  );
}
