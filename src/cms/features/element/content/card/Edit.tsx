import React from 'react'

import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'

interface EditCardComponentProps {
  data: Partial<Element>;
  onChange: (key: string, value: string) => void;
}
export function EditCard({ data, onChange }: EditCardComponentProps) {
  return (
    <>
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
    </>

  )

}

