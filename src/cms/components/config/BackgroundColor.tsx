import React from "react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

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
      <div className="w-full flex justify-evenly pt-2">
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
