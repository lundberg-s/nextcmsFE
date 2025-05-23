import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import React from "react";

interface EditButtonComponentProps {
  data: ButtonElement;
  onChange: (key: keyof ButtonElement, value: any) => void;
}

export function EditButton({ data, onChange }: EditButtonComponentProps) {
  return (
    <>
      <Label>Button Text</Label>
      <Input
        value={data.button_text || ""}
        onChange={(e) => onChange("button_text", e.target.value)}
        placeholder="Enter Button text"
      />

      <Label>Button Variant</Label>
      <Select
        value={data.variant || "default"}
        onValueChange={(value) => onChange("variant", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select variant" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="secondary">Secondary</SelectItem>
          <SelectItem value="outline">Outline</SelectItem>
          <SelectItem value="ghost">Ghost</SelectItem>
          <SelectItem value="destructive">Destructive</SelectItem>
          <SelectItem value="defaultLeft">Default Left</SelectItem>
          <SelectItem value="defaultRight">Default Right</SelectItem>
          <SelectItem value="link">Link</SelectItem>
        </SelectContent>
      </Select>

      <Label>Button Size</Label>
      <Select
        value={data.size || "default"}
        onValueChange={(value) => onChange("size", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="sm">Small</SelectItem>
          <SelectItem value="lg">Large</SelectItem>
          <SelectItem value="icon">Icon</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}