import React from "react";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface SidebarItemCardProps {
  onRemove: (type: ElementType, kind: ElementKind) => void;
  type: ElementType;
  kind: ElementKind;
  children: React.ReactNode;
}

export default function SidebarItemCard({
  children,
  onRemove,
  type,
  kind,
}: SidebarItemCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="absolute right-10 -mt-2">
        <ConfirmationModal
          onConfirm={() => onRemove(type, kind)}
          title="Are you sure you want to delete this component?"
          description="This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          trigger={
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
