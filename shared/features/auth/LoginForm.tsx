"use client";
import React from "react";
import { useForm } from "@/cms/lib/hooks/useForm";
import { Form } from "@/cms/components/form/Form";
import { useAuth } from "@/shared/lib/hooks/useAuth";

interface LoginFormProps {
  formRef?: React.RefObject<HTMLFormElement>;
  onCancelCallback?: () => void;
  onSubmitCallback?: () => void;
}

export function LoginForm({
  formRef,
  onCancelCallback,
  onSubmitCallback,
}: LoginFormProps) {
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };
  
  const {
    formValues,
    handleFieldChange,
    handleFormSubmit,
    handleFormCancel
  } = useForm({
    queryFn: login,
    onSuccess: onSubmitCallback,
    onCancel: onCancelCallback,
    defaultValues: initialValues

  });

  const formConfig = {
    fields: [
      {
        id: "email",
        name: "email",
        label: "Email",
        type: "inputfield" as const, 
        value: formValues.email,
        required: true,
        placeholder: "Enter email"
      },
      {
        id: "password",
        name: "password",
        label: "Password",
        type: "inputfield" as const,
        value: formValues.password,
        required: true,
        placeholder: "Enter password"
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