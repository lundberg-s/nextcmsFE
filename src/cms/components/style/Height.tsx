import React from "react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Slider } from "@/shared/ui/slider";

interface EditStyleProps {
    value?: string;
    onChange?: (value: string) => void;
  }

export function Height({
    value,
    onChange,
}: EditStyleProps) {
    const displayValue = value && value !== "" ? value : "600";

    return (
        <>
            <div className="w-full flex justify-between">
                <Label className="w-full flex justify-between">Height</Label>
                <Label>{displayValue}px</Label>
            </div>
            <div className="py-4">
                <Slider
                    value={[parseInt(displayValue)]}
                    onValueChange={(value) => {
                        onChange?.(value[0].toString());
                    }}
                    min={0}
                    max={1000}
                    step={100}
                    defaultValue={[parseInt(displayValue)]}
                    className="w-full"
                />
            </div>
        </>
    );
}

export default Height;
