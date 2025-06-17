import React, { ReactNode } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { getLabelFromType } from "@/cms/lib/utilities/getLabelFromType";

interface PopoverToggleProps {
    value: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
  trigger: ReactNode;
}

export function PopoverToggle({ value, onChange, trigger }: PopoverToggleProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2 w-64">
        {Object.keys(value).map((key) => {
          return (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={key} className="text-sm">
                {getLabelFromType(key)}
              </Label>
              <Switch
                id={key}
                checked={value[key]}
                onCheckedChange={(checked) => onChange(key, checked)}
              />
            </div>
          );
        }
        )}
      </PopoverContent>
    </Popover>
  );
}