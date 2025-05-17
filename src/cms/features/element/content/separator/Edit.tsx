import { Select } from "@/shared/ui/select";
import { SelectTrigger, SelectValue } from "@/shared/ui/select";
import { SelectContent, SelectItem } from "@/shared/ui/select";


import { Label } from "@/shared/ui/label";

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
