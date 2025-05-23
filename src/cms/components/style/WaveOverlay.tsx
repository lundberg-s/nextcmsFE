import React from "react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Slider } from "@/shared/ui/slider";

interface EditStyleProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function WaveOverlay({
  value,
  onChange,
}: EditStyleProps) {
  const displayValue = value && value !== "" ? value : "80";

  return (
    <>
      <div className="w-full flex justify-between">
        <Label className="w-full flex justify-between">Wave Height</Label>
        <Label>{displayValue}</Label>
      </div>
      <div className="py-4">
        <Slider
          value={[value ? parseInt(value) : 0]}
          onValueChange={(value) => onChange?.(value.toString())}
          min={0}
          max={300}
          step={1}
          defaultValue={[0]}
          className="w-full"
        />
      </div>
    </>
  );
};
