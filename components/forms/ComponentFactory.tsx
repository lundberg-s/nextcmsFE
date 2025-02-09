import { BlockComponent, ComponentKind, ComponentType } from "@/types/blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../modals/ConfirmationModal";

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
        return (
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={component.title || ""}
              onChange={(e) => handleComponentChange("title", e.target.value)}
              placeholder="Enter title"
            />
          </div>
        );
      case "description":
        return (
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={component.content || ""}
              onChange={(e) => handleComponentChange("content", e.target.value)}
              placeholder="Enter description"
            />
          </div>
        );
      case "button":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={component.text || ""}
                onChange={(e) => handleComponentChange("text", e.target.value)}
                placeholder="Enter button text"
              />
            </div>
            <div className="space-y-2">
              <Label>Button Variant</Label>
              <Select
                value={component.variant || "default"}
                onValueChange={(value) =>
                  handleComponentChange("variant", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "input":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={component.placeholder || ""}
                onChange={(e) =>
                  handleComponentChange("placeholder", e.target.value)
                }
                placeholder="Enter placeholder text"
              />
            </div>
            <div className="space-y-2">
              <Label>Input Type</Label>
              <Select
                value={component.type || "text"}
                onValueChange={(value) => handleComponentChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select input type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="tel">Telephone</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "desc":
        return (
          <div className="space-y-2">
            <Label>Placeholder</Label>
            <Input
              value={component.placeholder || ""}
              onChange={(e) =>
                handleComponentChange("placeholder", e.target.value)
              }
              placeholder="Enter textarea placeholder"
            />
          </div>
        );
      case "separator":
        return (
          <div className="space-y-2">
            <Label>Orientation</Label>
            <Select
              value={component.orientation || "horizontal"}
              onValueChange={(value) =>
                handleComponentChange("orientation", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select orientation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "badge":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Badge Text</Label>
              <Input
                value={component.text || ""}
                onChange={(e) => handleComponentChange("text", e.target.value)}
                placeholder="Enter badge text"
              />
            </div>
            <div className="space-y-2">
              <Label>Badge Variant</Label>
              <Select
                value={component.variant || "default"}
                onValueChange={(value) =>
                  handleComponentChange("variant", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "card":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Card Title</Label>
              <Input
                value={component?.title || ""}
                onChange={(e) => handleComponentChange("title", e.target.value)}
                placeholder="Enter card title"
              />
            </div>
            <div className="space-y-2">
              <Label>Card Content</Label>
              <Textarea
                value={component?.content || ""}
                onChange={(e) =>
                  handleComponentChange("content", e.target.value)
                }
                placeholder="Enter card content"
              />
            </div>
          </div>
        );
      case "carousel":
        const urls = component.urls && component.urls.length > 0 ? component.urls : [""];

        const inputs = urls.map((url, i) => (
          <div key={i} className="space-y-2">
            <Label>Image URL {i + 1}</Label>
            <Input
              value={url || ""}
              onChange={(e) => {
                const newUrls = [...urls];
                newUrls[i] = e.target.value;
                handleComponentChange("urls", newUrls);
              }}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        ));
        
        return (
          <div className="space-y-4">
            {inputs}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleComponentChange("urls", [...urls, ""])}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Image URL
            </Button>
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
