import { Select } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SettingsWrapper from "@/components/wrappers/SettingsWrapper";
import React from "react";

interface EditButtonComponentProps {
  component: any;
  onChange: (key: string, value: string) => void;
}

export function EditButton({ component, onChange }: EditButtonComponentProps) {
  return (
    <SettingsWrapper>
      <Select
        value={component.variant || "default"}
        onValueChange={(value) => onChange("variant", value)}
      >
        <Label>Button Text</Label>
        <Input
          value={component.text || ""}
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
    </SettingsWrapper>
  );
}
