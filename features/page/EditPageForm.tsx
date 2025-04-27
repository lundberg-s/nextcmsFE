"use client";
import React, { useEffect } from "react";
import { usePage } from "@/lib/hooks/usePage";
import { useCmsContext } from "@/lib/context/CmsContext";
import { useForm } from "@/lib/hooks/useForm";
import { Form } from "@/components/form/Form";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { Page } from "@/lib/types/page";

interface EditPageFormProps {
  formRef: React.RefObject<HTMLFormElement>;
  onCancelCallback: () => void;
  onSubmitCallback?: () => void;
}

export function EditPageForm({
  formRef,
  onCancelCallback,
  onSubmitCallback,
}: EditPageFormProps) {
  const { updatePage, removePage } = usePage();
  const { selectedPage, setSelectedPage } = useCmsContext();
  
  const {
    formValues,
    handleFieldChange,
    handleFormSubmit,
    handleFormCancel,
  } = useForm({
    queryFn: updatePage,
    setState: setSelectedPage,
    onSuccess: onSubmitCallback,
    onCancel: onCancelCallback,
    defaultValues: selectedPage
      ? {
          id: selectedPage.id,
          title: selectedPage.title,
          slug: selectedPage.slug,
        }
      : {}
  });

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
  };

  const handleDelete = () => {
    if (selectedPage) {
      setSelectedPage(null);
      removePage(selectedPage.id);
      onCancelCallback();
    }
  };

  return (
    <div className="space-y-6">
      <Form
        ref={formRef}
        config={formConfig}
        onChange={handleFieldChange}
        onSubmit={handleFormSubmit}
        onReset={handleFormCancel}
      />
      
      {/* Delete button - kept separate as it's not part of the standard form */}
      <div className="flex justify-start pt-2">
        <ConfirmationModal
          onConfirm={handleDelete}
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