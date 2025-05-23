import React from 'react'


import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'

interface EditDescriptionComponentProps {
  data: DescriptionElement;
  onChange: (key: string, value: string | string[]) => void;
}


export function EditDescription({ data, onChange }: EditDescriptionComponentProps) {
  return (
    <>
      {/* <div className='flex items-center gap-2 py-2'>
        <div className='h-6 w-6 border border-black' />
        <div className='h-6 w-6 border border-black' />
      </div> */}
        <Label>Description</Label>
        <Textarea
            value={data?.description || ""}
            onChange={(e) => onChange("content", e.target.value)}
            placeholder="Enter description"
        />
    </>
  )

}
