import React from 'react'
import SettingsWrapper from '@/components/wrappers/SettingsWrapper'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface DescriptionComponentProps {
  component: any;
  onChange: (field: string, value: string) => void;
}


export function Description({ component, onChange }: DescriptionComponentProps) {
  return (
    <SettingsWrapper>
        <Label>Description</Label>
        <Textarea
            value={component.description || ""}
            onChange={(e) => onChange("content", e.target.value)}
            placeholder="Enter description"
        />
    </SettingsWrapper>
  )

}
