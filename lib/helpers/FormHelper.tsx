import { Element, ElementKind, ElementType, Block } from "@/lib/types/blocks";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface FormHelpers {
  addContent: (type: ElementType, kind: ElementKind) => void;
  addConfig: (type: ElementType, kind: ElementKind) => void;
  updateContent: (type: ElementType, content: Partial<Element>, kind: ElementKind) => void;
  updateConfig: (type: ElementType, value: string, kind: ElementKind) => void;
  removeContent: (type: ElementType, kind: ElementKind) => void;
  removeConfig: (type: ElementType, kind: ElementKind) => void;
}

export function useFormHelper(
  setValue: UseFormSetValue<Block>,
  watch: UseFormWatch<Block>
): FormHelpers {
  const addContent = (type: ElementType, kind: ElementKind) => {
    if (kind === "content") {
      const newContent: Partial<Element> = {
        type,
        kind,
        position: "bottom",
      };

      setValue("content", {
        ...watch("content"),
        [type]: newContent,
      });
    }
  };

  const addConfig = (type: ElementType, kind: ElementKind) => {
    if (kind === "config") {
      const newConfig = {
        [type]: "",
      };

      setValue("config", {
        ...watch("config"),
        ...newConfig,
      });
    }
  };

  const updateContent = (
    type: ElementType,
    content: Partial<Element>,
    kind: ElementKind
  ) => {
    if (kind === "content") {
      setValue("content", {
        ...watch("content"),
        [type]: content,
      });
    }
  };

  const updateConfig = (
    type: ElementType,
    value: string,
    kind: ElementKind
  ) => {
    if (kind === "config") {
      setValue("config", {
        ...watch("config"),
        [type]: value,
      });
    }
  };

  const removeContent = (type: ElementType, kind: ElementKind) => {
    if (kind === "content") {
      const currentContent = watch("content") || {};
      const newContent = { ...currentContent };
      delete newContent[type as keyof typeof newContent];
      setValue("content", newContent);
    }
  };

  const removeConfig = (type: ElementType, kind: ElementKind) => {
    if (kind === "config") {
      const currentConfigs: Record<string, string> = watch("config") || {};
      const newConfig = { ...currentConfigs };
      delete newConfig[type as keyof typeof newConfig];
      setValue("config", newConfig);
    }
  };

  return {
    addContent,
    addConfig,
    updateContent,
    updateConfig,
    removeContent,
    removeConfig
  };
}