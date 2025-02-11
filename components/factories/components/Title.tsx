import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BlockComponent } from "@/types/blocks";

interface TitleProps {
  component: Partial<BlockComponent>;
  onChange: (key: string, value: string | string[]) => void;
}

export function Title({ component, onChange }: TitleProps) {
  return (
    <div className="space-y-2">
      <Label>Title</Label>
      <Input
        value={component?.title || ""}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Enter title"
      />
    </div>
  );
}