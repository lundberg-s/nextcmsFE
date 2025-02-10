import React from "react";
import SettingsWrapper from "@/components/wrappers/SettingsWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BackgroundColorComponentProps {
  value: string;
  onChange: (value: string) => void;
}

const BackgroundColor: React.FC<BackgroundColorComponentProps> = ({
  value,
  onChange,
}) => {
  return (
    <SettingsWrapper>
      <Label>Background Color</Label>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Background color"
      />
    </SettingsWrapper>
  );
};

export default BackgroundColor;
