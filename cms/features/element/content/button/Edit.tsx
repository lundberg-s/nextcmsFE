import { Select } from "@/cms/components/ui/select";
import { SelectTrigger, SelectValue } from "@/cms/components/ui/select";
import { SelectItem } from "@/cms/components/ui/select";
import { SelectContent } from "@/cms/components/ui/select";
import { Label } from "@/cms/components/ui/label";
import { Input } from "@/cms/components/ui/input";

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
