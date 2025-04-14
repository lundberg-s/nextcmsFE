import {
  Block,
  BlockComponent,
  ComponentKind,
  ComponentType,
} from "@/lib/types/blocks";
import { useForm } from "react-hook-form";
import { use, useEffect, useRef } from "react";
import { SettingsFactory } from "@/components/factories/SettingsFactory";
import { useBlock } from "@/lib/hooks/useBlock";
import { isEqual } from "lodash";
import { ComponentFactory } from "@/components/factories/ComponentFactory";
import { useBlockPreview } from "@/lib/hooks/useBlockPreview";
import { useFactoryHelper } from "@/lib/helpers/FactoryHelper";
import { useCmsContext } from "@/lib/context/CmsContext";
import { DialogModal } from "@/components/modals/DialogModal";
import { AddComponentForm } from "@/features/block-content/AddComponentForm";
import { AddSettingForm } from "@/features/block-content/AddSettingForm";
import { EditableComponent } from "../block-content/EditableComponent";

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
    addComponent,
    addSetting,
    updateComponent,
    updateSetting,
    removeComponent,
    removeSetting
  } = useFactoryHelper(setValue, watch);

  const formValues = watch();
  const settings = watch("settings");
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
      content: AddComponentForm,
      function: addComponent,
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
      content: AddSettingForm,
      function: addSetting,
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
            onSubmit: (type: ComponentType, kind: ComponentKind) => {
              form.function(type, kind);
            },
          }}
        />
      ))}

      {content &&
        Object.entries(content).map(([type, value]) => (
          <EditableComponent
            key={type}
            type={type as ComponentType}
            component={value as BlockComponent}
            kind="component"
            onChange={updateComponent}
            onRemove={removeComponent}
          />
        ))}

      {settings &&
        Object.entries(settings).map(([type, value]) => (
          <SettingsFactory
            key={type}
            type={type as ComponentType}
            value={value as string}
            kind="setting"
            onChange={updateSetting}
            onRemove={removeSetting}
          />
        ))}
    </form>
  );
}