import { useForm as useReactHookForm } from "react-hook-form";
import { FormEvent } from "react";

type Page = {
  id: string;
  blocks: any[];
  [key: string]: any;
};

type QueryFunction<T = any> = 
  | ((data: T, options: { onSuccess: () => void }) => void)
  | ((data: { id: string; page: T }, options: { onSuccess: () => void }) => void);

interface UseFormProps<T = any> {
  defaultValues: Partial<Omit<Page, "id" | "blocks">>;
  queryFn: QueryFunction<T>;
  setState?: React.Dispatch<React.SetStateAction<T>> | any
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function useForm<T extends Partial<Omit<Page, "id" | "blocks">>>({
  defaultValues,
  queryFn,
  setState,
  onSuccess,
  onCancel,
}: UseFormProps<T>) {
  const { handleSubmit, reset, watch, setValue } = useReactHookForm({
    defaultValues,
  });

  const formValues = watch();

  const handleFieldChange = (name: string, value: any) => {
    setValue(name, value);
  };

  const handleFormSubmit = handleSubmit((data) => {
    const payload = defaultValues.id 
      ? { id: defaultValues.id, page: data } 
      : (data as T);
    
    queryFn(payload as T & { id: string; page: T }, {
      onSuccess: () => {
        reset();
        if (onSuccess) onSuccess();
        if (setState) setState(data as T);
      }
    });
  });

  const handleFormCancel = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (onCancel) {
      onCancel();
    }
    reset();
  };

  return {
    formValues,
    handleFieldChange,
    handleFormSubmit,
    handleFormCancel,
  };
}
