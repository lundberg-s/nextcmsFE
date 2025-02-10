import React from "react";
import SettingsWrapper from "@/components/wrappers/SettingsWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BackgroundImageComponentProps {
  value: string;
  onChange: (value: string) => void;
}

const BackgroundImage: React.FC<BackgroundImageComponentProps> = ({
  value,
  onChange,
}) => {
  return (
    <SettingsWrapper>
      <Label>Background Image</Label>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Background image"
      />
    </SettingsWrapper>
  );
};

export default BackgroundImage;
