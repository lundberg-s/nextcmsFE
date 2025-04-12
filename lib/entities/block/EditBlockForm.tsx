import {
  Block,
  BlockComponent,
  ComponentType,
} from "@/lib/types/blocks";
import { useForm } from "react-hook-form";
import { use, useEffect, useRef } from "react";
import { AddComponentModal } from "../../../components/modals/AddComponentModal";
import { SettingsFactory } from "../../../components/factories/SettingsFactory";
import { useBlock } from "@/lib/hooks/useBlock";
import { isEqual } from "lodash";
import { AddSettingModal } from "../../../components/modals/AddSettingModal";
import { ComponentFactory } from "../../../components/factories/ComponentFactory";
import { useBlockPreview } from "@/lib/hooks/useBlockPreview";
import { useFactoryHelper } from "@/lib/helpers/FactoryHelper";
import { useCmsContext } from "@/lib/context/CmsContext";

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
      updateBlock(block.id, data);
    }
    onSuccess();
  };

  const handleCancelClick = () => {
    if (block) {
      reset(block);
      console.log("reset", block);
      setPreviewBlock(block);
    }
    onCancel();
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit(handleFormSubmit)}
      onReset={handleCancelClick}
      className="flex flex-col gap-4"
    >
        <AddComponentModal onSelect={addComponent} />
        <AddSettingModal onSelect={addSetting} />

        {content &&
          Object.entries(content).map(([type, value]) => (
            <ComponentFactory
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