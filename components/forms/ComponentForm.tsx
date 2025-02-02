import { BlockComponent, ComponentKind, ComponentType } from "@/types/blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { ConfirmationModal } from "../modals/ConfirmationModal";

interface ComponentFormProps {
  type: ComponentType;
  value: string;
  kind: ComponentKind;
  onChange: (type: ComponentType, value: string, kind: ComponentKind) => void;
  onRemove: (type: ComponentType, kind: ComponentKind) => void;
}

export function ComponentForm({
  kind,
  type,
  value,
  onChange,
  onRemove,
}: ComponentFormProps) {
  const handlePropChange = (value: string) => {
    onChange(type, value, kind);
  };

  const renderProps = () => { 
    switch (type) {
      case "title":
        return (
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={value || ""}
              onChange={(e) => handlePropChange(e.target.value)}
              placeholder="Title"
            />
          </div>
        );
      case "description":
        return (
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={value || ""}
              onChange={(e) => handlePropChange(e.target.value)}
              placeholder="Description"
            />
          </div>
        );
      case "button":
        return (
          <>
            <div className="space-y-2">
              <Label>Text</Label>
              <Input
                value={value || ""}
                onChange={(e) => handlePropChange(e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div className="space-y-2">
              <Label>Variant</Label>
              <Input
                value={value || ""}
                onChange={(e) => handlePropChange(e.target.value)}
                placeholder="default, outline, etc."
              />
            </div>
          </>
        );
      case "input":
        return (
          <>
            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={value || ""}
                onChange={(e) => handlePropChange(e.target.value)}
                placeholder="Input placeholder"
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Input
                value={value || ""}
                onChange={(e) => handlePropChange(e.target.value)}
                placeholder="text, email, etc."
              />
            </div>
          </>
        );
      case "desc":
        return (
          <div className="space-y-2">
            <Label>Placeholder</Label>
            <Input
              value={value || ""}
              onChange={(e) => handlePropChange(e.target.value)}
              placeholder="Textarea placeholder"
            />
          </div>
        );
      case "separator":
        return (
          <div className="space-y-2">
            <Label>Orientation</Label>
            <Input
              value={value || ""}
              onChange={(e) => handlePropChange(e.target.value)}
              placeholder="horizontal or vertical"
            />
          </div>
        );
      case "badge":
        return (
          <>
            <div className="space-y-2">
              <Label>Text</Label>
              <Input
                value={value || ""}
                onChange={(e) => handlePropChange(e.target.value)}
                placeholder="Badge text"
              />
            </div>
            <div className="space-y-2">
              <Label>Variant</Label>
              <Input
                value={value || ""}
                onChange={(e) => handlePropChange(e.target.value)}
                placeholder="default, secondary, etc."
              />
            </div>
          </>
        );
      case "card":
        return (
          <>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={value || ""}
                onChange={(e) => handlePropChange(e.target.value)}
                placeholder="Card title"
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={value || ""}
                onChange={(e) => handlePropChange(e.target.value)}
                placeholder="Card content"
              />
            </div>
          </>
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
