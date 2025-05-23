import { UseFormSetValue, UseFormWatch, UseFormReset } from "react-hook-form";
import { useEffect, useRef } from "react";
import { isEqual } from "lodash";
import { useCmsContext } from "@/cms/lib/context/CmsContext";

interface FormHelpers {
  addContent: (type: ElementType, kind: ElementKind) => void;
  addstyle: (type: ElementType, kind: ElementKind) => void;
  updateContent: (
    type: ElementType,
    content: Record<string, ContentElement>,
    kind: ElementKind
  ) => void;
  updatestyle: (type: ElementType, value: string, kind: ElementKind) => void;
  removeContent: (type: ElementType, kind: ElementKind) => void;
  removestyle: (type: ElementType, kind: ElementKind) => void;

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


  const addContent = (
    type: ElementType,
    kind: ElementKind,
    options?: { onSuccess?: () => void }
  ) => {
    if (kind === "content") {
      const newContent = {
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

  const addstyle = (
    type: ElementType,
    kind: ElementKind,
    options?: { onSuccess?: () => void }
  ) => {
    if (kind === "style") {
      const newstyle = {
        [type]: "",
      };

      setValue("style", {
        ...watch("style"),
        ...newstyle,
      });
      
      if (options?.onSuccess) {
        options.onSuccess();
      }
    }
  };

  const updateContent = (
    type: ElementType,
    content: Record<string, ContentElement>,
    kind: ElementKind
  ) => {
    if (kind === "content") {
      setValue("content", {
        ...watch("content"),
        [type]: content,
      });
    }
  };

  const updatestyle = (
    type: ElementType,
    value: string,
    kind: ElementKind
  ) => {
    if (kind === "style") {
      setValue("style", {
        ...watch("style"),
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

  const removestyle = (type: ElementType, kind: ElementKind) => {
    if (kind === "style") {
      const currentstyles = watch("style") || {};
      const newstyle = { ...currentstyles };
      delete newstyle[type as keyof typeof newstyle];
      setValue("style", newstyle);
    }
  };

  return {
    addContent,
    addstyle,
    updateContent,
    updatestyle,
    removeContent,
    removestyle,
    prevFormValues,
  };
}
