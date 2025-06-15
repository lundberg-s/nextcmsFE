import React from "react";
import { LabeledField } from "../../sidebar/SidebarField";

interface EditStyleProps {
    data: BackgroundStyleElement;
    onChange?: (key: keyof BackgroundStyleElement, value: any) => void;
}

export function Background({
    data,
    onChange,
}: EditStyleProps) {

    const bgColor = data.backgroundColor;
    const setBgColor = (color: string) => onChange?.("backgroundColor", color);
    const bgColorOptions  = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "black", "white"];

    const bgImage = data.backgroundImage;
    const setBgImage = (img: string) => onChange?.("backgroundImage", img);

    return (
        <div className="space-y-4">
            <LabeledField
                placeholder="Select background color"
                label="Background Color"
                type="dropdown"
                options={bgColorOptions.map(color => ({ value: color, label: color }))}
                value={bgColor}
                onChange={setBgColor}
            />
            <LabeledField
                label="Background Image"
                type="input"
                value={bgImage}
                onChange={setBgImage}
            />
        </div>
    );
}
