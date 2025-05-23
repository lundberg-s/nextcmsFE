import React from "react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface EditStyleProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function ContainerLayout({
  value,
  onChange,
}: EditStyleProps) {

  return (
    <>
      <Label>Layout</Label>
      <Input
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="left, right, center"
      />
    </>
  );
};
