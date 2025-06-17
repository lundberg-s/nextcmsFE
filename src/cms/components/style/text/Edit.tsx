import React from "react";
import { LabeledField } from "../../sidebar/SidebarField";

interface EditStyleProps {
    data: TextStyleElement;
    onChange?: (key: keyof TextStyleElement, value: any) => void;
    visibleFields?: Record<string, boolean>;
}

export function Text({
    data,
    onChange,
    visibleFields = {},
}: EditStyleProps) {

    const fontSize = data.fontSize;
    const setFontSize = (value: string) => onChange?.("fontSize", value);
    const showFontSize = visibleFields.fontSize;

    const textColor = data.textColor;
    const setTextColor = (img: string) => onChange?.("textColor", img);
    const showTextColor = visibleFields.textColor;

    return (
        <div className="space-y-4">
            {showFontSize && (
                <LabeledField
                    label="Font Size"
                    type="slider"
                    min={8}
                    max={72}
                    step={2}
                    value={fontSize}
                    onChange={setFontSize}
                />
            )}

            {showTextColor && (
                <LabeledField
                    label="Text Color"
                    type="input"
                    value={textColor}
                    onChange={setTextColor}
                />
            )}
        </div>
    );
}
