
import { Element } from "@/cms/lib/types/blocks";
import { Label } from "@/cms/components/ui/label";
import { Input as InputField } from "@/cms/components/ui/input";

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
