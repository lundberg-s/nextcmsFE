import { Element } from "@/lib/types/blocks";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";


interface InputProps {
  data: Partial<Element>;
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