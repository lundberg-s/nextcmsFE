import React from "react";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { Button } from "../../../shared/ui/button";
import { Trash2 } from "lucide-react";
import { getIcon } from "@/cms/lib/utilities/GetIcon";

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
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="">
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between border-b border-t p-2">
        <div className="flex items-center gap-4">
          <span
            className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          >
            {getIcon("chevron-right")}
          </span>

          <p className="text-md font-medium">
            {type?.charAt(0).toUpperCase() + type?.slice(1)}
          </p>
        </div>
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
      <div className={`grid-rows-transition ${isOpen ? 'grid-rows-expanded' : ''}`}>
        <div className="overflow-hidden">
          <div className="p-4">
          {children}
          </div>
        </div>
      </div>
    </div>
  );
}
