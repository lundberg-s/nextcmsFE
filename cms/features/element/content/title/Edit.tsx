import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";


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