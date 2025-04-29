import React from "react";

import { Input } from "@/cms/components/ui/input";
import { Label } from "@/cms/components/ui/label";

interface TextColorComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextColor({
  value,
  onChange,
}: TextColorComponentProps) {

  return (
    <>
      <Label>Text Color</Label>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Text color"
      />
    </>
  );
};
