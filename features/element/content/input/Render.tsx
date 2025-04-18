
import { Element } from "@/lib/types/blocks";
import { Label } from "@/components/ui/label";
import { Input as InputField } from "@/components/ui/input";

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
