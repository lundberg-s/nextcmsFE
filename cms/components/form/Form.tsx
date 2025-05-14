import React, { FormEvent, forwardRef } from "react";
import DropdownSelect from "@/cms/components/dropdown/DropdownSelect";
import InputField from "@/cms/components/text-input/InputField";
import { SelectableList } from "../list/List";

const FORM_FIELDS = {
  inputfield: InputField,
  dropdown: DropdownSelect,
  list: SelectableList,
} as const;

interface FormProps {
  id?: string;
  onChange?: (name: string, value: any) => void;
  onSubmit: (e: FormEvent) => void;
  onReset: (e: FormEvent) => void;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLFormElement>;
  options?: Array<{ label?: string; value: string }>;
  data?: {
    options?: Array<{ label?: string; value: string }>;
    value?: string | null;
    onChange?: (value: string) => void;
    searchable?: boolean;
    defaultSearchTerm?: string;
    title?: string;
    placeholder?: string;
    emptyMessage?: string;
    maxHeight?: string | number;
    className?: string;
  };
  config?: {
    fields: Array<{
      id: string;
      name: string;
      label: string;
      type: keyof typeof FORM_FIELDS;
      value?: any;
      required?: boolean;
      placeholder?: string;
      options?: Array<{ label: string; value: string }>;
    }>;
    submitText?: string;
    cancelText?: string;

  };
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ id, onChange, onSubmit, onReset, config, children }: FormProps, ref: React.Ref<HTMLFormElement>) => {
    const fieldHandlers = {
      inputfield: (name: string, value: any) => {
        onChange?.(name, value.target?.value || value);
      },
      dropdown: (name: string, value: any) => {
        onChange?.(name, value);
      },
      list: (name: string, value: any) => {
        onChange?.(name, value);
      },
    };

    return (
      <form id={id} ref={ref} onSubmit={onSubmit} onReset={onReset} className="space-y-4">
        {config?.fields.map((field) => {
          const FormField = FORM_FIELDS[field.type];
          const handleFieldChange = (value: any) => {
            fieldHandlers[field.type](field.name, value);
          };

          return FormField ? (
            <div key={field.id} className="space-y-2">
              <FormField
                data={field}
                onChange={handleFieldChange}
                value={field.value}
              />
            </div>
          ) : null;
        })}
        {children}
      </form>
    );
  }
);

Form.displayName = "Form";