"use client";
import React from "react";
import { usePage } from "@/cms/lib/hooks/usePage";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { useForm } from "@/cms/lib/hooks/useForm";
import { Form } from "@/cms/components/form/Form";

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
  
  const selectedPagesValues = {
    id: selectedPage ? selectedPage.id : "",
    title: selectedPage ? selectedPage.title : "",
    slug: selectedPage ? selectedPage.slug : "",
  };

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
    defaultValues: selectedPagesValues
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