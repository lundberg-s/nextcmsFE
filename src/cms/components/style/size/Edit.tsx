import React from "react";
import { LabeledField } from "../../sidebar/SidebarField";

interface EditStyleProps {
    data: SizeStyleElement;
    onChange?: (key: keyof SizeStyleElement, value: any) => void;
    visibleFields?: Record<string, boolean>;
}

export function Size({
    data,
    onChange,
    visibleFields = {},
}: EditStyleProps) {

    const height = data.height;
    const setHeight = (color: string) => onChange?.("height", color);
    const showHeight = visibleFields.height;

    return (
        <div className="space-y-4">
            {showHeight && (
                <LabeledField
                    label="Height"
                    type="slider"
                    min={0}
                    max={1000}
                    step={100}
                    value={height}
                    onChange={setHeight}
                />
            )}

        </div>
    );
}
