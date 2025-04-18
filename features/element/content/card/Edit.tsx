import React from 'react'
import SettingsWrapper from '@/components/wrappers/SettingsWrapper'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface EditCardComponentProps {
  data: any;
  onChange: (key: string, value: string) => void;
}
export function EditCard({ data, onChange }: EditCardComponentProps) {
  return (
    <SettingsWrapper>
        <Label>Card Title</Label>
        <Input
            value={data.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Enter card title"
        />
        <Label>Card Content</Label>
        <Textarea
            value={data.content || ""}
            onChange={(e) => onChange("content", e.target.value)}
            placeholder="Enter card content"
        />
    </SettingsWrapper>

  )

}

