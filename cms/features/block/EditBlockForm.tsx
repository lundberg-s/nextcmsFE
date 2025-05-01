import {
  Block,
  Element,
  ElementKind,
  ElementType,
} from "@/cms/lib/types/blocks";
import { useForm } from "react-hook-form";
import { useFormHelper } from "@/cms/lib/helpers/FormHelper";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { DialogModal } from "@/cms/components/modals/DialogModal";
import { AddContentForm } from "@/cms/features/element/AddContentForm";
import { AddConfigForm } from "@/cms/features/element/AddConfigForm";
import { EditContentItem } from "@/cms/features/element/EditContentItem";
import { EditConfigItem } from "@/cms/features/element/EditConfigItem";
import { ElementList } from "../element/ElementList";

export function EditBlockForm({
  id = "edit-block-form",
  onSuccess,
  onCancel,
}: {
  id: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { selectedBlock } = useCmsContext();
  const { handleSubmit, reset, setValue, watch } = useForm<Block>({
    defaultValues: {},
  });

  const {
    addContent,
    addConfig,
    updateContent,
    updateConfig,
    removeContent,
    removeConfig,
    submitForm,
    cancelForm
  } = useFormHelper(setValue, watch, reset);

  const configurations = watch("config");
  const content = watch("content");

  const onFormSubmit = (data: Block) => {
    submitForm(data, onSuccess);
  };

  const onFormCancel = () => {
    cancelForm(onCancel);
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onFormSubmit)}
      onReset={onFormCancel}
      className="flex flex-col gap-4"
    >
     <ElementList addContent={addContent} addConfig={addConfig} />

      {content &&
        Object.entries(content).map(([type, value]) => (
          <EditContentItem
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
          <EditConfigItem
            key={type}
            type={type as ElementType}
            value={value as string}
            kind="config"
            onChange={updateConfig}
            onRemove={removeConfig}
          />
        ))}
    </form>
  );
}