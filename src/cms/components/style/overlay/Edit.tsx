import React from "react";
import { LabeledField } from "../../sidebar/SidebarField";

interface EditStyleProps {
    data: OverlayStyleElement;
    onChange?: (key: keyof OverlayStyleElement, value: any) => void;
}

export function Overlay({
    data,
    onChange,
}: EditStyleProps) {

    const overlayOpacity = data.overlayOpacity
    const setOverlayOpacity = (color: string) => onChange?.("overlayOpacity", color);

    const overlayPatternHeight = data.overlayPatternHeight;
    const setOverlayPatternHeight = (img: string) => onChange?.("overlayPatternHeight", img);

    return (
        <div className="space-y-4">
            <LabeledField
                label="Overlay Opacity"
                type="slider"
                min={0}
                max={9}
                step={1}
                value={overlayOpacity}
                onChange={setOverlayOpacity}
            />

            <LabeledField
                label="Overlay Pattern Height"
                type="slider"
                value={overlayPatternHeight}
                onChange={setOverlayPatternHeight}
            />
        </div>
    );
}
