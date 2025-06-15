import React from "react";
import { LabeledField } from "../../sidebar/SidebarField";

interface EditStyleProps {
    data: TextStyleElement;
    onChange?: (key: keyof TextStyleElement, value: any) => void;
}

export function Text({
    data,
    onChange,
}: EditStyleProps) {

    const textColor = data.textColor;
    const setTextColor = (img: string) => onChange?.("textColor", img);

    return (
        <div className="space-y-4">
            <LabeledField
                label="Text Color"
                type="input"
                value={textColor}
                onChange={setTextColor}
            />
        </div>
    );
}
