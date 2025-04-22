import React, { FormEvent, forwardRef } from "react";
import DropdownSelect from "@/components/dropdown/DropdownSelect";
import InputField from "@/components/text-input/InputField";

const FORM_FIELDS = {
  inputfield: InputField,
  dropdown: DropdownSelect,
} as const;

interface FormProps {
  onChange: (name: string, value: any) => void;
  onSubmit: (e: FormEvent) => void;
  onReset: (e: FormEvent) => void;
  config: {
    fields: Array<{
      id: string;
      name: string;
      label: string;
      type: keyof typeof FORM_FIELDS;
      value?: string | string[];
      required?: boolean;
      placeholder?: string;
    }>;
    submitText?: string;
    cancelText?: string;
    showCancel?: boolean;
  };
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ onChange, onSubmit, onReset, config }, ref) => {
    const fieldHandlers = {
      inputfield: (name: string, value: any) => {
        onChange(name, value.target?.value || value);
      },
      dropdown: (name: string, value: any) => {
        onChange(name, value);
      },
    };

    return (
      <form ref={ref} onSubmit={onSubmit} onReset={onReset} className="space-y-4">
        {config.fields.map((field) => {
          const FormField = FORM_FIELDS[field.type];
          const handleFieldChange = (value: any) => {
            fieldHandlers[field.type](field.name, value);
          };

          return FormField ? (
            <div key={field.id} className="space-y-2">
              <FormField
                id={field.id}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                value={field.value || ""}
                onChange={handleFieldChange}
              />
            </div>
          ) : null;
        })}
      </form>
    );
  }
);

Form.displayName = "Form";