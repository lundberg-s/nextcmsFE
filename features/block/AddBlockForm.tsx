"use client";
import React from "react";
import { useBlock } from "@/lib/hooks/useBlock";
import { useCmsContext } from "@/lib/context/CmsContext";
import { useForm } from "@/lib/hooks/useForm";
import { Form } from "@/components/form/Form";

const blockTypes = ["hero", "features"] as const;

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
  
  const {
    formValues,
    handleFieldChange,
    handleFormSubmit,
    handleFormCancel
  } = useForm({
    queryFn: addBlock,
    onSuccess: onSubmitCallback,
    onCancel: onCancelCallback,
    defaultValues: {
      type: "",
      pageId: selectedPage?.id || ""
    },
  });

  // Filter block types based on search term
  const filteredBlockTypes = blockTypes.filter(type => 
    formValues.searchTerm ? type.includes(formValues.searchTerm) : true
  );

  const formConfig = {
    fields: [
      {
        id: "searchTerm",
        name: "searchTerm",
        label: "Search",
        type: "inputfield" as const,
        value: formValues.searchTerm || "",
        required: false,
        placeholder: "Search block types..."
      },
      {
        id: "type",
        name: "type",
        label: "Block Type",
        type: "dropdown" as const, 
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