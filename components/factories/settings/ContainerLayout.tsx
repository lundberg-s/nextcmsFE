import React from "react";
import SettingsWrapper from "@/components/wrappers/SettingsWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContainerLayoutComponentProps {
  value: string;
  onChange: (value: string) => void;
}

const ContainerLayout: React.FC<ContainerLayoutComponentProps> = ({
  value,
  onChange,
}) => {
  return (
    <SettingsWrapper>
      <Label>Layout</Label>
      <Input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="left, right, center"
      />
    </SettingsWrapper>
  );
};

export default ContainerLayout;
