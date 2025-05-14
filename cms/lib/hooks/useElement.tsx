import { UseFormSetValue, UseFormWatch, UseFormReset } from "react-hook-form";
import { useEffect, useRef } from "react";
import { isEqual } from "lodash";
import { useCmsContext } from "@/cms/lib/context/CmsContext";

interface FormHelpers {
  // Existing methods
  addContent: (type: ElementType, kind: ElementKind) => void;
  addConfig: (type: ElementType, kind: ElementKind) => void;
  updateContent: (
    type: ElementType,
    content: Partial<Element>,
    kind: ElementKind
  ) => void;
  updateConfig: (type: ElementType, value: string, kind: ElementKind) => void;
  removeContent: (type: ElementType, kind: ElementKind) => void;
  removeConfig: (type: ElementType, kind: ElementKind) => void;

  prevFormValues: React.MutableRefObject<Block | null>;
}

export function useElement(
  setValue: UseFormSetValue<Block>,
  watch: UseFormWatch<Block>,
  reset: UseFormReset<Block>
): FormHelpers {
  const { selectedBlock, setSelectedBlock } = useCmsContext();
  const prevFormValues = useRef<Block | null>(null);
  const formValues = watch();

  useEffect(() => {
    if (!isEqual(prevFormValues.current, formValues)) {
      prevFormValues.current = formValues;
      setSelectedBlock(formValues);
    }
  }, [formValues, setSelectedBlock]);

  useEffect(() => {
    if (selectedBlock) {
      reset(selectedBlock as Block);
    }
  }, [selectedBlock, reset]);

  // Content methods
  const addContent = (
    type: ElementType,
    kind: ElementKind,
    options?: { onSuccess?: () => void }
  ) => {
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

      if (options?.onSuccess) {
        options.onSuccess();
      }
    }
  };

  const addConfig = (
    type: ElementType,
    kind: ElementKind,
    options?: { onSuccess?: () => void }
  ) => {
    if (kind === "config") {
      const newConfig = {
        [type]: "",
      };

      setValue("config", {
        ...watch("config"),
        ...newConfig,
      });
      
      if (options?.onSuccess) {
        options.onSuccess();
      }
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
    removeConfig,
    prevFormValues,
  };
}
