import {
  Block,
  Element,
  ElementKind,
  ElementType,
} from "@/cms/lib/types/blocks";
import { useFormHelper } from "@/cms/lib/helpers/FormHelper";
import { ElementList } from "../element/ElementList";
import { useForm } from "@/cms/lib/hooks/useForm";
import { Form } from "@/cms/components/form/Form";
import { useBlock } from "@/cms/lib/hooks/useBlock";
import { ElementItem } from "../element/ElementItem";

export function EditBlockForm({
  id = "edit-block-form",
  onSuccess: onCancelCallback,
  onCancel: onSubmitCallback,
}: {
  id: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { updateBlock } = useBlock();

    const {
      handleFormSubmit,
      handleFormCancel,
      handleDelete,
      reset,
      setValue,
      watch,
    } = useForm({
      queryFn: updateBlock,
      onSuccess: onSubmitCallback,
      onCancel: onCancelCallback,
      defaultValues: {}
    });

  const {
    addContent,
    addConfig,
    updateContent,
    updateConfig,
    removeContent,
    removeConfig,
    submitForm,
  } = useFormHelper(setValue, watch, reset);

  const configurations = watch("config");
  const content = watch("content");

  return (
    <Form 
      id={id}
      onSubmit={handleFormSubmit}
      onCancel={handleFormCancel}
      onDelete={handleDelete}
      formRef={null}
      >
     <ElementList addContent={addContent} addConfig={addConfig} />

      {content &&
        Object.entries(content).map(([type, value]) => (
          <ElementItem
            mode="edit"
            key={type}
            type={type as ElementType}
            component={value as Element}
            kind="content"
            onChange={updateContent}
            onRemove={removeContent}
          />
        ))}

      {configurations &&
        Object.entries(configurations).map(([type, value]) => (
          <ElementItem
            mode="edit"
            key={type}
            type={type as ElementType}
            value={value as string}
            kind="config"
            onChange={updateConfig}
            onRemove={removeConfig}
          />
        ))}
    </Form>
  );
}