import React from 'react'
import SettingsWrapper from '@/components/wrappers/SettingsWrapper'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface EditCardComponentProps {
  component: any;
  onChange: (key: string, value: string) => void;
}
export function EditCard({ component, onChange }: EditCardComponentProps) {
  return (
    <SettingsWrapper>
        <Label>Card Title</Label>
        <Input
            value={component.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Enter card title"
        />
        <Label>Card Content</Label>
        <Textarea
            value={component.content || ""}
            onChange={(e) => onChange("content", e.target.value)}
            placeholder="Enter card content"
        />
    </SettingsWrapper>

  )

}

