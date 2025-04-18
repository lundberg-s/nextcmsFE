import { useForm } from "react-hook-form";
import { ElementKind, ElementType } from "@/lib/types/blocks";
import { Button } from "@/components/ui/button";
import { Preview } from "./content";

interface FormValues {
  ElementType: ElementType;
}

interface AddContentFormProps {
  onSubmit: (type: ElementType, kind: ElementKind) => void;
  onCancel: () => void;
}

const COMPONENT_MAP = {
  title: Preview.Title,
  description: Preview.Description,
  button: Preview.Button,
  input: Preview.Input,
  separator: Preview.Separator,
  card: Preview.Card,
  carousel: Preview.Carousel,
} as const;

export function AddContentForm({ onSubmit, onCancel }: AddContentFormProps) {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      ElementType: "title",
    },
  });

  const selectedType = watch("ElementType");
  
  const onFormSubmit = handleSubmit((data) => {
    const ElementType = data.ElementType as keyof typeof COMPONENT_MAP;
    onSubmit(ElementType, "content");
  });

  const ElementTypes = Object.keys(COMPONENT_MAP) as Array<keyof typeof COMPONENT_MAP>;

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {ElementTypes.map((type) => {
          const PreviewComponent = COMPONENT_MAP[type];
          
          return (
            <label
              key={type}
              className={`group relative p-8 rounded-lg border transition-colors flex flex-col justify-center items-center cursor-pointer ${
                selectedType === type 
                  ? "border-primary bg-primary/10" 
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <input 
                type="radio"
                className="sr-only"
                value={type}
                {...register("ElementType")}
              />
              <div className="mb-2">
                <PreviewComponent />
              </div>
              <span className="text-sm font-medium absolute bottom-2">
                {type}
              </span>
              <div className={`absolute inset-0 bg-primary/5 opacity-0 ${
                selectedType !== type ? "group-hover:opacity-100" : ""
              } rounded-lg transition-opacity`} />
            </label>
          );
        })}
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={(e) => {
          e.preventDefault();
          onFormSubmit(e);
        }} type="submit">
          Add Component
        </Button>
      </div>
    </form>
  );
}