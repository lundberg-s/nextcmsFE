import { ElementList } from "../element/ElementList";
import { useForm } from "@/cms/lib/hooks/useForm";
import { Form } from "@/cms/components/form/Form";
import { useBlock } from "@/cms/lib/hooks/useBlock";
import { useCmsContext } from "@/cms/lib/context/CmsContext";

export function EditBlockForm({
  id = "edit-block-form",
  onSuccess: onSubmitCallback,
  onCancel: onCancelCallback,
}: {
  id: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { updateBlock } = useBlock();
  const { selectedBlock } = useCmsContext();

  const selectedBlockValues = {
    id: selectedBlock ? selectedBlock.id : "",
    order: selectedBlock ? selectedBlock.order : 0,
    type: selectedBlock ? selectedBlock.type : "",
    page: selectedBlock ? selectedBlock.page : "",
    content: selectedBlock ? selectedBlock.content : [],
    config: selectedBlock ? selectedBlock.config : {},
  };

  const { handleFormSubmit, handleFormCancel, reset, setValue, watch } =
    useForm({
      queryFn: updateBlock,
      onSuccess: onSubmitCallback,
      onCancel: onCancelCallback,
      defaultValues: selectedBlockValues,
    });

  return (
    <Form id={id} onSubmit={handleFormSubmit} onReset={handleFormCancel}>
      <ElementList setValue={setValue} watch={watch} reset={reset} />
    </Form>
  );
}
