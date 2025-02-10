import { BlockComponent, ComponentKind, ComponentType } from "@/types/blocks";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { CMS } from "./components";
import { Trash2 } from "lucide-react";

interface ComponentFactoryProps {
  type: ComponentType;
  component: Partial<BlockComponent>;

  kind: ComponentKind;
  onChange: (
    type: ComponentType,
    component: Partial<BlockComponent>,
    kind: ComponentKind
  ) => void;
  onRemove: (type: ComponentType, kind: ComponentKind) => void;
}

export function ComponentFactory({
  type,
  component,
  kind,
  onChange,
  onRemove,
}: ComponentFactoryProps) {
  const handleComponentChange = (key: string, value: string | string[]) => {
    onChange(type, { ...component, [key]: value }, kind);
  };

  const renderProps = () => {
    switch (type) {
      case "title":
        return <CMS.Title component={component} onChange={handleComponentChange} />;
      case "description":
        return <CMS.Description component={component} onChange={handleComponentChange} />;
      case "button":
        return <CMS.Button component={component} onChange={handleComponentChange} />;
      case "input":
        return <CMS.Input component={component} onChange={handleComponentChange} />;
      case "separator":
        return <CMS.Separator component={component} onChange={handleComponentChange} />;
      case "card":
        return <CMS.Card component={component} onChange={handleComponentChange} />;
      case "carousel":
        return <CMS.Carousel component={component} onChange={handleComponentChange} />;
      default:
        return null;
    }
  };

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
      {renderProps()}
    </div>
  );
}
