import { Select } from "@/shared/ui/select";
import { SelectTrigger, SelectValue } from "@/shared/ui/select";
import { SelectItem } from "@/shared/ui/select";
import { SelectContent } from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";

import React from "react";

interface EditButtonComponentProps {
  data: Partial<Element>;
  onChange: (key: string, value: string) => void;
}

export function EditButton({ data, onChange }: EditButtonComponentProps) {
  return (
    <>
      <Select
        value={data.variant || "default"}
        onValueChange={(value) => onChange("variant", value)}
      >
        <Label>Button Text</Label>
        <Input
          value={data.text || ""}
          onChange={(e) => onChange("text", e.target.value)}
          placeholder="Enter Button text"
        />
        <Label>Button Variant</Label>

        <SelectTrigger>
          <SelectValue placeholder="Select variant" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="secondary">Secondary</SelectItem>
          <SelectItem value="outline">Outline</SelectItem>
          <SelectItem value="ghost">Ghost</SelectItem>
          <SelectItem value="destructive">Destructive</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
