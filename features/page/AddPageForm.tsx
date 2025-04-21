'use client';
import { usePage } from "@/lib/hooks/usePage";
import { useForm } from 'react-hook-form';
import { Page } from '@/lib/types/page';
import { Form } from '@/components/form/Form';

interface AddPageFormProps {
  onClose: () => void;
}

export function AddPageForm({ onClose }: AddPageFormProps) {
  const { addPage } = usePage();
  const { handleSubmit, reset, watch, setValue } = useForm<Omit<Page, 'id' | 'blocks'>>({
    defaultValues: {
      title: '',
      slug: '',
    },
  });

  const formValues = watch();

  const handleFieldChange = (name: string, value: any) => {
    setValue(name as any, value);
  };

  const onSubmit = (data: Omit<Page, 'id' | 'blocks'>) => {
    addPage(data);
    reset();
    onClose();
  };

  const formConfig = {
    fields: [
      {
        id: "title",
        name: "title",
        label: "Title",
        type: "inputfield" as const, 
        value: formValues.title,
        required: true,
        placeholder: "Enter page title"
      },
      {
        id: "slug",
        name: "slug",
        label: "Slug",
        type: "inputfield" as const,
        value: formValues.slug,
        required: true,
        placeholder: "Enter page URL slug"
      }
    ],
    submitText: "Add Page",
    cancelText: "Cancel",
    showCancel: true
  };

  return (
    <Form
      config={formConfig}
      onChange={handleFieldChange}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onClose}
    />
  );
}