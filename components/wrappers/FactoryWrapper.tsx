import { ComponentType, ComponentKind } from "@/lib/types/blocks";
import React from "react";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface FactoryWrapperProps {
  onRemove: (type: ComponentType, kind: ComponentKind) => void;
  type: ComponentType;
  kind: ComponentKind;
  children: React.ReactNode;
}

export default function FactoryWrapper({
  children,
  onRemove,
  type,
  kind,
}: FactoryWrapperProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="absolute right-10 -mt-2">
        <ConfirmationModal
          onConfirm={() => onRemove(type, kind)}
          title="Are you sure you want to delete this component?"
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
      {children}
    </div>
  );
}
