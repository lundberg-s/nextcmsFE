import { useForm } from "react-hook-form";
import { ElementKind, ElementType } from "@/cms/lib/types/blocks";
import { Button } from "@/cms/components/ui/button";
import { PreviewContentItem } from "./PreviewContentItem";

interface FormValues {
  ElementType: ElementType;
}

interface AddContentFormProps {
  onSubmitCallback: (type: ElementType, kind: ElementKind) => void;
  onCancelCallback: () => void;
}

export function AddContentForm({ onSubmitCallback, onCancelCallback }: AddContentFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      ElementType: "title",
    },
  });

  const selectedType = watch("ElementType");
  
  const onFormSubmit = handleSubmit((data) => {
    onSubmitCallback(data.ElementType, "content");
  });

  const handleSelect = (type: ElementType) => {
    setValue("ElementType", type);
  };

  // Define component types dynamically using the PREVIEW_LIST from PreviewContentItem
  const componentTypes = [
    "title", "description", "button", "input", "separator", "card", "carousel"
  ] as const;

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {componentTypes.map((type) => (
          <PreviewContentItem
            key={type}
            type={type}
            kind="content"
            isSelected={selectedType === type}
            onSelect={handleSelect}
          />
        ))}
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancelCallback}>
          Cancel
        </Button>
        <Button onClick={(e) => {
          e.preventDefault();
          onFormSubmit(e);
        }} type="submit">
          Add Component
        </Button>
      </div>

      {/* Hidden input for react-hook-form registration */}
      <input type="hidden" {...register("ElementType")} />
    </form>
  );
}