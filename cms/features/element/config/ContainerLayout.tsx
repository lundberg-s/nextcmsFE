import React from "react";

import { Input } from "@/cms/components/ui/input";
import { Label } from "@/cms/components/ui/label";

interface ContainerLayoutComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export function ContainerLayout({
  value,
  onChange,
}: ContainerLayoutComponentProps) {

  return (
    <>
      <Label>Layout</Label>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="left, right, center"
      />
    </>
  );
};
