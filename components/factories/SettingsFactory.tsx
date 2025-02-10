import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import { ConfirmationModal } from "../modals/ConfirmationModal";
import { ComponentKind, ComponentType } from "@/types/blocks";

import BackgroundColor from "./settings/BackgroundColor";
import BackgroundImage from "./settings/BackgroundImage";
import ContainerLayout from "./settings/ContainerLayout";
import TextColor from "./settings/TextColor";

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
        return <BackgroundColor value={value} onChange={handlePropChange} />;
      case "backgroundImage":
        return <BackgroundImage value={value} onChange={handlePropChange} />;
      case "textColor":
        return <TextColor value={value} onChange={handlePropChange} />;
      case "layout":
        return <ContainerLayout value={value} onChange={handlePropChange} />;
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
