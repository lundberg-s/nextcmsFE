import { BlockComponent } from "@/types/blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

interface ComponentFormProps {
  component: BlockComponent;
  onChange: (component: BlockComponent) => void;
  onRemove: () => void;
}

export function ComponentForm({
  component,
  onChange,
  onRemove,
}: ComponentFormProps) {
  const handlePropChange = (key: string, value: string) => {
    onChange({
      ...component,
      props: {
        ...component.props,
        [key]: value,
      },
    });
  };

  const renderProps = () => {


    
    switch (component.type) {
      case "button":
        return (
          <>
            <div className="space-y-2">
              <Label>Text</Label>
              <Input
                value={component.props.text || ""}
                onChange={(e) => handlePropChange("text", e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div className="space-y-2">
              <Label>Variant</Label>
              <Input
                value={component.props.variant || ""}
                onChange={(e) => handlePropChange("variant", e.target.value)}
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
                value={component.props.placeholder || ""}
                onChange={(e) => handlePropChange("placeholder", e.target.value)}
                placeholder="Input placeholder"
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Input
                value={component.props.type || ""}
                onChange={(e) => handlePropChange("type", e.target.value)}
                placeholder="text, email, etc."
              />
            </div>
          </>
        );
      case "textarea":
        return (
          <div className="space-y-2">
            <Label>Placeholder</Label>
            <Input
              value={component.props.placeholder || ""}
              onChange={(e) => handlePropChange("placeholder", e.target.value)}
              placeholder="Textarea placeholder"
            />
          </div>
        );
      case "separator":
        return (
          <div className="space-y-2">
            <Label>Orientation</Label>
            <Input
              value={component.props.orientation || ""}
              onChange={(e) => handlePropChange("orientation", e.target.value)}
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
                value={component.props.text || ""}
                onChange={(e) => handlePropChange("text", e.target.value)}
                placeholder="Badge text"
              />
            </div>
            <div className="space-y-2">
              <Label>Variant</Label>
              <Input
                value={component.props.variant || ""}
                onChange={(e) => handlePropChange("variant", e.target.value)}
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
                value={component.props.title || ""}
                onChange={(e) => handlePropChange("title", e.target.value)}
                placeholder="Card title"
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={component.props.content || ""}
                onChange={(e) => handlePropChange("content", e.target.value)}
                placeholder="Card content"
              />
            </div>
          </>
        );
      case "backgroundColor":
        return (
          <div className="space-y-2">
            <Input
              value={component.props.color || ""}
              onChange={(e) => handlePropChange("color", e.target.value)}
              placeholder="Background color"
            />
          </div>
        );
      case "backgroundImage":
        return (
          <div className="space-y-2">
            <Input
              value={component.props.url || ""}
              onChange={(e) => handlePropChange("url", e.target.value)}
              placeholder="Background image URL"
            />
          </div>
        );
      case "textColor":
        return (
          <div className="space-y-2">
            <Input
              value={component.props.color || ""}
              onChange={(e) => handlePropChange("color", e.target.value)}
              placeholder="Text color"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium capitalize">{component.type}</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      {renderProps()}
    </div>
  );
}