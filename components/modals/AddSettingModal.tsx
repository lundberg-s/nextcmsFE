import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ComponentKind } from "@/types/blocks";
import { Plus } from "lucide-react";

type SettingType = "backgroundColor" | "backgroundImage" | "textColor";

interface AddSettingModalProps {
  onSelect: (type: SettingType, kind: ComponentKind) => void;
}

const settings: {
  type: SettingType;
  label: string;
  description: string;
  kind: ComponentKind;
}[] = [
  {
    type: "backgroundColor",
    label: "Background Color",
    description: "Set the background color using hex or color name",
    kind: "setting",
  },
  {
    type: "backgroundImage",
    label: "Background Image",
    description: "Add an image URL for the background",
    kind: "setting",
  },
  {
    type: "textColor",
    label: "Text Color",
    description: "Set the color for text elements",
    kind: "setting",
  },
];

export function AddSettingModal({ onSelect }: AddSettingModalProps) {
  const [open, setOpen] = useState(false);

  const handleClick = (type: SettingType, kind: ComponentKind) => {
    onSelect(type, kind);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Setting
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Settings Library</DialogTitle>
          <DialogDescription>
            Select a setting to customize the appearance of your block.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 p-4">
          {settings.map((setting) => (
            <div
              key={setting.type}
              className="group relative p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer"
              onClick={() => handleClick(setting.type, setting.kind)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelect(setting.type, setting.kind);
                }
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{setting.label}</span>
                <span className="text-sm text-muted-foreground">
                  {setting.description}
                </span>
              </div>

              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
