import React from "react";
import { Element } from "@/lib/types/blocks";

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

  const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "black", "white"];

  return (
    <>
      <Label>Background Color</Label>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Background color"
      />
      <div className="flex justify-evenly">
        {colors.map((color) => (
          <button
            type="button"
            key={color}
            onClick={() => onChange(color)}
            style={{
              backgroundColor: color,
              width: 20,
              height: 20,
              borderRadius: 10,
              margin: 5,
              border: "none",
            }}
          />
        ))}
      </div>
    </>
  );
}
