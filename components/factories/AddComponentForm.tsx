import { useForm } from "react-hook-form";
import { ComponentKind, ComponentType } from "@/lib/types/blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Carousel } from "../ui/carousel";

interface FormValues {
  componentType: ComponentType;
}

interface AddComponentFormProps {
  onSubmit: (type: ComponentType, kind: ComponentKind) => void;
  onCancel: () => void;
}

const components: {
  type: ComponentType;
  label: string;
  preview: React.ReactNode;
  kind: ComponentKind;
}[] = [
  {
    type: "title",
    label: "Title",
    preview: <h1 className="text-2xl font-bold">Title</h1>,
    kind: "component",
  },
  {
    type: "description",
    label: "Description",
    preview: <p className="text-sm">Description</p>,
    kind: "component",
  },
  {
    type: "button",
    label: "Button",
    preview: <Button size="sm">Button</Button>,
    kind: "component",
  },
  {
    type: "input",
    label: "InputField",
    preview: <Input placeholder="Input field" className="w-32" />,
    kind: "component",
  },
  {
    type: "textarea",
    label: "TextArea",
    preview: <Textarea placeholder="Text area" className="w-32 h-16" />,
    kind: "component",
  },
  {
    type: "separator",
    label: "Separator",
    preview: <Separator className="w-32" />,
    kind: "component",
  },
  {
    type: "badge",
    label: "Badge",
    preview: <Badge>Badge</Badge>,
    kind: "component",
  },
  {
    type: "card",
    label: "Card",
    preview: (
      <Card className="w-32 h-24 flex items-center justify-center text-sm">
        Card
      </Card>
    ),
    kind: "component",
  },
  {
    type: "carousel",
    label: "Carousel",
    preview: (
      <Carousel className="w-32 h-24 flex items-center justify-center text-sm">
        Carousel
      </Carousel>
    ),
    kind: "component",
  }
];

export function AddComponentForm({ onSubmit, onCancel }: AddComponentFormProps) {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      componentType: "title",
    },
  });

  const selectedType = watch("componentType");

  const onFormSubmit = handleSubmit((data) => {
    const component = components.find(c => c.type === data.componentType);
    if (component) {
      onSubmit(component.type, component.kind);
    }
  });

  return (
    <form onSubmit={onFormSubmit}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {components.map((component) => (
          <label
            key={component.type}
            className={`group relative p-8 rounded-lg border transition-colors flex flex-col justify-center items-center cursor-pointer ${
              selectedType === component.type 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input 
              type="radio"
              className="sr-only"
              value={component.type}
              {...register("componentType")}
            />
            <div className="mb-2">{component.preview}</div>
            <span className="text-sm font-medium absolute bottom-2">
              {component.label}
            </span>
            <div className={`absolute inset-0 bg-primary/5 opacity-0 ${
              selectedType !== component.type ? "group-hover:opacity-100" : ""
            } rounded-lg transition-opacity`} />
          </label>
        ))}
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Component
        </Button>
      </div>
    </form>
  );
}