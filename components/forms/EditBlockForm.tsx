import {
  Block,
  BlockComponent,
  ComponentKind,
  ComponentType,
} from "@/types/blocks";
import { useAdminStore } from "@/lib/store/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { AddComponentModal } from "../modals/AddComponentModal";
import { SettingsForm } from "./SettingsForm";
import { generateId } from "@/utils/GenerateId";
import { AddSettingModal } from "../modals/AddSettingModal";
import { on } from "node:events";
import { ComponentForm } from "./ComponentForm";

interface EditBlockFormProps {
  block: Block | null;
  onClose: () => void;
}

export function EditBlockForm({ block, onClose }: EditBlockFormProps) {
  const { updateBlock, setSelectedBlock } = useAdminStore();
  const { handleSubmit, reset, setValue, watch } = useForm<Block>({
    defaultValues: {},
  });

  const settings = watch("settings");
  const content = watch("content");

  useEffect(() => {
    if (block) {
      reset(block);
    }
  }, [block, reset]);

  const onSubmit = (data: Block) => {
    if (block) {
      updateBlock(block.id, data);
      setSelectedBlock(null);
      onClose();
    }
  };

  const handleAddComponent = (type: ComponentType, kind: ComponentKind) => {
    if (kind === "component") {
      const newComponent: Partial<BlockComponent> = {
        type,
        kind,
      };

      setValue("content", {
        ...watch("content"),
        [type]: newComponent,
      });
    } else {
      const newSetting = {
        [type]: "",
      };

      setValue("settings", {
        ...watch("settings"),
        ...newSetting,
      });
    }
  };

  const handleUpdateComponent = (
    type: ComponentType,
    value: string,
    kind: ComponentKind
  ) => {
    if (kind === "component") {
      setValue(`content.${type}`, value);
    } else {
      setValue(`settings.${type}`, value);
    }
  };

  const handleRemoveComponent = (type: ComponentType, kind: ComponentKind) => {
    if (kind === "component") {
      const currentContent = watch("content") || {};
      const newContent = { ...currentContent };
      delete newContent[type as keyof typeof newContent];
      setValue("content", newContent);
    } else {
      const currentSettings: Record<string, string> = watch("settings") || {};
      const newSettings = { ...currentSettings };
      delete newSettings[type as keyof typeof newSettings];
      setValue("settings", newSettings);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-4">
          {content &&
            Object.entries(content).map(([type, value]) => (
              <ComponentForm
                key={type}
                type={type as ComponentType}
                component={value as BlockComponent}
                kind="component"
                onChange={handleUpdateComponent}
                onRemove={handleRemoveComponent}
              />
            ))}
        </div>
        <div className="space-y-4">
          {settings &&
            Object.entries(settings).map(([type, value]) => (
              <SettingsForm
                key={type}
                type={type as ComponentType}
                value={value as string}
                kind="setting"
                onChange={handleUpdateComponent}
                onRemove={handleRemoveComponent}
              />
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <AddComponentModal onSelect={handleAddComponent} />
        <AddSettingModal onSelect={handleAddComponent} />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
