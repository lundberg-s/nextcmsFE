import { usePage } from "@/lib/hooks/usePage";
import { useCmsContext } from "@/lib/context/CmsContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Page } from "@/lib/types/page";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { Form } from "@/components/form/Form";
import { Description } from "@radix-ui/react-toast";

interface EditPageFormProps {
  onClose: () => void;
}

export function EditPageForm({ onClose }: EditPageFormProps) {
  const { selectedPage, setSelectedPage } = useCmsContext();
  const { updatePage, removePage } = usePage();
  const { handleSubmit, reset, setValue, watch } = useForm<Page>({
    defaultValues: {},
  });

  const page = selectedPage;
  const formValues = watch();

  useEffect(() => {
    if (page) {
      reset(page);
    }
  }, [page, reset]);

  const handleFieldChange = (name: string, value: any) => {
    setValue(name as any, value);
  };

  const onSubmit = (data: Page) => {
    if (page) {
      updatePage(page.id, data);
      onClose();
    }
  };

  const onDelete = () => {
    if (page) {
      setSelectedPage(null);
      removePage(page.id);
      onClose();
    }
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
    submitText: "Save",
    cancelText: "Cancel",
  };

  const FormActions = {
    actions : [
      {
        label: "Save",
        type: "submit",
        action: "submit",
        variant: "primary",
      },
      {
        label: "Cancel",
        type: "button",
        action: "cancel",
        variant: "outline",
        onClick: onClose,
      },
      {
        label: "Delete",
        description: "Are you sure you want to delete this page? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
        type: "button",
        action: "delete",
        variant: "destructive",
        OnClick: onDelete,
      }
    ],
  };

  return (
    <div className="space-y-6">
      <Form
        config={formConfig}
        onChange={handleFieldChange}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={onClose}
      />
      
      {/* Delete button - kept separate as it's not part of the standard form */}
      <div className="flex justify-start pt-2">
        <ConfirmationModal
          onConfirm={onDelete}
          title="Delete Page"
          description="Are you sure you want to delete this page? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          trigger={
            <Button className="flex gap-2" type="button" variant="destructive">
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
          }
        />
      </div>
    </div>
  );
}