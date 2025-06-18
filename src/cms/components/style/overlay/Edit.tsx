import React from "react";
import { LabeledField } from "../../sidebar/SidebarField";

interface EditStyleProps {
    data: OverlayStyleElement;
    onChange?: (key: keyof OverlayStyleElement, value: any) => void;
    visibleFields?: Record<string, boolean>;
}

export function Overlay({
    data,
    onChange,
    visibleFields = {},
}: EditStyleProps) {

    const overlayPatternType = data.overlayPatternType || "curve";
    const setOverlayPatternType = (value: string) => onChange?.("overlayPatternType", value);
    const showOverlayPatternType = visibleFields.overlayPatternType;

    const overlayOpacity = data.overlayOpacity
    const setOverlayOpacity = (color: string) => onChange?.("overlayOpacity", color);
    const showOverlayOpacity = visibleFields.overlayOpacity;

    const overlayColor = data.overlayColor;
    const setOverlayColor = (img: string) => onChange?.("overlayColor", img);
    const showOverlayColor = visibleFields.overlayColor;
    const overlayColorOptions = [
        "red", "green", "blue", "yellow", "purple", "orange", "pink", "black", "white"
    ];

    const overlayPatternHeight = data.overlayPatternHeight;
    const setOverlayPatternHeight = (img: string) => onChange?.("overlayPatternHeight", img);
    const showOverlayPatternHeight = visibleFields.overlayPatternHeight;

    return (
        <div className="space-y-4">
            {showOverlayPatternType && (
                <LabeledField
                    label="Overlay Type"
                    type="dropdown"
                    options={[
                        { label: "Curve", value: "curve" },
                        { label: "Zigzag", value: "zigzag" },
                        { label: "Multiple", value: "multiple" },
                    ]}
                    value={overlayPatternType}
                    onChange={setOverlayPatternType}
                />
            )}

            {showOverlayOpacity && (
                <LabeledField
                    label="Overlay Opacity"
                    type="slider"
                    min={0}
                    max={9}
                    step={1}
                    value={overlayOpacity}
                    onChange={setOverlayOpacity}
                />
            )}

            {showOverlayColor && (
                <LabeledField
                    placeholder="Select overlay color"
                    label="Overlay Color"
                    type="dropdown"
                    options={overlayColorOptions.map(color => ({ value: color, label: color }))}
                    value={overlayColor}
                    onChange={setOverlayColor}
                />
            )}

            {showOverlayPatternHeight && (
                <LabeledField
                    label="Overlay Pattern Height"
                    type="slider"
                    value={overlayPatternHeight}
                    onChange={setOverlayPatternHeight}
                />
            )}

        </div>
    );
}
