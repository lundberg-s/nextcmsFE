import React from "react";

import { Input } from "@/cms/components/ui/input";
import { Label } from "@/cms/components/ui/label";

interface BackgroundImageComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export function BackgroundImage({
  value,
  onChange,
}: BackgroundImageComponentProps) {
  return (
    <>
      <Label>Background Image</Label>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Background image"
      />
    </>
  );
}

export default BackgroundImage;
