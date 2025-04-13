import { BlockComponent, ComponentKind, ComponentType, Block } from "@/lib/types/blocks";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface FactoryHelpers {
  addComponent: (type: ComponentType, kind: ComponentKind) => void;
  addSetting: (type: ComponentType, kind: ComponentKind) => void;
  updateComponent: (type: ComponentType, component: Partial<BlockComponent>, kind: ComponentKind) => void;
  updateSetting: (type: ComponentType, value: string, kind: ComponentKind) => void;
  removeComponent: (type: ComponentType, kind: ComponentKind) => void;
  removeSetting: (type: ComponentType, kind: ComponentKind) => void;
}

export function useFactoryHelper(
  setValue: UseFormSetValue<Block>,
  watch: UseFormWatch<Block>
): FactoryHelpers {
  const addComponent = (type: ComponentType, kind: ComponentKind) => {
    if (kind === "component") {
      const newComponent: Partial<BlockComponent> = {
        type,
        kind,
        position: "bottom",
      };

      setValue("content", {
        ...watch("content"),
        [type]: newComponent,
      });
    }
  };

  const addSetting = (type: ComponentType, kind: ComponentKind) => {
    if (kind === "setting") {
      const newSetting = {
        [type]: "",
      };

      setValue("settings", {
        ...watch("settings"),
        ...newSetting,
      });
    }
  };

  const updateComponent = (
    type: ComponentType,
    component: Partial<BlockComponent>,
    kind: ComponentKind
  ) => {
    if (kind === "component") {
      setValue("content", {
        ...watch("content"),
        [type]: component,
      });
    }
  };

  const updateSetting = (
    type: ComponentType,
    value: string,
    kind: ComponentKind
  ) => {
    if (kind === "setting") {
      setValue("settings", {
        ...watch("settings"),
        [type]: value,
      });
    }
  };

  const removeComponent = (type: ComponentType, kind: ComponentKind) => {
    if (kind === "component") {
      const currentContent = watch("content") || {};
      const newContent = { ...currentContent };
      delete newContent[type as keyof typeof newContent];
      setValue("content", newContent);
    }
  };

  const removeSetting = (type: ComponentType, kind: ComponentKind) => {
    if (kind === "setting") {
      const currentSettings: Record<string, string> = watch("settings") || {};
      const newSettings = { ...currentSettings };
      delete newSettings[type as keyof typeof newSettings];
      setValue("settings", newSettings);
    }
  };

  return {
    addComponent,
    addSetting,
    updateComponent,
    updateSetting,
    removeComponent,
    removeSetting
  };
}