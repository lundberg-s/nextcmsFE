import {
  Block,
  Element,
  ElementKind,
  ElementType,
} from "@/lib/types/blocks";
import { useForm } from "react-hook-form";
import { use, useEffect, useRef } from "react";
import { useBlock } from "@/lib/hooks/useBlock";
import { isEqual } from "lodash";
import { useBlockPreview } from "@/lib/hooks/useBlockPreview";
import { useFormHelper } from "@/lib/helpers/FormHelper";
import { useCmsContext } from "@/lib/context/CmsContext";
import { DialogModal } from "@/components/modals/DialogModal";
import { AddContentForm } from "@/features/element/AddContentForm";
import { AddConfigForm } from "@/features/element/AddConfigForm";
import { EditContentItem } from "@/features/element/EditContentItem";
import { EditConfigItem } from "@/features/element/EditConfigItem";

export function EditBlockForm({
  id = "edit-block-form",
  onSuccess,
  onCancel,
}: {
  id: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { updateBlock } = useBlock();
  const { setPreviewBlock } = useBlockPreview();
  const { selectedBlock, setSelectedBlock } = useCmsContext();
  const { handleSubmit, reset, setValue, watch } = useForm<Block>({
    defaultValues: {},
  });

  const block = selectedBlock as Block;

  const {
    addContent,
    addConfig,
    updateContent,
    updateConfig,
    removeContent,
    removeConfig
  } = useFormHelper(setValue, watch);

  const formValues = watch();
  const configurations = watch("config");
  const content = watch("content");

  const prevFormValues = useRef<Block | null>(null);

  useEffect(() => {
    if (!isEqual(prevFormValues.current, formValues)) {
      prevFormValues.current = formValues;
      setPreviewBlock(formValues);
    }
  }, [formValues, setPreviewBlock]);

  useEffect(() => {
    if (block) {
      reset(block);
    }
  }, [block, reset]);

  const handleFormSubmit = (data: Block) => {
    if (block) {
      updateBlock(
        { id: block.id, block: data },
        {
          onSuccess: () => {
            setTimeout(() => {
              setSelectedBlock(null);
              onSuccess();
            }, 20);
          }
        },
      );
    }
  };

  const handleCancelClick = () => {
    if (block) {
      reset(block);
      setPreviewBlock(block);
    }
    onCancel();
  };

  const formsList = [
    {
      title: "Add Component",
      description: "Select a component to add to your block. You can customize its properties after adding.",
      icon: "plus",
      content: AddContentForm,
      function: addContent,
      button: {
        label: "Add Component",
        icon: "plus",
        variant: "outline",
        disabled: !selectedBlock,
      },
    },
    {
      title: "Add Setting",
      description: "Select a setting to customize the appearance of your block.",
      icon: "plus",
      content: AddConfigForm,
      function: addConfig,
      button: {
        label: "Add Setting",
        icon: "plus",
        variant: "outline",
        disabled: !selectedBlock,
      },
    },
  ]

  return (
    <form
      id={id}
      onSubmit={handleSubmit(handleFormSubmit)}
      onReset={handleCancelClick}
      className="flex flex-col gap-4"
    >
      {formsList.map((form) => (
        <DialogModal
          key={form.title}
          title={form.title}
          description={form.description}
          content={form.content}
          button={form.button}
          props={{
            onSubmit: (type: ElementType, kind: ElementKind) => {
              form.function(type, kind);
            },
          }}
        />
      ))}

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