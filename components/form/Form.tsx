import DropdownSelect from '@/components/dropdown/DropdownSelect'
import InputField from '@/components/text-input/InputField'
import { Button } from '../ui/button';
import { FormEvent } from 'react';
import { ConfirmationModal } from '../modals/ConfirmationModal';

const FORM_FIELDS = {
    inputfield: InputField,
    dropdown: DropdownSelect,
} as const;

const FORM_ACTIONS = {
    submit: Button,
    cancel: Button,
    delete: ConfirmationModal
}

export function Form({
    onChange,
    onSubmit: submitHandler,
    config,
    onCancel,
}: {
    onChange: (name: string, value: any) => void;
    onSubmit: (e: FormEvent) => void;
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
    onCancel?: () => void;
}) {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        submitHandler(event);
    };

    const fieldHandlers = {
        inputfield: (name: string, value: any) => {
            onChange(name, value.target?.value || value);
        },
        dropdown: (name: string, value: any) => {
            onChange(name, value);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {config.fields.map((field) => {
                const FieldComponent = FORM_FIELDS[field.type];
                const handleFieldChange = (value: any) => {
                    fieldHandlers[field.type](field.name, value);
                };
                
                return FieldComponent ? (
                    <div key={field.id} className="space-y-2">
                        <FieldComponent
                            id={field.id} 
                            name={field.name}
                            label={field.label}
                            placeholder={field.placeholder}
                            value={field.value || ''}
                            onChange={handleFieldChange}
                        />
                    </div>
                ) : null;
            })}

            <div className="flex justify-end gap-2 pt-4">
                {config.showCancel && onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        {config.cancelText || "Cancel"}
                    </Button>
                )}
                <Button type="submit">
                    {config.submitText || "Submit"}
                </Button>
            </div>
        </form>
    );
}