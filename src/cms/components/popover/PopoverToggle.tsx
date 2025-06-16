import React, { ReactNode } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

interface PopoverToggleProps {
  values: { label: string; value: boolean; key: string }[];
  onChange: (key: string, value: boolean) => void;
  trigger: ReactNode;
}

export function PopoverToggle({ values, onChange, trigger }: PopoverToggleProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col gap-2 w-64">
        {values.map(({ label, value, key }) => (
          <div key={key} className="flex items-center justify-between">
            <Label htmlFor={key}>{label}</Label>
            <Switch
              id={key}
              checked={value}
              onCheckedChange={checked => onChange(key, checked)}
            />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}