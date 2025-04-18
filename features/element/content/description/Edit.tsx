import React from 'react'

import { Element } from "@/lib/types/blocks";
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface EditDescriptionComponentProps {
  data: Partial<Element>;
  onChange: (key: string, value: string | string[]) => void;
}


export function EditDescription({ data, onChange }: EditDescriptionComponentProps) {
  return (
    <>
      <div className='flex items-center gap-2 py-2'>
        <div className='h-6 w-6 border border-black' />
        <div className='h-6 w-6 border border-black' />
      </div>
        <Label>Description</Label>
        <Textarea
            value={data?.content || ""}
            onChange={(e) => onChange("content", e.target.value)}
            placeholder="Enter description"
        />
    </>
  )

}
