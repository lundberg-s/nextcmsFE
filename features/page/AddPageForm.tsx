"use client";
import React, { FormEvent } from "react";
import { usePage } from "@/lib/hooks/usePage";
import { useForm } from "@/lib/hooks/useForm";
import { Form } from "@/components/form/Form";

interface AddPageFormProps {
  formRef: React.RefObject<HTMLFormElement>;
  onCancelCallback: () => void;
  onSubmitCallback?: () => void;
}

export function AddPageForm({
  formRef,
  onCancelCallback,
  onSubmitCallback,
}: AddPageFormProps) {
  const { addPage } = usePage();
  const {
    handleSubmit,
    formValues,
    handleFieldChange,
    handleFormSubmit,
    handleFormCancel,
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  const submitFormHandler = handleSubmit((data: any) => {
    handleFormSubmit(data, addPage, onSubmitCallback);
  });

  const resetFormHandler = (e: FormEvent) => {
    e.preventDefault();
    handleFormCancel(onCancelCallback);
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
  };

  return (
    <Form
      ref={formRef}
      config={formConfig}
      onChange={handleFieldChange}
      onSubmit={submitFormHandler}
      onReset={resetFormHandler}
      />

  );
}
