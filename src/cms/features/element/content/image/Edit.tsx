import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import React from "react";

interface EditImageComponentProps {
  data: Partial<Element>;
  onChange: (key: string, value: string | number) => void;
}

export function EditImage({ data, onChange }: EditImageComponentProps) {
  return (
    <>
      <Label>Image Source</Label>
      <Input
        value={data.src || ""}
        onChange={(e) => onChange("src", e.target.value)}
        placeholder="Enter image URL"
      />

      <Label>Alt Text</Label>
      <Input
        value={data.alt || ""}
        onChange={(e) => onChange("alt", e.target.value)}
        placeholder="Enter alt text"
      />

      <Label>Image Width</Label>
      <Input
        type="number"
        value={data.width || ""}
        onChange={(e) => onChange("width", parseInt(e.target.value, 10))}
        placeholder="Enter width (optional)"
      />

      <Label>Image Height</Label>
      <Input
        type="number"
        value={data.height || ""}
        onChange={(e) => onChange("height", parseInt(e.target.value, 10))}
        placeholder="Enter height (optional)"
      />
    </>
  );
}