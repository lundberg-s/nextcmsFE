import React from "react";
import { Input } from "@/shared/ui/input";

export const InputField: React.FC<InputFieldProps> = ({ value, onChange, placeholder }) => (
  <Input
    value={value || ""}
    onChange={(e) => onChange?.(e.target.value)}
    placeholder={placeholder}
  />
);
