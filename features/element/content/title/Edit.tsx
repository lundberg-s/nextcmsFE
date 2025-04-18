import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Element } from "@/lib/types/blocks";

interface TitleProps {
  data: Partial<Element>;
  onChange: (key: string, value: string | string[]) => void;
}

export function EditTitle({ data, onChange }: TitleProps) {
  return (
    <>
      <Label>Title</Label>
      <Input
        value={data?.title || ""}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Enter title"
      />
    </>
  );
}