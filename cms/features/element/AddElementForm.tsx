import { useForm } from "react-hook-form";
import { ElementKind, ElementType } from "@/cms/lib/types/blocks";
import { ElementItem } from "./ElementItem";

interface FormValues {
  elementType: ElementType;
}

interface AddElementFormProps {
  kind: ElementKind;
  formFn: (
    type: ElementType,
    kind: ElementKind,
    options: { onSuccess: () => void }
  ) => void;
  formRef?: React.RefObject<HTMLFormElement>;
  onSubmitCallback: () => void;
  onCancelCallback: () => void;
}

const CONFIG_OPTIONS = [
  {
    type: "backgroundColor",
    label: "Background Color",
    description: "Set the background color using hex or color name",
    kind: "config" as ElementKind,
  },
  {
    type: "backgroundImage",
    label: "Background Image",
    description: "Add an image URL for the background",
    kind: "config" as ElementKind,
  },
  {
    type: "textColor",
    label: "Text Color",
    description: "Set the color for text elements",
    kind: "config" as ElementKind,
  },
];

const CONTENT_OPTIONS = [
  "title",
  "description",
  "button",
  "input",
  "separator",
  "card",
  "carousel",
] as const;

export function AddElementForm({
  kind,
  formFn,
  formRef,
  onSubmitCallback,
  onCancelCallback,
}: AddElementFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      elementType: kind === "content" ? "title" : "backgroundColor",
    },
  });
  const selectedType = watch("elementType");

  const handleSelect = (type: ElementType) => {
    setValue("elementType", type);
  };

  const onFormSubmit = () => {
    handleSubmit(() => {
      formFn(selectedType as ElementType, kind, {
        onSuccess: () => {
          onSubmitCallback();
        },
      });
    })();
  };

  const handleFormCancel = () => {
    onCancelCallback();
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onFormSubmit();
      }}
      onReset={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFormCancel();
      }}
      className="space-y-6"
    >
      {kind === "content" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {CONTENT_OPTIONS.map((type) => (
            <ElementItem
              mode="preview"
              key={type}
              type={type}
              kind="content"
              isSelected={selectedType === type}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      {kind === "config" && (
        <div className="space-y-4">
          {CONFIG_OPTIONS.map((config) => (
            <ElementItem
              mode="preview"
              key={config.type}
              type={config.type as ElementType}
              label={config.label}
              description={config.description}
              kind="config"
              isSelected={selectedType === config.type}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
      <input type="hidden" {...register("elementType")} />
    </form>
  );
}
