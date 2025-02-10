import React from 'react'
import SettingsWrapper from '@/components/wrappers/SettingsWrapper'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface CardComponentProps {
  component: any;
  onChange: (field: string, value: string) => void;
}
export function Card({ component, onChange }: CardComponentProps) {
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

