import React from "react";
import { LabeledField } from "../../sidebar/SidebarField";

interface EditStyleProps {
    data: SizeStyleElement;
    onChange?: (key: keyof SizeStyleElement, value: any) => void;
}

export function Size({
    data,
    onChange,
}: EditStyleProps) {

    const height = data.height;
    const setHeight = (color: string) => onChange?.("height", color);

    return (
        <div className="space-y-4">
            <LabeledField
                label="Height"
                type="slider"
                min={0}
                max={1000}
                step={100}
                value={height}
                onChange={setHeight}
            />
        </div>
    );
}
