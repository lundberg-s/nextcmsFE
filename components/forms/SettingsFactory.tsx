import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

import { ConfirmationModal } from "../modals/ConfirmationModal";
import { ComponentKind, ComponentType } from "@/types/blocks";

interface SettingsFactoryProps {
  type: ComponentType;
  value: string;
  kind: ComponentKind;
  onChange: (type: ComponentType, value: string, kind: ComponentKind) => void;
  onRemove: (type: ComponentType, kind: ComponentKind) => void;
}

export function SettingsFactory({
  type,
  value,
  kind,
  onChange,
  onRemove,
}: SettingsFactoryProps) {
  const handlePropChange = (value: string) => {
    onChange(type, value, kind);
  };

  const renderProps = () => {
    switch (type) {
      case "backgroundColor":
        return (
          <div className="space-y-2">
            <Label>Background Color</Label>
            <Input
              value={value || ""}
              onChange={(e) => handlePropChange(e.target.value)}
              placeholder="Background color"
            />
          </div>
        );
      case "backgroundImage":
        return (
          <div className="space-y-2">
            <Label>Background Image</Label>
            <Input
              value={value || ""}
              onChange={(e) => handlePropChange(e.target.value)}
              placeholder="Background image"
            />
          </div>
        );
      case "textColor":
        return (
          <div className="space-y-2">
            <Label>Text Color</Label>
            <Input
              value={value || ""}
              onChange={(e) => handlePropChange(e.target.value)}
              placeholder="Text color"
            />
          </div>
        );
      case "layout":
        return (
          <div className="space-y-2">
            <Label>Layout</Label>
            <Input
              value={value || ""}
              onChange={(e) => handlePropChange(e.target.value)}
              placeholder="left, right, center"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="absolute right-10 -mt-2">
        <ConfirmationModal
          onConfirm={() => onRemove(type, kind)}
          title="Are you sure you want to delete this setting?"
          description="This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          triggerElement={
            <Button variant="ghost" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          }
        />
      </div>
      {renderProps()}
    </div>
  );
}
