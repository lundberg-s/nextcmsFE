import { useForm as useReactHookForm } from "react-hook-form";
import { FormEvent } from "react";

type Page = {
  id: string;
  blocks: any[];
  [key: string]: any;
};

type QueryFunction<T = any> =
  | ((data: T, options: { onSuccess: () => void }) => void)
  | ((
      data: { id: string; page: T },
      options: { onSuccess: () => void }
    ) => void);

interface UseFormProps<T = any> {
  defaultValues: Partial<Omit<Page, "id" | "blocks">>;
  queryFn: QueryFunction<T>;
  deleteFn?: (id: string, options?: { onSuccess?: () => void }) => void; // Add this
  setState?: React.Dispatch<React.SetStateAction<T>> | any;
  onSuccess?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

export function useForm<T extends Partial<Omit<Page, "id" | "blocks">>>({
  defaultValues,
  queryFn,
  deleteFn,
  setState,
  onSuccess,
  onCancel,
  onDelete,
}: UseFormProps<T>) {
  const { handleSubmit, reset, watch, setValue } = useReactHookForm({
    defaultValues,
  });

  const formValues = watch();

  const id = defaultValues.id;

  const handleFieldChange = (name: string, value: any) => {
    setValue(name, value);
  };

  const handleFormSubmit = handleSubmit((data) => {
    const payload = id ? { id, data } : (data as T);

    queryFn(payload as T & { id: string; page: T }, {
      onSuccess: () => {
        onSuccess ? onSuccess() : null;
        setState ? setState(data) : null;
        reset();
      },
    });
  });

  const handleDelete = () => {
    if (id && deleteFn) {
      deleteFn(id, {
        onSuccess: () => {
          setState ? setState({}) : null;
          onDelete ? onDelete() : null;
          onCancel ? onCancel() : null;
          reset();
        },
      });
    }
  };

  const handleFormCancel = () => {
    onCancel ? onCancel() : null;
    reset();
  };

  return {
    formValues,
    handleFieldChange,
    handleFormSubmit,
    handleFormCancel,
    handleDelete,
    reset,
    watch,
    setValue,
  };
}
