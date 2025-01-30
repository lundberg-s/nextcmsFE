// components/PageForm.tsx
'use client';
import { useAdminStore } from '@/lib/store/admin-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface PageFormProps {
  onClose: () => void;
}

export function PageForm({ onClose }: PageFormProps) {
  const { addPage } = useAdminStore();
  const { register, handleSubmit, reset } = useForm<Omit<Page, 'id' | 'blocks'>>({
    defaultValues: {
      title: '',
      slug: '',
    },
  });

  const onSubmit = (data: Omit<Page, 'id' | 'blocks'>) => {
    addPage(data);
    reset();
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          type="text"
          {...register('title')}
        />
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium">
          Slug
        </label>
        <Input
          id="slug"
          type="text"
          {...register('slug')}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Page</Button>
      </div>
    </form>
  );
}