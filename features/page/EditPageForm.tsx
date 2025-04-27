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
  onDeleteCallback?: () => void;
  setHandleDelete?: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}

export function EditPageForm({
  formRef,
  onCancelCallback,
  onSubmitCallback,
  onDeleteCallback,
  setHandleDelete,
}: EditPageFormProps) {
  const { updatePage, removePage } = usePage();
  const { selectedPage, setSelectedPage } = useCmsContext();
  
  const {
    formValues,
    handleFieldChange,
    handleFormSubmit,
    handleFormCancel,
    handleDelete,
  } = useForm({
    queryFn: updatePage,
    deleteFn: removePage,
    setState: setSelectedPage,
    onSuccess: onSubmitCallback,
    onCancel: onCancelCallback,
    onDelete: onDeleteCallback,
    defaultValues: selectedPage
      ? {
          id: selectedPage.id,
          title: selectedPage.title,
          slug: selectedPage.slug,
        }
      : {}
  });

  if (setHandleDelete) {
    setHandleDelete(handleDelete);
  }

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

  return (
      <Form
        ref={formRef}
        config={formConfig}
        onChange={handleFieldChange}
        onSubmit={handleFormSubmit}
        onReset={handleFormCancel}
      />
  );
}