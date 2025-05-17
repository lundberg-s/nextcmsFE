

import { Label } from "@/shared/ui/label";
import { Input as InputField } from "@/shared/ui/input";

interface RenderInputComponentProps {
  data: Partial<Element>;
}

export function RenderInput({ data }: RenderInputComponentProps) {
  return (
    <>
      <Label>Placeholder</Label>
      <InputField
        value={data.placeholder || ""}
        placeholder="Enter placeholder text"
      />
    </>
  );
}
