import {
  Block,
  BlockComponent,
  ComponentKind,
  ComponentType,
} from "@/types/blocks";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useCms } from "@/hooks/useCms";

import { AddSettingModal } from "../modals/AddSettingModal";
import { AddComponentModal } from "../modals/AddComponentModal";

import { ComponentFactory } from "../factories/ComponentFactory";
import { SettingsFactory } from "../factories/SettingsFactory";

interface EditBlockFormProps {
  block: Block | null;
  onClose: () => void;
}

export function EditBlockForm({ block, onClose }: EditBlockFormProps) {
  const { updateBlock, setSelectedBlock } = useCms();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (block) {
      updateBlock(block.id, block);
      setSelectedBlock(null);
      onClose();
    }
  };

  const handleAddComponent = (type: ComponentType, kind: ComponentKind) => {
    if (kind === "component" && block) {
      const newComponent: Partial<BlockComponent> = {
        type,
        kind,
      };

      const updatedContent = {
        ...block.content,
        [type]: newComponent,
      };

      setSelectedBlock({
        ...block,
        content: updatedContent,
      });
    }
  };

  const handleAddSetting = (type: ComponentType, kind: ComponentKind) => {
    if (kind === "setting" && block) {
      const newSetting = {
        [type]: "",
      };

      const updatedSettings = {
        ...block.settings,
        ...newSetting,
      };

      setSelectedBlock({
        ...block,
        settings: updatedSettings,
      });
    }
  };

  const handleUpdateComponent = (
    type: ComponentType,
    component: Partial<BlockComponent>,
    kind: ComponentKind
  ) => {
    if (kind === "component" && block) {
      const updatedContent = {
        ...block.content,
        [type]: component,
      };

      setSelectedBlock({
        ...block,
        content: updatedContent,
      });
    }
  };

  const handleUpdateSetting = (
    type: ComponentType,
    value: string,
    kind: ComponentKind
  ) => {
    if (kind === "setting" && block) {
      const updatedSettings = {
        ...block.settings,
        [type]: value,
      };

      setSelectedBlock({
        ...block,
        settings: updatedSettings,
      });
    }
  };

  const handleRemoveComponent = (type: ComponentType, kind: ComponentKind) => {
    if (kind === "component" && block) {
      const newContent = { ...block.content };
      delete newContent[type];

      setSelectedBlock({
        ...block,
        content: newContent,
      });
    }
  };

  const handleRemoveSetting = (type: ComponentType, kind: ComponentKind) => {
    if (kind === "setting" && block) {
      const newSettings = { ...block.settings };
      delete newSettings[type];

      setSelectedBlock({
        ...block,
        settings: newSettings,
      });
    }
  };

  if (!block) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="space-y-4">
          {block.content &&
            Object.entries(block.content).map(([type, value]) => (
              <ComponentFactory
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
          {block.settings &&
            Object.entries(block.settings).map(([type, value]) => (
              <SettingsFactory
                key={type}
                type={type as ComponentType}
                value={value as string}
                kind="setting"
                onChange={handleUpdateSetting}
                onRemove={handleRemoveSetting}
              />
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <AddComponentModal onSelect={handleAddComponent} />
        <AddSettingModal onSelect={handleAddSetting} />
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