"use client";
import React from "react";
import { useBlock } from "@/cms/lib/hooks/useBlock";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { useForm } from "@/cms/lib/hooks/useForm";
import { Form } from "@/cms/components/form/Form";

const blockTypes = ["hero", "experimental"] as const;

interface AddBlockFormProps {
  formRef: React.RefObject<HTMLFormElement>;
  onCancelCallback: () => void;
  onSubmitCallback?: () => void;
}

export function AddBlockForm({
  formRef,
  onCancelCallback,
  onSubmitCallback,
}: AddBlockFormProps) {
  const { addBlock } = useBlock();
  const { selectedPage } = useCmsContext();

  const newBlockValues = {
    type: "",
    pageId: selectedPage?.id || "",
  };
  
  const {
    formValues,
    handleFieldChange,
    handleFormSubmit,
    handleFormCancel
  } = useForm({
    queryFn: addBlock,
    onSuccess: onSubmitCallback,
    onCancel: onCancelCallback,
    defaultValues: newBlockValues
  });

  const formConfig = {
    fields: [
      {
        id: "type",
        name: "type",
        label: "Block Type",
        type: "list" as const, 
        value: formValues.type || "",
        required: true,
        options: blockTypes.map(type => ({ 
          label: type.toUpperCase(), 
          value: type 
        }))
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