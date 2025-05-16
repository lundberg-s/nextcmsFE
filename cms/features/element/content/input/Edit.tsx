
import { Input } from "@/shared/ui/input";
import { cn } from "@/cms/lib/utils";
import { Label } from "@/shared/ui/label";


interface InputProps {
  data: Partial<Element>;
  onChange: (key: string, value: string | string[]) => void;
}

export function EditInput({ data }: InputProps) {
  return (
    <>
       <Label>Inputfield</Label>
      <Input
        type={data.type || "text"}
        placeholder={data.placeholder || "Input placeholder"}
        className={cn("max-w-sm", data.className)}
      />
    </>
  );
}