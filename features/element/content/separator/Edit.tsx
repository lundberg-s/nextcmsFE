import { Select } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectItem } from "@/components/ui/select";

import { Element } from "@/lib/types/blocks";
import { Label } from "@/components/ui/label";

interface EditSeparatorComponentProps {
  data: Partial<Element>;
  onChange: (key: string, value: string) => void;
}

export function EditSeparator({ data, onChange }: EditSeparatorComponentProps) {
  return (
    <>
      <Label>Orientation</Label>
      <Select
        value={data.orientation || "horizontal"}
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
    </>
  );
}
