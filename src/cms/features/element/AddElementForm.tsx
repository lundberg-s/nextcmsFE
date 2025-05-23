import { useForm } from "react-hook-form";
import { ElementItem } from "./ElementItem";

interface AddElementFormValues {
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

const style_OPTIONS: Array<{
  type: StyleType;
  label: string;
  description: string;
  kind: "style";
}> = [
  {
    type: "backgroundColor",
    label: "Background Color",
    description: "Set the background color using hex or color name",
    kind: "style",
  },
  {
    type: "backgroundImage",
    label: "Background Image",
    description: "Add an image URL for the background",
    kind: "style",
  },
  {
    type: "textColor",
    label: "Text Color",
    description: "Set the color for text elements",
    kind: "style",
  },
  {
    type: "height",
    label: "Height",
    description: "Set the height of the block",
    kind: "style",
  },
  {
    type: "waveOverlay",
    label: "Wave Overlay",
    description: "Add a wave overlay to the block bottom",
    kind: "style",
  },
  {
    type: "backgroundOverlay",
    label: "Background Overlay",
    description: "Add a background overlay to the block",
    kind: "style",
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
  "image",
  "text",
  "features",
] as const;

export function AddElementForm({
  kind,
  formFn,
  formRef,
  onSubmitCallback,
  onCancelCallback,
}: AddElementFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<AddElementFormValues>({
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
      formFn(selectedType, kind, {
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
              onChange={() => {}}
              onRemove={() => {}}
            />
          ))}
        </div>
      )}

      {kind === "style" && (
        <div className="space-y-4">
          {style_OPTIONS.map((style) => (
            <ElementItem
              mode="preview"
              key={style.type}
              type={style.type}
              label={style.label}
              description={style.description}
              kind="style"
              isSelected={selectedType === style.type}
              onSelect={handleSelect}
              onChange={() => {}} 
              onRemove={() => {}}
            />
          ))}
        </div>
      )}
      <input type="hidden" {...register("elementType")} />
    </form>
  );
}
