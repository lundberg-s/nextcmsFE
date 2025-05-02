import { useForm } from "react-hook-form";
import { ElementKind, ElementType } from "@/cms/lib/types/blocks";
import { Button } from "@/cms/components/ui/button";
import { ElementItem } from "./ElementItem";

interface FormValues {
  elementType: string;
}

interface AddElementFormProps {
  kind: ElementKind;
  onSubmitCallback: (type: string, kind: ElementKind) => void;
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
  onSubmitCallback,
  onCancelCallback,
}: AddElementFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      elementType: kind === "content" ? "title" : "backgroundColor",
    },
  });

  const selectedType = watch("elementType");

  const onFormSubmit = handleSubmit((data) => {
    onSubmitCallback(data.elementType, kind);
  });

  const handleSelect = (type: string) => {
    setValue("elementType", type);
  };

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
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
            <label
              key={config.type}
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedType === config.type
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <input
                type="radio"
                className="mt-1 mr-3"
                value={config.type}
                checked={selectedType === config.type}
                onChange={() => handleSelect(config.type)}
                name="elementType"
              />
              <div className="flex-1">
                <div className="font-medium">{config.label}</div>
                <div className="text-sm text-muted-foreground">
                  {config.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancelCallback}>
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            onFormSubmit(e);
          }}
          type="submit"
        >
          {kind === "content" ? "Add Component" : "Add Config"}
        </Button>
      </div>

      <input type="hidden" {...register("elementType")} />
    </form>
  );
}
