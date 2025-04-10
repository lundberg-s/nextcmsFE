import {
  Block,
  BlockComponent,
  ComponentKind,
  ComponentType,
} from "@/lib/types/blocks";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { AddComponentModal } from "../../../components/modals/AddComponentModal";
import { SettingsFactory } from "../../../components/factories/SettingsFactory";
import { useCms } from "@/lib/hooks/useCms";
import { isEqual } from "lodash";
import { AddSettingModal } from "../../../components/modals/AddSettingModal";
import { ComponentFactory } from "../../../components/factories/ComponentFactory";
import { useFormContext } from "@/lib/hooks/useFormFontext";
import { useFactoryHelper } from "@/lib/helpers/factoryHelper";

interface EditBlockFormProps {
  block: Block | null;
  onSubmit: (data: Block) => void;
  onCancel: () => void;
}

export function EditBlockForm({
  block,
  onSubmit,
  onCancel,
}: EditBlockFormProps) {
  const { updateBlock } = useCms();
  const { setCurrentFormValues } = useFormContext();
  const { handleSubmit, reset, setValue, watch } = useForm<Block>({
    defaultValues: {},
  });

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
      setCurrentFormValues(formValues);
    }
  }, [formValues, setCurrentFormValues]);

  useEffect(() => {
    if (block) {
      reset(block);
    }
  }, [block, reset]);

  const handleFormSubmit = (data: Block) => {
    if (block) {
      updateBlock(block.id, data);
      onSubmit(data);
    }
  };

  const handleCancelClick = () => {
    if (block) {
      reset(block);
      setCurrentFormValues(block);
    }
    onCancel();
  };

  return (
    <form
      id="edit-block-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
    >
      <div className="space-y-4">
        <AddComponentModal onSelect={addComponent} />
        <AddSettingModal onSelect={addSetting} />
      </div>
      <div className="space-y-4">
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
      </div>
      <div className="space-y-4">
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
      </div>
      
      {/* Add form action buttons */}
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={handleCancelClick}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}