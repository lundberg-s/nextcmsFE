import React from "react";
import SettingsWrapper from "@/components/wrappers/SettingsWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BackgroundColorComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export function BackgroundColor({
  value,
  onChange,
}: BackgroundColorComponentProps) {
  return (
    <SettingsWrapper>
      <Label>Background Color</Label>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Background color"
      />
    </SettingsWrapper>
  );
}
