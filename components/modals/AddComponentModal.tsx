import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ComponentKind, ComponentType } from "@/types/blocks";
import { Plus } from "lucide-react";
import { on } from "node:events";
import { set } from "date-fns";
import { useState } from "react";

interface ComponentPreviewProps {
  onSelect: (type: ComponentType, kind: ComponentKind) => void;
}

const components: {
  type: ComponentType;
  label: string;
  preview: React.ReactNode;
  kind: ComponentKind;
}[] = [
  {
    type: "title",
    label: "Title",
    preview: <h1 className="text-2xl font-bold">Title</h1>,
    kind: "component",
  },
  {
    type: "description",
    label: "Description",
    preview: <p className="text-sm">Description</p>,
    kind: "component",
  },
  {
    type: "button",
    label: "Button",
    preview: <Button size="sm">Button</Button>,
    kind: "component",
  },
  {
    type: "input",
    label: "InputField",
    preview: <Input placeholder="Input field" className="w-32" />,
    kind: "component",
  },
  {
    type: "textarea",
    label: "TextArea",
    preview: <Textarea placeholder="Text area" className="w-32 h-16" />,
    kind: "component",
  },
  {
    type: "separator",
    label: "Separator",
    preview: <Separator className="w-32" />,
    kind: "component",
  },
  {
    type: "badge",
    label: "Badge",
    preview: <Badge>Badge</Badge>,
    kind: "component",
  },
  {
    type: "card",
    label: "Card",
    preview: (
      <Card className="w-32 h-24 flex items-center justify-center text-sm">
        Card
      </Card>
    ),
    kind: "component",
  },
];

export function AddComponentModal({ onSelect }: ComponentPreviewProps) {
  const [open, setOpen] = useState(false);

  const handleClick = (type: ComponentType, kind: ComponentKind) => {
    onSelect(type, kind);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Component
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Component Library</DialogTitle>
          <DialogDescription>
            Select a component to add to your block. You can customize its
            properties after adding.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 p-4">
          {components.map((component) => (
            <div
              key={component.type}
              className="group relative p-8 rounded-lg border hover:border-primary transition-colors flex flex-col justify-center items-center cursor-pointer"
              onClick={() => handleClick(component.type, component.kind)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelect(component.type, component.kind);
                }
              }}
            >
              <div className="mb-2">{component.preview}</div>
              <span className="text-sm font-medium absolute bottom-2">
                {component.label}
              </span>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
