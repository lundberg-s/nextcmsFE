import React from "react";

export const SliderField: React.FC<SliderFieldProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => (
  <input
    type="range"
    value={value ? parseInt(value) : 0}
    onChange={(e) => onChange?.(e.target.value)}
    min={min}
    max={max}
    step={step}
    className="w-full"
  />
);
