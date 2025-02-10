import React from "react";
import SettingsWrapper from "@/components/wrappers/SettingsWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextColorComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextColor({
  value,
  onChange,
}: TextColorComponentProps) {

  return (
    <SettingsWrapper>
      <Label>Text Color</Label>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Text color"
      />
    </SettingsWrapper>
  );
};
