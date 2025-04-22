import { useForm as useReactHookForm } from "react-hook-form";

type Page = {
  id: string;
  blocks: any[];
  [key: string]: any;
};

type QueryFunction<T = any> = (
  data: T,
  options: { onSuccess: () => void }
) => void;

interface UseFormProps {
  defaultValues: Partial<Omit<Page, "id" | "blocks">>;
}
export function useForm({ defaultValues }: UseFormProps) {
  const { register, handleSubmit, reset, watch, setValue } = useReactHookForm({
    defaultValues,
  });

  const formValues = watch();

  const handleFieldChange = (name: string, value: any) => {
    setValue(name, value);
  };

  const handleFormSubmit = <T,>(
    data: T,
    queryFunction: QueryFunction<T>,
    onSubmitCallback?: () => void
  ) => {
    queryFunction(data, {
      onSuccess: () => {
        reset();
        if (onSubmitCallback) {
          console.log("onsubmit was called");
          onSubmitCallback();
        }
      },
    });
  };

  const handleFormCancel = (onCancelCallback: () => void) => {
    if (onCancelCallback) {
      console.log("onCancel was called");
      onCancelCallback();
    }
    reset();
  };

  return {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formValues,
    handleFieldChange,
    handleFormSubmit,
    handleFormCancel,
  };
}
