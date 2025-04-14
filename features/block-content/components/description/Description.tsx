import React from 'react'
import SettingsWrapper from '@/components/wrappers/SettingsWrapper'
import { BlockComponent } from "@/lib/types/blocks";
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface EditDescriptionComponentProps {
  component: Partial<BlockComponent>;
  onChange: (key: string, value: string | string[]) => void;
}


export function EditDescription({ component, onChange }: EditDescriptionComponentProps) {
  return (
    <SettingsWrapper>
        <Label>Description</Label>
        <Textarea
            value={component?.content || ""}
            onChange={(e) => onChange("content", e.target.value)}
            placeholder="Enter description"
        />
    </SettingsWrapper>
  )

}
