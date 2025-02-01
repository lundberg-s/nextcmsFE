import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { ComponentType } from "@/types/blocks";
import { Plus } from "lucide-react";

interface ComponentPreviewProps {
  onSelect: (type: ComponentType) => void;
}

const components: { type: ComponentType; label: string; preview: React.ReactNode }[] = [
  {
    type: "button",
    label: "Button",
    preview: <Button size="sm">Button</Button>,
  },
  {
    type: "input",
    label: "InputField",
    preview: <Input placeholder="Input field" className="w-32" />,
  },
  {
    type: "textarea",
    label: "TextArea",
    preview: <Textarea placeholder="Text area" className="w-32 h-16" />,
  },
  {
    type: "separator",
    label: "Separator",
    preview: <Separator className="w-32" />,
  },
  {
    type: "badge",
    label: "Badge",
    preview: <Badge>Badge</Badge>,
  },
  {
    type: "card",
    label: "Card",
    preview: (
      <Card className="w-32 h-24 flex items-center justify-center text-sm">
        Card
      </Card>
    ),
  },
];

export function ComponentLibrary({ onSelect }: ComponentPreviewProps) {
  return (
    <Dialog>
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
            Select a component to add to your block. You can customize its properties after adding.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 p-4">
          {components.map((component) => (
            <div
              key={component.type}
              className="group relative p-8 rounded-lg border hover:border-primary transition-colors flex flex-col justify-center items-center cursor-pointer"
              onClick={() => onSelect(component.type)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelect(component.type);
                }
              }}
            >
              <div className="mb-2">{component.preview}</div>
              <span className="text-sm font-medium absolute bottom-2">{component.label}</span>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}