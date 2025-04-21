import { Element, ElementKind, ElementType, Block } from "@/lib/types/blocks";
import { UseFormSetValue, UseFormWatch, UseFormReset } from "react-hook-form";
import { useEffect, useRef } from "react";
import { isEqual } from "lodash";
import { useBlock } from "@/lib/hooks/useBlock";
import { useBlockPreview } from "@/lib/hooks/useBlockPreview";
import { useCmsContext } from "@/lib/context/CmsContext";

interface FormHelpers {
  // Existing methods
  addContent: (type: ElementType, kind: ElementKind) => void;
  addConfig: (type: ElementType, kind: ElementKind) => void;
  updateContent: (type: ElementType, content: Partial<Element>, kind: ElementKind) => void;
  updateConfig: (type: ElementType, value: string, kind: ElementKind) => void;
  removeContent: (type: ElementType, kind: ElementKind) => void;
  removeConfig: (type: ElementType, kind: ElementKind) => void;
  
  // New methods
  submitForm: (data: Block, onSuccess?: () => void) => void;
  cancelForm: (onCancel?: () => void) => void;
  
  // Track the form values reference
  prevFormValues: React.MutableRefObject<Block | null>;
}

export function useFormHelper(
  setValue: UseFormSetValue<Block>,
  watch: UseFormWatch<Block>,
  reset: UseFormReset<Block>
): FormHelpers {
  const { updateBlock } = useBlock();
  const { setPreviewBlock } = useBlockPreview();
  const { selectedBlock, setSelectedBlock } = useCmsContext();
  const prevFormValues = useRef<Block | null>(null);
  const formValues = watch();
  
  // Effect 1: Update preview block when form values change
  useEffect(() => {
    if (!isEqual(prevFormValues.current, formValues)) {
      prevFormValues.current = formValues;
      setPreviewBlock(formValues);
    }
  }, [formValues, setPreviewBlock]);

  // Effect 2: Reset form when block changes
  useEffect(() => {
    if (selectedBlock) {
      reset(selectedBlock as Block);
    }
  }, [selectedBlock, reset]);
  
  // Content methods
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

  // Form submission handler
  const submitForm = (data: Block, onSuccess?: () => void) => {
    if (selectedBlock) {
      updateBlock(
        { id: selectedBlock.id, block: data },
        {
          onSuccess: () => {
            setTimeout(() => {
              setSelectedBlock(null);
              if (onSuccess) onSuccess();
            }, 20);
          }
        }
      );
    }
  };

  // Cancel handler
  const cancelForm = (onCancel?: () => void) => {
    if (selectedBlock) {
      reset(selectedBlock as Block);
      setPreviewBlock(selectedBlock as Block);
    }
    if (onCancel) onCancel();
  };

  return {
    addContent,
    addConfig,
    updateContent,
    updateConfig,
    removeContent,
    removeConfig,
    submitForm,
    cancelForm,
    prevFormValues
  };
}