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
import { DialogModal } from "@/cms/components/modals/DialogModal";
import { useCmsContext } from "@/cms/lib/context/CmsContext";
import { AddElementForm } from "../element/AddElementForm";

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
    defaultValues: {},
  });

  const {
    addContent,
    addConfig,
    updateContent,
    updateConfig,
    removeContent,
    removeConfig,
  } = useFormHelper(setValue, watch, reset);

  const configurations = watch("config");
  const content = watch("content");

  const formsList = [
    {
      title: "Add Component",
      description:
        "Select a component to add to your block. You can customize its properties after adding.",
      icon: "plus",
      content: (props: any) => (
        <AddElementForm
          kind="content"
          onSubmitCallback={(type, kind) => props.onSubmitCallback(type, kind)}
          onCancelCallback={props.onCancelCallback}
        />
      ),
      onSubmit: addContent,
      button: {
        label: "Add Component",
        icon: "plus",
        variant: "outline",
        disabled: !selectedBlock,
      },
    },
    {
      title: "Add Setting",
      description:
        "Select a setting to customize the appearance of your block.",
      icon: "plus",
      content: (props: any) => (
        <AddElementForm
          kind="config"
          onSubmitCallback={(type, kind) => props.onSubmitCallback(type, kind)}
          onCancelCallback={props.onCancelCallback}
        />
      ),
      onSubmit: addConfig,
      button: {
        label: "Add Setting",
        icon: "plus",
        variant: "outline",
        disabled: !selectedBlock,
      },
    },
  ];

  return (
    <Form
      id={id}
      onSubmit={handleFormSubmit}
      onReset={handleFormCancel}
    >
      <div className="flex flex-col gap-4">
        {formsList.map((form) => (
          <DialogModal
            key={form.title}
            title={form.title}
            description={form.description}
            content={form.content}
            button={form.button}
            props={{
              onSubmitCallback: (type: ElementType, kind: ElementKind) => {
                form.onSubmit(type, kind);
              },
            }}
          />
        ))}
      </div>
      <ElementList
        content={content}
        config={configurations}
        updateContent={updateContent}
        updateConfig={updateConfig}
        removeContent={removeContent}
        removeConfig={removeConfig}
      />
    </Form>
  );
}
